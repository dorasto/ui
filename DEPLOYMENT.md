# Docker Deployment Guide

This guide explains how to deploy the latest-ui project using Docker and GitHub Container Registry (GHCR).

## Prerequisites

- Docker and Docker Compose installed on your server
- GitHub account with access to this repository
- Ubuntu ARM server for deployment

## Architecture Overview

- **Build**: GitHub Actions builds ARM64 Docker images on push to `master`/`main`
- **Registry**: Images are stored in GitHub Container Registry (GHCR)
- **Deploy**: Pull and run images using Docker Compose on your server

## Local Development with Docker

### Build the Docker image locally

```bash
bun run docker:build
```

### Run the Docker container locally

```bash
# Create a .env file first (copy from .env.example)
cp .env.example .env

# Run the container
bun run docker:run
```

Or use Docker Compose:

```bash
docker-compose up
```

## GitHub Actions Setup

The GitHub Actions workflow (`.github/workflows/docker-build.yml`) automatically:

1. Builds a Docker image for ARM64 architecture on native ARM runners
2. Pushes to GHCR on every push to `master`/`main` branch
3. Creates version tags based on git tags

The workflow uses `ubuntu-24.04-arm` runners for native ARM builds, which is faster and more efficient than cross-compilation.

### Making the Image Public (Optional)

By default, GHCR images are private. To make it public:

1. Go to your repository on GitHub
2. Click "Packages" in the right sidebar
3. Click on the `latest-ui` package
4. Click "Package settings"
5. Scroll down and click "Change visibility"
6. Select "Public"

## Server Deployment

### 1. Authenticate with GHCR

On your Ubuntu ARM server:

```bash
# Create a GitHub Personal Access Token with read:packages scope
# Then login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

### 2. Create Environment File

```bash
# Create a .env file with your configuration
cat > .env << EOF
PORT=3000
DOMAIN=yourdomain.com
NODE_ENV=production
EOF
```

### 3. Create docker-compose.yml

The `docker-compose.yml` is already in the repository. You can modify it or use as-is.

### 4. Pull and Run

```bash
# Pull the latest image
docker-compose pull

# Start the service
docker-compose up -d

# View logs
docker-compose logs -f latest-ui

# To stop the service
docker-compose down
```

### 5. Updates

When a new version is pushed to GitHub, the image is automatically built and pushed to GHCR. To update your deployment:

```bash
# Pull the latest image and restart
docker-compose pull && docker-compose up -d

# Or use the one-liner
docker-compose pull && docker-compose down && docker-compose up -d
```

## Environment Variables

Configure these in your `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port the server listens on | `3000` |
| `DOMAIN` | Your domain name | `localhost` |
| `NODE_ENV` | Node environment | `production` |

## Nginx Reverse Proxy (Optional)

If you want to use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Troubleshooting

### Check container logs

```bash
docker-compose logs -f
```

### Check container status

```bash
docker-compose ps
```

### Restart the service

```bash
docker-compose restart
```

### Rebuild and restart

```bash
docker-compose up -d --build
```

### Access container shell

```bash
docker-compose exec latest-ui sh
```

## Production Checklist

- [ ] Set appropriate environment variables in `.env`
- [ ] Configure domain/DNS settings
- [ ] Set up SSL/TLS (use Certbot or Cloudflare)
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test application thoroughly
- [ ] Set up health checks

## Security Notes

1. Never commit `.env` files to git
2. Use GitHub Secrets for sensitive data in workflows
3. Keep your Personal Access Token secure
4. Regularly update dependencies and base images
5. Use specific image tags instead of `latest` in production

## Resources

- [TanStack Start Hosting Guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
