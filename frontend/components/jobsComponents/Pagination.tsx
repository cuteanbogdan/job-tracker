import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setSelectedJobs: (jobs: string[]) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  setCurrentPage,
  setLimit,
  setSelectedJobs,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setSelectedJobs([]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setSelectedJobs([]);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 transition-colors">
      <div className="flex items-center">
        <label
          htmlFor="limit"
          className="mr-3 text-gray-600 dark:text-gray-300 font-medium"
        >
          Show:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          }`}
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          Page{" "}
          <strong className="text-gray-900 dark:text-gray-100 font-semibold">
            {currentPage}
          </strong>{" "}
          of{" "}
          <strong className="text-gray-900 dark:text-gray-100 font-semibold">
            {totalPages}
          </strong>
        </span>
        <button
          className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          }`}
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
