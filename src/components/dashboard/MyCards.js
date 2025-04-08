import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const data = await api.getCards();
        setCards(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load card data');
        setLoading(false);
        console.error('Error fetching cards:', err);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <LoadingState type="card" />;

  if (error) {
    return (
      <div className="bg-white rounded-lg p-4 shadow">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">My Cards</h2>
        <button 
          className="text-blue-600 hover:text-blue-800 text-sm bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => console.log('View all cards')}
        >
          See All
        </button>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`${card.bgColor} ${card.bgColor === 'bg-white' ? 'text-gray-800 border border-gray-200' : 'text-white'} p-4 rounded-lg min-w-[240px] flex flex-col justify-between`}
          >
            <div className="flex justify-between mb-8">
              <div>
                <p className="text-xs mb-1 opacity-70">Balance</p>
                <p className="text-xl font-semibold">${card.balance.toLocaleString()}</p>
              </div>
              <img 
                src={card.type === 'mastercard' ? '/mastercard.svg' : '/visa.svg'} 
                alt={card.type}
                className="h-8 w-12" 
              />
            </div>
            
            <div>
              <div className="mb-4">
                <p className="text-xs opacity-70">CARD HOLDER</p>
                <p className="font-medium">{card.cardHolder}</p>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-xs opacity-70">VALID THRU</p>
                  <p className="font-medium">{card.validThru}</p>
                </div>
                <p className="self-end font-medium">{card.cardNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCards; 