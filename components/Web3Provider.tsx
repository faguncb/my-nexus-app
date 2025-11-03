// components/Web3Provider.tsx
'use client';  // ✅ Tells Next.js: "Run in browser only!"

import { WagmiProvider, createConfig, http } from 'wagmi';
import {
    sepolia, baseSepolia, polygonAmoy, arbitrumSepolia, optimismSepolia
} from 'wagmi/chains';  // Testnets!
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const config = createConfig(
    getDefaultConfig({
        appName: 'My Nexus App',  // Your app name!
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,  // From prereq
        chains: [sepolia, baseSepolia, polygonAmoy, arbitrumSepolia, optimismSepolia],  // 5 chains
    })
);

export function Web3Provider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
}