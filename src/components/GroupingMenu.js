import React from 'react';
import '../styles/GroupingMenu.css';

function GroupingMenu({ groupBy, setGroupBy }) {
  return (
    <div className="grouping-menu">
      <label htmlFor="grouping-select">Group By:</label>
      <select
        id="grouping-select"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value)}
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupingMenu;
