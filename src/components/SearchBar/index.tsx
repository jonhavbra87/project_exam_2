import { useState } from 'react';
import { BiSearchAlt, BiX } from 'react-icons/bi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}
/**
* SearchBar component for venue search functionality
* 
* @component
* @param {Object} props - Component props
* @param {Function} props.onSearch - Callback function when search is performed
* @returns {JSX.Element} - Rendered SearchBar component
* 
* @description
* A search input that allows users to search for venues.
* Features:
* - Search icon on the left side
* - Clear button (X) that appears when text is entered
* - Proper accessibility attributes and labels
* - Form submission handling
* 
* The component maintains its own query state and calls the onSearch callback
* when the user submits the form or clears the search. The search can be
* submitted by pressing Enter or by form submission.
* 
* @example
* // Basic usage
* const handleSearch = (query) => {
*   console.log('Searching for:', query);
*   // Perform search logic here
* };
* 
* <SearchBar onSearch={handleSearch} />
*/

function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
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
    setQuery('');
    onSearch(''); 
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center relative"
      role="search"
      aria-label="Search"
    >
      <label htmlFor="searchInput" className="sr-only">
        Search for products
      </label>
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-text-primary">
        <BiSearchAlt />
      </div>
      <input
        id="searchInput"
        placeholder="Search for Venues & press enter"
        type="text"
        value={query}
        onChange={handleInputChange}
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
