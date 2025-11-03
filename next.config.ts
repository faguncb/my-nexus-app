import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Webpack configuration for Web3/blockchain compatibility
   * 
   * Why this is needed:
   * - Next.js 16+ removed Node.js polyfills by default
   * - Web3 libraries (Nexus SDK, Wagmi, etc.) need Buffer, crypto, etc.
   * - We provide these polyfills only for client-side code
   * - Turbopack doesn't support this config yet, so we use webpack
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Provide fallbacks for Node.js modules that don't exist in browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Disable server-only modules
        fs: false,
        net: false,
        tls: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        // Keep crypto and buffer, but use browser-compatible versions
        crypto: false,
        buffer: require.resolve('buffer'),  // ← Critical for Nexus SDK!
      };
      
      // Add Buffer as a global variable in the browser
      config.plugins.push(
        new (require('webpack')).ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
