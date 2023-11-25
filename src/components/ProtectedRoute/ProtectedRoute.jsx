import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {  LOGIN } from '../../routes/pageUrls';

const ProtectedRoute = ({ isAuthorized }) => {
  return isAuthorized ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default ProtectedRoute;
