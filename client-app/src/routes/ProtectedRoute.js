import { Navigate } from "react-router-dom";
import React from "react";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn === null || isLoggedIn === undefined) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
