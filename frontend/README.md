# Lab Calendar App Frontend

A dark-themed web application for lab scheduling and event management, built with React and [react-big-calendar](https://github.com/jquense/react-big-calendar). Users can sign in with their Google account, view their personal and lab calendars, and propose or view "Hedge" events.

## Features

- **Dark theme** UI for comfortable viewing.
- **Google OAuth2** authentication (planned).
- **Week view calendar** with:
  - User's personal events (70% opacity).
  - Lab calendar events (100% opacity).
- **Upcoming Hedges**: View all upcoming hedge events in a modal.
- **Propose a Hedge**: Submit new hedge events to both the lab and personal calendars.
- **Responsive design** for desktop and mobile browsers.

## Tech Stack

- [React](https://react.dev/)
- [react-big-calendar](https://github.com/jquense/react-big-calendar)
- [Formik](https://formik.org/) for forms
- [Vercel](https://vercel.com/) for deployment

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/lab-calendar-app.git
cd lab-calendar-app
npm install
```

### Running Locally

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

### Deployment

Deploy the `build/` directory to [Vercel](https://vercel.com/) or your preferred static hosting provider.

## Customization

- **Calendar Integration:**  
  Integrate Google Calendar API and OAuth2 for real event data.
- **Styling:**  
  Modify `src/styles/theme.css` for custom dark theme styles.

## License

MIT