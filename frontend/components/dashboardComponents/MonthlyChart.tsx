import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MonthlyChartProps } from "@/types/DashboardTypes";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  const safeData = data ?? [];

  const chartData = {
    labels: safeData.map((entry) =>
      entry._id ? `${entry._id.month}/${entry._id.year}` : "Unknown"
    ),
    datasets: [
      {
        label: "Applications per Month",
        data: safeData.map((entry) => entry.count || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6b7280",
        },
      },
      x: {
        ticks: {
          color: "#6b7280",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md h-[70vh] transition-colors">
      <h2 className="text-lg font-semibold mb-2">Applications Over Time</h2>
      {safeData.length > 0 ? (
        <div className="h-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No application data available
        </p>
      )}
    </div>
  );
};

export default MonthlyChart;
