import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useStore from '../store/store';

const ProtectedRoute = ({ allowedRoles}) => {
    const {userRole}=useStore();

  // Check if the user's role is allowed to access the route
  const isAuthorized = allowedRoles.includes(userRole);
  console.log("userRole",userRole);

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
