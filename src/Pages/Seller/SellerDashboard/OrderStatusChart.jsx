import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = ({ data }) => {
  const chartData = {
    labels: ['Pending', 'Approved', 'Completed'],
    datasets: [
      {
        label: 'Orders',
        data: [
          data?.pending || 0,
          data?.approved || 0,
          data?.completed || 0
        ],
        backgroundColor: ['#facc15', '#4ade80', '#60a5fa'],
        borderColor: ['#eab308', '#22c55e', '#3b82f6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-center font-semibold mb-2">Order Status</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default OrderStatusChart;
