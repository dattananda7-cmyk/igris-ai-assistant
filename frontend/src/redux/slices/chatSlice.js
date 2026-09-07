import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,
  isGenerating: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setGenerating: (state, action) => {
      state.isGenerating = action.payload;
    },
    deleteConversation: (state, action) => {
      state.conversations = state.conversations.filter(
        (c) => c._id !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
      state.messages = [];
      state.currentConversation = null;
      state.isGenerating = false;
    },
  },
});

export const {
  setLoading,
  setConversations,
  addConversation,
  setCurrentConversation,
  setMessages,
  addMessage,
  setGenerating,
  deleteConversation,
  setError,
  clearError,
  reset,
} = chatSlice.actions;

export default chatSlice.reducer;
