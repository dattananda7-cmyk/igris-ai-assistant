const crypto = require('crypto');

/**
 * Generate a unique ID
 */
exports.generateId = () => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * Format error response
 */
exports.formatError = (message, code = 'SERVER_ERROR', statusCode = 500, details = {}) => {
  return {
    success: false,
    error: message,
    code,
    statusCode,
    details,
    timestamp: new Date().toISOString()
  };
};

/**
 * Format success response
 */
exports.formatSuccess = (data = null, message = 'Success') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * Validate email format
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate string to specified length
 */
exports.truncate = (str, length = 100) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

/**
 * Sanitize user input to prevent XSS
 */
exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Convert MongoDB ID to string
 */
exports.toObjectId = (id) => {
  const mongoose = require('mongoose');
  return new mongoose.Types.ObjectId(id);
};
