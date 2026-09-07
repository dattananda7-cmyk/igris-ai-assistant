const mongoose = require('mongoose');
const { MEMORY_CATEGORY, MEMORY_IMPORTANCE } = require('../utils/constants');

const memorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: Object.values(MEMORY_CATEGORY),
      required: true
    },
    key: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    importance: {
      type: String,
      enum: Object.values(MEMORY_IMPORTANCE),
      default: MEMORY_IMPORTANCE.MEDIUM
    },
    source: {
      type: String,
      description: 'Where this memory was created from'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

memorySchema.index({ userId: 1, category: 1 });
memorySchema.index({ userId: 1, importance: -1 });

module.exports = mongoose.model('Memory', memorySchema);
