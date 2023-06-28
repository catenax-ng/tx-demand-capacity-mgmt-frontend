import React from 'react';

type DemandsSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const DemandsSearch: React.FC<DemandsSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default DemandsSearch;
