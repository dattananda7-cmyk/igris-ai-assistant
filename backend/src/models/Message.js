const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      enum: ['text', 'image', 'file', 'code'],
      default: 'text'
    },
    attachments: [{
      type: {
        type: String,
        enum: ['image', 'file', 'code']
      },
      url: String,
      fileName: String,
      mimeType: String
    }],
    metadata: {
      voiceInput: Boolean,
      voiceOutput: Boolean,
      modelUsed: String,
      tokensUsed: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for efficient querying
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ userId: 1 });

module.exports = mongoose.model('Message', messageSchema);
