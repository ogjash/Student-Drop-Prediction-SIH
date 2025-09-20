import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, User, AlertTriangle, TrendingDown, DollarSign, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getAndStorePrediction } from '../../data/mockData';
import { useEffect, useState } from 'react';
import { StudentDetailSkeleton } from '../../components/ui/Skeleton';


const getAvgTestScore = (student) => {
  const t1 = typeof student.test_score_1 === 'number' ? student.test_score_1 : 0;
  const t2 = typeof student.test_score_2 === 'number' ? student.test_score_2 : 0;
  const t3 = typeof student.test_score_3 === 'number' ? student.test_score_3 : 0;
  return ((t1 + t2 + t3) / 3).toFixed(2);
};

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropoutRates, setDropoutRates] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAndStorePrediction();
        setStudents(data.students || []);
        setDropoutRates(data.dropoutRate || []);
      } catch (error) {
        setStudents([]);
        setDropoutRates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Find student and their index in the students array
  const studentIndex = students.findIndex(s => String(s.student_id || s.id) === String(id));
  const student = students[studentIndex];

  // Get dropout rate for this student using the index
  const studentDropoutRate =
    studentIndex !== -1 && dropoutRates && dropoutRates.length > studentIndex
      ? dropoutRates[studentIndex]
      : null;

  const getRiskLevel = () => {
    if (studentDropoutRate === null) return 'Unknown';
    if (studentDropoutRate > 70) return 'High';
    if (studentDropoutRate > 40) return 'Medium';
    return 'Low';
  };

  const getRiskColor = () => {
    const level = getRiskLevel();
    switch (level) {
      case 'High': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'Medium': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'Low': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
      default: return { bg: 'bg-zinc-50', text: 'text-zinc-700', border: 'border-zinc-200' };
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-emerald-600';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  if (loading) {
    return <StudentDetailSkeleton />;
  }

  if (!student) {
    return (
      <div className="space-y-6 w-full">
        <button 
          onClick={() => navigate('/dashboard/students')} 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> 
          Back to Students
        </button>
        <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center">
          <div className="text-red-600 text-lg font-medium">Student not found</div>
          <p className="text-zinc-500 mt-2">The student you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  const now = new Date();
  const testScores = [
    { label: 'Test 1', score: student.test_score_1 },
    { label: 'Test 2', score: student.test_score_2 },
    { label: 'Test 3', score: student.test_score_3 },
  ];
  const scoreData = testScores.map((t, i) => {
    const date = new Date(now.getTime() - 10 * (i + 1) * 24 * 60 * 60 * 1000);
    return {
      subject: t.label,
      score: t.score,
      date: date.toISOString().slice(0, 10),
    };
  });
  const getRiskFactors = () => {
    const factors = [];
    if (student.attendance_percentage < 70) {
      factors.push({
        icon: AlertTriangle,
        text: 'Low Attendance',
        description: `Current attendance: ${student.attendance_percentage}%`,
        severity: 'warning',
      });
    }
    if (getAvgTestScore(student) < 60) {
      factors.push({
        icon: TrendingDown,
        text: 'Declining Test Scores',
        description: `Current average: ${getAvgTestScore(student)}%`,
        severity: 'high',
      });
    }
    if (student.Pending_Fees === 1) {
      factors.push({
        icon: DollarSign,
        text: 'Fee Issues',
        description: 'Status: Pending',
        severity: student.Pending_Fees === 1 ? 'medium' : 'low',
      });
    }
    return factors;
  };
  const getSuggestions = () => {
    const suggestions = [];
    if (student.attendance_percentage < 80) {
      suggestions.push('Schedule a meeting with the student and guardian to discuss attendance issues');
    }
    if (getAvgTestScore(student) < 60) {
      suggestions.push('Recommend additional tutoring or study support');
    }
    if (student.Pending_Fees === 1) {
      suggestions.push('Contact guardian regarding fee payment and available assistance programs');
    }
    if (studentDropoutRate >= 30) {
      suggestions.push('Consider intensive intervention program and weekly check-ins');
    }
    return suggestions;
  };
  return (
    <div className="space-y-4 w-full">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard/students')} 
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> 
          Back to Students
        </button>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4 border-b border-zinc-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900">{student.name}</h1>
                <p className="text-sm text-zinc-600 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  {student.department} - Year {student.year}
                </p>
              </div>
            </div>
            {studentDropoutRate !== null && (
              <div className="mt-2 lg:mt-0">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor().bg} ${getRiskColor().text} ${getRiskColor().border}`}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {getRiskLevel()} Risk ({studentDropoutRate.toFixed(1)}%)
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs text-zinc-500">Email</p>
                <p className="font-medium text-zinc-900 text-sm">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs text-zinc-500">Phone</p>
                <p className="font-medium text-zinc-900 text-sm">{student.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs text-zinc-500">Attendance</p>
                <p className={`font-semibold text-sm ${getAttendanceColor(student.attendance_percentage)}`}>
                  {student.attendance_percentage}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs text-zinc-500">Avg Score</p>
                <p className={`font-semibold text-sm ${getPerformanceColor(parseFloat(getAvgTestScore(student)))}`}>
                  {getAvgTestScore(student)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors and Recommended Actions Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Risk Factors */}
        {getRiskFactors().length > 0 && (
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-200 bg-red-50">
              <h3 className="text-lg font-semibold text-zinc-900 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Risk Factors
              </h3>
              <p className="text-xs text-zinc-600">Areas requiring attention</p>
            </div>
            <div className="p-4">
              <div className="grid gap-3">
                {getRiskFactors().map((factor, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="flex-shrink-0">
                      <factor.icon className={`h-5 w-5 ${
                        factor.severity === 'high' ? 'text-red-500' : 
                        factor.severity === 'warning' ? 'text-amber-500' : 'text-orange-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-zinc-900 text-sm">{factor.text}</h4>
                      <p className="text-xs text-zinc-600 mt-1">{factor.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      factor.severity === 'high' ? 'bg-red-100 text-red-700' : 
                      factor.severity === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {factor.severity.charAt(0).toUpperCase() + factor.severity.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suggested Actions */}
        {getSuggestions().length > 0 && (
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-200 bg-blue-50">
              <h3 className="text-lg font-semibold text-zinc-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Recommended Actions
              </h3>
              <p className="text-xs text-zinc-600">Suggested interventions for mentors</p>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {getSuggestions().map((suggestion, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-zinc-800 text-sm leading-relaxed">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
          <h3 className="text-lg font-semibold text-zinc-900">Academic Performance</h3>
          <p className="text-xs text-zinc-600">Test scores over time</p>
        </div>
        <div className="p-4">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tick={{ fill: '#71717a' }}
                  axisLine={{ stroke: '#e4e4e7' }}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tick={{ fill: '#71717a' }}
                  axisLine={{ stroke: '#e4e4e7' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} 
                  activeDot={{ r: 8, fill: '#1d4ed8' }}
                  name="Test Score (%)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;