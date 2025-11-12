#!/bin/bash
echo "🚀 Bootstrapping TinyPage application..."

# Check if we can enable corepack
if command -v corepack >/dev/null 2>&1; then
    echo "📦 Enabling corepack..."
    corepack enable 2>/dev/null || echo "⚠️  Could not enable corepack, trying alternatives..."
    
    if command -v pnpm >/dev/null 2>&1; then
        echo "✅ pnpm is now available"
        pnpm install
        pnpm run build
        echo "✅ Setup complete! Run 'pnpm dev' to start"
        exit 0
    fi
fi

# Fallback to npm
echo "⚠️  Using npm fallback..."
if command -v npm >/dev/null 2>&1; then
    npm install
    npm run build  
    echo "✅ Setup complete! Run 'npm run dev' to start"
else
    echo "❌ Neither pnpm nor npm found. Please install Node.js"
    exit 1
fi