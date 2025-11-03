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

    const getBalances = async (nexus: any) => {
        try {
            const unified = await nexus.getUnifiedBalances();  // ✨ MAGIC: All chains!
            setBalances(unified);
        } catch (error) {
            console.error('Error fetching balances:', error);
            setBalances([]);
        }
    };

    const initNexus = async () => {
        setIsLoading(true);
        try {
            const { NexusSDK } = await import('@avail-project/nexus');
            const nexus = new NexusSDK({ network: 'testnet' });  // 🧪 Test mode!
            await nexus.initialize(window.ethereum);  // 🔗 Connects to MetaMask

            // Auto-approve for demo (real app: ask user)
            nexus.setOnAllowanceHook(({ allow }) => allow(['min']));
            nexus.setOnIntentHook(({ allow }) => allow());

            setSdk(nexus);
            await getBalances(nexus);
        } catch (error) {
            console.error('Error initializing Nexus SDK:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected && !sdk) {
            initNexus();
        }
    }, [isConnected]);

    const refresh = () => {
        if (sdk) {
            getBalances(sdk);
        }
    };

    return (
        <NexusContext.Provider value={{ balances, isLoading, sdk, refresh }}>
            {children}
        </NexusContext.Provider>
    );
}

export const useNexus = () => useContext(NexusContext)!;