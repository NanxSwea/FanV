// Actual Slush Wallet implementation
declare global {
  interface Window {
    suiWallet?: {
      hasPermissions: () => Promise<boolean>;
      requestPermissions: () => Promise<boolean>;
      getAccounts: () => Promise<string[]>;
      network: string;
      connect: () => Promise<{ accounts: string[] }>;
    };
  }
}

// Check if Slush Wallet extension is installed
export const checkForSlushWallet = async (): Promise<boolean> => {
  return !!window.suiWallet;
};

// Connect to wallet and get address
export const connectWallet = async (): Promise<string> => {
  if (!window.suiWallet) {
    throw new Error('Slush Wallet not installed');
  }

  try {
    // First try to connect
    const { accounts } = await window.suiWallet.connect();
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }

    // Fallback to manual permission flow if connect doesn't work
    const hasPermissions = await window.suiWallet.hasPermissions();
    if (!hasPermissions) {
      const granted = await window.suiWallet.requestPermissions();
      if (!granted) {
        throw new Error('User denied wallet connection');
      }
    }

    const walletAccounts = await window.suiWallet.getAccounts();
    if (walletAccounts.length === 0) {
      throw new Error('No accounts found in wallet');
    }

    return walletAccounts[0];
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};