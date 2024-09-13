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
      path: "/Friendsrate2.0/login",
      element: <RestrictedRoute redirectTo="/Friendsrate2.0/mainpage" component={LogPage} 
      
      />, 
    },
    {
      path: "/Friendsrate2.0/",
      element: (
        <PrivateRoute redirectTo="/Friendsrate2.0/login" component={SharedLayout} />
      ),
      children: [
        {
          path: "mainpage",
          element: (
            <PrivateRoute redirectTo="/Friendsrate2.0/login" component={MainPage} />
          ),
        },
        {
          path: "profile", 
          element: (
            <PrivateRoute redirectTo="/Friendsrate2.0/login" component={ProfilePage} />
          ),
        },
        {
          path: "settings", 
          element: (
            <PrivateRoute redirectTo="/Friendsrate2.0/login" component={SettingsPage } />
          ),
        },
        {
          path: "rating", 
          element: (
            <PrivateRoute redirectTo="/Friendsrate2.0/login" component={RatingPage} />
          ),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />; 
};

export default App;