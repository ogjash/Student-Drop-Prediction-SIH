import mongoose from 'mongoose';

const PredictionResultSchema = new mongoose.Schema({
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  result: { type: Array, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export const PredictionResult = mongoose.model('PredictionResult', PredictionResultSchema);