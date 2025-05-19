import { UniversalProfile, AvatarMetadata } from '../types';
import { IPFS_GATEWAY, AVATAR_TRAITS } from './constants';

/**
 * Formats an Ethereum address for display
 */
export const formatAddress = (address?: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Converts an IPFS CID to a gateway URL
 */
export const ipfsCidToUrl = (cid: string): string => {
  if (!cid) return '';
  
  // Handle ipfs:// format
  if (cid.startsWith('ipfs://')) {
    cid = cid.replace('ipfs://', '');
  }
  
  return `${IPFS_GATEWAY}${cid}`;
};

/**
 * Generates random avatar traits based on profile data
 */
export const generateRandomAvatarTraits = (profile: UniversalProfile): Record<string, string> => {
  const traits: Record<string, string> = {};
  
  // Use profile name length to determine some traits
  const nameLength = profile.name?.length || 0;
  
  // Loop through trait categories and pick options based on profile data
  Object.entries(AVATAR_TRAITS).forEach(([category, options], index) => {
    // Use different profile properties to create some determinism in the choices
    let choice = 0;
    
    if (category === 'BACKGROUND') {
      choice = (nameLength + profile.address.length) % options.length;
    } else if (category === 'FACE_SHAPE') {
      choice = (profile.address.charCodeAt(0) || 0) % options.length;
    } else if (category === 'HAIR_STYLE') {
      choice = (profile.address.charCodeAt(1) || 0) % options.length;
    } else if (category === 'EYE_COLOR') {
      choice = (profile.address.charCodeAt(2) || 0) % options.length;
    } else if (category === 'SKIN_TONE') {
      choice = (profile.address.charCodeAt(3) || 0) % options.length;
    } else if (category === 'ACCESSORIES') {
      choice = (profile.tags?.length || 0) % options.length;
    } else {
      // Fallback random selection
      choice = Math.floor(Math.random() * options.length);
    }
    
    traits[category.toLowerCase()] = options[choice];
  });
  
  return traits;
};

/**
 * Creates a mock avatar URL based on profile data
 * In a real implementation, this would call an AI service
 */
export const generateAvatarUrl = (profile: UniversalProfile): string => {
  // This is a placeholder using an existing avatar generation service
  // In a real implementation, you'd call your AI service
  const seed = profile.address.substring(2, 10);
  const style = profile.tags?.[0] || 'abstract';
  
  // Use dicebear for placeholder avatars
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
};

/**
 * Creates a mock AI avatar metadata object
 */
export const createAvatarMetadata = (
  imageUrl: string, 
  profile: UniversalProfile,
  isGenerated = true
): AvatarMetadata => {
  return {
    imageUrl,
    generatedFrom: profile.address,
    timestamp: Date.now(),
    traits: isGenerated ? generateRandomAvatarTraits(profile) : undefined,
    isGenerated
  };
};

/**
 * Generates a hex color from a string
 */
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};