import React from "react";
import Link from "next/link";
import { JobType } from "@/types/JobType";

interface JobsTableProps {
  jobs: JobType[];
  onEdit: (job: JobType) => void;
  onDelete: (job: JobType) => void;
  selectedJobs: string[];
  setSelectedJobs: (jobs: string[]) => void;
  currentPage: number;
  limit: number;
  totalJobs: number;
}

const JobsTable: React.FC<JobsTableProps> = ({
  jobs,
  onEdit,
  onDelete,
  selectedJobs,
  setSelectedJobs,
  currentPage,
  limit,
  totalJobs,
}) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700 border border-blue-400";
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-400";
      case "No response":
        return "bg-yellow-100 text-yellow-700 border border-yellow-400";
      case "Had Interview":
        return "bg-green-100 text-green-700 border border-green-400";
      case "Had OA":
        return "bg-purple-100 text-purple-700 border border-purple-400";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-400";
    }
  };

  const toggleSelect = (jobId: string) => {
    setSelectedJobs(
      selectedJobs.includes(jobId)
        ? selectedJobs.filter((id) => id !== jobId)
        : [...selectedJobs, jobId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs.map((job) => job._id));
    }
  };

  return (
    <div className="overflow-y-auto h-[65vh] border border-gray-300 rounded-lg shadow-md">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-3 text-center font-medium text-gray-600">
              <input
                type="checkbox"
                checked={selectedJobs.length === jobs.length && jobs.length > 0}
                onChange={toggleSelectAll}
                className="h-5 w-5 cursor-pointer accent-blue-500 "
              />
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Nr.
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Company
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Job Title
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Link JD
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Job Field
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Status
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Date Applied
            </th>
            <th className="border border-gray-300 p-3 text-left font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={job._id}
              className={`text-gray-700 text-sm transition hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="border border-gray-300 p-3 text-center">
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job._id)}
                  onChange={() => toggleSelect(job._id)}
                  className="h-5 w-5 cursor-pointer accent-blue-500"
                />
              </td>
              <td className="border border-gray-300 p-3 text-center">
                {totalJobs - ((currentPage - 1) * limit + index)}
              </td>
              <td className="border border-gray-300 p-3">{job.companyName}</td>
              <td className="border border-gray-300 p-3">
                <Link
                  href={`/job/${job._id}`}
                  className="text-blue-500 font-medium hover:underline"
                >
                  {job.jobTitle}
                </Link>
              </td>
              <td className="border border-gray-300 p-3">
                <a
                  href={job.linkJD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-medium hover:underline"
                  title={job.linkJD}
                >
                  View Link
                </a>
              </td>
              <td className="border border-gray-300 p-3">{job.jobField}</td>
              <td className="border border-gray-300 p-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStatusStyles(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="border border-gray-300 p-3 text-center">
                {new Date(job.created_at).toLocaleDateString("en-GB")}
              </td>
              <td className="border border-gray-300 p-3 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 mr-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                  onClick={() => onEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                  onClick={() => onDelete(job)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
