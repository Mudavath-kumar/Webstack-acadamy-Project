import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user: authUser } = useSelector((state) => state.auth || {});
  const { user: firebaseUser } = useSelector((state) => state.firebaseAuth || {});
  const location = useLocation();

  // Check if user is logged in via either auth system
  const isAuthenticated = authUser || firebaseUser;

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
