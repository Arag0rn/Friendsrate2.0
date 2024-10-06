import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "./redux/Hooks/useAuth";
import { refreshUser } from "./redux/Auth/operations";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { Dispatch } from "./redux/store.js";
import SharedLayout from "./components/SharedLayout/SharedLayout.js";
import { MainPage } from "./pages/MainPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import { SettingsPage } from "./pages/SettingsPage.js";
import { RatingPage } from "./pages/RatingPage.js";
import { LogPage } from "./pages/LogPage.js";
import { ConnectPage } from "./pages/ConnectPage.js";
import { RoomProvider } from "./components/Context/RoomContext.js";
import ChatRoom from "./pages/ChatRoom.js";

export const App = () => {
  const dispatch: Dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !isRefreshing) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

  return (
    <>
      <Routes>
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
                <RoomProvider>
                  <ConnectPage />
                </RoomProvider>
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
          path="/chatRoom/:id"
          element={
            <PrivateRoute redirectTo="signin">
              <RoomProvider>
                <ChatRoom />
              </RoomProvider>
            </PrivateRoute>
          }
        />

        <Route
          path="/signin"
          index
          element={<RestrictedRoute redirectTo="/mainpage" element={<LogPage />} />}
        />
      </Routes>
    </>
  );
};

export default App;
