// This file contains mock data for students, alerts, and dashboard stats used in the app.
// No imports required as this is pure JS mock data for use in the frontend.

export const dashboardStats = {
  totalStudents: 156,
  atRiskStudents: 23,
  averageAttendance: 87,
  averageTestScore: 84,
};

export const mockStudents = [
  {
    id: 1,
    name: 'Raj Kumar',
    email: 'raj.kumar@university.edu',
    phone: '+91 9876543210',
    class: '10A',
    attendance: 78,
    testScore: 65,
    feeStatus: 'paid',
    riskLevel: 'medium',
    guardian: 'Suresh Kumar',
    guardianPhone: '+91 9876543211',
    lastLogin: '2024-01-15',
    attendanceHistory: [
      { date: '2024-01-01', present: true },
      { date: '2024-01-02', present: false },
      { date: '2024-01-03', present: true },
      { date: '2024-01-04', present: true },
      { date: '2024-01-05', present: false },
    ],
    scoreHistory: [
      { subject: 'Math', score: 72, date: '2024-01-01' },
      { subject: 'Science', score: 68, date: '2024-01-02' },
      { subject: 'English', score: 75, date: '2024-01-03' },
    ],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    phone: '+91 9876543220',
    class: '10B',
    attendance: 92,
    testScore: 88,
    feeStatus: 'paid',
    riskLevel: 'low',
    guardian: 'Ramesh Sharma',
    guardianPhone: '+91 9876543221',
    lastLogin: '2024-01-16',
    attendanceHistory: [
      { date: '2024-01-01', present: true },
      { date: '2024-01-02', present: true },
      { date: '2024-01-03', present: true },
      { date: '2024-01-04', present: true },
      { date: '2024-01-05', present: false },
    ],
    scoreHistory: [
      { subject: 'Math', score: 90, date: '2024-01-01' },
      { subject: 'Science', score: 88, date: '2024-01-02' },
      { subject: 'English', score: 86, date: '2024-01-03' },
    ],
  },
];

export const mockAlerts = [
  {
    id: 1,
    studentId: 1,
    type: 'attendance',
    severity: 'high',
    message: 'Attendance below threshold (78%)',
    created: '2024-01-15T10:30:00Z',
    resolved: false,
  },
  {
    id: 2,
    studentId: 1,
    type: 'performance',
    severity: 'medium',
    message: 'Test scores declining',
    created: '2024-01-14T14:20:00Z',
    resolved: false,
  },
];