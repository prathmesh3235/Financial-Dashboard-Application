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
      <div className="bg-white rounded-lg p-4 shadow dashboard-section">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-section bg-white p-6">
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
            className={`${card.bgColor} ${card.bgColor === 'bg-white' ? 'text-gray-800 border border-gray-200 card-visa' : 'text-white card-mastercard'} p-3 rounded-2xl flex flex-col justify-between h-[170px] min-w-[280px] relative overflow-hidden md:p-6 md:h-[220px] md:min-w-[350px]`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs uppercase opacity-70">Balance</p>
                <p className="text-xl font-semibold mt-1 md:text-2xl">
                  ${card.balance.toLocaleString()}
                </p>
              </div>
              <div className="h-6 w-8 flex items-center justify-center md:h-8 md:w-10">
                {card.bgColor === 'bg-white' ? <WhiteCardChip /> : <BlackCardChip />}
              </div>
            </div>
            
            <div>
              <div className="mb-2 md:mb-4">
                <p className="text-xs uppercase opacity-70">CARD HOLDER</p>
                <p className="font-medium mt-1 text-sm md:text-base">{card.cardHolder}</p>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase opacity-70">VALID THRU</p>
                  <p className="font-medium mt-1 text-sm md:text-base">{card.validThru}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-medium mr-2 md:text-base">{card.cardNumber}</p>
                  <span className="scale-75 md:scale-100">
                    {card.type === 'mastercard' ? <MastercardLogo /> : <VisaLogo />}
                  </span>
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