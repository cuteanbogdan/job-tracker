"use client";

import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { JobType } from "@/types/JobType";
import JobsTable from "@/components/JobsTable";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddJobModal from "@/components/JobsFunctionsModals/AddJobModal";
import EditJobModal from "@/components/JobsFunctionsModals/EditJobModal";
import ConfirmDeleteModal from "@/components/JobsFunctionsModals/ConfirmDeleteModal";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const JobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `http://localhost:5000/api/v1/jobs?page=${currentPage}&limit=${limit}&status=${status}`,
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

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message="Failed to fetch jobs. Please try again later." />
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={openAddModal}
        >
          Add Job
        </button>
      </div>

      <Filters status={status} setStatus={setStatus} />

      {jobs && jobs.length === 0 ? (
        <p>No jobs found. Add some jobs to get started!</p>
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

      <Pagination
        currentPage={currentPage}
        totalPages={meta.totalPages}
        limit={limit}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
      />

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
  );
};

export default JobsPage;
