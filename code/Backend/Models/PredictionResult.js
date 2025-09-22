import mongoose from 'mongoose';

const PredictionResultSchema = new mongoose.Schema({
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  result: { type: Array, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Compound unique index for one doc per university per period
PredictionResultSchema.index(
  { university: 1, periodStart: 1, periodEnd: 1 },
  { unique: true }
);

export const PredictionResult = mongoose.model('PredictionResult', PredictionResultSchema);