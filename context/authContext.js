import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
