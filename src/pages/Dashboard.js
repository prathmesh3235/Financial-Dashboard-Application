import React, { Suspense } from 'react';
import {
  QuickTransfer,
  MyCards,
  RecentTransactions,
  WeeklyActivity,
  ExpenseStatistics,
  BalanceHistory,
  Summary
} from '../components/dashboard';

// Component loading fallback
const ComponentLoader = () => (
  <div className="w-full h-48 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="container mx-auto max-w-[1120px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top row */}
        <div className="lg:col-span-2">
          <Suspense fallback={<ComponentLoader />}>
            <MyCards />
          </Suspense>
        </div>
        <div>
          <RecentTransactions />
        </div>
        
        {/* Middle row */}
        <div className="lg:col-span-2">
          <Suspense fallback={<ComponentLoader />}>
            <WeeklyActivity />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<ComponentLoader />}>
            <ExpenseStatistics />
          </Suspense>
        </div>
      </div>

      {/* Bottom row with fixed widths - 40px gap to match grid width */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="lg:max-w-[445px] w-full">
          <Suspense fallback={<ComponentLoader />}>
            <QuickTransfer />
          </Suspense>
        </div>
        <div className="lg:w-full">
          <Suspense fallback={<ComponentLoader />}>
            <BalanceHistory />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
