import React, { useState } from "react";
import axios from "axios";
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/jobs/${job._id}`, jobData);
      mutateJobs();
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full border p-2 mb-4"
            value={jobData.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            className="w-full border p-2 mb-4"
            value={jobData.jobTitle}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="linkJD"
            placeholder="Job Description Link"
            className="w-full border p-2 mb-4"
            value={jobData.linkJD}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="jobField"
            placeholder="Job Field"
            className="w-full border p-2 mb-4"
            value={jobData.jobField}
            onChange={handleChange}
            required
          />
          <textarea
            name="textJD"
            placeholder="Job Description"
            className="w-full border p-2 mb-4"
            rows={4}
            value={jobData.textJD}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            className="w-full border p-2 mb-4"
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
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
