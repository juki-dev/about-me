import { App } from 'aws-cdk-lib'
import { AboutMeSiteStack } from '../lib/about-me-site-stack.ts'

const app = new App()

new AboutMeSiteStack(app, 'AboutMeSite', {
  // Taken from whichever AWS profile/region the CDK CLI is running under, so
  // the stack is pinned to a real account at synth time rather than being
  // environment-agnostic.
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  description:
    'Portfolio hosting: private S3 bucket behind CloudFront, plus the GitHub Actions OIDC deploy role.',
})
