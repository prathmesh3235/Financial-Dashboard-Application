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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none">My Cards</h2>
        <button 
          className="text-[#343C6A] text-sm font-medium hover:text-[#232323] transition-colors duration-200"
          onClick={() => console.log('View all cards')}
        >
          See All
        </button>
      </div>
      <div className="p-4 min-h-[260px]">
        <LoadingState type="card" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none">My Cards</h2>
          <button 
            className="text-[#343C6A] text-sm font-medium hover:text-[#232323] transition-colors duration-200"
            onClick={() => console.log('View all cards')}
          >
            See All
          </button>
        </div>
        <div className="p-4 min-h-[260px]">
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
          className="text-[#343C6A] text-sm font-medium hover:text-[#232323] transition-colors duration-200"
          onClick={() => console.log('View all cards')}
        >
          See All
        </button>
      </div>
      <div className="min-h-[200px] w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
          {cards.map((card) => (
            <div 
              key={card.id}
              className={`${card.bgColor === 'bg-white' ? 'bg-white border border-gray-100' : 'bg-gradient-to-br from-[#5B5A6F] to-[#000000]'} 
                p-4 sm:p-6 rounded-2xl flex-shrink-0 flex flex-col justify-between h-[170px] sm:h-[235px] w-[280px] sm:w-[350px] relative shadow-md ${card.bgColor === 'bg-white' ? 'text-gray-900' : 'text-[#FFFFFF]'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-[10px] sm:text-xs uppercase ${card.bgColor === 'bg-white' ? 'text-gray-600/70' : 'text-[#FFFFFF]/70'}`}>Balance</p>
                  <p className="text-lg sm:text-xl font-semibold">
                    ${card.balance.toLocaleString()}
                  </p>
                </div>
                <div className="h-6 sm:h-8 w-8 sm:w-10 flex items-center justify-center">
                  {card.bgColor === 'bg-white' ? <WhiteCardChip /> : <BlackCardChip />}
                </div>
              </div>
              
              <div>
                <div className="mb-3 sm:mb-4">
                  <p className={`text-[10px] sm:text-xs uppercase ${card.bgColor === 'bg-white' ? 'text-gray-600/70' : 'text-[#FFFFFF]/70'}`}>CARD HOLDER</p>
                  <p className="text-sm sm:text-base font-medium">
                    {card.cardHolder}
                  </p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className={`text-[10px] sm:text-xs uppercase ${card.bgColor === 'bg-white' ? 'text-gray-600/70' : 'text-[#FFFFFF]/70'}`}>VALID THRU</p>
                    <p className="text-sm sm:text-base font-medium">
                      {card.validThru}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs sm:text-sm font-medium mr-2">
                      {card.cardNumber}
                    </p>
                    <span className="w-8 sm:w-auto">
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