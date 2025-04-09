import React from 'react';
import MyCards from '../components/dashboard/MyCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import WeeklyActivity from '../components/dashboard/WeeklyActivity';
import ExpenseStatistics from '../components/dashboard/ExpenseStatistics';
import QuickTransfer from '../components/dashboard/QuickTransfer';
import BalanceHistory from '../components/dashboard/BalanceHistory';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top row */}
        <div className="lg:col-span-2">
          <MyCards />
        </div>
        <div>
          <RecentTransactions />
        </div>
        
        {/* Middle row */}
        <div className="lg:col-span-2">
          <WeeklyActivity />
        </div>
        <div>
          <ExpenseStatistics />
        </div>
        
        {/* Bottom row */}
        <div className="lg:col-span-1">
          <QuickTransfer />
        </div>
        <div className="lg:col-span-2">
          <BalanceHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
