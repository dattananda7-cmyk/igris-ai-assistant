const express = require('express');
const router = express.Router();
const Memory = require('../../models/Memory');
const { authenticate } = require('../../middleware/auth');
const { AppError } = require('../../middleware/errorHandler');
const { formatSuccess } = require('../../utils/helpers');
const { HTTP_STATUS, ERROR_CODES, MEMORY_CATEGORY } = require('../../utils/constants');
const logger = require('../../utils/logger');

/**
 * POST /api/memories
 * Create a new memory
 */
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { category, key, value, importance, source } = req.body;

    if (!category || !key || !value) {
      throw new AppError(
        'Category, key, and value are required',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    const memory = new Memory({
      userId: req.userId,
      category,
      key,
      value,
      importance,
      source
    });

    await memory.save();
    logger.info(`Memory created: ${memory._id}`);

    res.status(HTTP_STATUS.CREATED).json(formatSuccess(memory, 'Memory saved'));
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/memories
 * List user memories
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { userId: req.userId };
    if (category) filter.category = category;

    const memories = await Memory.find(filter)
      .sort({ importance: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Memory.countDocuments(filter);

    res.json(formatSuccess({
      memories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }));
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/memories/:id
 * Delete a memory
 */
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const memory = await Memory.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!memory) {
      throw new AppError(
        'Memory not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    logger.info(`Memory deleted: ${req.params.id}`);
    res.json(formatSuccess(null, 'Memory deleted'));
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/memories/clear-all
 * Clear all user memories
 */
router.delete('/clear-all', authenticate, async (req, res, next) => {
  try {
    const result = await Memory.deleteMany({ userId: req.userId });
    logger.info(`All memories cleared for user: ${req.userId}`);

    res.json(formatSuccess({ deletedCount: result.deletedCount }, 'All memories cleared'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
