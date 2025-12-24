import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if(input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='search-bar'>
      <input type="text"
      placeholder='Enter City Name...'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar

