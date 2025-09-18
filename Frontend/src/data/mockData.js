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

export const getAndStorePrediction = async () => {
  const response = await predictDropout();
  const data = response.data;
  const students = data.mergedData || [];
  const dropoutRate = data.dropoutRate || [];
  const totalStudents = students.length;
  const atRiskStudents = students.filter(s => s.dropoutRate >= 30).length;

  // averageAttendance
  const averageAttendance = students.length
    ? Math.round(students.reduce((sum, s) => sum + (s.attendance_percentage || 0), 0) / students.length)
    : 0;

  // averageTestScore (average of all test scores for all students)
  let totalTestScore = 0;
  let testScoreCount = 0;
  students.forEach(s => {
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
    dropoutRate,
    atRiskStudents,
    averageAttendance,
    averageTestScore,
    students 
  };
};


export const mockAlerts = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Arjun Patel',
    type: 'attendance',
    severity: 'high',
    message: 'Attendance below critical threshold (76%) - Immediate intervention required',
    created: '2024-01-15T10:30:00Z',
    resolved: false,
    department: 'Computer Science & Engineering',
    class: 'CSE-2A',
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Arjun Patel',
    type: 'performance',
    severity: 'high',
    message: 'Test scores consistently declining - Current average: 68%',
    created: '2024-01-14T14:20:00Z',
    resolved: false,
    department: 'Computer Science & Engineering',
    class: 'CSE-2A',
  },
  {
    id: 3,
    studentId: 1,
    studentName: 'Arjun Patel',
    type: 'fees',
    severity: 'medium',
    message: 'Fee payment pending for current semester',
    created: '2024-01-13T09:15:00Z',
    resolved: false,
    department: 'Computer Science & Engineering',
    class: 'CSE-2A',
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Rahul Singh',
    type: 'attendance',
    severity: 'high',
    message: 'Critical attendance shortage (68%) - Risk of semester detention',
    created: '2024-01-15T11:45:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-3A',
  },
  {
    id: 5,
    studentId: 3,
    studentName: 'Rahul Singh',
    type: 'fees',
    severity: 'high',
    message: 'Fee payment overdue - Account blocked',
    created: '2024-01-12T16:30:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-3A',
  },
  {
    id: 6,
    studentId: 9,
    studentName: 'Vikash Yadav',
    type: 'attendance',
    severity: 'high',
    message: 'Attendance critically low (65%) - Parent conference scheduled',
    created: '2024-01-16T08:20:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-2A',
  },
  {
    id: 7,
    studentId: 9,
    studentName: 'Vikash Yadav',
    type: 'performance',
    severity: 'high',
    message: 'Multiple subject failures - Academic probation recommended',
    created: '2024-01-15T13:10:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-2A',
  },
  {
    id: 8,
    studentId: 9,
    studentName: 'Vikash Yadav',
    type: 'fees',
    severity: 'high',
    message: 'Fee payment overdue by 30+ days',
    created: '2024-01-10T10:00:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-2A',
  },
  {
    id: 9,
    studentId: 7,
    studentName: 'Deepak Kumar',
    type: 'attendance',
    severity: 'medium',
    message: 'Attendance approaching threshold (73%) - Monitor closely',
    created: '2024-01-15T15:25:00Z',
    resolved: false,
    department: 'Computer Science & Engineering',
    class: 'CSE-3B',
  },
  {
    id: 10,
    studentId: 7,
    studentName: 'Deepak Kumar',
    type: 'fees',
    severity: 'medium',
    message: 'Fee payment pending - Grace period active',
    created: '2024-01-14T12:40:00Z',
    resolved: false,
    department: 'Computer Science & Engineering',
    class: 'CSE-3B',
  },
  {
    id: 11,
    studentId: 5,
    studentName: 'Karan Gupta',
    type: 'performance',
    severity: 'medium',
    message: 'Test scores below department average - Counseling recommended',
    created: '2024-01-14T09:30:00Z',
    resolved: false,
    department: 'Electrical Engineering',
    class: 'EEE-2C',
  },
  {
    id: 12,
    studentId: 11,
    studentName: 'Abhishek Verma',
    type: 'attendance',
    severity: 'medium',
    message: 'Attendance requires improvement (79%) - Warning issued',
    created: '2024-01-13T14:15:00Z',
    resolved: false,
    department: 'Electrical Engineering',
    class: 'EEE-3A',
  },
  {
    id: 13,
    studentId: 15,
    studentName: 'Aditya Mishra',
    type: 'performance',
    severity: 'medium',
    message: 'Project submission quality declining - Faculty review needed',
    created: '2024-01-12T11:20:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-4B',
  },
  {
    id: 14,
    studentId: 15,
    studentName: 'Aditya Mishra',
    type: 'fees',
    severity: 'medium',
    message: 'Fee payment pending for final semester',
    created: '2024-01-11T16:45:00Z',
    resolved: false,
    department: 'Mechanical Engineering',
    class: 'MECH-4B',
  },
  {
    id: 15,
    studentId: 18,
    studentName: 'Neha Sinha',
    type: 'attendance',
    severity: 'medium',
    message: 'Attendance borderline (77%) - Student counseling scheduled',
    created: '2024-01-13T10:30:00Z',
    resolved: false,
    department: 'Civil Engineering',
    class: 'CIVIL-2A',
  },
  {
    id: 16,
    studentId: 18,
    studentName: 'Neha Sinha',
    type: 'fees',
    severity: 'low',
    message: 'Fee payment reminder - Due in 5 days',
    created: '2024-01-12T08:00:00Z',
    resolved: false,
    department: 'Civil Engineering',
    class: 'CIVIL-2A',
  },
  {
    id: 17,
    studentId: 2,
    studentName: 'Priya Sharma',
    type: 'performance',
    severity: 'low',
    message: 'Excellent performance - Eligible for scholarship consideration',
    created: '2024-01-10T14:30:00Z',
    resolved: true,
    department: 'Electronics & Communication',
    class: 'ECE-2B',
  },
  {
    id: 18,
    studentId: 4,
    studentName: 'Ananya Reddy',
    type: 'performance',
    severity: 'low',
    message: 'Outstanding academic performance - Dean\'s list candidate',
    created: '2024-01-09T16:20:00Z',
    resolved: true,
    department: 'Information Technology',
    class: 'IT-1A',
  },
  {
    id: 19,
    studentId: 14,
    studentName: 'Kavya Nair',
    type: 'performance',
    severity: 'low',
    message: 'Exceptional project work - Research opportunity available',
    created: '2024-01-08T11:15:00Z',
    resolved: true,
    department: 'Electronics & Communication',
    class: 'ECE-4A',
  },
  {
    id: 20,
    studentId: 17,
    studentName: 'Manish Tripathi',
    type: 'performance',
    severity: 'low',
    message: 'Consistent high performance - Industry internship recommended',
    created: '2024-01-07T13:40:00Z',
    resolved: true,
    department: 'Electrical Engineering',
    class: 'EEE-4A',
  },
];