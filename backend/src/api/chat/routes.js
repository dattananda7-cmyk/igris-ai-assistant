const express = require('express');
const { z } = require('zod');
const router = express.Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const { authenticate } = require('../../middleware/auth');
const { validate } = require('../../middleware/validation');
const { AppError } = require('../../middleware/errorHandler');
const { formatSuccess } = require('../../utils/helpers');
const { AI_MODES, HTTP_STATUS, ERROR_CODES } = require('../../utils/constants');
const { sendMessage } = require('../../config/ai-client');
const logger = require('../../utils/logger');

const createConversationSchema = z.object({
  title: z.string().optional(),
  mode: z.enum(Object.values(AI_MODES)).optional()
});

const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  contentType: z.enum(['text', 'image', 'file', 'code']).optional(),
  attachments: z.array(z.object({
    type: z.string(),
    url: z.string(),
    fileName: z.string().optional()
  })).optional()
});

/**
 * POST /api/chat/conversations
 * Create a new conversation
 */
router.post('/conversations', authenticate, validate(createConversationSchema), async (req, res, next) => {
  try {
    const { title, mode } = req.body;

    const conversation = new Conversation({
      userId: req.userId,
      title: title || 'New Conversation',
      mode: mode || AI_MODES.NORMAL,
      messages: []
    });

    await conversation.save();
    logger.info(`Conversation created: ${conversation._id}`);

    res.status(HTTP_STATUS.CREATED).json(formatSuccess(conversation, 'Conversation created'));
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/chat/conversations
 * List all user conversations
 */
router.get('/conversations', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find({ userId: req.userId })
      .sort({ lastAccessedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('messages', 'role content createdAt');

    const total = await Conversation.countDocuments({ userId: req.userId });

    res.json(formatSuccess({
      conversations,
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
 * GET /api/chat/conversations/:id
 * Get conversation details
 */
router.get('/conversations/:id', authenticate, async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate('messages');

    if (!conversation) {
      throw new AppError(
        'Conversation not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    // Update last accessed time
    conversation.lastAccessedAt = new Date();
    await conversation.save();

    res.json(formatSuccess(conversation));
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/chat/conversations/:id/messages
 * Send a message and get AI response
 */
router.post('/conversations/:id/messages', authenticate, validate(sendMessageSchema), async (req, res, next) => {
  try {
    const { content, contentType = 'text', attachments = [] } = req.body;

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate('messages');

    if (!conversation) {
      throw new AppError(
        'Conversation not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    // Save user message
    const userMessage = new Message({
      conversationId: conversation._id,
      userId: req.userId,
      role: 'user',
      content,
      contentType,
      attachments
    });

    await userMessage.save();
    conversation.messages.push(userMessage._id);

    // Get AI response
    try {
      const messages = conversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })).concat([{ role: 'user', content }]);

      const aiResponse = await sendMessage(messages, {
        temperature: 0.7,
        max_tokens: 2000
      });

      // Save AI message
      const assistantMessage = new Message({
        conversationId: conversation._id,
        userId: req.userId,
        role: 'assistant',
        content: aiResponse
      });

      await assistantMessage.save();
      conversation.messages.push(assistantMessage._id);
      conversation.updatedAt = new Date();

      await conversation.save();
      logger.info(`Message sent in conversation: ${conversation._id}`);

      res.status(HTTP_STATUS.CREATED).json(formatSuccess({
        userMessage: userMessage.toObject(),
        assistantMessage: assistantMessage.toObject()
      }, 'Message sent'));
    } catch (aiError) {
      logger.error('AI API Error:', aiError);
      throw new AppError(
        'Failed to get AI response. Please try again.',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.SERVER_ERROR
      );
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/chat/conversations/:id/messages
 * Get conversation messages with pagination
 */
router.get('/conversations/:id/messages', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!conversation) {
      throw new AppError(
        'Conversation not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    const messages = await Message.find({ conversationId: req.params.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments({ conversationId: req.params.id });

    res.json(formatSuccess({
      messages: messages.reverse(),
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
 * PUT /api/chat/conversations/:id
 * Rename conversation
 */
router.put('/conversations/:id', authenticate, async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      throw new AppError(
        'Title is required',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title },
      { new: true }
    );

    if (!conversation) {
      throw new AppError(
        'Conversation not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    res.json(formatSuccess(conversation, 'Conversation renamed'));
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/chat/conversations/:id
 * Delete conversation and its messages
 */
router.delete('/conversations/:id', authenticate, async (req, res, next) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!conversation) {
      throw new AppError(
        'Conversation not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    // Delete associated messages
    await Message.deleteMany({ conversationId: req.params.id });
    logger.info(`Conversation deleted: ${req.params.id}`);

    res.json(formatSuccess(null, 'Conversation deleted'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
