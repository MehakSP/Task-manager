// src/components/FilterDropdown.js
import React from 'react';

const FilterDropdown = ({ setFilter }) => {
  return (
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="All">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterDropdown;
