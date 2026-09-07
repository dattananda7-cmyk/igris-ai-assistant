const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false // Don't return password by default
    },
    profile: {
      fullName: String,
      avatar: String,
      bio: String,
      preferredName: String
    },
    preferences: {
      theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'dark'
      },
      language: {
        type: String,
        default: 'en'
      },
      voiceEnabled: {
        type: Boolean,
        default: true
      },
      voiceLanguage: {
        type: String,
        default: 'en-US'
      },
      memoryEnabled: {
        type: Boolean,
        default: true
      },
      notificationsEnabled: {
        type: Boolean,
        default: true
      }
    },
    subscription: {
      tier: {
        type: String,
        enum: ['free', 'pro', 'premium'],
        default: 'free'
      },
      expiresAt: Date
    },
    isVerified: {
      type: Boolean,
      default: false
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

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Method to get public user data
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
