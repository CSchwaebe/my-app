'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
    injectedWallet,
    metaMaskWallet,
    coinbaseWallet,
    rabbyWallet
  } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  /*
    mainnet,
  polygon,
  optimism,
  */
  arbitrum,
  /*
  arbitrumGoerli
  
  zora,
  goerli,
    */
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    
    arbitrum,
    //arbitrumGoerli

  ],
  [publicProvider()]
);

const projectId = '1c849cc8d568964c99d66922c430ebec';

const { wallets } = getDefaultWallets({
  appName: 'Fantasy Prem',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Fantasy Prem',
};


const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ projectId, chains }),
        rabbyWallet({ chains }),
        coinbaseWallet({ chains, appName: 'Fantasy Prem' }),
      ],
    },
  ]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={lightTheme({
      accentColor: '#38003c',
      accentColorForeground: 'white',
      borderRadius: 'large',
      fontStack: 'rounded',
      overlayBlur: 'small',
    })} chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
