import React, { useState, useEffect } from 'react';
import Card from './Card';
import GroupingMenu from './GroupingMenu';
import SortingMenu from './SortingMenu';
import '../styles/KanbanBoard.css';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        console.log('Fetched Data:', data);

        setTickets(data.tickets || []); // Extract tickets from the response
        setUsers(data.users || []); // Extract users from the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    groupTickets();
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [tickets, groupBy, sortBy]);

  const groupTickets = () => {
    if (!Array.isArray(tickets)) {
      console.error('Tickets is not an array:', tickets);
      return;
    }

    let grouped = {};
    let sortedTickets = [...tickets];

    // Sorting logic
    if (sortBy === 'priority') {
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Grouping logic
    sortedTickets.forEach((ticket) => {
      let key = '';
      if (groupBy === 'status') key = ticket.status;
      else if (groupBy === 'user') {
        const user = users.find((u) => u.id === ticket.userId);
        key = user ? user.name : 'Unassigned';
      } else if (groupBy === 'priority') key = getPriorityLabel(ticket.priority);

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    setGroupedTickets(grouped);
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      default:
        return 'No Priority';
    }
  };

  if (tickets.length === 0) {
    return <p>Loading tickets, please wait...</p>;
  }

  return (
    <div className="kanban-container">
      <div className="menu-bar">
        <GroupingMenu groupBy={groupBy} setGroupBy={setGroupBy} />
        <SortingMenu sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <div className="board">
        {Object.keys(groupedTickets).map((group) => (
          <div className="column" key={group}>
            <h2 className="column-title">{group}</h2>
            {groupedTickets[group].map((ticket) => (
              <Card key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
