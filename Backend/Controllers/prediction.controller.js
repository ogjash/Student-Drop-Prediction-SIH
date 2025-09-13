
import { PredictionResult } from '../Models/PredictionResult.js';
import { getCurrentBiweeklyPeriod } from '../cron/biweeklyPrediction.js';
import { University } from '../Models/UniversitySchema.js';


// Normal prediction route with biweekly caching
export const predictDropout = async (req, res) => {
    const { universityId } = req.body;
    if (!universityId) {
        return res.status(400).json({ message: 'universityId is required' });
    }
    try {
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        const { feesLink, attendanceLink, marksheetLink } = university;
        if (!feesLink || !attendanceLink || !marksheetLink) {
            return res.status(400).json({ message: 'University does not have all required data links' });
        }

        // Get current biweekly period
        const { periodStart, periodEnd } = getCurrentBiweeklyPeriod();
        // Check if prediction exists for this period
        let prediction = await PredictionResult.findOne({ periodStart, periodEnd, university: universityId });
        if (prediction) {
            return res.json({ dropoutRate: prediction.result.dropoutRate, cached: true });
        }

        // ...existing code to join sheets and call ML...
        const joinedData = await joinSheets(feesLink, attendanceLink, marksheetLink);
        if (joinedData.length === 0) {
            return res.status(400).json({ message: 'No matching records found across the sheets' });
        }
        // Replace with actual ML call
        const response = { data: { dropoutRate: Math.random() } };

        // Store result in DB
        prediction = new PredictionResult({
            university: universityId,
            periodStart,
            periodEnd,
            result: response.data,
        });
        await prediction.save();
        res.json({ dropoutRate: response.data.dropoutRate, cached: false });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hard refresh route: always recalculates and updates DB
export const refreshPrediction = async (req, res) => {
    const { universityId } = req.body;
    if (!universityId) {
        return res.status(400).json({ message: 'universityId is required' });
    }
    try {
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        const { feesLink, attendanceLink, marksheetLink } = university;
        if (!feesLink || !attendanceLink || !marksheetLink) {
            return res.status(400).json({ message: 'University does not have all required data links' });
        }
        const { periodStart, periodEnd } = getCurrentBiweeklyPeriod();
        const joinedData = await joinSheets(feesLink, attendanceLink, marksheetLink);
        if (joinedData.length === 0) {
            return res.status(400).json({ message: 'No matching records found across the sheets' });
        }
        // Replace with actual ML call
        const response = { data: { dropoutRate: Math.random() } };
        // Upsert prediction result
        await PredictionResult.findOneAndUpdate(
            { university: universityId, periodStart, periodEnd },
            { result: response.data, lastUpdated: new Date() },
            { upsert: true, new: true }
        );
        res.json({ dropoutRate: response.data.dropoutRate, refreshed: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// For cron: update all universities' predictions for current period
export const predictDropoutForAllUniversities = async (period) => {
    const universities = await University.find({});
    for (const university of universities) {
        const { feesLink, attendanceLink, marksheetLink } = university;
        if (!feesLink || !attendanceLink || !marksheetLink) continue;
        const joinedData = await joinSheets(feesLink, attendanceLink, marksheetLink);
        if (joinedData.length === 0) continue;
        // Replace with actual ML call
        const response = { data: { dropoutRate: Math.random() } };
        await PredictionResult.findOneAndUpdate(
            { university: university._id, periodStart: period.periodStart, periodEnd: period.periodEnd },
            { result: response.data, lastUpdated: new Date() },
            { upsert: true, new: true }
        );
    }
};

export const storeDataLinks = async (req, res) => {
    try {
        const { universityId, feesLink, attendanceLink, marksheetLink } = req.body;
        if (!universityId) {
            return res.status(400).json({ message: 'universityId is required' });
        }
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        if (feesLink) university.feesLink = feesLink;
        if (attendanceLink) university.attendanceLink = attendanceLink;
        if (marksheetLink) university.marksheetLink = marksheetLink;
        await university.save();
        res.json({ message: 'Data links updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


