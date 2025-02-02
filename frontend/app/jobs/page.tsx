"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import useAppDispatch from "@/hooks/useAppDispatch";
import { JobType } from "@/types/JobType";
import JobsTable from "@/components/jobsComponents/JobsTable";
import ErrorMessage from "@/components/shared/ErrorMessage";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import AddJobModal from "@/components/jobsComponents/JobsFunctionsModals/AddJobModal";
import EditJobModal from "@/components/jobsComponents/JobsFunctionsModals/EditJobModal";
import ConfirmDeleteModal from "@/components/jobsComponents/JobsFunctionsModals/ConfirmDeleteModal";
import Pagination from "@/components/jobsComponents/Pagination";
import Filters from "@/components/jobsComponents/Filters";
import Search from "@/components/jobsComponents/Search";
import useDebounce from "@/hooks/useDebounce";
import axiosInstance from "@/utils/axiosInstance";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { logoutUser } from "@/redux/slices/authSlice";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const JobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `/jobs?page=${currentPage}&limit=${limit}&status=${status}&search=${debouncedSearch}`,
    fetcher
  );

  const jobs = response?.data || [];
  const meta = response?.meta || { totalPages: 1, currentPage: 1 };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (job: JobType) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedJob(null);
    setEditModalOpen(false);
  };

  const openDeleteModal = (job: JobType) => {
    setSelectedJob(job);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedJob(null);
    setDeleteModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => router.push("/")}
            >
              Dashboard
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={openAddModal}
            >
              + Add Job
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <Search search={search} setSearch={setSearch} />
          <Filters status={status} setStatus={setStatus} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {error ? (
            <ErrorMessage message="Failed to fetch jobs. Please try again later." />
          ) : isLoading ? (
            <LoadingSpinner />
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">
              No jobs found. Add some jobs to get started!
            </p>
          ) : (
            <JobsTable
              jobs={jobs || []}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              currentPage={currentPage}
              limit={limit}
              totalJobs={meta.totalJobs}
            />
          )}
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={meta.totalPages}
            limit={limit}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
          />
        </div>

        {isAddModalOpen && (
          <AddJobModal onClose={closeAddModal} mutateJobs={mutate} />
        )}
        {isEditModalOpen && selectedJob && (
          <EditJobModal
            job={selectedJob}
            onClose={closeEditModal}
            mutateJobs={mutate}
          />
        )}
        {isDeleteModalOpen && selectedJob && (
          <ConfirmDeleteModal
            job={selectedJob}
            onClose={closeDeleteModal}
            mutateJobs={mutate}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default JobsPage;
