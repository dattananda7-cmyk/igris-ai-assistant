import { createSlice } from '@reduxjs/toolkit';
import { colors } from '../../theme/colors';

const initialState = {
  theme: 'dark',
  language: 'en',
  voiceEnabled: true,
  memoryEnabled: true,
  notificationsEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setVoiceEnabled: (state, action) => {
      state.voiceEnabled = action.payload;
    },
    setMemoryEnabled: (state, action) => {
      state.memoryEnabled = action.payload;
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload;
    },
    updateSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setTheme,
  setLanguage,
  setVoiceEnabled,
  setMemoryEnabled,
  setNotificationsEnabled,
  updateSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
