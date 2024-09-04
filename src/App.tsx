import { useDispatch } from 'react-redux';
import './App.css'
import { useAuth } from './redux/Hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from './redux/Auth/operations';
import { Route, Routes } from 'react-router-dom';
import  { RestrictedRoute }  from "./RestrictedRoute.js";
import  { PrivateRoute } from "./PrivateRoute";


export const App =()=>{
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);


return isRefreshing ? (
  <b>Refreshing user...</b>
) : (
  <Routes>
  <Route path="/" element={<Layout/>}>
    <Route index element={<MainPage />} /> 
    <Route path="login"  element={
      <RestrictedRoute redirectTo="/contacts" component={<LogPage />}  />} />
    <Route path="registration"  element={
      <RestrictedRoute redirectTo="/contacts" component={<RegPage />}  />} />
    <Route path="/contacts" element={
      <PrivateRoute redirectTo="/login" component={<Contacts />} />} />
  </Route>
</Routes> 
);

}

export default App
