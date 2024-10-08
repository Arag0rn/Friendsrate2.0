import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "./redux/Auth/operations";
import SharedLayout from "./components/SharedLayout/SharedLayout.js";
import { MainPage } from "./pages/MainPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import { SettingsPage } from "./pages/SettingsPage.js";
import { RatingPage } from "./pages/RatingPage.js";
import { LogPage } from "./pages/LogPage.js";
import { ConnectPage } from "./pages/ConnectPage.js";
import ChatRoom from "./pages/ChatRoom.js";
import { RestrictedRoute } from "./RestrictedRoute.js";
import { PrivateRoute } from "./PrivateRoute.js";
import { Redirect } from "./components/Auth/SignIn/Redirect.js";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(refreshUser());

  }, [dispatch]);

  return (
    <>
      <Routes>
      <Route
            path="/current/:accessToken"
            element={
             <Redirect />
            }
          />



        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="signin" element={<SharedLayout />} />
          }
        >
          <Route
            path="/mainpage"
            element={
              <PrivateRoute redirectTo="signin" element={<MainPage />} />
            }
          />
          <Route
            path="/connect"
            element={
              <PrivateRoute redirectTo="signin">
                  <ConnectPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="signin" element={<ProfilePage />} />
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute redirectTo="signin" element={<SettingsPage />} />
            }
          />
          <Route
            path="/rating"
            element={
              <PrivateRoute redirectTo="signin" element={<RatingPage />} />
            }
          />
        </Route>

        <Route
          path="/signin"
          index
          element={<RestrictedRoute redirectTo="/mainpage" element={<LogPage />} />}
        />

      <Route
          path="/chatRoom/:id"
          element={
            <PrivateRoute redirectTo="signin">
                <ChatRoom />
            </PrivateRoute>
          }
        />

      </Routes>

    </>
  );
};

export default App;