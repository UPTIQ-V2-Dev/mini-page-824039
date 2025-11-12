# PNPM Setup Fix

## Issue
You're getting `spawn pnpm ENOENT` error because pnpm is not installed in your environment.

## Quick Fix (Recommended)
Use npm instead of pnpm - it's already working:

```bash
npm run force-npm
```

This will install dependencies and build the project using npm.

## Install pnpm (Choose one method)

### Method 1: Using corepack (Recommended)
```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

### Method 2: Using npm
```bash
npm install -g pnpm
pnpm install
```

### Method 3: Using the project script
```bash
npm run install-pnpm
```

### Method 4: Using curl
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc  # or restart terminal
pnpm install
```

## After pnpm is installed
```bash
pnpm install && pnpm run build
```

## Verify installation
```bash
pnpm --version
```

## Project Scripts Available
- `npm run force-npm` - Use npm instead of pnpm
- `npm run install-pnpm` - Auto-install pnpm
- `npm run setup` - Install with npm and build
- `pnpm install` - Install with pnpm (once pnpm is available)
- `pnpm run build` - Build with pnpm

## Why this happened
The project was configured for pnpm but your environment doesn't have pnpm installed. This is common in containers or CI environments.

Both npm and pnpm will work fine for this React project - the login page implementation is complete and ready!