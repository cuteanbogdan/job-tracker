import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  setCurrentPage,
  setLimit,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <div className="flex items-center">
        <label htmlFor="limit" className="mr-3 text-gray-600 font-medium">
          Show:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="border border-gray-300 bg-white text-gray-700 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          }`}
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className="text-gray-600 text-sm">
          Page{" "}
          <strong className="text-gray-900 font-semibold">{currentPage}</strong>{" "}
          of{" "}
          <strong className="text-gray-900 font-semibold">{totalPages}</strong>
        </span>
        <button
          className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
