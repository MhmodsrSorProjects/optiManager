import React, { createContext, useContext, useState, useEffect } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook for using the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap your application and provide the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for a saved user on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set the saved user to state
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
