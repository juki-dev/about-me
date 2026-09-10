# infra

CDK app (TypeScript) for the production hosting of the portfolio: a private S3
bucket served through CloudFront, plus the IAM role that
`.github/workflows/deploy-prod.yml` assumes via OIDC.

Dev previews are **not** here — those go to GitHub Pages from the `dev` branch
and need no AWS resources.

## Requirements

- Node 22+ (the app runs straight off `bin/infra.ts` using Node's native type
  stripping, so there is no ts-node and no build step)
- AWS credentials with permission to create S3, CloudFront and IAM resources
- `npm install` inside this directory

## One-time setup

**1. The GitHub OIDC provider.** It is an account-level singleton shared by
every repo that deploys into the account, so it lives outside the stack — a
`cdk destroy` here must not be able to break another project's pipeline. Skip
this if the account already has one:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com
```

**2. Bootstrap CDK** in the target account/region, once:

```bash
npx cdk bootstrap aws://<ACCOUNT_ID>/<REGION>
```

## Deploying the infrastructure

```bash
npm run diff      # review before touching anything
npm run deploy
```

The stack prints five outputs. Four of them go straight into the GitHub repo
under Settings → Secrets and variables → Actions:

| Output                     | Where it goes                             |
| -------------------------- | ----------------------------------------- |
| `S3Bucket`                 | Variable `S3_BUCKET`                      |
| `AwsRegion`                | Variable `AWS_REGION`                     |
| `AwsRoleArn`               | Secret `AWS_ROLE_ARN`                     |
| `CloudfrontDistributionId` | Secret `CLOUDFRONT_DISTRIBUTION_ID`       |
| `SiteUrl`                  | The public URL — nothing to configure     |

`deploy-prod.yml` checks all four are present before it does anything, so a
missing one fails the run early instead of half-way through the S3 sync.

## Configuration

Everything lives in the `context` block of `cdk.json`:

- `github:owner` / `github:repo` / `github:branch` — build the subject that the
  role's trust policy matches **exactly**. Change `github:branch` and only that
  branch can deploy to production.
- `site:domainName` / `site:certificateArn` — optional custom domain, both or
  neither. **The certificate must be in `us-east-1`**; CloudFront accepts
  certificates from no other region, whatever region the rest of the stack is
  in. Leave both empty to serve from the generated `*.cloudfront.net` name.

## Notes

- The bucket is `RemovalPolicy.RETAIN`: `cdk destroy` leaves it behind rather
  than taking production offline in one command. Empty and delete it by hand if
  you really mean it.
- CloudFront changes take 5–15 minutes to propagate. A `cdk deploy` that looks
  hung on the distribution is usually just that.
- Caching is split between the two layers on purpose: this stack sets
  `CACHING_OPTIMIZED`, which honours the `Cache-Control` header that the deploy
  workflow stamps on each object — a year for the hashed bundles under
  `/assets`, revalidate-always for the HTML. Change the headers in the
  workflow, not the cache policy here.
