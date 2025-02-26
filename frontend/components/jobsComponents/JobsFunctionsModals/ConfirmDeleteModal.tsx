import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { JobType } from "@/types/JobType";

interface ConfirmDeleteModalProps {
  job: JobType;
  onClose: () => void;
  mutateJobs: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  job,
  onClose,
  mutateJobs,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/jobs/${job._id}`);
      mutateJobs();
      onClose();
    } catch (error) {
      console.error("Error deleting job:", error);
      setError("Failed to delete job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-md mx-4 sm:mx-auto p-6 rounded-lg shadow-lg transform transition-transform scale-100">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Confirm Deletion
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-center mb-4">
            {error}
          </p>
        )}

        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Are you sure you want to delete the job{" "}
          <span className="font-semibold">{job.jobTitle}</span> at{" "}
          <span className="font-semibold">{job.companyName}</span>? This action
          cannot be undone.
        </p>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 dark:bg-gray-700 dark:text-white text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
