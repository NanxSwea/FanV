import { useState, useCallback } from 'react';
import { UniversalProfile, AvatarMetadata } from '../types';
import { generateAvatarUrl, createAvatarMetadata } from '../utils/helpers';
import { 
  dataUrlToFile, 
  mockUploadToIpfs, 
  uploadFileToIpfs 
} from '../services/ipfsService';

// Flag for development mode
const DEV_MODE = true;

/**
 * React hook for avatar generation and management
 */
export const useAvatarGenerator = (profile: UniversalProfile | null) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarMetadata, setAvatarMetadata] = useState<AvatarMetadata | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Generate an AI avatar based on profile data
  const generateAvatar = useCallback(async () => {
    if (!profile) {
      setError('Profile data is required to generate an avatar');
      return null;
    }
    
    try {
      setIsGenerating(true);
      setError(null);
      
      // In a real implementation, this would call an AI service
      // For now, we'll use a placeholder avatar generator
      const imageUrl = generateAvatarUrl(profile);
      
      // Create metadata
      const metadata = createAvatarMetadata(imageUrl, profile, true);
      setAvatarMetadata(metadata);
      
      setIsGenerating(false);
      return metadata;
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message || 'Failed to generate avatar');
      return null;
    }
  }, [profile]);
  
  // Upload a custom avatar to IPFS
  const uploadAvatar = useCallback(async (file: File) => {
    if (!profile) {
      setError('Profile data is required to upload an avatar');
      return null;
    }
    
    try {
      setUploadProgress(10);
      setError(null);
      
      // Use mock or real implementation based on DEV_MODE
      const uploadResult = DEV_MODE
        ? await mockUploadToIpfs(file)
        : await uploadFileToIpfs(file);
      
      setUploadProgress(90);
      
      // Create metadata
      const metadata = createAvatarMetadata(uploadResult.url, profile, false);
      setAvatarMetadata(metadata);
      
      setUploadProgress(100);
      return metadata;
    } catch (err: any) {
      setUploadProgress(0);
      setError(err.message || 'Failed to upload avatar');
      return null;
    }
  }, [profile]);
  
  // Process and upload a data URL (e.g., from canvas element)
  const uploadDataUrl = useCallback(async (dataUrl: string, filename = 'avatar.png') => {
    const file = dataUrlToFile(dataUrl, filename);
    return uploadAvatar(file);
  }, [uploadAvatar]);
  
  // Reset the avatar state
  const resetAvatar = useCallback(() => {
    setAvatarMetadata(null);
    setUploadProgress(0);
    setError(null);
  }, []);
  
  return {
    isGenerating,
    avatarMetadata,
    uploadProgress,
    error,
    generateAvatar,
    uploadAvatar,
    uploadDataUrl,
    resetAvatar
  };
};

export default useAvatarGenerator;