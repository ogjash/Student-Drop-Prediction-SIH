import mongoose from 'mongoose';

const PredictionResultSchema = new mongoose.Schema({
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  result: { type: mongoose.Schema.Types.Mixed, required: true },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

PredictionResultSchema.index({ periodStart: 1, periodEnd: 1 }, { unique: true });

export const PredictionResult = mongoose.model('PredictionResult', PredictionResultSchema);