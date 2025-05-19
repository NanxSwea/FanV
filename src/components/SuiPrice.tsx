import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { getSuiPrice } from '../utils/pythNetwork';

const SuiPrice: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { price: currentPrice } = await getSuiPrice();
        
        setPrice(prevPrice => {
          if (prevPrice !== null) {
            // Calculate percentage change
            const change = ((currentPrice - prevPrice) / prevPrice) * 100;
            setPriceChange(change);
          }
          return currentPrice;
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching SUI price:', error);
        setLoading(false);
      }
    };

    fetchPrice();
    // Update price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center text-gray-400 text-sm">
        <Activity className="h-4 w-4 mr-1 animate-pulse" />
        <span>Loading SUI price...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center px-3 py-1 rounded-lg bg-gray-800 border border-gray-700">
        <span className="text-indigo-400 font-bold mr-1">SUI</span>
        <span className="text-white font-medium">${price?.toFixed(4)}</span>
        
        {priceChange !== 0 && (
          <span 
            className={`ml-2 flex items-center text-xs font-medium ${
              priceChange > 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {priceChange > 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(priceChange).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default SuiPrice;