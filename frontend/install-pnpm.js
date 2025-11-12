const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔧 Setting up package manager...');

function checkPnpmAvailable() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function installPnpm() {
  const methods = [
    {
      name: 'corepack',
      commands: [
        'corepack enable',
        'corepack prepare pnpm@latest --activate'
      ]
    },
    {
      name: 'npm global install',
      commands: ['npm install -g pnpm']
    }
  ];

  for (const method of methods) {
    try {
      console.log(`Trying ${method.name}...`);
      for (const cmd of method.commands) {
        execSync(cmd, { stdio: 'inherit' });
      }
      
      if (checkPnpmAvailable()) {
        console.log(`✅ pnpm installed via ${method.name}`);
        return true;
      }
    } catch (error) {
      console.log(`❌ ${method.name} failed`);
    }
  }
  return false;
}

// Check if pnpm is already available
if (checkPnpmAvailable()) {
  console.log('✅ pnpm is already available');
} else {
  console.log('⚠️  pnpm not found, attempting to install...');
  
  if (!installPnpm()) {
    console.log('');
    console.log('❌ Could not install pnpm automatically.');
    console.log('');
    console.log('🔧 MANUAL INSTALLATION OPTIONS:');
    console.log('1. corepack enable && corepack prepare pnpm@latest --activate');
    console.log('2. npm install -g pnpm');
    console.log('3. curl -fsSL https://get.pnpm.io/install.sh | sh -');
    console.log('');
    console.log('🚀 ALTERNATIVE: Use npm instead:');
    console.log('   npm run force-npm');
    console.log('');
    process.exit(1);
  }
}

// Install dependencies if pnpm is available
if (checkPnpmAvailable()) {
  console.log('📦 Installing dependencies with pnpm...');
  try {
    execSync('pnpm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
    console.log('🚀 You can now run: pnpm dev');
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    console.log('Try running: npm run force-npm');
    process.exit(1);
  }
}