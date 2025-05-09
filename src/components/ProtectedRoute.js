import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to welcome page instead of login
    return <Navigate to="/welcome" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
