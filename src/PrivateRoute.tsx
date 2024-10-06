import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './redux/Hooks/useAuth';



interface PrivateRouteProps {
    element?: React.ReactNode;
    redirectTo?: string;
    children?: React.ReactNode;
  }



  export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, children }) => {
    const { isLoggedIn, isRefreshing, isRehydrated  } = useAuth(); 
    const location = useLocation()
    console.log(location);
    

    if (!isRehydrated || isRefreshing) {
      return <p>Loading...</p>;
    }
  
  
    const shouldRedirect = !isLoggedIn && !isRefreshing;
  
    return shouldRedirect ? <Navigate to={location} state={{from: location}}/> :  <>{element}{children}</>;
  };