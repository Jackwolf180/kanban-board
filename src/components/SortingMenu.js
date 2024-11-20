import React from 'react';
import '../styles/GroupingMenu.css';

function SortingMenu({ sortBy, setSortBy }) {
  return (
    <div className="sorting-menu">
      <label htmlFor="sorting-select">Sort By:</label>
      <select
        id="sorting-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default SortingMenu;
