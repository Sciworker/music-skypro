import { RootState } from '../store';

export const selectAuthState = (state: RootState) => state.auth;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
