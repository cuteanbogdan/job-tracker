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
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Filters</h2>
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="status" className="block font-medium">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="border p-2 rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="No response">No Response</option>
            <option value="Had Interview">Had Interview</option>
            <option value="Had OA">Had OA</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
