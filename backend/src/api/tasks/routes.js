const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const { authenticate } = require('../../middleware/auth');
const { AppError } = require('../../middleware/errorHandler');
const { formatSuccess } = require('../../utils/helpers');
const { HTTP_STATUS, ERROR_CODES, TASK_STATUS, TASK_PRIORITY } = require('../../utils/constants');
const logger = require('../../utils/logger');

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, projectId } = req.body;

    if (!title) {
      throw new AppError(
        'Task title is required',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    const task = new Task({
      userId: req.userId,
      projectId,
      title,
      description,
      priority: priority || TASK_PRIORITY.MEDIUM,
      dueDate
    });

    await task.save();
    logger.info(`Task created: ${task._id}`);

    res.status(HTTP_STATUS.CREATED).json(formatSuccess(task, 'Task created'));
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tasks
 * List user tasks with filters
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { userId: req.userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(filter);

    res.json(formatSuccess({
      tasks,
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
 * GET /api/tasks/:id
 * Get task details
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      throw new AppError(
        'Task not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    res.json(formatSuccess(task));
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/tasks/:id
 * Update task
 */
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        title,
        description,
        status,
        priority,
        dueDate,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!task) {
      throw new AppError(
        'Task not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    res.json(formatSuccess(task, 'Task updated'));
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete task
 */
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      throw new AppError(
        'Task not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    logger.info(`Task deleted: ${req.params.id}`);
    res.json(formatSuccess(null, 'Task deleted'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
