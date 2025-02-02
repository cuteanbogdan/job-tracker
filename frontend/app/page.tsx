"use client";

import React from "react";
import useSWR from "swr";
import axiosInstance from "@/utils/axiosInstance";
import StatsOverview from "@/components/dashboardComponents/StatsOverview";
import MonthlyChart from "@/components/dashboardComponents/MonthlyChart";
import JobStatusPieChart from "@/components/dashboardComponents/JobStatusPieChart";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data, error, isLoading } = useSWR("/jobs/stats", fetcher);

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {error ? (
          <ErrorMessage message="Failed to fetch dashboard data." />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <StatsOverview stats={data.data} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <MonthlyChart data={data.data.monthlyApplications} />
              <JobStatusPieChart data={data.data} />
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
