import { useState } from 'react';
import { BiSearchAlt, BiX } from 'react-icons/bi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery(''); // Emty the search input
    onSearch(''); // Trigger search with empty query
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center relative"
      role="search"
      aria-label="Search"
    >
      {/* Accessible Label (Hidden) */}
      <label htmlFor="searchInput" className="sr-only">
        Search for products
      </label>

      {/* Search Icon inside input */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-text-primary">
        <BiSearchAlt />
      </div>

      <input
        id="searchInput"
        placeholder="Search for Venues"
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyUp={handleSearch}
        className="rounded-md grow border-text-primary border-r border-b text-text-secondary p-4 ps-16 focus:outline-none focus:outline-primary focus:-outline-offset-2"
      />
      {/* Clear Button (X) - Visible only when query is not empty */}
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          <BiX size={18} />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
