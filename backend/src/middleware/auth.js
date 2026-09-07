const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { AppError } = require('./errorHandler');
const { ERROR_CODES, HTTP_STATUS } = require('../utils/constants');
const logger = require('../utils/logger');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(
        'Authentication token required',
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.AUTH_REQUIRED
      );
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    if (error.statusCode) {
      return next(error);
    }
    logger.error('Authentication error:', error);
    next(new AppError(
      'Invalid authentication token',
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_TOKEN
    ));
  }
};

const refreshTokenHandler = (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken || req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        'Refresh token required',
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_TOKEN
      );
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    logger.error('Refresh token error:', error);
    next(new AppError(
      'Invalid refresh token',
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_TOKEN
    ));
  }
};

module.exports = { authenticate, refreshTokenHandler };
