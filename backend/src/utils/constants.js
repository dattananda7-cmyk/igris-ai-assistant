// AI Modes
exports.AI_MODES = {
  NORMAL: 'normal',
  LEARN: 'learn',
  CREATE: 'create',
  CODE: 'code',
  RESEARCH: 'research',
  PLAN: 'plan',
  VISION: 'vision',
  BUILDER: 'builder'
};

// Task Status
exports.TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
};

// Task Priority
exports.TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Memory Categories
exports.MEMORY_CATEGORY = {
  PREFERENCE: 'preference',
  PROJECT: 'project',
  GOAL: 'goal',
  SKILL: 'skill',
  PERSONAL: 'personal'
};

// Memory Importance
exports.MEMORY_IMPORTANCE = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// File Types
exports.SUPPORTED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'text/plain'],
  TEXT: ['text/plain', 'text/markdown']
};

// Error Codes
exports.ERROR_CODES = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED'
};

// HTTP Status Codes
exports.HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};
