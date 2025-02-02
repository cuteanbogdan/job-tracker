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
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[70vh]">
      <h2 className="text-lg font-semibold mb-2">Applications Over Time</h2>
      {safeData.length > 0 ? (
        <div className="h-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No application data available
        </p>
      )}
    </div>
  );
};

export default MonthlyChart;
