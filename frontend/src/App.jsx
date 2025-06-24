import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./theme.css";

// TODO: Replace these with your actual credentials from Google Cloud Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const localizer = momentLocalizer(moment);

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Wait for gapi to load before initializing
  useEffect(() => {
    function start() {
      window.gapi.load("client:auth2", initClient);
    }
    if (window.gapi) {
      start();
    } else {
      const interval = setInterval(() => {
        if (window.gapi) {
          start();
          clearInterval(interval);
        }
      }, 100);
    }
    // eslint-disable-next-line
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
        const authInstance = window.gapi.auth2.getAuthInstance();
        setSignedIn(authInstance.isSignedIn.get());
        console.log("Signed in?", authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen((isSignedIn) => {
            setSignedIn(isSignedIn);
            console.log("Sign-in state changed:", isSignedIn);
        });
        if (authInstance.isSignedIn.get()) {
            fetchEvents();
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

  function fetchEvents() {
    setLoading(true);
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date(moment().startOf("week")).toISOString(),
        timeMax: new Date(moment().endOf("week")).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 100,
        orderBy: "startTime",
      })
      .then((response) => {
        const items = response.result.items || [];
        const formatted = items.map((event) => ({
          id: event.id,
          title: event.summary || "(No Title)",
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          allDay: !event.start.dateTime,
        }));
        setEvents(formatted);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (signedIn) {
      fetchEvents();
    }
    // eslint-disable-next-line
  }, [signedIn]);

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#181a1b" }}>
      <h2 style={{ color: "#f5f6fa" }}>Google Calendar Week View</h2>
      {!signedIn ? (
        <div style={{ marginTop: 40 }}>
          <button onClick={handleSignIn} style={{ fontSize: 18, padding: "0.5em 1.5em" }}>
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleSignOut}
            style={{
              float: "right",
              marginBottom: 16,
              background: "#4f8cff",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "0.5em 1.2em",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
          {loading ? (
            <div style={{ color: "#b0b3b8", marginTop: 40 }}>Loading events...</div>
          ) : (
            <div style={{ height: 600, background: "#23272a", borderRadius: 8, padding: 12 }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                style={{ height: 550, color: "#f5f6fa" }}
                popup
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;