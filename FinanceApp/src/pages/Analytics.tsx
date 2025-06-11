import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import CountUp from 'react-countup';

export default function Analytics() {
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'
    ],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1100, 1400, 900, 1300, 1150, 1450, 1380, 1420, 1350, 1500, 1600],
        borderColor: "#3b82f6",
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [700, 800, 750, 600, 850, 780, 810, 790, 830, 800, 880, 900],
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.3)',
        tension: 0.4,
      },
      {
        label: 'Profit',
        data: [500, 300, 650, 300, 450, 370, 640, 590, 590, 550, 620, 700],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-md p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-xl font-bold text-blue-600">
            <CountUp end={15600} duration={2.5} prefix="$" separator="," decimals={2} />
            </h2>
        </div>

        <div className="bg-white shadow-md rounded-md p-4">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h2 className="text-xl font-bold text-red-500">
            <CountUp end={9280} duration={2.5} prefix="$" decimals={2} /></h2>
        </div>

        <div className="bg-white shadow-md rounded-md p-4">
          <p className="text-sm text-gray-500">Total Profit</p>
          <h2 className="text-xl font-bold text-green-500">
            <CountUp end={6320} duration={2.5} prefix="$" separator="," decimals={2} /></h2>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}