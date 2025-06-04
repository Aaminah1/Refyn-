import React from 'react';
import './Library.css';
import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper" role="search">
      <label htmlFor="search-input" className="sr-only">
       
      </label>
      <Search className="search-icon" size={18} aria-hidden="true" />
      <input
        type="text"
        id="search-input"
        className="search-bar"
        placeholder="Search routines..."
        value={value}
        onChange={onChange}
        aria-label="Search routines"
      />
    </div>
  );
}

export default SearchBar;
