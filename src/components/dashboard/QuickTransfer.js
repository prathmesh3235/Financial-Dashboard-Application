import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';

const ContactItem = ({ contact, isSelected, onClick }) => {
  return (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${isSelected ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
        <img 
          src={contact.avatar} 
          alt={contact.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm font-medium">{contact.name}</p>
      <p className="text-xs text-gray-500">{contact.role}</p>
    </div>
  );
};

const QuickTransfer = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await api.getContacts();
        setContacts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load contacts data');
        setLoading(false);
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();
  }, []);

  const handleSelectContact = (contactId) => {
    setSelectedContact(contactId === selectedContact ? null : contactId);
    // Clear any previous success message when changing contact
    setSuccessMessage('');
  };

  const handleSend = async () => {
    if (selectedContact && amount) {
      try {
        setSending(true);
        setError(null);
        setSuccessMessage('');
        
        // Call API to send money
        const response = await api.sendMoney(selectedContact, parseFloat(amount));
        
        if (response.success) {
          setSuccessMessage(response.message);
          // Reset the form
          setAmount('');
          setSelectedContact(null);
        } else {
          setError('Transfer failed. Please try again.');
        }
        setSending(false);
      } catch (err) {
        setError('Transfer failed. Please try again.');
        setSending(false);
        console.error('Error sending money:', err);
      }
    }
  };

  if (loading) return <LoadingState type="card" />;

  if (error && !successMessage) {
    return (
      <div className="bg-white rounded-lg p-4 shadow dashboard-section">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Transfer</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow dashboard-section">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Transfer</h2>
      
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {error && successMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center space-x-2 mb-6">
        {contacts.map((contact) => (
          <ContactItem 
            key={contact.id}
            contact={contact}
            isSelected={selectedContact === contact.id}
            onClick={() => handleSelectContact(contact.id)}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write Amount"
            value={amount}
            onChange={(e) => {
              // Only allow numbers and decimals
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
                // Clear any previous success message when changing amount
                setSuccessMessage('');
              }
            }}
            disabled={sending}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></span>
        </div>
        
        <button 
          className={`px-4 py-2 rounded-lg text-white flex items-center space-x-1 ${
            selectedContact && amount && !sending 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSend}
          disabled={!selectedContact || !amount || sending}
        >
          <span>{sending ? 'Sending...' : 'Send'}</span>
          {!sending && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuickTransfer; 