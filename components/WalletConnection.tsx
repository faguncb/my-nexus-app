// components/WalletConnection.tsx
'use client';
import { ConnectKitButton } from 'connectkit';
import { Wallet } from 'lucide-react';

export function WalletConnection() {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => {
                return (
                    <button 
                        onClick={show} 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Wallet size={20} /> 
                        {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
                    </button>
                );
            }}
        </ConnectKitButton.Custom>
    );
}