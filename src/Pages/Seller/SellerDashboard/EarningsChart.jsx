import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const EarningsChart = ({ data }) => {
  const chartData = {
    labels: ['Today', 'This Week', 'This Month', 'This Year'],
    datasets: [
      {
        label: 'Earnings (৳)',
        data: [
          data?.today || 0,
          data?.week || 0,
          data?.month || 0,
          data?.year || 0,
        ],
        backgroundColor: ['#38bdf8', '#34d399', '#fbbf24', '#a78bfa'],
        borderColor: ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-center font-semibold mb-2">Earnings Overview</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default EarningsChart;
