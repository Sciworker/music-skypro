import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, refreshTokenAction } from './asyncActions';
import { AuthState } from './types';

const initialState: AuthState = {
  email: '',
  username: '',
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.username = '';
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('userData');
      sessionStorage.clear();
    },
    initializeAuth: (state) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        state.email = parsedUserData.email;
        state.username = parsedUserData.username;
        state.token = parsedUserData.token;
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.access;
      state.isLoggedIn = true;
      state.error = null;

      localStorage.setItem(
        'userData',
        JSON.stringify({
          email: action.payload.email,
          username: action.payload.username,
          token: action.payload.access,
        })
      );
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.error = null;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(refreshTokenAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.access;
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        parsedUserData.token = action.payload.access;
        localStorage.setItem('userData', JSON.stringify(parsedUserData));
      }
      state.error = null;
    });
    builder.addCase(refreshTokenAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
