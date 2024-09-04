import { AuthState } from "./slice";

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export const selectIsRefreshing = (state: { auth: AuthState }) => state.auth.isRefreshing;
