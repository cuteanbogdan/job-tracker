import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { JobType } from "@/types/JobType";

interface EditJobModalProps {
  job: JobType;
  onClose: () => void;
  mutateJobs: () => void;
}

const EditJobModal: React.FC<EditJobModalProps> = ({
  job,
  onClose,
  mutateJobs,
}) => {
  const [jobData, setJobData] = useState(job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`/jobs/${job._id}`, jobData);
      mutateJobs();
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
      setError("Failed to update job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white w-full max-w-lg mx-4 sm:mx-auto p-6 rounded-lg shadow-lg transform transition-transform scale-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Job
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.companyName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.jobTitle}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              name="linkJD"
              placeholder="Job Description Link"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.linkJD}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="jobField"
              placeholder="Job Field (e.g., Engineering, Marketing)"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.jobField}
              onChange={handleChange}
              required
            />
            <textarea
              name="textJD"
              placeholder="Job Description"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={jobData.textJD}
              onChange={handleChange}
              required
            />
            <select
              name="status"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.status}
              onChange={handleChange}
              required
            >
              <option value="Applied">Applied</option>
              <option value="Rejected">Rejected</option>
              <option value="No response">No response</option>
              <option value="Had Interview">Had Interview</option>
              <option value="Had OA">Had OA</option>
            </select>
          </div>
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
