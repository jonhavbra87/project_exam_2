import { useState } from 'react';
import { SearchButton } from '../../styles/SearchButton';

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
    event.preventDefault(); // Forhindrer standard formoppførsel
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex"
      role="search"
      aria-label="Search"
    >
      <label htmlFor="searchInput" className="sr-only">
        Search for products
      </label>
      <input
        id="searchInput"
        placeholder="Search"
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyUp={handleSearch}
        className="rounded-s-md grow border border-neutral border-e-0 text-text-secondary p-2 focus:outline-none focus:outline-accent-2 focus:-outline-offset-2"
      />
      <SearchButton type="submit">Search</SearchButton>
    </form>
  );
}

export default SearchBar;
