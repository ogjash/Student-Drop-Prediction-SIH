import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, User, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockStudents } from '../../data/mockData';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = mockStudents.find(s => String(s.id) === String(id));

  if (!student) {
    return (
      <div className="space-y-6 w-full">
        <button onClick={() => navigate('/dashboard/students')} className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Students
        </button>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-red-600">Student not found.</div>
        </div>
      </div>
    );
  }
  const attendanceData = student.attendanceHistory.map((entry, index) => ({
    day: `Day ${index + 1}`,
    present: entry.present ? 1 : 0,
    date: entry.date,
  }));
  const scoreData = student.scoreHistory.map((entry) => ({
    subject: entry.subject,
    score: entry.score,
    date: entry.date,
  }));
  const getRiskFactors = () => {
    const factors = [];
    if (student.attendance < 80) {
      factors.push({
        icon: AlertTriangle,
        text: 'Low Attendance',
        description: `Current attendance: ${student.attendance}%`,
        severity: 'warning',
      });
    }
    if (student.testScore < 60) {
      factors.push({
        icon: TrendingDown,
        text: 'Declining Test Scores',
        description: `Current average: ${student.testScore}%`,
        severity: 'high',
      });
    }
    if (student.feeStatus !== 'paid') {
      factors.push({
        icon: DollarSign,
        text: 'Fee Issues',
        description: `Status: ${student.feeStatus}`,
        severity: student.feeStatus === 'overdue' ? 'high' : 'medium',
      });
    }
    return factors;
  };
  const getSuggestions = () => {
    const suggestions = [];
    if (student.attendance < 80) {
      suggestions.push('Schedule a meeting with the student and guardian to discuss attendance issues');
    }
    if (student.testScore < 60) {
      suggestions.push('Recommend additional tutoring or study support');
    }
    if (student.feeStatus !== 'paid') {
      suggestions.push('Contact guardian regarding fee payment and available assistance programs');
    }
    if (student.riskLevel === 'high') {
      suggestions.push('Consider intensive intervention program and weekly check-ins');
    }
    return suggestions;
  };
  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      <button onClick={() => navigate('/dashboard/students')} className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to List
      </button>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-600" />
              {student.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Class: {student.class}</p>
            <p className="text-sm text-gray-500">Email: <Mail className="inline h-4 w-4 mr-1" />{student.email}</p>
            <p className="text-sm text-gray-500">Phone: <Phone className="inline h-4 w-4 mr-1" />{student.phone}</p>
            <p className="text-sm text-gray-500">Guardian: {student.guardian} ({student.guardianPhone})</p>
            <p className="text-sm text-gray-500">Last Login: {student.lastLogin}</p>
          </div>
        </div>
      </div>
      {/* Attendance Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
              <YAxis stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="present" fill="#3b82f6" name="Present" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Score Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Test Score History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
              <YAxis stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} name="Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Risk Factors */}
      {getRiskFactors().length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Factors</h3>
          <ul className="space-y-2">
            {getRiskFactors().map((factor, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <factor.icon className="h-5 w-5" />
                <span className="font-medium">{factor.text}:</span>
                <span className="text-gray-600">{factor.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Suggested Actions */}
      {getSuggestions().length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Mentor Actions</h3>
          <ul className="space-y-2">
            {getSuggestions().map((suggestion, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
