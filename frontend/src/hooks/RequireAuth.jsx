/* eslint-disable react/prop-types */
import { React, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthorizeProvider';

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (!user && !userId) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
