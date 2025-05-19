import { Web3Storage } from 'web3.storage';
import { IpfsUploadResponse } from '../types';

// Placeholder for Web3.Storage API token
// In production, this would be loaded from environment variables
let apiToken: string | null = null;

/**
 * Initialize Web3.Storage client with API token
 */
export const initializeIpfsClient = (token: string): void => {
  apiToken = token;
};

/**
 * Get the Web3.Storage client instance
 */
const getClient = (): Web3Storage => {
  if (!apiToken) {
    throw new Error('Web3.Storage API token not initialized');
  }
  return new Web3Storage({ token: apiToken });
};

/**
 * Convert a File object to a Blob for storage
 */
const fileToBlob = async (file: File): Promise<Blob> => {
  return new Blob([await file.arrayBuffer()], { type: file.type });
};

/**
 * Convert a data URL to a File object
 */
export const dataUrlToFile = (
  dataUrl: string,
  filename: string = 'avatar.png'
): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Upload a file to IPFS via Web3.Storage
 */
export const uploadFileToIpfs = async (file: File): Promise<IpfsUploadResponse> => {
  try {
    const client = getClient();
    const blob = await fileToBlob(file);
    const fileName = file.name;
    
    const fileObject = new File([blob], fileName, { type: file.type });
    const cid = await client.put([fileObject], {
      name: fileName,
      maxRetries: 3,
    });
    
    return {
      cid,
      url: `ipfs://${cid}/${fileName}`
    };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
};

/**
 * Upload JSON metadata to IPFS
 */
export const uploadJsonToIpfs = async (
  data: Record<string, any>,
  fileName: string = 'metadata.json'
): Promise<IpfsUploadResponse> => {
  try {
    const client = getClient();
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const fileObject = new File([blob], fileName, { type: 'application/json' });
    
    const cid = await client.put([fileObject], {
      name: fileName,
      maxRetries: 3,
    });
    
    return {
      cid,
      url: `ipfs://${cid}/${fileName}`
    };
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
};

/**
 * Mock implementation for development without an API key
 */
export const mockUploadToIpfs = async (file: File): Promise<IpfsUploadResponse> => {
  console.log('Mock uploading file to IPFS:', file.name);
  
  // Generate a fake CID based on timestamp and random string
  const timestamp = Date.now().toString(16);
  const randomStr = Math.random().toString(36).substring(2, 10);
  const fakeCid = `bafybeih${timestamp}${randomStr}`;
  
  // Return a mock response after a short delay to simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    cid: fakeCid,
    url: `ipfs://${fakeCid}/${file.name}`
  };
};