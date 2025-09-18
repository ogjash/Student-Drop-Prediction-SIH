import React, { useState, useEffect } from 'react';
import { Download, Calendar, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { predictDropout } from '../../api/auth';

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      setLoading(true);
      const response = await predictDropout();
      const data = response.data;
      
      // Process the backend data
      const students = data.mergedData || [];
      const dropoutRate = data.dropoutRate || [];
      const totalStudents = students.length;
      const atRiskStudents = students.filter(s => s.dropoutRate >= 30).length;

      // Calculate averageAttendance
      const averageAttendance = students.length
        ? Math.round(students.reduce((sum, s) => sum + (s.attendance_percentage || 0), 0) / students.length)
        : 0;

      // Calculate averageTestScore
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

      setBackendData({
        totalStudents,
        dropoutRate,
        atRiskStudents,
        averageAttendance,
        averageTestScore,
        students
      });
    } catch (error) {
      console.error('Failed to fetch backend data:', error);
      // Set default values if backend fails
      setBackendData({
        totalStudents: 0,
        dropoutRate: [],
        atRiskStudents: 0,
        averageAttendance: 0,
        averageTestScore: 0,
        students: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate class performance from backend data
  const calculateClassPerformance = () => {
    if (!backendData || !backendData.students) return [];
    
    const classGroups = {};
    
    // Group students by class
    backendData.students.forEach(student => {
      const studentClass = student.class || student.department || 'Unknown';
      if (!classGroups[studentClass]) {
        classGroups[studentClass] = {
          students: [],
          totalAttendance: 0,
          totalScore: 0,
          count: 0
        };
      }
      classGroups[studentClass].students.push(student);
      classGroups[studentClass].totalAttendance += student.attendance_percentage || 0;
      
      // Calculate average test score for this student
      const testScores = [student.test_score_1, student.test_score_2, student.test_score_3]
        .filter(score => typeof score === 'number');
      const avgStudentScore = testScores.length ? 
        testScores.reduce((sum, score) => sum + score, 0) / testScores.length : 0;
      
      classGroups[studentClass].totalScore += avgStudentScore;
      classGroups[studentClass].count++;
    });

    // Calculate averages for each class
    return Object.keys(classGroups).map(className => ({
      class: className,
      attendance: Math.round(classGroups[className].totalAttendance / classGroups[className].count),
      avgScore: Math.round(classGroups[className].totalScore / classGroups[className].count),
      studentCount: classGroups[className].count
    })).sort((a, b) => a.class.localeCompare(b.class));
  };

  const classPerformanceData = calculateClassPerformance();

  // Calculate risk distribution from backend data
  const calculateRiskDistribution = () => {
    if (!backendData || !backendData.students) {
      return [
        { name: 'Safe', value: 0, color: '#10b981' },
        { name: 'Warning', value: 0, color: '#f59e0b' },
        { name: 'High Risk', value: 0, color: '#ef4444' },
      ];
    }

    const total = backendData.students.length;
    const highRisk = backendData.students.filter(s => (s.dropoutRate || 0) >= 50).length;
    const warning = backendData.students.filter(s => (s.dropoutRate || 0) >= 30 && (s.dropoutRate || 0) < 50).length;
    const safe = total - highRisk - warning;

    return [
      { name: 'Safe', value: safe, color: '#10b981' },
      { name: 'Warning', value: warning, color: '#f59e0b' },
      { name: 'High Risk', value: highRisk, color: '#ef4444' },
    ];
  };

  const riskDistributionData = calculateRiskDistribution();

  // Static attendance data (could be calculated from backend data over time)
  const attendanceData = [
    { month: 'Sep', rate: backendData?.averageAttendance || 88 },
    { month: 'Oct', rate: (backendData?.averageAttendance || 88) - 3 },
    { month: 'Nov', rate: (backendData?.averageAttendance || 88) + 2 },
    { month: 'Dec', rate: (backendData?.averageAttendance || 88) - 1 },
    { month: 'Jan', rate: (backendData?.averageAttendance || 88) + 4 },
  ];

  const handleExportReport = (reportType) => {
    // In a real app, this would trigger a download
    alert(`Exporting ${reportType} report...`);
  };

  const handleRefreshData = () => {
    fetchBackendData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={handleRefreshData}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Data
          </button>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last3months">Last 3 months</option>
            <option value="lastyear">Last year</option>
          </select>
          <button
            onClick={() => handleExportReport('comprehensive')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Report Period</p>
              <p className="text-lg font-semibold text-gray-900">30 Days</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students Analyzed</p>
              <p className="text-lg font-semibold text-gray-900">
                {loading ? 'Loading...' : (backendData?.totalStudents || 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-lg font-semibold text-gray-900">
                {loading ? 'Loading...' : `${backendData?.averageTestScore || 0}%`}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Cases</p>
              <p className="text-lg font-semibold text-gray-900">
                {loading ? 'Loading...' : (backendData?.atRiskStudents || 0)}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Attendance Trends</h3>
            <button
              onClick={() => handleExportReport('attendance')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Export
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Risk Distribution</h3>
            <button
              onClick={() => handleExportReport('risk')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Export
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Class Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Class Performance Analysis</h3>
          <button
            onClick={() => handleExportReport('class-performance')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Export
          </button>
        </div>
        <div className="w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classPerformanceData.map((classData) => (
                <tr key={classData.class} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {classData.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{classData.attendance}%</div>
                      <div className="ml-3 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            classData.attendance >= 90
                              ? 'bg-green-500'
                              : classData.attendance >= 80
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${classData.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {classData.avgScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        classData.avgScore >= 85 && classData.attendance >= 90
                          ? 'bg-green-100 text-green-800'
                          : classData.avgScore >= 75 && classData.attendance >= 80
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {classData.avgScore >= 85 && classData.attendance >= 90
                        ? 'Excellent'
                        : classData.avgScore >= 75 && classData.attendance >= 80
                        ? 'Good'
                        : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
