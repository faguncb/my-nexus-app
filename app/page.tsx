'use client';
import { Web3Provider } from '@/components/Web3Provider';
import { NexusProvider } from '@/components/NexusProvider';
import { WalletConnection } from '@/components/WalletConnection';
import { UnifiedBalances } from '@/components/UnifiedBalances';

export default function Home() {
    return (
        <Web3Provider>
            <NexusProvider>
                <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
                    <header className="max-w-4xl mx-auto flex justify-between mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            🌐 Nexus Balances
                        </h1>
                        <WalletConnection />
                    </header>
                    <main className="max-w-4xl mx-auto">
                        <UnifiedBalances />
                    </main>
                </div>
            </NexusProvider>
        </Web3Provider>
    );
}