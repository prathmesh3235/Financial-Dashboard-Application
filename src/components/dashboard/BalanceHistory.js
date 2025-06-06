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
        min: 0,
        max: 800,
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          display: true,
          color: '#EAEAEA',
          lineWidth: 0.5,
          drawBorder: false,
          borderDash: [2, 2],
          drawTicks: false
        },
        ticks: {
          callback: function(value) {
            return value;
          },
          stepSize: 200,
          color: '#718EBF',
          padding: 10,
          font: {
            size: 12
          }
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: true,
          color: '#EAEAEA',
          lineWidth: 0.5,
          drawBorder: false,
          borderDash: [2, 2],
          drawTicks: false
        },
        ticks: {
          color: '#718EBF',
          padding: 10,
          font: {
            size: 12
          }
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const modifiedChartData = chartData ? {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      borderColor: '#1814F3',
      backgroundColor: 'rgba(24, 20, 243, 0.1)',
      tension: 0.4,
      fill: true,
      borderWidth: 2,
      pointRadius: 0
    })),
  } : null;

  if (loading) return (
    <div className="h-[323px]">
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Balance History</h2>
      <div className="rounded-lg p-4 md:bg-white md:shadow h-[291px]">
        <LoadingState type="chart" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="h-[323px]">
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Balance History</h2>
        <div className="rounded-lg p-4 md:bg-white md:shadow h-[291px]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[323px] ">
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Balance History</h2>
      <div className="rounded-lg p-4 md:bg-white md:shadow overflow-hidden w-full lg: h-[291px]">
        <div className="h-full -mx-2">
          {modifiedChartData && <Line options={options} data={modifiedChartData} />}
        </div>
      </div>
    </div>
  );
};

export default BalanceHistory; 