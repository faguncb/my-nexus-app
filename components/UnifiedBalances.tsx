// components/UnifiedBalances.tsx
'use client';
import { useNexus } from './NexusProvider';
import { RefreshCw, Coins } from 'lucide-react';

export function UnifiedBalances() {
    const { balances, isLoading, refresh } = useNexus();

    if (isLoading) return <div>Loading balances... 🔄</div>;

    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Balances</h2>
                <button onClick={refresh} className="flex gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>
            <div className="grid gap-4">
                {balances.map((b: any, i: number) => (
                    <div key={i} className="p-4 border rounded-lg">
                        <strong>{b.chainName}</strong> - {b.tokenSymbol}: **{b.formattedAmount}**
                    </div>
                ))}
                {balances.length === 0 && <p>Add test tokens! 💰</p>}
            </div>
        </div>
    );
}