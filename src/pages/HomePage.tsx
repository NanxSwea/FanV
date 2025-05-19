import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Cpu, Coins, Image } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import SuiPrice from '../components/SuiPrice';

const HomePage: React.FC = () => {
  const { connected, connectWalletAction } = useWallet();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    if (connected) {
      navigate('/fandom');
    } else {
      connectWalletAction();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
          Join Your Favorite Fandoms in Web3
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-300">
          Connect with your favorite stars, collect unique digital memorabilia, and prove your fandom on the blockchain.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button 
            onClick={handleGetStarted}
            className="btn-primary text-lg"
          >
            {connected ? 'Choose Your Fandom' : 'Connect Wallet to Start'}
          </button>
          <button 
            onClick={() => navigate('/leaderboard')}
            className="btn-secondary text-lg"
          >
            View Top Fans
          </button>
        </div>
        
        <div className="md:hidden w-full mb-8">
          <SuiPrice />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="card p-4 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-400">3</h3>
            <p className="text-gray-400">Fandoms</p>
          </div>
          <div className="card p-4 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-400">10K+</h3>
            <p className="text-gray-400">Members</p>
          </div>
          <div className="card p-4 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-400">25K+</h3>
            <p className="text-gray-400">NFTs Minted</p>
          </div>
          <div className="card p-4 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-400">100K+</h3>
            <p className="text-gray-400">Quiz Plays</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center gradient-text">
          Experience Fandom on the Blockchain
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            <div className="bg-indigo-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Collect Fan NFTs</h3>
            <p className="text-gray-300">
              Mint exclusive digital collectibles that prove your dedication and unlock special perks.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="bg-purple-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Web3 Identity</h3>
            <p className="text-gray-300">
              Your wallet becomes your decentralized fan profile, showcasing your collectibles and achievements.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="bg-blue-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Image className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Rare Moments</h3>
            <p className="text-gray-300">
              Answer quiz questions correctly to earn rare moment NFTs capturing iconic achievements.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="bg-pink-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Powered by Sui</h3>
            <p className="text-gray-300">
              Built on the fast, secure Sui blockchain with minimal gas fees and quick transaction times.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;