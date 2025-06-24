import React from 'react';

const ButtonGroup = ({ onViewHedges, onProposeHedge, proposingHedge }) => (
  <div>
    <button onClick={onViewHedges}>View Upcoming Hedges</button>
    <button onClick={onProposeHedge}>
      {proposingHedge ? 'Cancel Proposal' : 'Propose a Hedge'}
    </button>
  </div>
);

export default ButtonGroup;