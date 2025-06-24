import React, { useState } from 'react';
import CalendarView from './src/components/CalendarView';
import ButtonGroup from './src/components/ButtonGroup';
import HedgeListModal from './src/components/HedgeListModal';
import ProposeHedgeForm from './src/components/ProposeHedgeForm';

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