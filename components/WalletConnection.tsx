// components/WalletConnection.tsx
'use client';
import { ConnectKitButton } from 'connectkit';
import { Wallet } from 'lucide-react';

export function WalletConnection() {
    return (
        <ConnectKitButton.Custom>
            {({ show }) => (
                <button onClick={show} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Wallet size={20} /> Connect Wallet
                </button>
            )}
        </ConnectKitButton.Custom>
    );
}