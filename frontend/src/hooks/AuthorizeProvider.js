import { React, useState, createContext } from "react";

const AuthContext = createContext(null);

const AuthorizeProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthorizeProvider, AuthContext };
