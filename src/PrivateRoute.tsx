import { Navigate } from 'react-router-dom';
import { useAuth } from './redux/Hooks/useAuth';


interface PrivateRouteProps {
    element?: React.ReactNode;
    redirectTo?: string;
  }



export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : element;
};