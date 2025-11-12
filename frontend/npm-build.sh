#!/bin/bash

echo "🔧 Building with npm instead of pnpm..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"
echo "💡 To use pnpm, install it with: npm install -g pnpm"