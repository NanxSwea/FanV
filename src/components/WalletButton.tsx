import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const WalletButton: React.FC = () => {
  const { connected, connecting, address, connectWalletAction } = useWallet();

  const shortenAddress = (addr: string): string => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div>
      {!connected ? (
        <button 
          className={`btn-primary flex items-center ${connecting ? 'opacity-70 cursor-not-allowed' : 'wallet-animation'}`}
          onClick={connectWalletAction}
          disabled={connecting}
        >
          <Wallet className="h-5 w-5 mr-2" />
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 border border-indigo-500/30">
          <Wallet className="h-5 w-5 mr-2 text-indigo-400" />
          <span className="text-sm font-mono">{shortenAddress(address)}</span>
        </div>
      )}
    </div>
  );
};

export default WalletButton;