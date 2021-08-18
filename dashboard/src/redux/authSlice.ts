import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number | null;
  first_name: string;
  last_name: string;
  email: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSuccess: (state: any, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state: any) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
