/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  React, useState, createContext,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const AuthorizeProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currLocation = location.state ? location.state.from.pathname : '/';

  const login = (response) => {
    const { username, token } = response;
    if (username && token) {
      setUser(username);
      localStorage.setItem('userId', JSON.stringify(response));
      navigate(currLocation);
    }
    return '';
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const userId = JSON.parse(localStorage.getItem('userId'));

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${userId.token}` },
  });

  // const value = useMemo(
  //   () => ({
  //     login, logout, user, setUser,
  //   }),
  //   [],
  // );
  return (
    <AuthContext.Provider value={{
      login, logout, user, userId, getAuthHeaders, setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthorizeProvider, AuthContext };
