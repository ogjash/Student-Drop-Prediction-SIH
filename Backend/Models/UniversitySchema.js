const { Schema, model, Types } = require('mongoose');

const universitySchema = new Schema({
  name: { type: String },
  domain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const University = model('University', universitySchema);
