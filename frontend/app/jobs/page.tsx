"use client";

import React from "react";
import useSWR from "swr";
import axios from "axios";
import { JobType } from "@/types/JobType";
import JobsTable from "@/components/JobsTable";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const JobsPage = () => {
  const {
    data: jobs,
    error,
    isLoading,
  } = useSWR<JobType[]>("http://localhost:5000/api/v1/jobs", fetcher);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message="Failed to fetch jobs. Please try again later." />
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs && jobs.length === 0 ? (
        <p>No jobs found. Add some jobs to get started!</p>
      ) : (
        <JobsTable jobs={jobs || []} />
      )}
    </div>
  );
};

export default JobsPage;
