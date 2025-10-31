import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const HostRoute = ({ children }) => {
  const { user: authUser } = useSelector((state) => state.auth || {});
  const { user: firebaseUser } = useSelector((state) => state.firebaseAuth || {});
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in via either auth system
  const user = authUser || firebaseUser;
  const isAuthenticated = !!user;

  useEffect(() => {
    if (isAuthenticated && user.role !== 'host' && user.role !== 'admin') {
      toast.error('Access denied. Host account required to view this page.');
    }
  }, [isAuthenticated, user]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if authenticated but not a host/admin
  if (user.role !== 'host' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default HostRoute;
