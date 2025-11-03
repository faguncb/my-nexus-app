// components/NexusProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAccount } from 'wagmi';

const NexusContext = createContext<any>(undefined);

export function NexusProvider({ children }: { children: ReactNode }) {
    const { isConnected } = useAccount();
    const [sdk, setSdk] = useState<any>(null);
    const [balances, setBalances] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isConnected && !sdk) initNexus();
    }, [isConnected]);

    const initNexus = async () => {
        setIsLoading(true);
        const { NexusSDK } = await import('@avail-project/nexus');
        const nexus = new NexusSDK({ network: 'testnet' });  // 🧪 Test mode!
        await nexus.initialize(window.ethereum);  // 🔗 Connects to MetaMask

        // Auto-approve for demo (real app: ask user)
        nexus.setOnAllowanceHook(({ allow }) => allow(['min']));
        nexus.setOnIntentHook(({ allow }) => allow());

        setSdk(nexus);
        getBalances(nexus);
        setIsLoading(false);
    };

    const getBalances = async (nexus: any) => {
        const unified = await nexus.getUnifiedBalances();  // ✨ MAGIC: All chains!
        setBalances(unified);
    };

    return (
        <NexusContext.Provider value={{ balances, isLoading, sdk, refresh: () => getBalances(sdk) }}>
            {children}
        </NexusContext.Provider>
    );
}

export const useNexus = () => useContext(NexusContext)!;