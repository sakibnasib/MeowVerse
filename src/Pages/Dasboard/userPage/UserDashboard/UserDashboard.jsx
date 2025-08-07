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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.displayName || 'User'} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Order Info */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Your Orders</h2>
            <p>Total Orders: <strong>{totalOrders}</strong></p>
            <p>Pending: <span className="text-yellow-600 font-semibold">{statusCounts?.pending}</span></p>
            <p>Approved: <span className="text-green-600 font-semibold">{statusCounts?.approved}</span></p>
            <p>Completed: <span className="text-blue-600 font-semibold">{statusCounts?.completed}</span></p>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Order Status Overview</h2>
            <div className="w-64 mx-auto">
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
