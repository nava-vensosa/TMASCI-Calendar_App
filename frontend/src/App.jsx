import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CLIENT_ID = '894098063223-kp5v311v88ie86tooluu494vuhnvvvn4.apps.googleusercontent.com';
const API_KEY = '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';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const localizer = momentLocalizer(moment);

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load Google API
    window.gapi.load('client:auth2', initClient);
  }, []);

  function initClient() {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn);
        // Handle the initial sign-in state.
        setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          listUpcomingEvents();
        }
      });
  }

  function handleSignIn() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOut() {
    window.gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  }

  function listUpcomingEvents() {
    window.gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime',
      })
      .then((response) => {
        const items = response.result.items || [];
        const formatted = items.map((event) => ({
          id: event.id,
          title: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          allDay: !event.start.dateTime,
        }));
        setEvents(formatted);
      });
  }

  return (
    <div className="split-screen">
      <div className="top-half">
        {!signedIn ? (
          <div className="modal">
            <h2>Sign in to Google</h2>
            <button onClick={handleSignIn}>Sign in with Google</button>
          </div>
        ) : (
          <>
            <button onClick={handleSignOut} style={{ float: 'right' }}>
              Sign Out
            </button>
            <h2>Your Google Calendar</h2>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              style={{ height: 500, background: 'transparent' }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;