import { PredictionResult } from '../Models/PredictionResult.js';
import { University } from '../Models/UniversitySchema.js';
import axios from 'axios';
import Papa from 'papaparse';

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
            return res.json({ dropoutRate: prediction.result.map(s => s.dropoutRate), cached: true, mergedData: prediction.result });
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

        // Call ML model
        const mlResponse = await fetch(process.env.ML_MODEL_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mergedData: formattedData })
        });
        const responseData = await mlResponse.json();
        console.log('ML API response:', responseData);
        const predictions = Array.isArray(responseData.predictions) ? responseData.predictions : [];
        // merge response with formattedData on student_id
        const mergedData = formattedData.map(student => {
            const predictionEntry = predictions.find(p => p.student_id === student.student_id);
            return {
                ...student,
                dropoutRate: predictionEntry ? predictionEntry.dropout_probability : null
            };
        });

        // Fetch student details sheet and merge with mergedData
        if (!university.studentDetailsLink) {
            return res.status(400).json({ message: 'University does not have student details link' });
        }
        const studentDetailsSheet = await fetchSheetData(university.studentDetailsLink);
        console.log('Student details sheet length:', studentDetailsSheet.length);
        console.log('Student details sheet sample:', studentDetailsSheet[0]);
        console.log('Available columns:', Object.keys(studentDetailsSheet[0] || {}));
        // Create a map for quick lookup
        const detailsMap = {};
        studentDetailsSheet.forEach(row => {
          const id = String(row.StudentID || row.studentID || row["student id"]).trim();
          if (id && id !== 'undefined') detailsMap[id] = row;
        });
        console.log('Details map keys:', Object.keys(detailsMap));
        console.log('Sample details map entry:', Object.values(detailsMap)[0]);

        const finalMergedData = mergedData.map(student => {
          const id = String(student.student_id).trim();
          const details = detailsMap[id] || {};
          return {
            ...student,
            name: details.name || details.Name || details["Name"] || null,
            email: details.email || details.Email || details["Email"] || null,
            phone: details.phone || details.Phone || details["Phone"] || details.mobile || details.Mobile || details["Mobile"] || null,
            class: details.class || details.Class || details["Class"] || null,
            department: details.department || details.Department || details["Department"] || null,
            year: details.year || details.Year || details["Year"] || null
          };
        });

        // Upsert prediction result
        await PredictionResult.findOneAndUpdate(
            { university: universityId, periodStart, periodEnd },
            { result: finalMergedData, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        res.json({ dropoutRate: finalMergedData.map(student => student.dropoutRate), cached: false, mergedData: finalMergedData });
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
        const { feesLink, attendanceLink, marksheetLink, studentDetailsLink } = university;
        if (!feesLink || !attendanceLink || !marksheetLink || !studentDetailsLink) {
            return res.status(400).json({ message: 'University does not have all required data links' });
        }
        const { periodStart, periodEnd } = getCurrentBiweeklyPeriod();

        // Fetch and merge sheets
        const [feesSheet, attendanceSheet, marksSheet, studentDetailsSheet] = await Promise.all([
            fetchSheetData(feesLink),
            fetchSheetData(attendanceLink),
            fetchSheetData(marksheetLink),
            fetchSheetData(studentDetailsLink),
        ]);
        const joinedData = mergeByStudentID(feesSheet, attendanceSheet, marksSheet);
        if (joinedData.length === 0) {
            return res.status(400).json({ message: 'No matching records found across the sheets' });
        }
        const formattedData = formatStudentData(joinedData);
        // Call ML model
        const mlResponse = await fetch(process.env.ML_MODEL_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mergedData: formattedData })
        });
        const responseData = await mlResponse.json();
        console.log('ML API response:', responseData);
        const predictions = Array.isArray(responseData.predictions) ? responseData.predictions : [];
        // Merge predictions with formatted data
        const mergedData = formattedData.map(student => {
            const predictionEntry = predictions.find(p => p.student_id === student.student_id);
            return {
                ...student,
                dropoutRate: predictionEntry ? predictionEntry.dropout_probability : null
            };
        });

        // Merge student details
        const detailsMap = {};
        studentDetailsSheet.forEach(row => {
            const id = String(row.StudentID || row.studentID || row["student id"]).trim();
            if (id && id !== 'undefined') detailsMap[id] = row;
        });
        console.log('Student details sheet length:', studentDetailsSheet.length);
        console.log('Student details sheet sample:', studentDetailsSheet[0]);
        console.log('Available columns:', Object.keys(studentDetailsSheet[0] || {}));
        console.log('Details map keys:', Object.keys(detailsMap));
        console.log('Sample details map entry:', Object.values(detailsMap)[0]);
        const finalMergedData = mergedData.map(student => {
            const id = String(student.student_id).trim();
            const details = detailsMap[id] || {};
            return {
                ...student,
                name: details.name || details.Name || details["Name"] || null,
                email: details.email || details.Email || details["Email"] || null,
                phone: details.phone || details.Phone || details["Phone"] || details.mobile || details.Mobile || details["Mobile"] || null,
                class: details.class || details.Class || details["Class"] || null,
                department: details.department || details.Department || details["Department"] || null,
                year: details.year || details.Year || details["Year"] || null
            };
        });

        // Upsert prediction result (always refresh)
        await PredictionResult.findOneAndUpdate(
            { university: universityId, periodStart, periodEnd },
            { result: finalMergedData, lastUpdated: new Date() },
            { upsert: true, new: true }
        );
        res.json({ dropoutRate: finalMergedData.map(student => student.dropoutRate), refreshed: true, mergedData: finalMergedData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// For cron: update all universities' predictions for current period
export const predictDropoutForAllUniversities = async (period) => {
    const universities = await University.find({});
    for (const university of universities) {
        try {
            const { feesLink, attendanceLink, marksheetLink, studentDetailsLink } = university;
            if (!feesLink || !attendanceLink || !marksheetLink || !studentDetailsLink) continue;

            // Check if prediction already exists for this university and period
            const existing = await PredictionResult.findOne({
                university: university._id,
                periodStart: period.periodStart,
                periodEnd: period.periodEnd
            });
            if (existing) {
                console.log(`Prediction already exists for university ${university._id} and period, skipping ML call.`);
                continue;
            }

            const [feesSheet, attendanceSheet, marksSheet, studentDetailsSheet] = await Promise.all([
                fetchSheetData(feesLink),
                fetchSheetData(attendanceLink),
                fetchSheetData(marksheetLink),
                fetchSheetData(studentDetailsLink),
            ]);
            const joinedData = mergeByStudentID(feesSheet, attendanceSheet, marksSheet);
            if (joinedData.length === 0) continue;
            const formattedData = formatStudentData(joinedData);
            // Call ML model
            const mlResponse = await fetch(process.env.ML_MODEL_PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mergedData: formattedData })
            });
            const responseData = await mlResponse.json();
            console.log('ML API response:', responseData);
            const predictions = Array.isArray(responseData.predictions) ? responseData.predictions : [];
            const mergedData = formattedData.map(student => {
                const predictionEntry = predictions.find(p => p.student_id === student.student_id);
                return {
                    ...student,
                    dropoutRate: predictionEntry ? predictionEntry.dropout_probability : null
                };
            });

            // Merge student details
            const detailsMap = {};
            studentDetailsSheet.forEach(row => {
                const id = String(row.StudentID || row.studentID || row["student id"]).trim();
                if (id && id !== 'undefined') detailsMap[id] = row;
            });
            const finalMergedData = mergedData.map(student => {
                const id = String(student.student_id).trim();
                const details = detailsMap[id] || {};
                return {
                    ...student,
                    name: details.name || details.Name || details["Name"] || null,
                    email: details.email || details.Email || details["Email"] || null,
                    phone: details.phone || details.Phone || details["Phone"] || details.mobile || details.Mobile || details["Mobile"] || null,
                    class: details.class || details.Class || details["Class"] || null,
                    department: details.department || details.Department || details["Department"] || null,
                    year: details.year || details.Year || details["Year"] || null
                };
            });

            await PredictionResult.findOneAndUpdate(
                { university: university._id, periodStart: period.periodStart, periodEnd: period.periodEnd },
                { result: finalMergedData, lastUpdated: new Date() },
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
        const { feesLink, attendanceLink, marksheetLink, studentDetailsLink } = req.body;
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
        if (studentDetailsLink) university.studentDetailsLink = studentDetailsLink;
        await university.save();
        res.json({ message: 'Data links updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};