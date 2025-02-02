import React from "react";

interface FiltersProps {
  status: string;
  setStatus: (status: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ status, setStatus }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className="w-full sm:w-1/3 mb-4">
      <select
        id="status"
        value={status}
        onChange={handleStatusChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Rejected">Rejected</option>
        <option value="No response">No Response</option>
        <option value="Had Interview">Had Interview</option>
        <option value="Had OA">Had OA</option>
      </select>
    </div>
  );
};

export default Filters;
