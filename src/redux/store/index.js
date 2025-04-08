import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../slices/transactionSlice';
import dashboardReducer from '../slices/dashboardSlice';
import userReducer from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    dashboard: dashboardReducer,
    user: userReducer,
  },
});

export default store;
