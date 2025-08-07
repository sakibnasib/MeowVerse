import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loaer from '../../../Components/Loaer/Loaer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-summary'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/summary');
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

  const barData = {
    labels: ['Today', 'Week', 'Month', 'Year'],
    datasets: [
      {
        label: 'Earnings (৳)',
        data: [earnings.today, earnings.week, earnings.month, earnings.year],
        backgroundColor: ['#60a5fa', '#4ade80', '#facc15', '#f87171'],
        borderRadius: 6,
      }
    ]
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-lg font-semibold">Total Sellers</h2>
          <p className="text-3xl text-blue-600">{sellerCount||""}</p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl text-green-600">{userCount}</p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-lg font-semibold">Total Cats</h2>
          <p className="text-3xl text-purple-600">{catCount}</p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-lg font-semibold">Total Cat Foods</h2>
          <p className="text-3xl text-yellow-600">{foodCount}</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-lg font-semibold mb-4">📈 Earnings Overview</h2>
        <div className="w-full md:w-2/3 mx-auto">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
