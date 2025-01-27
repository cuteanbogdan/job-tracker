import React from "react";
import { JobType } from "@/types/JobType";

interface JobsTableProps {
  jobs: JobType[];
  onEdit: (job: JobType) => void;
  onDelete: (job: JobType) => void;
  currentPage: number;
  limit: number;
  totalJobs: number;
}

const JobsTable: React.FC<JobsTableProps> = ({
  jobs,
  onEdit,
  onDelete,
  currentPage,
  limit,
  totalJobs,
}) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "No response":
        return "bg-yellow-100 text-yellow-700";
      case "Had Interview":
        return "bg-green-100 text-green-700";
      case "Had OA":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-y-auto h-[65vh] border border-gray-300 rounded-lg shadow-md">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Nr.
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Company
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Job Title
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Link JD
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Job Field
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Status
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Date Applied
            </th>
            <th className="border border-gray-300 p-2 text-left font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={job._id}
              className={`text-gray-700 text-sm hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="border border-gray-300 p-2">
                {totalJobs - ((currentPage - 1) * limit + index)}
              </td>
              <td className="border border-gray-300 p-2">{job.companyName}</td>
              <td className="border border-gray-300 p-2">{job.jobTitle}</td>
              <td className="border border-gray-300 p-2">
                <a
                  href={job.linkJD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  title={job.linkJD}
                >
                  View Link
                </a>
              </td>
              <td className="border border-gray-300 p-2">{job.jobField}</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(job.created_at).toLocaleDateString("en-GB")}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 mr-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={() => onEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
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
