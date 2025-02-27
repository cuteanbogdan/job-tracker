"use client";

import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import useAppDispatch from "@/hooks/useAppDispatch";
import axiosInstance from "@/utils/axiosInstance";
import StatsOverview from "@/components/dashboardComponents/StatsOverview";
import MonthlyChart from "@/components/dashboardComponents/MonthlyChart";
import JobStatusPieChart from "@/components/dashboardComponents/JobStatusPieChart";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { logoutUser } from "@/redux/slices/authSlice";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data, error, isLoading } = useSWR("/jobs/stats", fetcher);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => router.push("/jobs")}
            >
              View Jobs
            </button>
            <button
              className="bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
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
