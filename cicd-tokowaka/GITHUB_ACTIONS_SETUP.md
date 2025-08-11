# GitHub Actions Setup for Cloudflare Worker Deployment

This guide explains how to set up automatic deployment of the Cloudflare Worker using GitHub Actions.

## Prerequisites

1. **Cloudflare API Token**: You need to create a Cloudflare API token with the following permissions:
   - Account: Workers Scripts (Edit)
   - Account: Workers Routes (Edit)
   - Zone: Zone (Read)
   - Zone: SSL and Certificates (Edit)

## Setup Steps

### 1. Create Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Custom token" template
4. Add the following permissions:
   - **Account Resources**: 
     - Workers Scripts (Edit)
     - Workers Routes (Edit)
   - **Zone Resources**:
     - Zone (Read)
     - SSL and Certificates (Edit)
5. Set Account to "Franklin-Prod" (Account ID: 68e6632adf76183424b251e874663bde)
6. Set Zone to "aem-screens.net"
7. Copy the generated token

### 2. Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `CLOUDFLARE_API_TOKEN`
5. Value: Paste the API token from step 1
6. Click "Add secret"

### 3. GitHub Action Workflow

The workflow file `.github/workflows/deploy-worker.yml` is already created and will:

- **Trigger**: When changes are pushed to the `cicd-tokowaka/` folder
- **Branches**: `main` or `master`
- **Actions**:
  - Install dependencies
  - Deploy to development environment for PRs
  - Deploy to production environment for direct pushes

## How It Works

1. **Push to main/master**: Automatically deploys to production
2. **Pull Request**: Deploys to development environment for testing
3. **Path-based triggers**: Only runs when `cicd-tokowaka/` folder changes

## Manual Deployment

If you need to deploy manually:

```bash
cd cicd-tokowaka
npm run deploy  # Production
npm run deploy:dev  # Development
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check that your API token has the correct permissions
2. **Zone Not Found**: Ensure `aem-screens.net` is in your Cloudflare account
3. **Worker Name Conflict**: The worker name `cicd-tokowaka-worker` must be unique

### Debugging

- Check GitHub Actions logs for detailed error messages
- Verify API token permissions in Cloudflare dashboard
- Ensure the account ID in `wrangler.toml` matches your Franklin-Prod account

## Security Notes

- The API token is stored as a GitHub secret and is encrypted
- Never commit the API token to the repository
- Rotate the token periodically for security 