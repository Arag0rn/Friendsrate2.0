import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import { NotFoundPage } from "./pages/NotFoundPage.js";

export const App = () => {
  const dispatch: Dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <b>Refreshing user...</b>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SharedLayout />, 
      children: [
        {
          path: "mainpage",
          element: (
            <PrivateRoute redirectTo="/login" component={<MainPage />} />
          ),
        },
        {
          path: "profile",
          element: (
            <PrivateRoute redirectTo="/login" component={<ProfilePage />} />
          ),
        },
        {
          path: "settings",
          element: (
            <PrivateRoute redirectTo="/login" component={<SettingsPage />} />
          ),
        },
        {
          path: "rating",
          element: (
            <PrivateRoute redirectTo="/login" component={<RatingPage />} />
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <RestrictedRoute redirectTo="/mainpage" component={<LogPage />} />
      ),
    },
    {
      path: "*", 
      element: <NotFoundPage />,
    },
  ]);


  return <RouterProvider router={router} />;
};

export default App;