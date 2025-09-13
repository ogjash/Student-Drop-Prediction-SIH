import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

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
  },
  // google sheet links
  feesLink:{
    type: String,
    trim: true,
    match: /^(https?:\/\/)?(www\.)?docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+(\/.*)?$/
  },
  attendanceLink:{
    type: String,
    trim: true,
    match: /^(https?:\/\/)?(www\.)?docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+(\/.*)?$/
  },
  marksheetLink: {
    type: String,
    trim: true,
    match: /^(https?:\/\/)?(www\.)?docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+(\/.*)?$/
  },
  users:[{
    type: Types.ObjectId,
    ref: 'User',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const University = model('University', universitySchema);
