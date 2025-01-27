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
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Search</h2>
      <input
        type="text"
        placeholder="Search by title or company"
        value={search}
        onChange={handleSearchChange}
        className="border p-2 rounded-md w-full sm:w-1/2"
      />
    </div>
  );
};

export default Search;
