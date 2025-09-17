import cron from 'node-cron';
import { PredictionResult } from '../Models/PredictionResult.js';
import { predictDropoutForAllUniversities } from '../Controllers/prediction.controller.js';

// Runs every 2 weeks on Monday at 2am
cron.schedule('0 2 * * 1', async () => {
  const now = new Date();
  const period = getCurrentBiweeklyPeriod(now);
  await predictDropoutForAllUniversities(period);
  console.log('Biweekly prediction job executed:', period);
});

// Helper to get current biweekly period
function getCurrentBiweeklyPeriod(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let periodStart, periodEnd;
  if (day <= 15) {
    periodStart = new Date(year, month, 1);
    periodEnd = new Date(year, month, 15, 23, 59, 59, 999);
  } else {
    periodStart = new Date(year, month, 16);
    periodEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
  }
  return { periodStart, periodEnd };
}

export { getCurrentBiweeklyPeriod };