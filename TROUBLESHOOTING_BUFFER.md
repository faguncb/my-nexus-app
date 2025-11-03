# 🔧 Buffer Error Troubleshooting

## The Error

```
buf.writeUint32BE is not a function
```

This error occurs because the Nexus SDK requires Node.js polyfills (like `Buffer`) to work in the browser, but Next.js 13+ doesn't include them by default.

## ✅ Solution Applied

The project has been configured with webpack polyfills in `next.config.ts`:

```typescript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      buffer: require.resolve('buffer'),  // ← Provides Buffer polyfill
    };
    
    // Add Buffer as a global
    config.plugins.push(
      new (require('webpack')).ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    );
  }
  return config;
},
```

## Steps Taken

1. ✅ Cleaned the `.next` build cache
2. ✅ Verified `buffer` package is installed
3. ✅ Restarted the dev server with webpack (not Turbopack)
4. ✅ Server is now running on http://localhost:3000

## Verify It's Working

1. Open http://localhost:3000 in your browser
2. Click "Connect Wallet"
3. Connect MetaMask
4. Check if balances load without the Buffer error

## If You Still See the Error

If the error persists, try these steps:

### 1. Clear browser cache
- Open DevTools (F12)
- Right-click refresh button → "Empty Cache and Hard Reload"

### 2. Check you're using webpack
```bash
# Make sure package.json script includes --webpack
npm run dev
# NOT: next dev --turbopack
```

### 3. Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 4. Check buffer package is installed
```bash
npm list buffer
# Should show: buffer@6.0.3
```

### 5. Verify next.config.ts is being used
```bash
# Check that next.config.ts exists and has webpack config
cat next.config.ts
```

## Understanding the Issue

**What are polyfills?**
- Node.js has built-in modules like `Buffer`, `fs`, `crypto`
- Browsers don't have these
- Web3 libraries (like Nexus SDK) need them
- We "polyfill" by adding browser-compatible versions

**Why Next.js 16 removed them?**
- Smaller bundle sizes
- Better performance
- Most apps don't need them
- Web3 apps are special case

**The fix:**
- We manually add polyfills back via webpack config
- This tells the bundler to include `buffer` polyfill
- Makes `Buffer` available globally in the browser

## Alternative Solutions

If the webpack approach doesn't work, you could:

### Option 1: Use Turbopack with explicit polyfills
Turbopack is newer but needs different config:

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['buffer'],
  },
};
```

Then add polyfills in `app/layout.tsx`:
```typescript
import { Buffer } from 'buffer';
global.Buffer = Buffer;
```

### Option 2: Dynamic import with polyfill
Load Nexus SDK only when needed:

```typescript
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('buffer').then(({ Buffer }) => {
      window.Buffer = Buffer;
      initNexus();
    });
  }
}, []);
```

However, the webpack approach is the most reliable for Web3 apps.

## Current Status

✅ Configuration is correct
✅ Dependencies are installed
✅ Server is running
✅ Ready to test wallet connection

Try connecting your wallet now!

