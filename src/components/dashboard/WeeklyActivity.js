import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyActivity = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyActivity = async () => {
      try {
        setLoading(true);
        const data = await api.getWeeklyActivity();
        const customData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Withdraw',
              data: data.datasets[0].data,
              backgroundColor: '#363636',
              borderRadius: 4,
              maxBarThickness: 18,
              order: 1, // Lower order appears first in the stack
            },
            {
              label: 'Deposit',
              data: data.datasets[1].data,
              backgroundColor: '#3F7DF6',
              borderRadius: 4,
              maxBarThickness: 18,
              order: 2, // Higher order appears second in the stack
            }
          ]
        };
        
        setChartData(customData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load weekly activity data');
        setLoading(false);
        console.error('Error fetching weekly activity:', err);
      }
    };

    fetchWeeklyActivity();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20, // Add more padding between legend items
          font: {
            size: 14,
            family: 'system-ui, -apple-system, sans-serif',
            color: '#617186'
          },
          // Sort legend items to show Deposit first then Withdraw (reverse of visual order)
          sort: (a, b) => {
            return a.text === 'Deposit' ? -1 : 1;
          }
        },
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
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
          lineWidth: 1,
        },
        ticks: {
          color: '#617186',
          maxTicksLimit: 6,
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#617186',
          font: {
            size: 12,
          },
          padding: 5,
        },
      },
    },
    maintainAspectRatio: false,
    barPercentage: 0.5,
    categoryPercentage: 0.4,
    layout: {
      padding: {
        top: 30,
        right: 10,
        bottom: 10,
        left: 10
      }
    }
  };

  if (loading) return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Weekly Activity</h2>
      <div className="bg-white rounded-lg p-6 shadow">
        <LoadingState type="chart" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Weekly Activity</h2>
        <div className="bg-white rounded-lg p-6 shadow dashboard-section">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Weekly Activity</h2>
      <div className="bg-white rounded-lg p-6 shadow dashboard-section">
        <div className="h-80">
          <Bar options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity; 