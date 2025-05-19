export interface UniversalProfile {
  address: string;
  name?: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  links?: {
    title: string;
    url: string;
  }[];
  tags?: string[];
}

export interface AvatarMetadata {
  imageUrl: string;
  generatedFrom: string;
  timestamp: number;
  traits?: Record<string, string>;
  isGenerated: boolean;
}

export interface Web3Provider {
  isConnecting: boolean;
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  provider: any | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface IpfsUploadResponse {
  cid: string;
  url: string;
}

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error',
}