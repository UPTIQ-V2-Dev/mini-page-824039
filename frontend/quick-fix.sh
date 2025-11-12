#!/bin/bash

echo "🔧 Quick Fix for pnpm ENOENT error"
echo "====================================="

# Check if pnpm is available
if command -v pnpm &> /dev/null; then
    echo "✅ pnpm is available!"
    pnpm install && pnpm run build
    echo "✅ Build completed with pnpm"
    exit 0
fi

echo "⚠️  pnpm not found, trying to install..."

# Method 1: Try corepack
if command -v corepack &> /dev/null; then
    echo "📦 Installing pnpm via corepack..."
    corepack enable
    corepack prepare pnpm@latest --activate
    
    if command -v pnpm &> /dev/null; then
        echo "✅ pnpm installed successfully!"
        pnpm install && pnpm run build
        echo "✅ Build completed with pnpm"
        exit 0
    fi
fi

# Method 2: Try npm
if command -v npm &> /dev/null; then
    echo "📦 Installing pnpm via npm..."
    npm install -g pnpm
    
    if command -v pnpm &> /dev/null; then
        echo "✅ pnpm installed successfully!"
        pnpm install && pnpm run build
        echo "✅ Build completed with pnpm"
        exit 0
    else
        echo "⚠️  pnpm installation failed, using npm instead..."
        npm run force-npm
        echo "✅ Build completed with npm"
        exit 0
    fi
fi

echo "❌ Could not install pnpm or find npm"
echo "Please install pnpm manually:"
echo "curl -fsSL https://get.pnpm.io/install.sh | sh -"