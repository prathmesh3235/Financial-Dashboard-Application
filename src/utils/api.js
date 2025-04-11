// API Service with mock endpoints

// Mock data for user profile
const userData = {
  id: 1,
  name: 'Eddy Cusuma',
  email: 'eddy.cusuma@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  role: 'Premium User',
  notificationCount: 3
};

// Mock data for cards
const cardsData = [
  {
    id: 1,
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    type: 'mastercard',
    bgColor: 'bg-[#2B2B36]'
  },
  {
    id: 2,
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    type: 'visa',
    bgColor: 'bg-white'
  }
];

// Mock data for transactions
const transactionsData = [
  {
    id: 1,
    type: 'deposit',
    description: 'Deposit from my Card',
    date: '28 January 2021',
    amount: -850,
  },
  {
    id: 2,
    type: 'paypal',
    description: 'Deposit Paypal',
    date: '25 January 2021',
    amount: 2500,
  },
  {
    id: 3,
    type: 'user',
    description: 'Jemi Wilson',
    date: '21 January 2021',
    amount: 5400,
  },
  {
    id: 4,
    type: 'deposit',
    description: 'Monthly Salary',
    date: '15 January 2021',
    amount: 4200,
  },
  {
    id: 5,
    type: 'user',
    description: 'Payment to Randy',
    date: '10 January 2021',
    amount: -1120,
  }
];

// Mock data for weekly activity
const weeklyActivityData = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Withdraw',
      data: [300, 320, 310, 450, 170, 250, 320],
      backgroundColor: '#363636',
      borderRadius: 4,
      barThickness: 15,
    },
    {
      label: 'Deposit',
      data: [220, 110, 250, 350, 220, 240, 320],
      backgroundColor: '#3F7DF6',
      borderRadius: 4,
      barThickness: 15,
    },
  ],
};

// Mock data for expense statistics
const expenseStatisticsData = {
  labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
  datasets: [
    {
      data: [30, 15, 20, 35],
      backgroundColor: [
        '#4F56D3', // Entertainment - Blue 
        '#FF6B6B', // Bill Expense - Orange/Red
        '#3F7DF6', // Investment - Light Blue
        '#363636', // Others - Dark Gray
      ],
      borderWidth: 0,
    },
  ],
};

// Mock data for contacts
const contactsData = [
  {
    id: 1,
    name: 'Livia Bator',
    role: 'CEO',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Randy Press',
    role: 'Director',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
  },
  {
    id: 3,
    name: 'Workman',
    role: 'Designer',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
  }
];

// Mock data for balance history
const balanceHistoryData = {
  labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  datasets: [
    {
      label: 'Balance',
      data: [120, 320, 250, 450, 750, 250, 550, 250, 650],
      fill: true,
      backgroundColor: 'rgba(24, 20, 243, 0.1)',
      borderColor: 'rgba(24, 20, 243, 1)',
      tension: 0.4,
      pointRadius: 0,
      pointHitRadius: 10,
    },
  ],
};

// Add delay to simulate network latency
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// API service with mock endpoints
export const api = {
  // User related endpoints
  getUserProfile: async () => {
    await simulateDelay();
    return userData;
  },
  
  // Card related endpoints
  getCards: async () => {
    await simulateDelay();
    return cardsData;
  },
  
  // Transaction related endpoints
  getTransactions: async (limit = 3) => {
    await simulateDelay();
    return transactionsData.slice(0, limit);
  },
  getAllTransactions: async () => {
    await simulateDelay();
    return transactionsData;
  },
  
  // Chart data endpoints
  getWeeklyActivity: async () => {
    await simulateDelay();
    return weeklyActivityData;
  },
  getExpenseStatistics: async () => {
    await simulateDelay();
    return expenseStatisticsData;
  },
  getBalanceHistory: async () => {
    await simulateDelay();
    return balanceHistoryData;
  },
  
  // Contact related endpoints
  getContacts: async () => {
    await simulateDelay();
    return contactsData;
  },
  
  // Quick transfer endpoint (mocked)
  sendMoney: async (contactId, amount) => {
    await simulateDelay();
    return { 
      success: true, 
      message: `Successfully sent $${amount} to contact ID: ${contactId}`,
      timestamp: new Date().toISOString()
    };
  }
};

export default api;
