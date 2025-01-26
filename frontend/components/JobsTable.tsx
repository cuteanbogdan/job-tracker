import React from "react";
import { JobType } from "@/types/JobType";

interface JobsTableProps {
  jobs: JobType[];
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 p-2">Job Title</th>
          <th className="border border-gray-300 p-2">Company</th>
          <th className="border border-gray-300 p-2">Status</th>
          <th className="border border-gray-300 p-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job._id} className="text-center">
            <td className="border border-gray-300 p-2">{job.jobTitle}</td>
            <td className="border border-gray-300 p-2">{job.companyName}</td>
            <td className="border border-gray-300 p-2">{job.status}</td>
            <td className="border border-gray-300 p-2">
              {new Date(job.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsTable;
