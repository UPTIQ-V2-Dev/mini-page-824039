#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');

console.log('🚀 Setting up TinyPage with npm (pnpm fallback)...\n');

// Set environment variable to use mock data
process.env.VITE_USE_MOCK_DATA = 'true';

try {
  console.log('📦 Installing dependencies with npm...');
  execSync('npm install', { stdio: 'inherit', cwd: process.cwd() });
  
  console.log('\n🔨 Building the project...');
  execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });
  
  console.log('\n✅ Setup complete!\n');
  console.log('🎯 Available commands:');
  console.log('   npm run dev      (start development server)');
  console.log('   npm run build    (build for production)');
  console.log('   npm run preview  (preview production build)');
  console.log('   npm test         (run tests)\n');
  
  console.log('💡 To fix pnpm permanently, run one of:');
  console.log('   corepack enable && corepack prepare pnpm@latest --activate');
  console.log('   npm install -g pnpm');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.error('\n🔧 Try manual installation:');
  console.error('   npm install');
  console.error('   npm run build');
  process.exit(1);
}