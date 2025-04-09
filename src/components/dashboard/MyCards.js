import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';
import { BlackCardChip, WhiteCardChip, MastercardLogo, VisaLogo } from '../../assets/icons/CardIcons';

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">My Cards</h2>
        <button 
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          onClick={() => console.log('View all cards')}
        >
          See All
        </button>
      </div>
      
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`${card.bgColor} ${card.bgColor === 'bg-white' ? 'text-gray-800 border border-gray-200 card-visa' : 'text-white card-mastercard'} p-6 rounded-2xl flex flex-col justify-between h-[220px] min-w-[350px] relative overflow-hidden`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs uppercase opacity-70">Balance</p>
                <p className="text-2xl font-semibold mt-1">${card.balance.toLocaleString()}</p>
              </div>
              <div className="h-8 w-10 flex items-center justify-center">
                {card.bgColor === 'bg-white' ? <WhiteCardChip /> : <BlackCardChip />}
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <p className="text-xs uppercase opacity-70">CARD HOLDER</p>
                <p className="font-medium mt-1">{card.cardHolder}</p>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase opacity-70">VALID THRU</p>
                  <p className="font-medium mt-1">{card.validThru}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-base font-medium mr-2">{card.cardNumber}</p>
                  {card.type === 'mastercard' ? <MastercardLogo /> : <VisaLogo />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCards; 