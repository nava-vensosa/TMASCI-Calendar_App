import React, { createContext, useContext, useState } from 'react';

// Placeholder context for authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // For now, just a dummy state
  const [user, setUser] = useState(null);

  // Placeholder login/logout functions
  const login = () => setUser({ name: 'Demo User' });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =