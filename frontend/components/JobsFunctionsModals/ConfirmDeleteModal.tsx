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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Delete Job</h2>
        <p className="mb-6">
          Are you sure you want to delete the job{" "}
          <strong>{job.jobTitle}</strong> at <strong>{job.companyName}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
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
