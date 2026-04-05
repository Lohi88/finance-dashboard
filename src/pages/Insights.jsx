import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Insights = () => {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;

  // 👉 category-wise expense calculation
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const highestCategory = Object.keys(categoryMap).reduce(
    (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
    ""
  );

  const highestAmount = categoryMap[highestCategory] || 0;

  // 👉 PIE DATA
  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Insights</h1>

      {/* 🔹 INSIGHTS TEXT */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <p>💰 You earned a total of ₹{income} this period.</p>
        <p>💸 You spent a total of ₹{expense}.</p>
        <p>📉 Your savings are ₹{savings}.</p>
        <p>
          ⚠️ Your highest expense was ₹{highestAmount} on{" "}
          <b>{highestCategory}</b>.
        </p>
        <p>
          📊 You spent the most on <b>{highestCategory}</b> category.
        </p>
        <p>📌 Keep tracking your expenses to improve savings.</p>
      </div>

      {/* 🔥 SMALL PIE CHART */}
      <div className="bg-white p-6 rounded-xl shadow mt-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Expense Distribution
        </h2>

        <div className="w-80 h-80">
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
                datalabels: {
                  color: "#fff",
                  formatter: (value, context) => {
                    const total = context.dataset.data.reduce(
                      (a, b) => a + b,
                      0
                    );
                    const percentage =
                      ((value / total) * 100).toFixed(0) + "%";
                    return (
                      context.chart.data.labels[context.dataIndex] +
                      "\n" +
                      percentage
                    );
                  },
                  font: {
                    weight: "bold",
                    size: 12,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Insights;