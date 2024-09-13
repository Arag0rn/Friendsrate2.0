import { Navigate } from 'react-router-dom';

import React from 'react';
import { useAuth } from './redux/Hooks/useAuth';

interface RestrictedRouteProps {
  element?: React.ReactNode;
  redirectTo?: string;
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ element, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : <>{element}</>;
};