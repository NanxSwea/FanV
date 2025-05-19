import React, { useState, useRef } from 'react';
import { Upload, Sparkles, RefreshCw, Check, X } from 'lucide-react';
import { UniversalProfile, AvatarMetadata } from '../types';
import { ipfsCidToUrl } from '../utils/helpers';
import Card from './Card';
import Button from './Button';

interface AvatarCreatorProps {
  profile: UniversalProfile;
  isGenerating: boolean;
  uploadProgress: number;
  avatarMetadata: AvatarMetadata | null;
  onGenerate: () => Promise<AvatarMetadata | null>;
  onUpload: (file: File) => Promise<AvatarMetadata | null>;
  onReset: () => void;
  onSave: (metadata: AvatarMetadata) => Promise<boolean>;
}

const AvatarCreator: React.FC<AvatarCreatorProps> = ({
  profile,
  isGenerating,
  uploadProgress,
  avatarMetadata,
  onGenerate,
  onUpload,
  onReset,
  onSave
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };
  
  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  // Handle save
  const handleSave = async () => {
    if (!avatarMetadata) return;
    
    try {
      setIsSaving(true);
      setSaveError(null);
      
      const success = await onSave(avatarMetadata);
      
      setIsSaving(false);
      if (success) {
        setSaveSuccess(true);
        // Reset success state after a delay
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      setIsSaving(false);
      setSaveError(err.message || 'Failed to save avatar metadata');
    }
  };
  
  return (
    <Card 
      title="AI Avatar Generator" 
      className="max-w-md"
    >
      <div className="flex flex-col items-center">
        {/* Avatar display area */}
        <div className="mb-6 w-full">
          <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center mb-3 relative">
            {avatarMetadata ? (
              <>
                <img 
                  src={avatarMetadata.imageUrl.startsWith('ipfs://') 
                    ? ipfsCidToUrl(avatarMetadata.imageUrl)
                    : avatarMetadata.imageUrl
                  } 
                  alt="Generated Avatar" 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-3 right-3">
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${avatarMetadata.isGenerated 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-accent-100 text-accent-800'
                    }
                  `}>
                    {avatarMetadata.isGenerated ? 'AI Generated' : 'Custom'}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-neutral-400 text-center p-6">
                <div className="mb-2 flex justify-center">
                  {isGenerating ? (
                    <RefreshCw size={48} className="animate-spin" />
                  ) : (
                    <Sparkles size={48} />
                  )}
                </div>
                <p>
                  {isGenerating
                    ? 'Generating your avatar...'
                    : uploadProgress > 0
                      ? `Uploading... ${uploadProgress}%`
                      : 'No avatar generated yet'}
                </p>
              </div>
            )}
          </div>
          
          {/* Traits display if available */}
          {avatarMetadata?.traits && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Avatar Traits</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(avatarMetadata.traits).map(([key, value]) => (
                  <div 
                    key={key}
                    className="px-2 py-1 bg-neutral-100 rounded-md text-xs"
                  >
                    <span className="font-medium capitalize">{key}: </span>
                    <span className="capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            variant="primary"
            icon={Sparkles}
            isLoading={isGenerating}
            onClick={onGenerate}
            disabled={isGenerating || uploadProgress > 0}
            fullWidth
          >
            Generate
          </Button>
          
          <Button
            variant="outline"
            icon={Upload}
            onClick={triggerFileUpload}
            disabled={isGenerating || uploadProgress > 0}
            fullWidth
          >
            Upload
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        {/* Save or reset buttons */}
        {avatarMetadata && (
          <div className="grid grid-cols-2 gap-3 w-full mt-3">
            <Button
              variant="secondary"
              icon={saveSuccess ? Check : undefined}
              isLoading={isSaving}
              onClick={handleSave}
              disabled={isSaving || saveSuccess}
              fullWidth
            >
              {saveSuccess ? 'Saved!' : 'Save to Profile'}
            </Button>
            
            <Button
              variant="ghost"
              icon={X}
              onClick={onReset}
              disabled={isSaving}
              fullWidth
            >
              Reset
            </Button>
          </div>
        )}
        
        {/* Save error message */}
        {saveError && (
          <div className="mt-4 text-error-600 text-sm">
            {saveError}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AvatarCreator;