// Check if any Sui wallet is installed
export const checkForSlushWallet = async (): Promise<boolean> => {
  // Wait for wallet to be injected
  await new Promise(resolve => setTimeout(resolve, 100));
  return !!(window.suiWallet || window.sui);
};

// Connect to wallet and get address
export const connectWallet = async (): Promise<string> => {
  try {
    // Wait for wallet to be fully injected
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Try both wallet providers
    const wallet = window.suiWallet || window.sui;
    
    if (!wallet) {
      throw new Error('No Sui wallet found. Please install a Sui wallet extension.');
    }

    // Check if already connected
    try {
      const accounts = await wallet.getAccounts();
      if (accounts && accounts.length > 0) {
        return accounts[0];
      }
    } catch (e) {
      // Ignore errors and try connecting
    }

    // Try connecting
    try {
      const { accounts } = await wallet.connect();
      if (accounts && accounts.length > 0) {
        return accounts[0];
      }
    } catch (e) {
      console.error('Connect failed, trying permissions flow:', e);
    }

    // Try permissions flow as fallback
    const hasPermissions = await wallet.hasPermissions();
    if (!hasPermissions) {
      const granted = await wallet.requestPermissions();
      if (!granted) {
        throw new Error('Wallet connection was denied');
      }
    }

    const walletAccounts = await wallet.getAccounts();
    if (!walletAccounts || walletAccounts.length === 0) {
      throw new Error('No accounts found in wallet');
    }

    return walletAccounts[0];
  } catch (error: any) {
    console.error('Wallet connection error:', error);
    throw new Error(error.message || 'Failed to connect wallet');
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