"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { JobType } from "@/types/JobType";
import JobsTable from "@/components/JobsTable";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddJobModal from "@/components/JobsFunctionsModals/AddJobModal";
import EditJobModal from "@/components/JobsFunctionsModals/EditJobModal";
import ConfirmDeleteModal from "@/components/JobsFunctionsModals/ConfirmDeleteModal";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import useDebounce from "@/hooks/useDebounce";
import axiosInstance from "@/utils/axiosInstance";
import ProtectedRoute from "@/components/ProtectedRoute";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const JobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `http://localhost:5000/api/v1/jobs?page=${currentPage}&limit=${limit}&status=${status}&search=${debouncedSearch}`,
    fetcher
  );

  const jobs = response?.data || [];
  const meta = response?.meta || { totalPages: 1, currentPage: 1 };

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

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={openAddModal}
          >
            + Add Job
          </button>
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
          ) : jobs && jobs.length === 0 ? (
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
