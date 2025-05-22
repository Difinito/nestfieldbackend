#!/bin/bash

# Display npm and Node versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Clean node_modules
rm -rf node_modules
rm -rf .next

# Clean npm cache
npm cache clean --force

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps --no-audit --loglevel verbose

# Force install the correct schedule version
npm install @nestjs/schedule@3.0.3 --legacy-peer-deps --no-audit --loglevel verbose

# Generate Prisma client
npx prisma generate

# Build the app
npm run build 