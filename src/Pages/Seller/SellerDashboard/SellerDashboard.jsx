import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loaer from '../../../Components/Loaer/Loaer';
import OrderStatusChart from './OrderStatusChart';
import EarningsChart from './EarningsChart';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';
import { Link } from 'react-router';

const SellerDashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-summary', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/summary/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <Loaer />;
  if (error) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  </div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
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
                {user?.displayName?.charAt(0) || 'S'}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, {user?.displayName || 'Seller'}!
            </h1>
            <p className="text-gray-600">Here's your business overview</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cats</p>
                <p className="text-3xl font-bold text-gray-900">{data.catCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🐱</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total CatFoods</p>
                <p className="text-3xl font-bold text-gray-900">{data.foodCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Object.values(data.statusCounts).reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${data.earnings?.today || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${data.earnings?.week || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${data.earnings?.month || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Year</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${data.earnings?.year || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-50">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">⏳</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{data.statusCounts.pending || 0}</p>
                <p className="text-sm text-gray-600">Pending Orders</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{data.statusCounts.approved || 0}</p>
                <p className="text-sm text-gray-600">Approved Orders</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🎉</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{data.statusCounts.completed || 0}</p>
                <p className="text-sm text-gray-600">Completed Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Status Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h2>
            <div className="w-full min-h-[300px] max-h-[400px]">
              <OrderStatusChart data={data.statusCounts} />
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Trend</h2>
            <div className="w-full min-h-[300px] max-h-[400px]">
              <EarningsChart data={data.earnings} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to='/dashboard/seller/add-category' className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <span className="text-2xl">➕</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Add New Cat</p>
                <p className="text-sm text-gray-600">List a new cat</p>
              </div>
            </Link>
            
            <Link to='/dashboard/seller/add-category-food' className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <span className="text-2xl">🍽️</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Add New CatFood</p>
                <p className="text-sm text-gray-600">List new food items</p>
              </div>
            </Link>
            
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

export default SellerDashboard;