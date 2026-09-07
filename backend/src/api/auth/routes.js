const express = require('express');
const { z } = require('zod');
const router = express.Router();
const User = require('../../models/User');
const { authenticate } = require('../../middleware/auth');
const { validate } = require('../../middleware/validation');
const { AppError } = require('../../middleware/errorHandler');
const { formatSuccess, formatError, isValidEmail } = require('../../utils/helpers');
const { ERROR_CODES, HTTP_STATUS } = require('../../utils/constants');
const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const logger = require('../../utils/logger');

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
});

/**
 * Generate JWT tokens
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRE }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRE }
  );

  return { accessToken, refreshToken };
};

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { email, username, password, fullName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      throw new AppError(
        existingUser.email === email ? 'Email already registered' : 'Username already taken',
        HTTP_STATUS.CONFLICT,
        ERROR_CODES.EMAIL_EXISTS
      );
    }

    // Create new user
    const user = new User({
      email,
      username,
      passwordHash: password,
      profile: {
        fullName,
        preferredName: fullName?.split(' ')[0] || username
      }
    });

    await user.save();
    logger.info(`New user registered: ${email}`);

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(HTTP_STATUS.CREATED).json(formatSuccess({
      user: user.toJSON(),
      accessToken,
      refreshToken
    }, 'Registration successful'));
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      throw new AppError(
        'Invalid credentials',
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_CREDENTIALS
      );
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError(
        'Invalid credentials',
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_CREDENTIALS
      );
    }

    logger.info(`User logged in: ${email}`);
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.json(formatSuccess({
      user: user.toJSON(),
      accessToken,
      refreshToken
    }, 'Login successful'));
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', validate(refreshTokenSchema), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError(
        'User not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    const tokens = generateTokens(user._id);

    res.json(formatSuccess(tokens, 'Token refreshed'));
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new AppError(
        'User not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    res.json(formatSuccess(user.toJSON()));
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/auth/profile
 * Update user profile
 */
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const { fullName, avatar, bio, preferredName } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      throw new AppError(
        'User not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    if (fullName) user.profile.fullName = fullName;
    if (avatar) user.profile.avatar = avatar;
    if (bio) user.profile.bio = bio;
    if (preferredName) user.profile.preferredName = preferredName;

    await user.save();
    logger.info(`User profile updated: ${user.email}`);

    res.json(formatSuccess(user.toJSON(), 'Profile updated'));
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/auth/preferences
 * Update user preferences
 */
router.put('/preferences', authenticate, async (req, res, next) => {
  try {
    const { theme, language, voiceEnabled, memoryEnabled, notificationsEnabled } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      throw new AppError(
        'User not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    if (theme) user.preferences.theme = theme;
    if (language) user.preferences.language = language;
    if (voiceEnabled !== undefined) user.preferences.voiceEnabled = voiceEnabled;
    if (memoryEnabled !== undefined) user.preferences.memoryEnabled = memoryEnabled;
    if (notificationsEnabled !== undefined) user.preferences.notificationsEnabled = notificationsEnabled;

    await user.save();
    logger.info(`User preferences updated: ${user.email}`);

    res.json(formatSuccess(user.toJSON(), 'Preferences updated'));
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', authenticate, (req, res) => {
  logger.info(`User logged out: ${req.userId}`);
  res.json(formatSuccess(null, 'Logged out successfully'));
});

module.exports = router;
