const mongoose = require('mongoose');
const { AI_MODES } = require('../utils/constants');

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    },
    title: {
      type: String,
      default: 'New Conversation'
    },
    mode: {
      type: String,
      enum: Object.values(AI_MODES),
      default: AI_MODES.NORMAL
    },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    summary: String,
    metadata: {
      voiceInput: Boolean,
      voiceOutput: Boolean,
      modelUsed: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
conversationSchema.index({ userId: 1, createdAt: -1 });
conversationSchema.index({ projectId: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
