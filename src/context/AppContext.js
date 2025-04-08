import React, { createContext } from 'react';

// Create an empty context
const AppContext = createContext({});

// Simple provider with empty values
export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
