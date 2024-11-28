import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia, arbitrum, baseSepolia, arbitrumSepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrum, baseSepolia, arbitrumSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
})