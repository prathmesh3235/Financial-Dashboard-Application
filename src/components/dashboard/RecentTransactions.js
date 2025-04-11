import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';
import { CardDepositIcon, PaypalIcon, UserTransactionIcon } from '../../assets/icons/TransactionIcons';

const TransactionIcon = ({ type }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'deposit':
        return <CardDepositIcon />;
      case 'paypal':
        return <PaypalIcon />;
      case 'user':
        return <UserTransactionIcon />;
      default:
        return null;
    }
  };

  return getIcon(type);
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await api.getTransactions(3); // Limit to 3 recent transactions
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load transaction data');
        setLoading(false);
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none">Recent Transaction</h2>
      </div>
      <div className="rounded-lg p-4 bg-white shadow min-h-[260px]">
        <LoadingState type="card" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none">Recent Transaction</h2>
        </div>
        <div className="rounded-lg p-4 bg-white shadow min-h-[260px]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none">Recent Transaction</h2>
      </div>
      <div className="p-3 rounded-lg bg-white shadow h-[235px] w-[350px]">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <TransactionIcon type={transaction.type} />
                <div className="ml-2">
                  <p className="font-medium text-[15px] text-gray-800">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-medium text-[15px] ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.amount > 0 ? `+$${transaction.amount.toLocaleString()}` : `-$${Math.abs(transaction.amount).toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions; 