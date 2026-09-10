import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  type StackProps,
} from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'

const GITHUB_OIDC_DOMAIN = 'token.actions.githubusercontent.com'

/**
 * Production hosting for the portfolio: a private S3 bucket served through
 * CloudFront, plus the IAM role that .github/workflows/deploy-prod.yml
 * assumes via OIDC to publish into it.
 *
 * Configuration comes from cdk.json context — see infra/README.md.
 */
export class AboutMeSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const owner = this.node.tryGetContext('github:owner') as string
    const repo = this.node.tryGetContext('github:repo') as string
    const branch = this.node.tryGetContext('github:branch') as string
    const environment = this.node.tryGetContext('github:environment') as
      | string
      | undefined
    // cdk.json ships these as empty strings, so collapse blank to undefined
    // rather than letting "" flow through as a configured value.
    const optionalContext = (key: string): string | undefined => {
      const value = this.node.tryGetContext(key) as string | undefined
      return value && value.trim() !== '' ? value.trim() : undefined
    }

    const domainName = optionalContext('site:domainName')
    const certificateArn = optionalContext('site:certificateArn')

    if (domainName && !certificateArn) {
      throw new Error(
        'site:domainName requires site:certificateArn, and the certificate must live in us-east-1 — CloudFront accepts certificates from no other region.',
      )
    }

    // Nothing reaches this bucket directly; CloudFront gets in through the
    // origin access control configured below.
    const bucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // Every object is rebuilt from git on each deploy, so the bucket holds
      // no unique state — but keep it on `cdk destroy` so tearing the stack
      // down can never take production offline in one command.
      removalPolicy: RemovalPolicy.RETAIN,
    })

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      comment: `${owner}/${repo} portfolio`,
      defaultRootObject: 'index.html',
      defaultBehavior: {
        // withOriginAccessControl also writes the bucket policy, scoped by
        // AWS:SourceArn to this distribution. That condition is the piece
        // hand-rolled setups usually get wrong, leaving the bucket readable
        // by any CloudFront distribution in any account.
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        // CACHING_OPTIMIZED honours the Cache-Control that the deploy
        // workflow stamps on each object: a year for the hashed bundles
        // under /assets, revalidate-always for the HTML entry points.
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      // Vue Router owns the URL space, so a deep link like /projects/<slug>
      // has no object behind it and S3 answers 403 (no such key, and the
      // bucket is private) or 404. Both have to come back as index.html with
      // a 200 for the app to boot and resolve the route itself.
      errorResponses: [403, 404].map((httpStatus) => ({
        httpStatus,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
        ttl: Duration.seconds(0),
      })),
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      // Europe + North America. Widen if the traffic ever justifies it.
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      // Only meaningful alongside a custom certificate: on the default
      // *.cloudfront.net certificate the security policy is fixed by AWS.
      ...(domainName && certificateArn
        ? {
            domainNames: [domainName],
            certificate: acm.Certificate.fromCertificateArn(
              this,
              'SiteCertificate',
              certificateArn,
            ),
            minimumProtocolVersion:
              cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
          }
        : {}),
    })

    // Account-level singleton shared by every repo that deploys into this
    // account, so it lives outside the stack: `cdk destroy` here must not be
    // able to break another project's pipeline. infra/README.md has the
    // one-time command that creates it.
    const githubOidcProvider =
      iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
        this,
        'GitHubOidcProvider',
        `arn:aws:iam::${this.account}:oidc-provider/${GITHUB_OIDC_DOMAIN}`,
      )

    // The subject a GitHub Actions token carries depends on whether the job
    // declares an `environment:`. A job that does gets
    // repo:<owner>/<repo>:environment:<name>; one that doesn't gets
    // repo:<owner>/<repo>:ref:refs/heads/<branch>. Only ever one of the two,
    // so this has to mirror what deploy-prod.yml actually declares.
    const subject = environment
      ? `repo:${owner}/${repo}:environment:${environment}`
      : `repo:${owner}/${repo}:ref:refs/heads/${branch}`

    const deployRole = new iam.Role(this, 'GitHubActionsDeployRole', {
      description: `Assumed by GitHub Actions to deploy ${owner}/${repo} to production`,
      assumedBy: new iam.OpenIdConnectPrincipal(githubOidcProvider, {
        StringEquals: {
          [`${GITHUB_OIDC_DOMAIN}:aud`]: 'sts.amazonaws.com',
          // Exact match rather than StringLike on purpose: a wildcard in the
          // subject would let any branch — or any pull request, including one
          // opened from a fork — assume this role and write to prod.
          //
          // Note what an environment subject does NOT say: which branch the
          // run came from. That restriction moves to the environment's
          // deployment branch policy in GitHub, which must be pinned to
          // `${branch}`. See infra/README.md.
          [`${GITHUB_OIDC_DOMAIN}:sub`]: subject,
        },
      }),
    })

    // Read as well as write: `aws s3 sync --delete` lists the current
    // contents to work out the diff before it uploads anything. grantReadWrite
    // already covers s3:DeleteObject*, which the --delete pass needs.
    bucket.grantReadWrite(deployRole)

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation'],
        resources: [
          `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
        ],
      }),
    )

    // These four map one-to-one onto the GitHub Actions configuration that
    // deploy-prod.yml checks for before it does anything.
    new CfnOutput(this, 'S3Bucket', {
      value: bucket.bucketName,
      description: 'Repository variable S3_BUCKET',
    })
    new CfnOutput(this, 'AwsRegion', {
      value: this.region,
      description: 'Repository variable AWS_REGION',
    })
    new CfnOutput(this, 'AwsRoleArn', {
      value: deployRole.roleArn,
      description: 'Repository secret AWS_ROLE_ARN',
    })
    new CfnOutput(this, 'CloudfrontDistributionId', {
      value: distribution.distributionId,
      description: 'Repository secret CLOUDFRONT_DISTRIBUTION_ID',
    })

    new CfnOutput(this, 'SiteUrl', {
      value: `https://${domainName ?? distribution.distributionDomainName}`,
      description: 'Public URL of the deployed site',
    })
  }
}
