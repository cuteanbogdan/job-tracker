import React from "react";
import { Pie } from "react-chartjs-2";
import { JobStatusPieChartProps } from "@/types/DashboardTypes";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const JobStatusPieChart: React.FC<JobStatusPieChartProps> = ({ data }) => {
  const chartData = {
    labels: ["Applied", "Rejected", "No Response", "Interviews/OA"],
    datasets: [
      {
        label: "Job Status Distribution",
        data: [
          data.totalApplied,
          data.totalRejected,
          data.totalNoResponse,
          data.totalInterviewsOrOAs,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderColor: ["#1E3A8A", "#7F1D1D", "#92400E", "#065F46"], // Darker colors for dark mode
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md h-[70vh] flex flex-col items-center transition-colors">
      <h2 className="text-lg font-semibold mb-4">Job Status Distribution</h2>
      <div className="w-[90%] h-[90%] flex justify-center items-center">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default JobStatusPieChart;
