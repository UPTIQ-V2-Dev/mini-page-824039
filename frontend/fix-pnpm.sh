#!/bin/bash

echo "🔧 Fixing pnpm installation..."

# Try to enable corepack first
if command -v corepack >/dev/null 2>&1; then
    echo "📦 Found corepack, enabling..."
    corepack enable
    corepack prepare pnpm@latest --activate
    
    if command -v pnpm >/dev/null 2>&1; then
        echo "✅ pnpm is now available!"
        echo "🚀 Installing dependencies..."
        pnpm install
        echo "✅ Done! You can now run 'pnpm dev'"
        exit 0
    fi
fi

# Try npm global install
if command -v npm >/dev/null 2>&1; then
    echo "📦 Installing pnpm via npm..."
    npm install -g pnpm
    
    if command -v pnpm >/dev/null 2>&1; then
        echo "✅ pnpm installed successfully!"
        echo "🚀 Installing dependencies..."
        pnpm install
        echo "✅ Done! You can now run 'pnpm dev'"
        exit 0
    fi
fi

echo "⚠️  Could not install pnpm automatically."
echo "💡 Please run one of these commands manually:"
echo ""
echo "Option 1 (corepack):"
echo "  corepack enable"
echo "  corepack prepare pnpm@latest --activate"
echo ""  
echo "Option 2 (npm):"
echo "  npm install -g pnpm"
echo ""
echo "Option 3 (use npm instead):"
echo "  npm install && npm run dev"