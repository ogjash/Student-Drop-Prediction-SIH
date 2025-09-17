import cron from 'node-cron';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import { predictDropoutForAllUniversities } from '../Controllers/prediction.controller.js';

// Explicitly load .env from Backend directory
dotenv.config({ path: '../.env' });

await connectDB();

// Runs every 2 weeks on Monday at 2am
// for testing, runs every minute '* * * * *'
// for production, use '0 2 * * 1' (2 AM every Monday)
// for every 1st and 16th of the month at 2am '0 2 1,16 * *'
cron.schedule('* * * * *', async () => {
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