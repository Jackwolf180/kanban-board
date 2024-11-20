import React from 'react';
import '../styles/Card.css';

function Card({ ticket }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 4:
        return 'urgent';
      case 3:
        return 'high';
      case 2:
        return 'medium';
      case 1:
        return 'low';
      default:
        return 'no-priority';
    }
  };

  return (
    <div className={`card ${getPriorityClass(ticket.priority)}`}>
      <div className="card-header">
        <h3 className="card-title">{ticket.title}</h3>
        <div className={`priority-indicator ${getPriorityClass(ticket.priority)}`}></div>
      </div>
      <p className="card-description">{ticket.description}</p>
      <div className="card-footer">
        <span className="assigned-to">Assigned to: {ticket.assignedTo || 'Unassigned'}</span>
        <span className="status">Status: {ticket.status}</span>
      </div>
    </div>
  );
}

export default Card;
