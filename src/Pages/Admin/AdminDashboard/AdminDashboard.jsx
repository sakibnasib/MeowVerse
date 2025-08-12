import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loaer from '../../../Components/Loaer/Loaer';
// import useAuth from '../../../hook/useAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
// const {user}=useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['admin-summary'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/summary`);
      return res.data;
    }
  });

  if (isLoading) return <Loaer />;

  const {
    sellerCount,
    userCount,
    catCount,
    foodCount,
    earnings
  } = data;

  console.log('hiiy',data)
  // Earnings Line Chart Data
  const lineData = {
    labels: ['Today', 'Week', 'Month', 'Year'],
    datasets: [
      {
        label: 'Earnings (৳)',
        data: [earnings.today, earnings.week, earnings.month, earnings.year],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  // Platform Stats Doughnut Chart
  const doughnutData = {
    labels: ['Sellers', 'Users', 'Cats', 'Foods'],
    datasets: [
      {
        data: [sellerCount, userCount, catCount, foodCount],
        backgroundColor: [
          '#3b82f6', // Blue for sellers
          '#10b981', // Green for users
          '#8b5cf6', // Purple for cats
          '#f59e0b', // Yellow for foods
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 4,
      }
    ]
  };

  // Earnings Bar Chart
  const barData = {
    labels: ['Today', 'Week', 'Month', 'Year'],
    datasets: [
      {
        label: 'Earnings (৳)',
        data: [earnings.today, earnings.week, earnings.month, earnings.year],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(16, 185, 129, 0.8)', // Green
          'rgba(139, 92, 246, 0.8)', // Purple
          'rgba(245, 158, 11, 0.8)', // Yellow
        ],
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">👑</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Admin Dashboard Overview 📊
            </h1>
            <p className="text-gray-600">Monitor your platform's performance</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sellers</p>
                <p className="text-3xl font-bold text-blue-600">{sellerCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-green-600">{userCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cats</p>
                <p className="text-3xl font-bold text-purple-600">{catCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🐱</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cat Foods</p>
                <p className="text-3xl font-bold text-yellow-600">{foodCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Earnings Line Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">📈 Earnings Trend</h2>
            <div className="w-full h-80">
              <Line 
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return '৳' + context.parsed.y.toLocaleString();
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '৳' + value.toLocaleString();
                        }
                      },
                      grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  },
                  elements: {
                    point: {
                      hoverRadius: 8
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Platform Stats Doughnut Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">🏪 Platform Overview</h2>
            <div className="w-full h-80 flex justify-center">
              <div className="w-64 h-64">
                <Doughnut 
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          usePointStyle: true,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">💰 Earnings Breakdown</h2>
          <div className="w-full h-80">
            <Bar 
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return '৳' + context.parsed.y.toLocaleString();
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '৳' + value.toLocaleString();
                      }
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
                <p className="text-2xl font-bold text-gray-900">৳{earnings?.today?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">৳{earnings?.week?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">৳{earnings?.month?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <span className="text-2xl">👥</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Manage Users</p>
                <p className="text-sm text-gray-600">View all users</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <span className="text-2xl">🏪</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Manage Sellers</p>
                <p className="text-sm text-gray-600">View all sellers</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">View Reports</p>
                <p className="text-sm text-gray-600">Detailed analytics</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
