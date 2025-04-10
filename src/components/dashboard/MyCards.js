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

  if (loading) return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">My Cards</h2>
      <div className="rounded-lg p-4 md:bg-white md:shadow">
        <LoadingState type="card" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">My Cards</h2>
        <div className="rounded-lg p-4 md:bg-white md:shadow">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none">My Cards</h2>
        <button 
          className="text-[#343C6A] text-sm font-medium"
          onClick={() => console.log('View all cards')}
        >
          See All
        </button>
      </div>
      <div className="p-6 rounded-lg md:bg-white md:shadow">
        <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
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
    </div>
  );
};

export default MyCards;