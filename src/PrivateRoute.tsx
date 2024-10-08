import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './redux/Hooks/useAuth';



interface PrivateRouteProps {
    element?: React.ReactNode;
    redirectTo?: string;
    children?: React.ReactNode;
  }



  export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, children,  redirectTo = '/'  }) => {
    const { isLoggedIn, isRefreshing,  } = useAuth(); 
    const location = useLocation()
    

    if ( isRefreshing) {
      return <p>Loading...</p>;
    }
  
  
    const shouldRedirect = !isLoggedIn && !isRefreshing;
  
    return shouldRedirect ? <Navigate to={redirectTo}/> :  <>{element}{children}</>;
  };