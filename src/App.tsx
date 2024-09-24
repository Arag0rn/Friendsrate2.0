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
		<>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute redirectTo="/signin" element={<SharedLayout />} />
					}
				>
					<Route
						path="/mainpage"
						element={
							<PrivateRoute redirectTo="/signin" element={<MainPage />} />
						}
					/>
					<Route
						path="/profile"
						element={
							<PrivateRoute redirectTo="/signin" element={<ProfilePage />} />
						}
					/>
					<Route
						path="/settings"
						element={
							<PrivateRoute redirectTo="/signin" element={<SettingsPage />} />
						}
					/>
					<Route
						path="/rating"
						element={
							<PrivateRoute redirectTo="/signin" element={<RatingPage />} />
						}
					/>
				</Route>
				<Route
					path="/signin"
					index
					element={<RestrictedRoute redirectTo="/" element={<LogPage />} />}
				/>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default App;
