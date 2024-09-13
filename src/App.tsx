import { useDispatch } from "react-redux";
import "./App.css";
import { useAuth } from "./redux/Hooks/useAuth";
import { useEffect } from "react";
import { refreshUser } from "./redux/Auth/operations";
import { Navigate, Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LogPage } from "./pages/LogPage.js";
import { MainPage } from "./pages/MainPage.js";
import SharedLayout from "./components/SharedLayout/SharedLayout.js";

import { SettingsPage } from "./pages/SettingsPage.js";
import { RatingPage } from "./pages/RatingPage.js";
import { Dispatch } from "./redux/store.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import ProfilePage from "./pages/ProfilePage.js";

export const App = () => {
  const dispatch: Dispatch = useDispatch();
  const { isLoggedIn, isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (

    <Routes>
    <Route path="/" element={<SharedLayout />}>

    {/* Public routes */}
    <Route
      path="/login"
      element={<RestrictedRoute redirectTo="/mainpage" component={LogPage} />}
    />

    {/* Private routes */}

      <Route
        path="mainpage"
        element={<PrivateRoute redirectTo="/login" component={MainPage} />}
      />
      <Route
        path="profile"
        element={<PrivateRoute redirectTo="/login" component={ProfilePage} />}
      />
      <Route
        path="settings"
        element={<PrivateRoute redirectTo="/login" component={SettingsPage} />}
      />
      <Route
        path="rating"
        element={<PrivateRoute redirectTo="/login" component={RatingPage} />}
      />
    </Route>

    {/* Redirect non-logged users to the login page by default */}
    <Route path="/" element={isLoggedIn ? <Navigate to="/mainpage" /> : <Navigate to="/login" />} />

    {/* 404 Page */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
};


export default App;
