# TinyPage - Simple. Beautiful. Powerful.

A modern, responsive web application built with React 19, TypeScript, and Tailwind CSS.

## ⚠️ PNPM Error? Quick Fix!

If you see `pnpm failed: spawn pnpm ENOENT`, run ONE of these:

```bash
# Option 1: Enable corepack (recommended)
corepack enable && corepack prepare pnpm@latest --activate

# Option 2: Install via npm  
npm install -g pnpm

# Option 3: Use our fix script
chmod +x fix-pnpm.sh && ./fix-pnpm.sh

# Option 4: Use npm instead
npm install && npm run dev
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

#### Option 1: Using the automated setup scripts (recommended)

**Unix/Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```cmd
setup.bat
```

**Cross-platform (Node.js):**
```bash
node setup.js
```

#### Option 2: Manual installation

1. **Install pnpm** (if not already installed):
   ```bash
   # Using corepack (Node 16.10+)
   corepack enable
   corepack prepare pnpm@latest --activate
   
   # OR using npm
   npm install -g pnpm
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

#### Option 3: Using npm (if pnpm is not available)
```bash
npm install
npm run dev
npm run build
```

## 🎯 Features

- ✅ **Fully Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Dark/Light Theme Toggle** - System preference detection
- ✅ **Modern React 19** - Latest React features and patterns
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Shadcn/UI Components** - Beautiful, accessible components
- ✅ **React Router** - Client-side routing
- ✅ **React Query** - Server state management
- ✅ **Mock API Support** - Development without backend

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── features/       # Feature-specific components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/            # Shadcn/UI components
├── data/              # Mock data
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── pages/             # Page components
├── services/          # API service functions
├── styles/            # CSS files
└── types/             # TypeScript type definitions
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Set to "true" to use mock data instead of real API calls
VITE_USE_MOCK_DATA=true
```

## 📱 Pages

1. **Landing Page** (`/`) - Hero section with features showcase
2. **About Page** (`/about`) - Company information and mission
3. **Contact Page** (`/contact`) - Contact form and information

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm eslint` - Run ESLint
- `pnpm prettier` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Run tests with coverage

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component library
- **React Router DOM** - Routing
- **React Query** - Data fetching
- **next-themes** - Theme management
- **Lucide React** - Icons

## 🚦 Troubleshooting

### pnpm not found error

If you get a "spawn pnpm ENOENT" error, here are several solutions:

#### Solution 1: Using corepack (Recommended for Node 16.10+)
```bash
# Enable corepack (comes with Node.js)
corepack enable

# Prepare pnpm 
corepack prepare pnpm@latest --activate

# Now you can use pnpm
pnpm install
pnpm dev
```

#### Solution 2: Install pnpm globally via npm
```bash
npm install -g pnpm
pnpm install
pnpm dev
```

#### Solution 3: Use the official installer
```bash
# On Unix/Linux/macOS
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Restart your terminal or run:
source ~/.bashrc  # or ~/.zshrc

pnpm install
pnpm dev
```

#### Solution 4: Use npm instead (fallback)
```bash
npm install
npm run dev
npm run build
```

#### Solution 5: Using npx (temporary)
```bash
npx pnpm install
npx pnpm dev
```

### Build Issues

If the build fails, try:
1. Delete `node_modules` and reinstall dependencies
2. Check Node.js version (requires 18+)
3. Ensure all environment variables are set

## 📄 License

This project is licensed under the MIT License.