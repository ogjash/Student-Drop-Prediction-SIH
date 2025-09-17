import { PredictionResult } from '../Models/PredictionResult.js';
import { getCurrentBiweeklyPeriod } from '../cron/biweeklyPrediction.js';
import { University } from '../Models/UniversitySchema.js';
import axios from 'axios';
import Papa from 'papaparse';

// Format merged student data to strict field order and naming
function formatStudentData(mergedArr) {
    return mergedArr.map(row => ({
        student_id: row.studentID || row.student_id || row["student id"] || row["StudentID"],
        attendance_percentage: parseFloat(row.attendance ?? row.attendance_percentage ?? row["Attendance"]),
        test_score_1: parseFloat(row.testscore1 ?? row.test_score_1 ?? row["TestScore1"]),
        test_score_2: parseFloat(row.testscore2 ?? row.test_score_2 ?? row["TestScore2"]),
        test_score_3: parseFloat(row.testscore3 ?? row.test_score_3 ?? row["TestScore3"]),
        Pending_Fees: parseInt(row.feesdue ?? row.Pending_Fees ?? row["FeesDue"]),
        Family_Income_Level: parseInt(row.familyincome ?? row.Family_Income_Level ?? row["FamilyIncome"])
    }));
}
function getCsvExportLink(sheetUrl) {
  const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) throw new Error('Invalid Google Sheet URL');
  const sheetId = match[1];
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
}

async function fetchSheetData(sheetUrl) {
  const csvUrl = getCsvExportLink(sheetUrl);
  const response = await axios.get(csvUrl);
  const parsed = Papa.parse(response.data, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data;
}

function mergeByStudentID(...sheets) {
  const merged = {};

  for (const sheet of sheets) {
    for (const row of sheet) {
      const studentID = row.studentID || row.StudentID || row["student id"];
      if (!studentID) continue;

      const key = studentID.trim();
      if (!merged[key]) merged[key] = { studentID: key };

      for (const [k, v] of Object.entries(row)) {
        if (k.toLowerCase() !== 'studentid') {
          merged[key][k.trim()] = v.trim?.() ?? v;
        }
      }
    }
  }

  return Object.values(merged);
}

// Normal prediction route with biweekly caching
export const predictDropout = async (req, res) => {
    const universityId = req.user.university;
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

        // Join sheets with StudentID as key and to call ML
        const [feesSheet, attendanceSheet, marksSheet] = await Promise.all([
            fetchSheetData(feesLink),
            fetchSheetData(attendanceLink),
            fetchSheetData(marksheetLink),
        ]);
        const joinedData = mergeByStudentID(feesSheet, attendanceSheet, marksSheet);
        if (joinedData.length === 0) {
            return res.status(400).json({ message: 'No matching records found across the sheets' });
        }
        const formattedData = formatStudentData(joinedData);

        // Replace with actual ML call
        const response = { data: {
            "predictions": [
                {
                    "student_id": "2023UIN3301",
                    "dropout_probability": 67.77505493164062
                },
                {
                    "student_id": "2023UIN3302",
                    "dropout_probability": 22.349990844726562
                },
                {
                    "student_id": "2023UIN3303",
                    "dropout_probability": 35.97137451171875
                },
                {
                    "student_id": "2023UIN3304",
                    "dropout_probability": 2.587336778640747
                },
                {
                    "student_id": "2023UIN3305",
                    "dropout_probability": 68.52488708496094
                },
                {
                    "student_id": "2023UIN3306",
                    "dropout_probability": 3.815338373184204
                },
                {
                    "student_id": "2023UIN3307",
                    "dropout_probability": 9.228585243225098
                },
                {
                    "student_id": "2023UIN3308",
                    "dropout_probability": 25.04165267944336
                },
                {
                    "student_id": "2023UIN3309",
                    "dropout_probability": 5.134696960449219
                }
            ]
        } };
        // merge response with formattedData on student_id
        const mergedData = formattedData.map(student => {
            const predictionEntry = response.data.predictions.find(p => p.student_id === student.student_id);
            return {
                ...student,
                dropoutRate: predictionEntry ? predictionEntry.dropout_probability : null
            };
        });
        // Store result in DB
        prediction = new PredictionResult({
            university: universityId,
            periodStart,
            periodEnd,
            result: mergedData,
        });
        await prediction.save();

        res.json({ dropoutRate: mergedData.map(student => student.dropoutRate), cached: false, mergedData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hard refresh route: always recalculates and updates DB
export const refreshPrediction = async (req, res) => {
    const universityId = req.user.university;
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

        // Fetch and merge sheets
        const [feesSheet, attendanceSheet, marksSheet] = await Promise.all([
            fetchSheetData(feesLink),
            fetchSheetData(attendanceLink),
            fetchSheetData(marksheetLink),
        ]);
        const joinedData = mergeByStudentID(feesSheet, attendanceSheet, marksSheet);
        if (joinedData.length === 0) {
            return res.status(400).json({ message: 'No matching records found across the sheets' });
        }
        const formattedData = formatStudentData(joinedData);

        // Replace with actual ML call
        const response = { data: {
            "predictions": formattedData.map(student => ({
                student_id: student.student_id,
                dropout_probability: Math.random() * 100 // random for demo
            }))
        }};

        // Merge predictions with formatted data
        const mergedData = formattedData.map(student => {
            const predictionEntry = response.data.predictions.find(p => p.student_id === student.student_id);
            return {
                ...student,
                dropoutRate: predictionEntry ? predictionEntry.dropout_probability : null
            };
        });

        // Upsert prediction result
        await PredictionResult.findOneAndUpdate(
            { university: universityId, periodStart, periodEnd },
            { result: mergedData, lastUpdated: new Date() },
            { upsert: true, new: true }
        );
        res.json({ dropoutRate: mergedData.map(student => student.dropoutRate), refreshed: true, mergedData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// For cron: update all universities' predictions for current period
export const predictDropoutForAllUniversities = async (period) => {
    const universities = await University.find({});
    for (const university of universities) {
        try {
            const { feesLink, attendanceLink, marksheetLink } = university;
            if (!feesLink || !attendanceLink || !marksheetLink) continue;

            const [feesSheet, attendanceSheet, marksSheet] = await Promise.all([
                fetchSheetData(feesLink),
                fetchSheetData(attendanceLink),
                fetchSheetData(marksheetLink),
            ]);
            const joinedData = mergeByStudentID(feesSheet, attendanceSheet, marksSheet);
            if (joinedData.length === 0) continue;
            const formattedData = formatStudentData(joinedData);

            const response = { data: {
                "predictions": formattedData.map(student => ({
                    student_id: student.student_id,
                    dropout_probability: Math.random() * 100
                }))
            }};

            const mergedData = formattedData.map(student => {
                const predictionEntry = response.data.predictions.find(p => p.student_id === student.student_id);
                return {
                    ...student,
                    dropoutRate: predictionEntry ? predictionEntry.dropout_probability : null
                };
            });

            await PredictionResult.findOneAndUpdate(
                { university: university._id, periodStart: period.periodStart, periodEnd: period.periodEnd },
                { result: mergedData, lastUpdated: new Date() },
                { upsert: true, new: true }
            );
        } catch (err) {
            console.error(`Error processing university ${university._id}:`, err.message);
        }
    }
};

export const storeDataLinks = async (req, res) => {
    try {
        const universityId = req.user.university;
        const { feesLink, attendanceLink, marksheetLink } = req.body;
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


