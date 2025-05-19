import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

// Mock leaderboard data - in a real app, this would be fetched from a database or API
const leaderboardData = [
  { 
    rank: 1, 
    address: '0x7c8b9a0f3b22d512526a8d129678c8352e67c979',
    score: 158,
    nfts: 12,
    icon: <Trophy className="h-6 w-6 text-yellow-400" />
  },
  { 
    rank: 2, 
    address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    score: 132,
    nfts: 10,
    icon: <Medal className="h-6 w-6 text-gray-300" />
  },
  { 
    rank: 3, 
    address: '0xf9e8d7c6b5a4321098765432109876543210abcd',
    score: 107,
    nfts: 8,
    icon: <Medal className="h-6 w-6 text-amber-700" />
  },
  { 
    rank: 4, 
    address: '0x2468ace02468ace02468ace02468ace02468ace0',
    score: 89,
    nfts: 7,
    icon: <Award className="h-6 w-6 text-indigo-400" />
  },
  { 
    rank: 5, 
    address: '0x13579bdf13579bdf13579bdf13579bdf13579bdf',
    score: 72,
    nfts: 6,
    icon: <Award className="h-6 w-6 text-indigo-400" />
  },
];

const shortenAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const LeaderboardPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-center gradient-text">Top Fans Leaderboard</h1>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        The most dedicated fans with the highest quiz scores and most NFTs collected.
      </p>
      
      <div className="card overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-700/30 to-purple-700/30 border-b border-gray-700">
          <h3 className="text-xl font-bold flex items-center">
            <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
            Top 5 FanVerse Members
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-right">Quiz Score</th>
                <th className="py-3 px-4 text-right">NFTs</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr 
                  key={user.address} 
                  className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center mr-2">
                        {user.icon}
                      </span>
                      <span className="font-bold">{user.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono">{shortenAddress(user.address)}</td>
                  <td className="py-4 px-4 text-right font-bold">{user.score}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center bg-indigo-600/30 rounded-full px-3 py-1">
                      <Image className="h-4 w-4 mr-1 text-indigo-400" />
                      {user.nfts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Keep answering quiz questions correctly to increase your rank!
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;