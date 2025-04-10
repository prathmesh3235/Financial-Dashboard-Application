import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseStatistics = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenseStatistics = async () => {
      try {
        setLoading(true);
        const data = await api.getExpenseStatistics();
        setChartData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load expense statistics data');
        setLoading(false);
        console.error('Error fetching expense statistics:', err);
      }
    };

    fetchExpenseStatistics();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 10,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '60%',
    maintainAspectRatio: false,
  };

  if (loading) return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Expense Statistics</h2>
      <div className="bg-white rounded-lg p-4 shadow">
        <LoadingState type="chart" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Expense Statistics</h2>
        <div className="bg-white rounded-lg p-4 shadow dashboard-section">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Expense Statistics</h2>
      <div className="bg-white rounded-lg p-4 shadow dashboard-section">
        <div className="h-60 flex items-center justify-center">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics; 