import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import Loaer from '../../../../Components/Loaer/Loaer';
import useAuth from '../../../../hook/useAuth';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['user-summary', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/summary/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <Loaer />;

  const { totalOrders, statusCounts } = data || {};

  const chartData = {
    labels: ['Pending', 'Approved', 'Completed'],
    datasets: [
      {
        data: [
          statusCounts?.pending || 0,
          statusCounts?.approved || 0,
          statusCounts?.completed || 0,
        ],
        backgroundColor: ['#facc15', '#4ade80', '#60a5fa'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-white text-2xl font-bold">
                {user?.displayName?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, {user?.displayName || 'User'}! 👋
            </h1>
            <p className="text-gray-600">Here's your order overview</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{totalOrders || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{statusCounts?.pending || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{statusCounts?.approved || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-blue-600">{statusCounts?.completed || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Status Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Overview</h2>
            <div className="flex justify-center">
              <div className="w-80 h-80">
                <Doughnut 
                  data={chartData}
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
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">⏳</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Pending Orders</p>
                    <p className="text-sm text-gray-600">Waiting for approval</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{statusCounts?.pending || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">✅</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Approved Orders</p>
                    <p className="text-sm text-gray-600">Ready for processing</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">{statusCounts?.approved || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Completed Orders</p>
                    <p className="text-sm text-gray-600">Successfully delivered</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">{statusCounts?.completed || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <span className="text-2xl">🛒</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Place New Order</p>
                <p className="text-sm text-gray-600">Browse and order</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <span className="text-2xl">📋</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">View Orders</p>
                <p className="text-sm text-gray-600">Check order history</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <span className="text-2xl">📞</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Contact Support</p>
                <p className="text-sm text-gray-600">Get help</p>
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserDashboard;
