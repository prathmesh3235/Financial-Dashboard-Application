// Utility functions for formatting data

// Format currency with locale
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format dates
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

// Format card number to show only last 4 digits
export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  return cardNumber.replace(/\d(?=\d{4})/g, '*');
};

// Format percentage
export const formatPercentage = (value) => {
  return `${value}%`;
};