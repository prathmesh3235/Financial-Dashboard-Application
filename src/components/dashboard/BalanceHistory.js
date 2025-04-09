import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const BalanceHistory = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalanceHistory = async () => {
      try {
        setLoading(true);
        const data = await api.getBalanceHistory();
        setChartData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load balance history data');
        setLoading(false);
        console.error('Error fetching balance history:', err);
      }
    };

    fetchBalanceHistory();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return value;
          },
          stepSize: 200,
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  if (loading) return <LoadingState type="chart" />;

  if (error) {
    return (
      <div className="bg-white rounded-lg p-4 shadow dashboard-section">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow dashboard-section">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Balance History</h2>
      <div className="h-60">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BalanceHistory; 