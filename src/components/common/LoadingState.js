import React from 'react';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Loading skeleton for text
const TextSkeleton = ({ width = 'w-full', height = 'h-4' }) => (
  <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`}></div>
);

// Loading skeleton for card
const CardSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-4">
        <div className="h-20 bg-gray-200 rounded col-span-4"></div>
      </div>
    </div>
  </div>
);

// Loading skeleton for chart
const ChartSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow">
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
    <div className="h-60 bg-gray-100 rounded animate-pulse flex items-center justify-center">
      <p className="text-gray-400">Loading chart data...</p>
    </div>
  </div>
);

// Loading state component with different types
const LoadingState = ({ type = 'spinner' }) => {
  switch (type) {
    case 'card':
      return <CardSkeleton />;
    case 'chart':
      return <ChartSkeleton />;
    case 'text':
      return <TextSkeleton />;
    case 'spinner':
    default:
      return <LoadingSpinner />;
  }
};

export default LoadingState; 