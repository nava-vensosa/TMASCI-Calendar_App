import React, { useState } from 'react';
import CalendarView from './components';
import ButtonGroup from './components';
import HedgeListModal from './components';
import ProposeHedgeForm from './components';

function App() {
  const [showHedgeList, setShowHedgeList] = useState(false);
  const [showProposeForm, setShowProposeForm] = useState(false);

  return (
    <div className="split-screen">
      <div className="top-half">
        <CalendarView
          proposingHedge={showProposeForm}
        />
      </div>
      <div className="bottom-half">
        <ButtonGroup
          onViewHedges={() => setShowHedgeList(true)}
          onProposeHedge={() => setShowProposeForm((v) => !v)}
          proposingHedge={showProposeForm}
        />
        {showHedgeList && (
          <HedgeListModal onClose={() => setShowHedgeList(false)} />
        )}
        {showProposeForm && (
          <ProposeHedgeForm onClose={() => setShowProposeForm(false)} />
        )}
      </div>
    </div>
  );
}

export default App;