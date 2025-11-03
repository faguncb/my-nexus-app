# 🌐 Nexus Balances - Multi-Chain Balance Viewer

A beautiful Web3 application that lets you view your cryptocurrency balances across 5 different blockchain networks in one unified interface.

## ✨ Features

- 🔐 **Wallet Connection** - Connect with MetaMask or any Web3 wallet
- 🌐 **Multi-Chain Support** - View balances from Ethereum, Base, Polygon, Arbitrum, and Optimism
- 💰 **Unified Display** - All balances in one clean interface
- 🔄 **Real-time Updates** - Refresh button to get latest balances
- 🎨 **Modern UI** - Beautiful gradient design with Tailwind CSS
- 🧪 **Testnet Safe** - Test with fake tokens only

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Free WalletConnect Project ID (get one at https://cloud.walletconnect.com)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variable
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here" > .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📚 Documentation

This project includes comprehensive beginner-friendly documentation:

- **DOCUMENTATION.md** - Complete step-by-step guide explaining every piece of code
- **QUICK_START.md** - Quick reference for getting started
- **TROUBLESHOOTING_BUFFER.md** - Help with Buffer polyfill issues

## 🛠️ Technologies

**Core:**
- [Next.js 16](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling

**Web3:**
- [Wagmi](https://wagmi.sh) - Ethereum React hooks
- [ConnectKit](https://docs.family.co/connectkit) - Wallet connection UI
- [Nexus SDK](https://github.com/availproject/nexus) - Multi-chain aggregation

**Other:**
- [React Query](https://tanstack.com/query) - Data fetching
- [Lucide React](https://lucide.dev) - Icons

## 📖 Project Structure

```
my-nexus-app/
├── app/
│   ├── page.tsx           # Main page with provider setup
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles
├── components/
│   ├── Web3Provider.tsx   # Web3 configuration
│   ├── NexusProvider.tsx  # Nexus SDK integration
│   ├── WalletConnection.tsx  # Connect wallet button
│   └── UnifiedBalances.tsx   # Balance display
├── next.config.ts         # Webpack polyfill configuration
└── package.json           # Dependencies
```

## 🔧 Configuration

### Why webpack instead of Turbopack?

The `next.config.ts` includes webpack polyfills for Browser compatibility:

```typescript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      buffer: require.resolve('buffer'),  // Critical for Nexus SDK!
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    );
  }
  return config;
}
```

This provides `Buffer` and other Node.js polyfills needed by Web3 libraries.

## 🌊 How It Works

1. User opens the app
2. Clicks "Connect Wallet"
3. Selects MetaMask
4. Nexus SDK fetches balances from all 5 chains
5. Balances displayed in unified interface
6. User can refresh to update

## 📝 Available Scripts

```bash
npm run dev      # Start development server (uses webpack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Important:** Always use `npm run dev` (not `next dev --turbopack`) to ensure webpack polyfills work.

## 🧪 Testnets Used

- **Ethereum**: Sepolia
- **Base**: Sepolia
- **Polygon**: Amoy
- **Arbitrum**: Sepolia
- **Optimism**: Sepolia

## 🎓 Learning Resources

**For complete beginners:**
1. Start with **DOCUMENTATION.md**
2. Read through each component explanation
3. Try modifying the code
4. Check out the linked resources

**Key Concepts:**
- React Context API
- Custom hooks
- Web3 wallet integration
- Multi-chain architecture
- Next.js App Router

## 🐛 Common Issues

### "buf.writeUint32BE is not a function"
See **TROUBLESHOOTING_BUFFER.md** for the solution.

### No balances showing
1. Make sure wallet is connected
2. Get test tokens from faucets
3. Click refresh button

### Wallet connection failing
1. Make sure MetaMask is installed
2. Check that .env.local has correct WalletConnect Project ID
3. Restart the dev server

## 🤝 Contributing

This is a learning project! Feel free to:
- Add features
- Improve documentation
- Fix bugs
- Share your implementations

## 📄 License

MIT License - feel free to use this project for learning and building your own apps!

## 🙏 Acknowledgments

- **Avail Project** for the Nexus SDK
- **ConnectKit** for wallet UI
- **Wagmi** team for excellent Web3 tools
- **Next.js** for the amazing framework

---

**Happy building! 🚀**
