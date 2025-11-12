#!/bin/bash

echo "🚀 Setting up TinyPage application..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if pnpm is installed
if ! command_exists pnpm; then
    echo "⚠️  pnpm not found. Installing pnpm..."
    
    # Method 1: Try installing with corepack (Node 16.10+)
    if command_exists corepack; then
        echo "📦 Using corepack to install pnpm..."
        corepack enable
        corepack prepare pnpm@latest --activate
    # Method 2: Try npm global install
    elif command_exists npm; then
        echo "📦 Using npm to install pnpm globally..."
        npm install -g pnpm
    # Method 3: Try official installer
    elif command_exists curl; then
        echo "📦 Using official installer..."
        curl -fsSL https://get.pnpm.io/install.sh | sh -
        export PATH="$HOME/.local/share/pnpm:$PATH"
    else
        echo "❌ Cannot install pnpm. Please install Node.js and npm first."
        echo "💡 Or use npm directly: npm install && npm run dev"
        exit 1
    fi
fi

# Verify pnpm is now available
if ! command_exists pnpm; then
    echo "⚠️  pnpm installation failed. Falling back to npm..."
    if command_exists npm; then
        echo "📦 Installing dependencies with npm..."
        npm install
        
        echo "🔨 Building the project with npm..."
        npm run build
        
        echo "✅ Setup complete! You can now run 'npm run dev' to start the development server."
    else
        echo "❌ Neither pnpm nor npm are available. Please install Node.js first."
        exit 1
    fi
else
    # Install dependencies with pnpm
    echo "📦 Installing dependencies with pnpm..."
    pnpm install

    # Build the project
    echo "🔨 Building the project with pnpm..."
    pnpm run build

    echo "✅ Setup complete! You can now run 'pnpm dev' to start the development server."
fi

echo ""
echo "🎯 Quick commands:"
echo "   Start dev server: pnpm dev (or npm run dev)"
echo "   Build for production: pnpm build (or npm run build)"
echo "   Run tests: pnpm test (or npm run test)"
echo ""