// This file contains mock data for students, alerts, and dashboard stats used in the app.
// No imports required as this is pure JS mock data for use in the frontend.
// College departments and courses
export const departments = [
  { id: 1, name: 'Computer Science & Engineering', code: 'CSE' },
  { id: 2, name: 'Electronics & Communication', code: 'ECE' },
  { id: 3, name: 'Mechanical Engineering', code: 'MECH' },
  { id: 4, name: 'Civil Engineering', code: 'CIVIL' },
  { id: 5, name: 'Electrical Engineering', code: 'EEE' },
  { id: 6, name: 'Information Technology', code: 'IT' },
];

import { predictDropout } from '../api/auth';

export const getRiskLevel = (dropoutRate) => {
  if (typeof dropoutRate === 'number') {
    if (dropoutRate > 70) return 'high';
    if (dropoutRate > 40) return 'medium';
  }
  return 'low';
};

export const getAndStorePrediction = async () => {
  const response = await predictDropout();
  const data = response.data;
  const students = data.mergedData || [];
  const dropoutRates = data.dropoutRate || [];

  const studentsWithRisk = students.map((student, idx) => {
    const rate = Array.isArray(dropoutRates) ? dropoutRates[idx] : student.dropoutRate;
    const riskLevel = getRiskLevel(rate);
    return {
      ...student,
      dropoutRate: rate,
      riskLevel
    };
  });

  const totalStudents = studentsWithRisk.length;
  const atRiskStudents = studentsWithRisk.filter(s => (s.dropoutRate || 0) >= 70).length;

  const averageAttendance = studentsWithRisk.length
    ? Math.round(studentsWithRisk.reduce((sum, s) => sum + (s.attendance_percentage || 0), 0) / studentsWithRisk.length)
    : 0;

  // averageTestScore (average of all test scores for all students)
  let totalTestScore = 0;
  let testScoreCount = 0;
  studentsWithRisk.forEach(s => {
    ['test_score_1', 'test_score_2', 'test_score_3'].forEach(key => {
      if (typeof s[key] === 'number') {
        totalTestScore += s[key];
        testScoreCount++;
      }
    });
  });
  const averageTestScore = testScoreCount ? Math.round(totalTestScore / testScoreCount) : 0;

  return {
    totalStudents,
    dropoutRate: dropoutRates,
    atRiskStudents,
    averageAttendance,
    averageTestScore,
    students: studentsWithRisk
  };
};
