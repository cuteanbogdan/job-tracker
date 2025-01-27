import React from "react";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full sm:w-1/2 mb-4">
      <input
        type="text"
        placeholder="Search by title or company"
        value={search}
        onChange={handleSearchChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
      />
    </div>
  );
};

export default Search;
