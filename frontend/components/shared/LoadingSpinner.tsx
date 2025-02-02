import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
