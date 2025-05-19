import { useState, useEffect, useCallback } from 'react';
import { ConnectionStatus, UniversalProfile } from '../types';
import { 
  connectWallet,
  fetchUniversalProfile,
  mockConnectWallet, 
  mockFetchUniversalProfile 
} from '../services/luksoService';

// Flag for development mode to use mock data
const DEV_MODE = true;

/**
 * React hook for LUKSO wallet connection and profile data
 */
export const useLukso = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const [profileData, setProfileData] = useState<UniversalProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Connect to LUKSO wallet
  const connect = useCallback(async () => {
    try {
      setConnectionStatus(ConnectionStatus.CONNECTING);
      setError(null);
      
      // Use mock or real implementation based on DEV_MODE
      const address = DEV_MODE 
        ? await mockConnectWallet()
        : await connectWallet();
      
      setAccount(address);
      setConnectionStatus(ConnectionStatus.CONNECTED);
      
      return address;
    } catch (err: any) {
      setConnectionStatus(ConnectionStatus.ERROR);
      setError(err.message || 'Failed to connect wallet');
      return null;
    }
  }, []);
  
  // Disconnect from wallet
  const disconnect = useCallback(() => {
    setAccount(null);
    setProfileData(null);
    setConnectionStatus(ConnectionStatus.DISCONNECTED);
  }, []);
  
  // Fetch profile data
  const fetchProfile = useCallback(async (address: string) => {
    try {
      // Use mock or real implementation based on DEV_MODE
      const profile = DEV_MODE
        ? await mockFetchUniversalProfile(address)
        : await fetchUniversalProfile(address);
      
      setProfileData(profile);
      return profile;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile data');
      return null;
    }
  }, []);
  
  // Fetch profile when account changes
  useEffect(() => {
    if (account && connectionStatus === ConnectionStatus.CONNECTED) {
      fetchProfile(account);
    }
  }, [account, connectionStatus, fetchProfile]);
  
  return {
    account,
    connectionStatus,
    profileData,
    error,
    connect,
    disconnect,
    fetchProfile
  };
};

export default useLukso;