import React from 'react'
import './RecentSearches.css';

const RecentSearches = ({ searches, onSelect }) => {
  if(searches.length === 0) return null;

  return (
    <div className='recent-container'>
      <h4>Recent Searches</h4>
      <div className="chips">
        {searches.map((city,index) => (
          <button key={index} className='chip' onClick={() => onSelect(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches

