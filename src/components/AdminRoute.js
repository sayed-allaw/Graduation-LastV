import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute component to protect admin-only routes
 * Redirects to dashboard if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
