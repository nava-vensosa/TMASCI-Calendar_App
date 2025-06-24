import React from 'react';

const AuthPrompt = () => (
  <div className="modal">
    <h2>Sign in Required</h2>
    <p>
      Please sign in with your Google account to access the Lab Calendar App.
    </p>
    <button disabled>
      Sign in with Google (Coming Soon)
    </button>
  </div>
);

export default AuthPrompt;