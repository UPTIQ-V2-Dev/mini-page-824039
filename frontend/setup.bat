@echo off
echo 🚀 Setting up TinyPage application...

:: Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  pnpm not found. Installing pnpm...
    
    :: Method 1: Try installing with corepack
    where corepack >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo 📦 Using corepack to install pnpm...
        corepack enable
        corepack prepare pnpm@latest --activate
    ) else (
        :: Method 2: Try npm global install
        where npm >nul 2>nul
        if %ERRORLEVEL% EQU 0 (
            echo 📦 Using npm to install pnpm globally...
            npm install -g pnpm
        ) else (
            echo ❌ Cannot install pnpm. Please install Node.js and npm first.
            echo 💡 Or use npm directly: npm install && npm run dev
            pause
            exit /b 1
        )
    )
)

:: Verify pnpm is now available
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  pnpm installation failed. Falling back to npm...
    where npm >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo 📦 Installing dependencies with npm...
        npm install
        
        echo 🔨 Building the project with npm...
        npm run build
        
        echo ✅ Setup complete! You can now run 'npm run dev' to start the development server.
    ) else (
        echo ❌ Neither pnpm nor npm are available. Please install Node.js first.
        pause
        exit /b 1
    )
) else (
    :: Install dependencies with pnpm
    echo 📦 Installing dependencies with pnpm...
    pnpm install

    :: Build the project
    echo 🔨 Building the project with pnpm...
    pnpm run build

    echo ✅ Setup complete! You can now run 'pnpm dev' to start the development server.
)

echo.
echo 🎯 Quick commands:
echo    Start dev server: pnpm dev (or npm run dev)
echo    Build for production: pnpm build (or npm run build)
echo    Run tests: pnpm test (or npm run test)
echo.
pause