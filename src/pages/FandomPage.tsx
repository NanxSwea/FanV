import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fandoms } from '../utils/fandoms';
import { useWallet } from '../contexts/WalletContext';
import { ArrowRight } from 'lucide-react';

const FandomPage: React.FC = () => {
  const navigate = useNavigate();
  const { mintNFT } = useWallet();
  const [selectedFandom, setSelectedFandom] = React.useState<string | null>(null);
  const [isMinting, setIsMinting] = React.useState(false);

  const handleSelectFandom = async (fandomId: string) => {
    setSelectedFandom(fandomId);
    const fandom = fandoms.find(f => f.id === fandomId);
    
    if (fandom) {
      try {
        setIsMinting(true);
        // Mint the fan badge NFT
        const nftId = await mintNFT(
          fandom.badgeName,
          `Official ${fandom.name} fan badge on FanVerse`,
          fandom.badgeImageUrl
        );
        
        if (nftId) {
          // Redirect to the quiz page for this fandom
          navigate(`/quiz/${fandomId}`);
        } else {
          alert('Failed to mint fan badge. Please try again.');
        }
      } catch (error) {
        console.error('Error minting fan badge:', error);
        alert('Error minting fan badge. Please try again.');
      } finally {
        setIsMinting(false);
        setSelectedFandom(null);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-center gradient-text">Choose Your Fandom</h1>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        Select the fandom you're most passionate about. You'll receive a fan badge NFT and access to exclusive quizzes and collectibles.
      </p>
      
      {isMinting && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md">
            <div className="minting-animation mx-auto mb-4 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            <h3 className="text-xl font-bold mb-2">Minting Your Fan Badge</h3>
            <p className="text-gray-300">
              Please wait while we mint your {fandoms.find(f => f.id === selectedFandom)?.badgeName} on the Sui blockchain...
            </p>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-8">
        {fandoms.map((fandom) => (
          <div 
            key={fandom.id} 
            className="fandom-card group"
            onClick={() => !isMinting && handleSelectFandom(fandom.id)}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${fandom.imageUrl})`,
                filter: 'brightness(0.4)'
              }} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="relative h-full flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold mb-2">{fandom.name}</h3>
              <p className="text-gray-300 mb-4">{fandom.description}</p>
              
              <button className="btn-primary mt-auto self-start group-hover:pl-8 transition-all">
                <span className="flex items-center">
                  Join Fandom
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FandomPage;