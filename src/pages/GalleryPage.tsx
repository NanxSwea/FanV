import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Image, ExternalLink } from 'lucide-react';

type NFT = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

const GalleryPage: React.FC = () => {
  const { getNFTs } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const userNFTs = await getNFTs();
        setNfts(userNFTs);
      } catch (error) {
        console.error('Error loading NFTs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadNFTs();
  }, [getNFTs]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="minting-animation mx-auto w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-center gradient-text">My NFT Gallery</h1>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        View your unique collection of fan badges and rare moments minted on the Sui blockchain.
      </p>
      
      {nfts.length === 0 ? (
        <div className="card p-8 text-center">
          <Image className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No NFTs Found</h3>
          <p className="text-gray-300 mb-4">
            You don't have any NFTs in your collection yet. Select a fandom to get your first fan badge NFT!
          </p>
          <a href="/fandom" className="btn-primary inline-flex">Choose a Fandom</a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft-card">
              <div 
                className="w-full h-48 bg-cover bg-center rounded-lg mb-4" 
                style={{ backgroundImage: `url(${nft.imageUrl})` }}
              />
              
              <h3 className="text-xl font-bold mb-1">{nft.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{nft.description}</p>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono">{nft.id.substring(0, 10)}...</span>
                  <a 
                    href={`https://explorer.sui.io/object/${nft.id}?network=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300"
                  >
                    View on Explorer
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;