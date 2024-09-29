import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload, SignupPayload, TokenData, UserData } from './types';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Registration failed');
      }

      const data: UserData = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('An error occurred during registration');
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: LoginPayload, { rejectWithValue }) => {
    try {
      const tokenResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!tokenResponse.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const errorData = await tokenResponse.json();
        return rejectWithValue(errorData.message || 'Authorization error');
      }

      const tokenData: TokenData = await tokenResponse.json();

      localStorage.setItem('accessToken', tokenData.access);
      localStorage.setItem('refreshToken', tokenData.refresh);

      const userResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenData.access}`,
        },
        body: JSON.stringify(userData),
      });

      if (!userResponse.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const errorData = await userResponse.json();
        return rejectWithValue(errorData.message || 'Ошибка получения данных пользователя');
      }

      const userDataResult: UserData = await userResponse.json();

      return {
        email: userDataResult.email,
        username: userDataResult.username,
        access: tokenData.access,
      };

    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue('An error occurred during authorization');
    }
  }
);

export const refreshTokenAction = createAsyncThunk(
  'auth/refreshToken',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to refresh token');
      }

      const data: TokenData = await response.json();

      localStorage.setItem('accessToken', data.access);
      return data;
    } catch (error) {
      console.error('Refresh token error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue('Error refreshing token');
    }
  }
);
