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
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 p-2">Nr.</th>
          <th className="border border-gray-300 p-2">Company</th>
          <th className="border border-gray-300 p-2">Job Title</th>
          <th className="border border-gray-300 p-2">Link JD</th>
          <th className="border border-gray-300 p-2">Job Field</th>
          <th className="border border-gray-300 p-2">Status</th>
          <th className="border border-gray-300 p-2">Date Applied</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={job._id} className="text-center">
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
            <td className="border border-gray-300 p-2">{job.status}</td>
            <td className="border border-gray-300 p-2">
              {new Date(job.created_at).toLocaleDateString("en-GB")}
            </td>
            <td className="border border-gray-300 p-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 mr-2"
                onClick={() => onEdit(job)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-lg shadow hover:bg-red-600"
                onClick={() => onDelete(job)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsTable;
