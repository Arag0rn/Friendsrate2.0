import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
 
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,

} from '../Auth/selector';
import { selectNonRegUser } from '../Unregistred/selector';


export const useAuth = () => {
  const isLoggedIn = useSelector((state: State) => selectIsLoggedIn(state)); 
  const isRefreshing = useSelector((state: State) => selectIsRefreshing(state)); 
  const user = useSelector((state: State) => selectUser(state)); 
  const unrUser = useSelector((state: State) => selectNonRegUser(state));
  return {
    isLoggedIn,
    isRefreshing,
    user,
    unrUser,
  };
};