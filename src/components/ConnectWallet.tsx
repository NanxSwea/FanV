import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { ConnectionStatus } from '../types';
import { formatAddress } from '../utils/helpers';
import Button from './Button';

interface ConnectWalletProps {
  account: string | null;
  connectionStatus: ConnectionStatus;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  account,
  connectionStatus,
  onConnect,
  onDisconnect
}) => {
  const isConnected = connectionStatus === ConnectionStatus.CONNECTED && account;
  const isConnecting = connectionStatus === ConnectionStatus.CONNECTING;
  const hasError = connectionStatus === ConnectionStatus.ERROR;
  
  return (
    <div className="flex items-center gap-2">
      {!isConnected ? (
        <Button
          variant="primary"
          icon={Wallet}
          onClick={onConnect}
          isLoading={isConnecting}
          disabled={isConnecting}
        >
          {isConnecting 
            ? 'Connecting...' 
            : hasError 
              ? 'Retry Connection' 
              : 'Connect Universal Profile'}
        </Button>
      ) : (
        <>
          <div className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
            <span className="text-sm font-medium">{formatAddress(account)}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            icon={LogOut}
            onClick={onDisconnect}
            aria-label="Disconnect wallet"
          >
            Disconnect
          </Button>
        </>
      )}
    </div>
  );
};

export default ConnectWallet;