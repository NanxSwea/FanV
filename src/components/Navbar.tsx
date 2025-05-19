import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, Image, Users, Home } from 'lucide-react';
import WalletButton from './WalletButton';
import SuiPrice from './SuiPrice';
import { useWallet } from '../contexts/WalletContext';

const Navbar: React.FC = () => {
  const { connected } = useWallet();

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <Trophy className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold gradient-text">FanVerse</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </span>
            </NavLink>
            
            {connected && (
              <>
                <NavLink 
                  to="/fandom" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive 
                        ? 'text-white bg-gray-700' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Fandoms
                  </span>
                </NavLink>
                
                <NavLink 
                  to="/gallery" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive 
                        ? 'text-white bg-gray-700' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <span className="flex items-center">
                    <Image className="h-4 w-4 mr-1" />
                    Gallery
                  </span>
                </NavLink>
              </>
            )}
            
            <NavLink 
              to="/leaderboard" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                Leaderboard
              </span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SuiPrice />
            </div>
            <WalletButton />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Bar (fixed at bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 backdrop-blur-md z-50">
        <div className="grid grid-cols-4 h-16">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center ${
                isActive ? 'text-indigo-400' : 'text-gray-400'
              }`
            }
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          
          <NavLink 
            to="/fandom" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center ${
                !connected ? 'opacity-50 pointer-events-none' : ''
              } ${
                isActive ? 'text-indigo-400' : 'text-gray-400'
              }`
            }
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Fandoms</span>
          </NavLink>
          
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center ${
                !connected ? 'opacity-50 pointer-events-none' : ''
              } ${
                isActive ? 'text-indigo-400' : 'text-gray-400'
              }`
            }
          >
            <Image className="h-6 w-6" />
            <span className="text-xs mt-1">Gallery</span>
          </NavLink>
          
          <NavLink 
            to="/leaderboard" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center ${
                isActive ? 'text-indigo-400' : 'text-gray-400'
              }`
            }
          >
            <Trophy className="h-6 w-6" />
            <span className="text-xs mt-1">Leaderboard</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;