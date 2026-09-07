const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const { authenticate } = require('../../middleware/auth');
const { AppError } = require('../../middleware/errorHandler');
const { formatSuccess } = require('../../utils/helpers');
const { HTTP_STATUS, ERROR_CODES } = require('../../utils/constants');
const logger = require('../../utils/logger');

/**
 * POST /api/projects
 * Create a new project
 */
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { name, description, icon, color } = req.body;

    if (!name) {
      throw new AppError(
        'Project name is required',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    const project = new Project({
      userId: req.userId,
      name,
      description,
      metadata: { icon, color }
    });

    await project.save();
    logger.info(`Project created: ${project._id}`);

    res.status(HTTP_STATUS.CREATED).json(formatSuccess(project, 'Project created'));
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/projects
 * List all user projects
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const projects = await Project.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments({ userId: req.userId });

    res.json(formatSuccess({
      projects,
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
 * GET /api/projects/:id
 * Get project details
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate(['conversations', 'tasks']);

    if (!project) {
      throw new AppError(
        'Project not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    res.json(formatSuccess(project));
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/projects/:id
 * Update project
 */
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { name, description, icon, color } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        name,
        description,
        'metadata.icon': icon,
        'metadata.color': color
      },
      { new: true }
    );

    if (!project) {
      throw new AppError(
        'Project not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    res.json(formatSuccess(project, 'Project updated'));
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/projects/:id
 * Delete project
 */
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!project) {
      throw new AppError(
        'Project not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    logger.info(`Project deleted: ${req.params.id}`);
    res.json(formatSuccess(null, 'Project deleted'));
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/projects/:id/goals
 * Add goal to project
 */
router.post('/:id/goals', authenticate, async (req, res, next) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      throw new AppError(
        'Goal text is required',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $push: { goals: goal } },
      { new: true }
    );

    if (!project) {
      throw new AppError(
        'Project not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    res.json(formatSuccess(project, 'Goal added'));
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/projects/:id/goals/:goalIndex
 * Remove goal from project
 */
router.delete('/:id/goals/:goalIndex', authenticate, async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!project) {
      throw new AppError(
        'Project not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    project.goals.splice(req.params.goalIndex, 1);
    await project.save();

    res.json(formatSuccess(project, 'Goal removed'));
  } catch (error) {
    next(error);
  }
});

module.module.exports = router;
