import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';

// Import profile images
import liviaBator from '../../assets/images/profiles/Livia Bator.png';
import randyPress from '../../assets/images/profiles/Randy Press.png';
import workman from '../../assets/images/profiles/Workman.png';

// Mock data with local images
const mockContacts = [
  {
    id: 1,
    name: 'Livia Bator',
    role: 'CEO',
    avatar: liviaBator
  },
  {
    id: 2,
    name: 'Randy Press',
    role: 'Director',
    avatar: randyPress
  },
  {
    id: 3,
    name: 'Workman',
    role: 'Designer',
    avatar: workman
  }
];

const ContactItem = ({ contact, isSelected, onClick }) => {
  return (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-full overflow-hidden mb-2 ${isSelected ? 'ring-2 ring-[#718EBF]' : ''}`}>
        <img 
          src={contact.avatar} 
          alt={contact.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-lg font-bold text-gray-800">{contact.name}</p>
      <p className={`text-lg text-[#718EBF] ${isSelected ? 'font-medium' : 'font-normal'}`}>{contact.role}</p>
    </div>
  );
};

// The Send button from the design
const SendButton = ({ onClick, disabled, sending }) => (
  <button 
    className={`flex items-center justify-center h-12 rounded-full ${
      !disabled ? 'bg-[#232323]' : 'bg-gray-400 cursor-not-allowed'
    }`}
    style={{ 
      width: '125px',
      filter: !disabled ? 'drop-shadow(4px 4px 18px rgba(231, 227, 232, 0.8))' : 'none'
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {sending ? (
      <span className="text-white text-lg font-medium">Sending...</span>
    ) : (
      <div className="flex items-center justify-center">
        <span className="text-white text-lg font-medium">Send</span>
        <span className="ml-2">
          <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.9824 0.923369C26.1091 0.333347 25.5307 -0.164153 24.9664 0.0511577L0.490037 9.39483C0.195457 9.50731 0.000610804 9.78965 1.43342e-06 10.105C-0.000607937 10.4203 0.193121 10.7034 0.487294 10.817L7.36317 13.4726V21.8369C7.36317 22.1897 7.60545 22.4963 7.94873 22.5779C8.28972 22.659 8.64529 22.4967 8.80515 22.1796L11.6489 16.5364L18.5888 21.6868C19.011 22.0001 19.6178 21.8008 19.7714 21.2974C26.251 0.0528342 25.9708 0.97674 25.9824 0.923369ZM19.9404 3.60043L8.01692 12.092L2.88664 10.1106L19.9404 3.60043ZM8.8866 13.3428L19.2798 5.94118C10.3366 15.3758 10.8037 14.8792 10.7647 14.9317C10.7067 15.0096 10.8655 14.7058 8.8866 18.6327V13.3428ZM18.6293 19.8197L12.5206 15.2862L23.566 3.63395L18.6293 19.8197Z" fill="white"/>
          </svg>
        </span>
      </div>
    )}
  </button>
);

const QuickTransfer = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(1); // Default select Livia (id: 1)
  const [amount, setAmount] = useState('525.50');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        // Use mock data for now
        setContacts(mockContacts);
        setLoading(false);
        
        // Comment out API call until backend is ready
        // const data = await api.getContacts();
        // setContacts(data);
        // setLoading(false);
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
        
        // Find the selected contact's name
        const selectedContactData = contacts.find(contact => contact.id === selectedContact);
        const contactName = selectedContactData ? selectedContactData.name : `Contact #${selectedContact}`;
        
        // Call API to send money
        const response = await api.sendMoney(selectedContact, parseFloat(amount));
        
        if (response.success) {
          // Use contact name instead of ID in the success message
          setSuccessMessage(`Successfully sent $${amount} to ${contactName}`);
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

  if (loading) return (
    <div>
      <h2 className="text-4xl font-semibold text-[#374151] mb-6">Quick Transfer</h2>
      <div className="bg-white rounded-3xl p-4 shadow-md">
        <LoadingState type="card" />
      </div>
    </div>
  );

  if (error && !successMessage) {
    return (
      <div>
        <h2 className="text-4xl font-semibold text-[#374151] mb-6">Quick Transfer</h2>
        <div className="bg-white rounded-3xl p-4 shadow-md">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-widget">
      <h2 className="text-4xl font-semibold text-[#374151] mb-6">Quick Transfer</h2>
      
      <div 
        className="bg-white rounded-3xl shadow-md relative overflow-hidden w-full"
        style={{ height: '300px' }}
      >
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 absolute top-0 left-0 w-full">
            {successMessage}
          </div>
        )}
        
        {error && successMessage && (
          <div className="bg-red-100 text-red-700 p-2 absolute top-0 left-0 w-full">
            {error}
          </div>
        )}
        
        <div className="flex items-center justify-center mt-10 mx-5 relative">
          <div className="flex gap-12 justify-center w-full">
            {contacts.map((contact) => (
              <ContactItem 
                key={contact.id}
                contact={contact}
                isSelected={selectedContact === contact.id}
                onClick={() => handleSelectContact(contact.id)}
              />
            ))}
          </div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-[#718EBF] hover:bg-gray-200 cursor-pointer shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-12 mx-10">
          <span className="text-[#718EBF] text-xl mr-6 whitespace-nowrap">Write Amount</span>
          
          <div className="relative flex-1">
            <div 
              className="flex w-full overflow-hidden"
              style={{ 
                borderRadius: '9999px', 
                height: '50px',
                backgroundColor: '#F0F3FA'
              }}
            >
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  className="w-full h-full py-3 px-6 bg-transparent border-none focus:outline-none text-gray-800 text-center text-xl"
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
              </div>
              
              <SendButton 
                onClick={handleSend}
                disabled={!selectedContact || !amount || sending}
                sending={sending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;