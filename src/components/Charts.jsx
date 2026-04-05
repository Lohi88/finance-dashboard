import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Charts = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Income",
        data: [5000, 6000, 7000, 8000],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",  // blue
          "rgba(16, 185, 129, 0.7)",  // green
          "rgba(234, 179, 8, 0.7)",   // yellow
          "rgba(239, 68, 68, 0.7)",   // red
        ],
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Expenses",
        data: [2800, 2700, 3500, 2000],
        borderColor: "rgba(239, 68, 68, 0.9)", // red line
        backgroundColor: "rgba(239, 68, 68, 0.2)", // light fill
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(239, 68, 68, 1)",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#374151", // gray text
        },
      },
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
        <h2 className="font-semibold mb-3 text-gray-700">
          Monthly Income
        </h2>
        <Bar data={barData} options={options} />
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
        <h2 className="font-semibold mb-3 text-gray-700">
          Expense Trend
        </h2>
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default Charts;