import React from 'react';

// Lazy load heavy components
export const QuickTransfer = React.lazy(() => import('./QuickTransfer'));
export const ExpenseStatistics = React.lazy(() => import('./ExpenseStatistics'));
export const BalanceHistory = React.lazy(() => import('./BalanceHistory'));
export const WeeklyActivity = React.lazy(() => import('./WeeklyActivity'));
export const MyCards = React.lazy(() => import('./MyCards'));

// Smaller components can be imported normally
export { default as RecentTransactions } from './RecentTransactions';
export { default as Summary } from './Summary'; 