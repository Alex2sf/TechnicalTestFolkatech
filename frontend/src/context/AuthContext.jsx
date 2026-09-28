import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('folkatech_token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('folkatech_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (authToken, userData = null) => {
    localStorage.setItem('folkatech_token', authToken);
    setToken(authToken);
    if (userData) {
      localStorage.setItem('folkatech_user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('folkatech_token');
    localStorage.removeItem('folkatech_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
