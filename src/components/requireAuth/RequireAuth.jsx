import React, { useContext } from "react";
// import AuthContext from "./context/AuthProvider/";
import AuthContext from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.access_token) {
    return <Navigate to="login" replace />;
  }
  return children;
};

export const RequireReset = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.details) {
    return <Navigate to="/forgot-password" replace />;
  }
  return children;
};
