import { useDispatch } from 'react-redux';
import './App.css'
import { useAuth } from './redux/Hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from './redux/Auth/operations';
import { Route, Routes } from 'react-router-dom';
import  { RestrictedRoute }  from "./RestrictedRoute";
import  { PrivateRoute } from "./PrivateRoute";
import { LogPage } from './pages/LogPage.js';
import { RegPage } from './pages/RegPage.js';
import { MainPage } from './pages/MainPage.js';
import SharedLayout from './components/SharedLayout/SharedLayout.js';

import { SettingsPage } from './pages/SettingsPage.js';
import { RatingPage } from './pages/RatingPage.js';
import { Dispatch } from './redux/store.js';
import ProfilePage from './pages/ProfilePage.js';



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
      {/* <Route
        path="/"
        
        element={<PrivateRoute redirectTo="/login" component={SharedLayout} />}
      > */}
            {/* <Route
          path="mainpage"
          element={<PrivateRoute redirectTo="/login" component={MainPage} />}
        /> */}
<Route path="/" element={<SharedLayout />}>
        {/* Публічні сторінки */}
        <Route path="mainpage" element={<MainPage />} />
          <Route path="profile" element={<  ProfilePage  />} />
        {/* <Route
          path="profile"
          element={<PrivateRoute redirectTo="/login" component={ProfilePage} />}
        /> */}
        <Route
          path="settings"
          element={<PrivateRoute redirectTo="/login" component={SettingsPage} />}
        />
        <Route
          path="rating"
          element={<PrivateRoute redirectTo="/login" component={RatingPage} />}
        />
      </Route>

      <Route
        path="/login"
        element={<RestrictedRoute redirectTo="/mainpage" component={LogPage} />}
      />
      <Route
        path="/registration"
        element={<RestrictedRoute redirectTo="/mainpage" component={<RegPage />} />}
      />
    </Routes>
);

}

export default App
