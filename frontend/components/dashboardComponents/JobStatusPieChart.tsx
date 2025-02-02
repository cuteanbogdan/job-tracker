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
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[70vh] flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Job Status Distribution</h2>
      <div className="w-[90%] h-[90%] flex justify-center items-center">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default JobStatusPieChart;
