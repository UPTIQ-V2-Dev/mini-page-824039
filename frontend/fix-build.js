#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Fixing build process...');

try {
  // Check if pnpm is available
  execSync('pnpm --version', { stdio: 'ignore' });
  console.log('✅ pnpm is available, using pnpm build');
  execSync('pnpm install && pnpm run build', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  pnpm not found, using npm instead');
  
  // Check if node_modules exists, if not install
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies with npm...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  console.log('🔨 Building with npm...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully with npm');
  console.log('💡 To use pnpm in the future, install it with: npm install -g pnpm');
}