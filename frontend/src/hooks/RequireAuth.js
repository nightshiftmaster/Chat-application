import { React, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthorizeProvider";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
