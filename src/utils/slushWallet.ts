// Check if any Sui wallet is installed (not just Slush wallet)
export const checkForSlushWallet = async (): Promise<boolean> => {
  return !!window.suiWallet || !!window.sui;
};

// Connect to wallet and get address
export const connectWallet = async (): Promise<string> => {
  // Check for any Sui wallet
  const wallet = window.suiWallet || window.sui;
  
  if (!wallet) {
    throw new Error('No Sui wallet found');
  }

  try {
    // First try to connect
    const { accounts } = await wallet.connect();
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }

    // Fallback to manual permission flow if connect doesn't work
    const hasPermissions = await wallet.hasPermissions();
    if (!hasPermissions) {
      const granted = await wallet.requestPermissions();
      if (!granted) {
        throw new Error('User denied wallet connection');
      }
    }

    const walletAccounts = await wallet.getAccounts();
    if (walletAccounts.length === 0) {
      throw new Error('No accounts found in wallet');
    }

    return walletAccounts[0];
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

// Add type definitions for Sui wallet
declare global {
  interface Window {
    suiWallet?: {
      hasPermissions: () => Promise<boolean>;
      requestPermissions: () => Promise<boolean>;
      getAccounts: () => Promise<string[]>;
      network: string;
      connect: () => Promise<{ accounts: string[] }>;
    };
    sui?: {
      hasPermissions: () => Promise<boolean>;
      requestPermissions: () => Promise<boolean>;
      getAccounts: () => Promise<string[]>;
      network: string;
      connect: () => Promise<{ accounts: string[] }>;
    };
  }
}