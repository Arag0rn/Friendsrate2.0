import { useDispatch } from 'react-redux';
import './App.css'
import { useAuth } from './redux/Hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from './redux/Auth/operations';
import { Route, Routes } from 'react-router-dom';
import  { RestrictedRoute }  from "./RestrictedRoute.js";
import  { PrivateRoute } from "./PrivateRoute";
import { LogPage } from './pages/LogPage.js';
import { RegPage } from './pages/RegPage.js';
import { MainPage } from './pages/MainPage.js';
import { Dispatch } from './redux/store.js';



export const App =()=>{
  const dispatch: Dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);


return isRefreshing ? (
  <b>Refreshing user...</b>
) : (
  <Routes>
  <Route path="/" >
    <Route index  /> 
    <Route path="login"  element={
      <RestrictedRoute redirectTo="/contacts" component={<LogPage />}  />} />
    <Route path="registration"  element={
      <RestrictedRoute redirectTo="/contacts" component={<RegPage />}  />} />
    <Route path="/contacts" element={
      <PrivateRoute redirectTo="/login" component={<MainPage />} />} />
  </Route>
</Routes> 
);

}

export default App
