import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './..';

export type ProfileState = {
  username: string;
  role: 'admin' | 'user';
};

type AuthState = {
  token?: string;
  profile?: ProfileState;
};

const KEY_TOKEN = 'token';
const KEY_PROFILE = 'profile';

const initialState: AuthState = {
  token: localStorage.getItem(KEY_TOKEN) || undefined,
  profile: localStorage.getItem(KEY_PROFILE)
    ? JSON.parse(localStorage.getItem(KEY_PROFILE) || '')
    : undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; profile: ProfileState }>
    ) => {
      state.token = action.payload.token;
      localStorage.setItem(KEY_TOKEN, action.payload.token);

      state.profile = action.payload.profile;
      localStorage.setItem(KEY_PROFILE, JSON.stringify(action.payload.profile));
    },
    logout: (state) => {
      state.token = undefined;
      localStorage.removeItem(KEY_TOKEN);

      state.profile = undefined;
      localStorage.removeItem(KEY_PROFILE);
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectProfile = (state: RootState) => state.auth.profile;
export default authSlice.reducer;
