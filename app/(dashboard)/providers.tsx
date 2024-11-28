'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiProvider, useAccount } from 'wagmi';
import { TooltipProvider } from '@/components/ui/tooltip';
import { config } from '../../components/ui/config';
import {
  mainnet,
  sepolia,
  arbitrum,
  baseSepolia,
  arbitrumSepolia,
  Chain
} from 'wagmi/chains';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const projectId = '474ca359092dc34eded94e781bdf7822';

  const metadata = {
    name: 'Admin Dashboard App',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/']
  };

  const chains: readonly [Chain, ...Chain[]] = [
    mainnet,
    sepolia,
    arbitrum,
    baseSepolia,
    arbitrumSepolia
  ];
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
