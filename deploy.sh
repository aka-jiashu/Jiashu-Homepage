#!/bin/bash
# Build and Deploy Script

VPS_TARGET="vps-us:/usr/share/nginx/html"

echo "Building React App..."
npm run build

echo "Building Blog..."
if [ -d "venv" ]; then
    ./venv/bin/mkdocs build
else
    mkdocs build
fi

echo "Deploying to $VPS_TARGET..."
rsync -avz --delete dist/ $VPS_TARGET

echo "Deployment Complete!"
