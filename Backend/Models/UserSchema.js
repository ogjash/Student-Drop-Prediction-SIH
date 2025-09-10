import { model, Schema, Types } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['owner', 'mod', 'user'],
    default: 'user'
  },
  university: {
    type: Types.ObjectId,
    ref: 'University',
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Compound index: ensures username is unique per university
userSchema.index({ university: 1, username: 1 }, { unique: true });

export const User = model('User', userSchema)