"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const JobDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: job,
    error,
    isLoading,
  } = useSWR(id ? `http://localhost:5000/api/v1/jobs/${id}` : null, fetcher);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message="Failed to fetch job details. Please try again later." />
    );

  if (!job) return null;

  const {
    companyName,
    jobTitle,
    linkJD,
    jobField,
    textJD,
    status,
    created_at,
  } = job;

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{jobTitle}</h1>
        <p className="text-sm text-gray-500 mb-8">
          Applied on:{" "}
          <span className="font-medium text-gray-700">
            {new Date(created_at).toLocaleDateString("en-GB")}
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Company</h2>
            <p className="text-gray-600 text-lg">{companyName}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Job Field</h2>
            <p className="text-gray-600 text-lg">{jobField}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Status</h2>
            <span
              className={`px-4 py-2 rounded-full font-medium text-sm ${
                status === "Applied"
                  ? "bg-blue-100 text-blue-800"
                  : status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : status === "No response"
                  ? "bg-gray-100 text-gray-800"
                  : status === "Had Interview"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {status}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Job Link</h2>
            <a
              href={linkJD}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Job Listing
            </a>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700">
            Job Description
          </h2>
          <p className="text-gray-600 mt-2 text-base leading-relaxed whitespace-pre-line">
            {textJD}
          </p>
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
          onClick={() => router.push("/jobs")}
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
