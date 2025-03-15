import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './..';

type AppState = {
  initialized: boolean;
};

const initialState: AppState = { initialized: false };

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: (state) => {
      state.initialized = true;
    },
  },
});

export const { init } = appSlice.actions;
export const selectIsInit = (state: RootState) => state.app.initialized;
export default appSlice.reducer;
