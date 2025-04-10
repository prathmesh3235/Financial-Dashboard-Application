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
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Recent Transaction</h2>
      <div className="rounded-lg p-4 md:bg-white md:shadow">
        <LoadingState type="card" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Recent Transaction</h2>
        <div className="rounded-lg p-4 md:bg-white md:shadow">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Recent Transaction</h2>
      <div className="p-6 rounded-lg md:bg-white md:shadow md:border md:border-blue-100">
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <TransactionIcon type={transaction.type} />
                <div className="ml-4">
                  <p className="font-medium text-gray-800 text-lg">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-medium text-lg ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
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