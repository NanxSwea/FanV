import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { checkForSlushWallet, connectWallet } from '../utils/slushWallet';

type WalletContextType = {
  connected: boolean;
  connecting: boolean;
  address: string;
  suiClient: SuiClient | null;
  connectWalletAction: () => Promise<void>;
  mintNFT: (name: string, description: string, imageUrl: string) => Promise<string | null>;
  getNFTs: () => Promise<any[]>;
};

const defaultContext: WalletContextType = {
  connected: false,
  connecting: false,
  address: '',
  suiClient: null,
  connectWalletAction: async () => {},
  mintNFT: async () => null,
  getNFTs: async () => [],
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState('');
  const [suiClient, setSuiClient] = useState<SuiClient | null>(null);

  useEffect(() => {
    // Initialize Sui client
    const client = new SuiClient({ url: getFullnodeUrl('devnet') });
    setSuiClient(client);

    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      try {
        const hasWallet = await checkForSlushWallet();
        if (hasWallet) {
          const walletAddress = await connectWallet();
          if (walletAddress) {
            setAddress(walletAddress);
            setConnected(true);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    // Add a small delay to ensure wallet is injected
    setTimeout(checkWalletConnection, 500);
  }, []);

  const connectWalletAction = async () => {
    try {
      setConnecting(true);
      const hasWallet = await checkForSlushWallet();
      
      if (!hasWallet) {
        alert('Please install a Sui wallet extension to continue.');
        return;
      }
      
      const walletAddress = await connectWallet();
      if (walletAddress) {
        setAddress(walletAddress);
        setConnected(true);
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      alert(error.message || 'Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  const mintNFT = async (name: string, description: string, imageUrl: string): Promise<string | null> => {
    if (!connected || !suiClient) {
      alert('Please connect your wallet first');
      return null;
    }

    try {
      // Simulate NFT minting
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockObjectId = `0x${Math.floor(Math.random() * 10000000000000000).toString(16)}`;
      return mockObjectId;
    } catch (error) {
      console.error('Error minting NFT:', error);
      return null;
    }
  };

  const getNFTs = async (): Promise<any[]> => {
    if (!connected || !suiClient || !address) {
      return [];
    }

    try {
      return [
        {
          id: `0x${Math.floor(Math.random() * 10000000000000000).toString(16)}`,
          name: 'Fan Badge',
          description: 'Official FanVerse member',
          imageUrl: 'https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg',
        }
      ];
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  };

  const value = {
    connected,
    connecting,
    address,
    suiClient,
    connectWalletAction,
    mintNFT,
    getNFTs,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};