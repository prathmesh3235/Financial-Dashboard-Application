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

  if (loading) return <LoadingState type="card" />;

  if (error) {
    return (
      <div className="bg-white rounded-lg p-4 shadow dashboard-section">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border border-blue-100 rounded-lg dashboard-section">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Recent Transaction</h2>
      
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
  );
};

export default RecentTransactions; 