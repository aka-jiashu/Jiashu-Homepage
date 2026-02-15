#!/bin/bash
# Build and Deploy Script

set -euo pipefail

# Load deployment variables from .env (if present)
if [ -f ".env" ]; then
    set -a
    # shellcheck disable=SC1091
    source .env
    set +a
fi

DEPLOY_TARGET="${DEPLOY_TARGET:-}"

if [ -z "$DEPLOY_TARGET" ]; then
    echo "Error: DEPLOY_TARGET is not set."
    echo "Set it in .env, for example:"
    echo "  DEPLOY_TARGET='gz-vps:/opt/1panel/www/sites/aka-jiashu.online/index'"
    exit 1
fi

echo "Building React App..."
npm run build

echo "Building Blog..."
if [ -d "venv" ]; then
    ./venv/bin/mkdocs build
else
    mkdocs build
fi

echo "Deploying to $DEPLOY_TARGET..."
rsync -avz --delete dist/ "$DEPLOY_TARGET"

echo "Deployment Complete!"
