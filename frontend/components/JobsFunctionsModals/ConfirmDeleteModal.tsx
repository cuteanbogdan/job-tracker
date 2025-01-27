import React from "react";
import axios from "axios";
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
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/jobs/${job._id}`);
      mutateJobs();
      onClose();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md mx-4 sm:mx-auto p-6 rounded-lg shadow-lg transform transition-transform scale-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete the job{" "}
          <span className="font-semibold">{job.jobTitle}</span> at{" "}
          <span className="font-semibold">{job.companyName}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
