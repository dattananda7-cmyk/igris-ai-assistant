import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProjects,
  addProject,
  setCurrentProject,
  updateProject,
  deleteProject,
  setError,
  clearError,
} = projectSlice.actions;

export default projectSlice.reducer;
