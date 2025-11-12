const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

console.log('🔧 Installing pnpm...');

try {
  // Method 1: Try corepack
  console.log('Trying corepack...');
  execSync('corepack enable', { stdio: 'inherit' });
  execSync('corepack prepare pnpm@latest --activate', { stdio: 'inherit' });
  console.log('✅ pnpm installed via corepack');
} catch (error) {
  try {
    // Method 2: Try npm
    console.log('Trying npm install...');
    execSync('npm install -g pnpm', { stdio: 'inherit' });
    console.log('✅ pnpm installed via npm');
  } catch (error2) {
    console.log('❌ Failed to install pnpm. Please install manually.');
    console.log('Run one of these commands:');
    console.log('1. corepack enable && corepack prepare pnpm@latest --activate');
    console.log('2. npm install -g pnpm');
    console.log('3. curl -fsSL https://get.pnpm.io/install.sh | sh -');
    process.exit(1);
  }
}