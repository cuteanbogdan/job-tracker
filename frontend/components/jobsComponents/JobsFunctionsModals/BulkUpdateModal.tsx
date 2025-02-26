import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface BulkUpdateModalProps {
  selectedJobs: string[];
  setSelectedJobs: (jobs: string[]) => void;
  onClose: () => void;
  mutateJobs: () => void;
}

const BulkUpdateModal: React.FC<BulkUpdateModalProps> = ({
  selectedJobs,
  setSelectedJobs,
  onClose,
  mutateJobs,
}) => {
  const [newStatus, setNewStatus] = useState("");

  const handleUpdate = async () => {
    try {
      await axiosInstance.patch("/jobs/bulk-update", {
        jobIds: selectedJobs,
        newStatus,
      });
      setSelectedJobs([]);
      mutateJobs();
      onClose();
    } catch (error) {
      console.error("Error updating jobs:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-96 transform transition-transform scale-100">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Bulk Update Status
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You are updating {selectedJobs.length} jobs.
        </p>

        <select
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Rejected">Rejected</option>
          <option value="No response">No response</option>
          <option value="Had Interview">Had Interview</option>
          <option value="Had OA">Had OA</option>
        </select>

        <div className="flex justify-end mt-4 space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white text-gray-800 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUpdateModal;
