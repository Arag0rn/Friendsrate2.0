import { useDispatch } from "react-redux";
import "./App.css";
import { useAuth } from "./redux/Hooks/useAuth";
import { useEffect } from "react";
import { refreshUser } from "./redux/Auth/operations";
import { Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LogPage } from "./pages/LogPage.js";
import { MainPage } from "./pages/MainPage.js";
import SharedLayout from "./components/SharedLayout/SharedLayout.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { SettingsPage } from "./pages/SettingsPage.js";
import { RatingPage } from "./pages/RatingPage.js";
import { Dispatch } from "./redux/store.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";

export const App = () => {
  const dispatch: Dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
<Routes>
  <Route
    index
    element={
      <RestrictedRoute redirectTo="/mainpage" component={LogPage} />
    }
  />

  <Route path="/" element={<SharedLayout />}>
    <Route
      path="mainpage"
      element={<PrivateRoute redirectTo="/" component={MainPage} />}
    />
    <Route
      path="profile"
      element={<PrivateRoute redirectTo="/" component={ProfilePage} />}
    />
    <Route
      path="settings"
      element={<PrivateRoute redirectTo="/" component={SettingsPage} />}
    />
    <Route
      path="rating"
      element={<PrivateRoute redirectTo="/" component={RatingPage} />}
    />
  </Route>
  
  <Route path="*" element={<NotFoundPage />} />
</Routes>
  );
};

export default App;
