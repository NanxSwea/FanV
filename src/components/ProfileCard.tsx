import React from 'react';
import { User, Link, Tag } from 'lucide-react';
import { UniversalProfile } from '../types';
import Card from './Card';

interface ProfileCardProps {
  profile: UniversalProfile;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className = '' }) => {
  return (
    <Card 
      className={`max-w-md ${className}`}
      glassEffect
    >
      <div className="flex flex-col items-center text-center">
        {profile.backgroundImage && (
          <div 
            className="absolute inset-x-0 top-0 h-32 bg-cover bg-center rounded-t-xl -z-10 opacity-80"
            style={{ backgroundImage: `url(${profile.backgroundImage})` }}
          />
        )}
        
        <div className="relative mb-4">
          {profile.profileImage ? (
            <img 
              src={profile.profileImage} 
              alt={profile.name || 'Profile'} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center border-4 border-white shadow-md">
              <User 
                size={40} 
                className="text-neutral-400"
              />
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-1">
          {profile.name || formatAddress(profile.address)}
        </h2>
        
        <p className="text-neutral-500 mb-4 text-sm">
          {profile.address}
        </p>
        
        {profile.description && (
          <p className="text-neutral-700 mb-6">
            {profile.description}
          </p>
        )}
        
        {profile.tags && profile.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {profile.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center gap-1"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {profile.links && profile.links.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {profile.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm flex items-center gap-1 transition-colors"
              >
                <Link size={14} />
                {link.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

// Helper function to format address
const formatAddress = (address?: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export default ProfileCard;