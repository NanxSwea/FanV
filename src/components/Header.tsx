import React from 'react';
import { Users } from 'lucide-react';
import ConnectWallet from './ConnectWallet';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  account: string | null;
  connectionStatus: ConnectionStatus;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({
  account,
  connectionStatus,
  onConnect,
  onDisconnect
}) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white bg-opacity-80 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 text-white p-2 rounded-md">
            <Users size={24} />
          </div>
          <h1 className="text-xl font-bold text-neutral-800">
            PersonaGrid
          </h1>
        </div>
        
        <ConnectWallet
          account={account}
          connectionStatus={connectionStatus}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      </div>
    </header>
  );
};

export default Header;