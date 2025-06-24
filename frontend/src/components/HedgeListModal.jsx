import React from 'react';
import Modal from 'react-modal';

// Dummy data for demonstration
const hedgeEvents = [
  {
    id: 1,
    title: 'Hedge Event 1',
    description: 'Description for Hedge 1',
    date: '2025-06-25',
    time: '10:00 AM',
    teamMembers: ['Alice', 'Bob'],
  },
  {
    id: 2,
    title: 'Hedge Event 2',
    description: 'Description for Hedge 2',
    date: '2025-06-28',
    time: '2:00 PM',
    teamMembers: ['Charlie', 'Dana'],
  },
];

Modal.setAppElement('#root');

const HedgeListModal = ({ onClose }) => (
  <Modal
    isOpen={true}
    onRequestClose={onClose}
    className="modal"
    overlayClassName="ReactModal__Overlay"
    contentLabel="Upcoming Hedges"
  >
    <h2>Upcoming Hedges</h2>
    <ul>
      {hedgeEvents.map(event => (
        <li key={event.id} style={{ marginBottom: '1em' }}>
          <strong>{event.title}</strong><br />
          {event.date} at {event.time}<br />
          <span>{event.description}</span><br />
          <em>Team: {event.teamMembers.join(', ')}</em>
        </li>
      ))}
    </ul>
    <button onClick={onClose}>Close</button>
  </Modal>
);

export default HedgeListModal;