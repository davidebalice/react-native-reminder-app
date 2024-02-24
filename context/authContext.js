import React, { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [reload, setReload] = useState(0);

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setAuthToken("");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ token, setAuthToken, reload, setReload, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
