import { ethers } from 'ethers';
import ERC725js from '@erc725/erc725.js';
import LSP3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import { UniversalProfile, AvatarMetadata } from '../types';
import { LSP3_KEYS, LUKSO_MAINNET_CHAIN_ID } from '../utils/constants';
import { ipfsCidToUrl } from '../utils/helpers';

// interfaces and types for LUKSO-specific functionality
interface EthereumWindow extends Window {
  ethereum?: any;
  lukso?: any;
}

// Get the Ethereum provider from the browser window
const getProvider = async () => {
  const ethereumWindow = window as EthereumWindow;
  
  if (ethereumWindow.lukso) {
    return ethereumWindow.lukso;
  } else if (ethereumWindow.ethereum) {
    return ethereumWindow.ethereum;
  }
  
  throw new Error('No Ethereum provider found. Please install the LUKSO extension or UP Browser.');
};

/**
 * Connect to the LUKSO browser extension or UP Browser
 */
export const connectWallet = async (): Promise<string> => {
  try {
    const provider = await getProvider();
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    
    // Check if we're on LUKSO network
    const chainId = await provider.request({ method: 'eth_chainId' });
    const chainIdDecimal = parseInt(chainId, 16);
    
    if (chainIdDecimal !== LUKSO_MAINNET_CHAIN_ID) {
      throw new Error('Please connect to the LUKSO Mainnet');
    }
    
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

/**
 * Get an ethers provider instance
 */
export const getEthersProvider = async () => {
  const provider = await getProvider();
  return new ethers.BrowserProvider(provider);
};

/**
 * Fetch the Universal Profile data for a given address
 */
export const fetchUniversalProfile = async (address: string): Promise<UniversalProfile> => {
  try {
    const provider = await getEthersProvider();
    
    // Create ERC725 instance
    const erc725 = new ERC725js(
      LSP3ProfileSchema,
      address,
      provider,
      { ipfsGateway: 'https://ipfs.io/ipfs/' }
    );
    
    // Fetch all data
    const profileData = await erc725.getData();
    
    // Extract and format data
    const name = profileData.find(data => data.name === 'LSP3Profile')?.value?.name || '';
    const description = profileData.find(data => data.name === 'LSP3Profile')?.value?.description || '';
    
    let profileImage = '';
    const profileImageData = profileData.find(data => data.name === 'LSP3Profile')?.value?.profileImage;
    if (profileImageData && profileImageData[0]) {
      profileImage = ipfsCidToUrl(profileImageData[0].url);
    }
    
    let backgroundImage = '';
    const backgroundImageData = profileData.find(data => data.name === 'LSP3Profile')?.value?.backgroundImage;
    if (backgroundImageData && backgroundImageData[0]) {
      backgroundImage = ipfsCidToUrl(backgroundImageData[0].url);
    }
    
    // Extract links
    const linksData = profileData.find(data => data.name === 'LSP3Profile')?.value?.links || [];
    const links = linksData.map((link: any) => ({
      title: link.title,
      url: link.url
    }));
    
    // Extract tags
    const tags = profileData.find(data => data.name === 'LSP3Profile')?.value?.tags || [];
    
    return {
      address,
      name,
      description,
      profileImage,
      backgroundImage,
      links,
      tags
    };
  } catch (error) {
    console.error('Error fetching Universal Profile:', error);
    
    // Return minimal profile with just the address if fetch fails
    return {
      address
    };
  }
};

/**
 * Save avatar metadata back to the Universal Profile
 */
export const saveAvatarMetadata = async (
  address: string,
  avatarMetadata: AvatarMetadata
): Promise<boolean> => {
  try {
    const provider = await getEthersProvider();
    const signer = await provider.getSigner();
    
    // Create ERC725 instance with the signer to enable write operations
    const erc725 = new ERC725js(
      LSP3ProfileSchema,
      address,
      provider,
      { ipfsGateway: 'https://ipfs.io/ipfs/' }
    );
    
    // Create data to be set
    const data = {
      keyName: 'LSP3AvatarMetadata',
      value: JSON.stringify(avatarMetadata)
    };
    
    // Encode the data to be set
    const encodedData = erc725.encodeData([data]);
    
    // Create transaction to set data in profile
    const tx = await signer.sendTransaction({
      to: address,
      data: encodedData.callData,
      gasLimit: ethers.toBigInt('300000')
    });
    
    // Wait for transaction to be mined
    await tx.wait();
    
    return true;
  } catch (error) {
    console.error('Error saving avatar metadata:', error);
    throw error;
  }
};

/**
 * Mock implementation for development without a proper provider
 */
export const mockConnectWallet = async (): Promise<string> => {
  // Return a sample UP address
  return '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';
};

/**
 * Mock fetch profile implementation for development
 */
export const mockFetchUniversalProfile = async (address: string): Promise<UniversalProfile> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    address,
    name: 'Alex LUKSO',
    description: 'Building on LUKSO. Web3 enthusiast and digital identity explorer.',
    profileImage: 'https://images.pexels.com/photos/10057618/pexels-photo-10057618.jpeg',
    tags: ['developer', 'design', 'blockchain', 'digital identity'],
    links: [
      { title: 'Website', url: 'https://lukso.network' },
      { title: 'Twitter', url: 'https://twitter.com/lukso_io' }
    ]
  };
};