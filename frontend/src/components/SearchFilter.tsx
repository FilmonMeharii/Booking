import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterDate,
  setFilterDate
}) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Sök på namn eller passnummer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <button 
        onClick={() => {
          setSearchTerm('');
          setFilterDate('');
        }}
        className="btn-warning"
      >
        Rensa filter
      </button>
    </div>
  );
}; 