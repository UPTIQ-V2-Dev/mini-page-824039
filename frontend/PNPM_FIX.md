# 🔧 PNPM Error Fix - Complete Solution

## Problem
```
pnpm failed: spawn pnpm ENOENT. Stack: Error: spawn pnpm ENOENT
```

This error occurs because pnpm is not installed or not in the system PATH.

## ✅ Immediate Solutions (Choose One)

### Solution 1: Use corepack (Recommended - Node 16.10+)
```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

### Solution 2: Install pnpm via npm
```bash
npm install -g pnpm
pnpm install  
pnpm dev
```

### Solution 3: Use official installer
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
# Restart terminal or:
source ~/.bashrc  # or ~/.zshrc
pnpm install
pnpm dev
```

### Solution 4: Use npm instead (Fallback)
```bash
npm install
npm run dev
npm run build
```

### Solution 5: Automated setup
```bash
# Run our setup script
node npm-setup.js

# Or use setup scripts
chmod +x setup.sh && ./setup.sh    # Unix/Linux/macOS
setup.bat                           # Windows
```

## 🎯 Quick Fix Commands

**If you just want to get running immediately:**
```bash
# Method A: Enable corepack (built into Node.js)
corepack enable && corepack prepare pnpm@latest --activate

# Method B: Install with npm
npm install -g pnpm

# Method C: Use npm instead
npm install && npm run dev
```

## 🔍 Why This Happens

1. **pnpm not installed** - pnpm is not a default Node.js package
2. **PATH issues** - pnpm installed but not in system PATH  
3. **Permission issues** - Global install permissions
4. **Corepack disabled** - Node.js corepack not enabled

## 🚀 After Installation

Once pnpm is working:
```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
```

## 📝 Environment Variables

Create `.env` file:
```env
VITE_USE_MOCK_DATA=true
```

## 🎊 Success Indicators

You'll know it worked when:
- ✅ No "command not found" errors
- ✅ Dependencies install successfully  
- ✅ Development server starts
- ✅ App loads at http://localhost:5173

## 🆘 Still Having Issues?

1. **Check Node.js version**: `node --version` (need 16.10+ for corepack)
2. **Check npm**: `npm --version`
3. **Clear cache**: `npm cache clean --force`
4. **Try different terminal/shell**
5. **Restart terminal after pnpm installation**

## 💡 Pro Tips

- **Use corepack** - It's the official way (Node 16.10+)
- **Avoid sudo** - Don't use sudo with npm install -g
- **Check PATH** - Ensure pnpm is in your PATH
- **Restart terminal** - After global installations

---

**Need help?** The application will work with either pnpm or npm!