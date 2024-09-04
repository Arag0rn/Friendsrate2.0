import { NonAuthState } from "./slice";


export const selectNonRegUser = (state: { nonauth: NonAuthState }) => state.nonauth.user;