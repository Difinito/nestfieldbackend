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

# Create prisma directory if it doesn't exist
mkdir -p prisma

# Check if schema.prisma exists
if [ ! -f "prisma/schema.prisma" ]; then
  echo "Error: schema.prisma not found. This will cause Prisma to fail."
  exit 1
fi

# Generate Prisma client with debugging information
echo "Generating Prisma client..."
npx prisma generate --schema=./prisma/schema.prisma

# Verify the generated client exists - check both potential locations
if [ -d "node_modules/.prisma/client" ]; then
  echo "Prisma client successfully generated at node_modules/.prisma/client"
  ls -la node_modules/.prisma/client
elif [ -d "node_modules/@prisma/client" ]; then
  echo "Prisma client successfully generated at node_modules/@prisma/client"
  ls -la node_modules/@prisma/client
else
  echo "Error: Prisma client generation may have failed. Directory not found."
  echo "Attempting to reinstall @prisma/client..."
  npm install @prisma/client --legacy-peer-deps --no-audit
  
  # Generate Prisma client again
  npx prisma generate --schema=./prisma/schema.prisma
fi

# Copy the schema.prisma file to the dist directory for runtime access
mkdir -p dist/prisma
cp prisma/schema.prisma dist/prisma/

# Build the app
npm run build 