# CICD Tokowaka Worker - Cloudflare Proxy

This Cloudflare Worker acts as a proxy to serve content from `https://frescopa.aem-screens.net/` when requests come to `cicdtokowaka.aem-screens.net`.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Login to Cloudflare (if not already logged in):**
   ```bash
   npx wrangler login
   ```

## Development

To run the worker locally for development:
```bash
npm run dev
```

This will start a local development server where you can test the worker.

## Deployment

### Deploy to Production
```bash
npm run deploy
```

This will deploy the worker to production and map it to `cicdtokowaka.aem-screens.net`.

### Deploy to Development Environment
```bash
npm run deploy:dev
```

This will deploy to a development environment for testing.

## How it Works

1. Requests come to `cicdtokowaka.aem-screens.net`
2. The Cloudflare Worker intercepts these requests
3. The worker fetches the content from `https://frescopa.aem-screens.net/`
4. The worker returns the content to the client

## Configuration

The worker is configured in `wrangler.toml`:
- **Production environment**: Maps to `cicdtokowaka.aem-screens.net`
- **Development environment**: Uses a development worker name

## Requirements

- Cloudflare account with `aem-screens.net` domain
- Wrangler CLI installed
- Node.js and npm

## Troubleshooting

If you encounter issues:

1. Make sure you're logged into Cloudflare: `npx wrangler whoami`
2. Check if the domain `aem-screens.net` is properly configured in your Cloudflare account
3. Verify the DNS settings for `cicdtokowaka.aem-screens.net`
4. Check the worker logs in the Cloudflare dashboard 