export interface AuthState {
    email: string;
    username: string;
    token: string | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface SignupPayload {
    email: string;
    password: string;
    username: string;
  }
  
  export interface TokenData {
    access: string;
    refresh: string;
  }
  
  export interface UserData {
    email: string;
    username: string;
    _id: number;
  }
  