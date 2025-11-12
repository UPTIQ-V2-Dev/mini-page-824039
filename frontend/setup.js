#!/usr/bin/env node

const { execSync, exec } = require('child_process');
const { existsSync } = require('fs');

console.log('🚀 Setting up TinyPage application...\n');

function commandExists(command) {
    try {
        execSync(`${process.platform === 'win32' ? 'where' : 'which'} ${command}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function runCommand(command, description) {
    console.log(`📦 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`❌ Failed: ${error.message}`);
        return false;
    }
}

async function setup() {
    // Check if pnpm is installed
    if (!commandExists('pnpm')) {
        console.log('⚠️  pnpm not found. Installing pnpm...\n');
        
        let pnpmInstalled = false;
        
        // Method 1: Try corepack
        if (commandExists('corepack')) {
            console.log('📦 Using corepack to install pnpm...');
            if (runCommand('corepack enable', 'Enabling corepack')) {
                pnpmInstalled = runCommand('corepack prepare pnpm@latest --activate', 'Preparing pnpm');
            }
        }
        
        // Method 2: Try npm global install
        if (!pnpmInstalled && commandExists('npm')) {
            console.log('📦 Using npm to install pnpm globally...');
            pnpmInstalled = runCommand('npm install -g pnpm', 'Installing pnpm with npm');
        }
        
        if (!pnpmInstalled) {
            console.log('⚠️  pnpm installation failed. Using npm instead...\n');
            
            if (commandExists('npm')) {
                const success = runCommand('npm install', 'Installing dependencies with npm') &&
                              runCommand('npm run build', 'Building project with npm');
                
                if (success) {
                    console.log('\n✅ Setup complete! You can now run:');
                    console.log('   npm run dev    (start development server)');
                    console.log('   npm run build  (build for production)');
                    console.log('   npm test       (run tests)\n');
                }
                return;
            } else {
                console.error('❌ Neither pnpm nor npm are available. Please install Node.js first.');
                process.exit(1);
            }
        }
    }
    
    // Use pnpm if available
    if (commandExists('pnpm')) {
        const success = runCommand('pnpm install', 'Installing dependencies with pnpm') &&
                       runCommand('pnpm run build', 'Building project with pnpm');
        
        if (success) {
            console.log('\n✅ Setup complete! You can now run:');
            console.log('   pnpm dev       (start development server)');
            console.log('   pnpm build     (build for production)');
            console.log('   pnpm test      (run tests)\n');
        }
    }
}

setup().catch(error => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
});