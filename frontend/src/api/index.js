import client from './client';

export const authAPI = {
  register: (email, username, password, fullName) =>
    client.post('/auth/register', { email, username, password, fullName }),

  login: (email, password) =>
    client.post('/auth/login', { email, password }),

  refresh: (refreshToken) =>
    client.post('/auth/refresh', { refreshToken }),

  me: () => client.get('/auth/me'),

  updateProfile: (profileData) =>
    client.put('/auth/profile', profileData),

  updatePreferences: (preferences) =>
    client.put('/auth/preferences', preferences),

  logout: () => client.post('/auth/logout'),
};

export const chatAPI = {
  createConversation: (title, mode) =>
    client.post('/chat/conversations', { title, mode }),

  getConversations: (page = 1, limit = 20) =>
    client.get('/chat/conversations', { params: { page, limit } }),

  getConversation: (id) =>
    client.get(`/chat/conversations/${id}`),

  sendMessage: (conversationId, content, contentType = 'text', attachments = []) =>
    client.post(`/chat/conversations/${conversationId}/messages`, {
      content,
      contentType,
      attachments,
    }),

  getMessages: (conversationId, page = 1, limit = 50) =>
    client.get(`/chat/conversations/${conversationId}/messages`, {
      params: { page, limit },
    }),

  renameConversation: (id, title) =>
    client.put(`/chat/conversations/${id}`, { title }),

  deleteConversation: (id) =>
    client.delete(`/chat/conversations/${id}`),
};

export const projectsAPI = {
  createProject: (name, description, icon, color) =>
    client.post('/projects', { name, description, icon, color }),

  getProjects: (page = 1, limit = 20) =>
    client.get('/projects', { params: { page, limit } }),

  getProject: (id) => client.get(`/projects/${id}`),

  updateProject: (id, data) =>
    client.put(`/projects/${id}`, data),

  deleteProject: (id) => client.delete(`/projects/${id}`),

  addGoal: (id, goal) =>
    client.post(`/projects/${id}/goals`, { goal }),

  removeGoal: (id, goalIndex) =>
    client.delete(`/projects/${id}/goals/${goalIndex}`),
};

export const tasksAPI = {
  createTask: (title, description, priority, dueDate, projectId) =>
    client.post('/tasks', {
      title,
      description,
      priority,
      dueDate,
      projectId,
    }),

  getTasks: (status, priority, page = 1, limit = 20) =>
    client.get('/tasks', { params: { status, priority, page, limit } }),

  getTask: (id) => client.get(`/tasks/${id}`),

  updateTask: (id, data) =>
    client.put(`/tasks/${id}`, data),

  deleteTask: (id) => client.delete(`/tasks/${id}`),
};

export const memoriesAPI = {
  createMemory: (category, key, value, importance, source) =>
    client.post('/memories', {
      category,
      key,
      value,
      importance,
      source,
    }),

  getMemories: (category, page = 1, limit = 20) =>
    client.get('/memories', { params: { category, page, limit } }),

  deleteMemory: (id) => client.delete(`/memories/${id}`),

  clearAllMemories: () =>
    client.delete('/memories/clear-all'),
};
