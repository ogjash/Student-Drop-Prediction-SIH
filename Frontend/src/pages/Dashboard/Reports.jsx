import React, { useState, useEffect } from 'react';
import { Download, Calendar, Users, TrendingUp, AlertTriangle, FileText, BarChart3, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { predictDropout } from '../../api/auth';
import { ReportsSkeleton } from '../../components/ui/Skeleton';

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
      const atRiskStudents = students.filter(s => s.dropoutRate >= 70).length;

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

  const handleExportReport = (reportType) => {
    // In a real app, this would trigger a download
    alert(`Exporting ${reportType} report...`);
  };

  const handleRefreshData = () => {
    fetchBackendData();
  };

  if (loading) {
    return <ReportsSkeleton />;
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-800">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into student performance and risk assessment</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <button
            onClick={handleRefreshData}
            className="inline-flex items-center px-4 py-2 border border-zinc-300 text-sm font-medium rounded-lg text-zinc-800 bg-zinc-50 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last3months">Last 3 months</option>
            <option value="lastyear">Last year</option>
          </select>
          <button
            onClick={() => handleExportReport('comprehensive')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-zinc-50 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Report Period</p>
              <p className="text-2xl font-bold text-zinc-800">15 Days</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Students Analyzed</p>
              <p className="text-2xl font-bold text-zinc-800">
                {loading ? 'Loading...' : (backendData?.totalStudents || 0)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Avg Performance</p>
              <p className="text-2xl font-bold text-zinc-800">
                {loading ? 'Loading...' : `${backendData?.averageTestScore || 0}%`}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">High Risk Cases</p>
              <p className="text-2xl font-bold text-zinc-800">
                {loading ? 'Loading...' : (backendData?.atRiskStudents || 0)}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance */}
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-300 bg-zinc-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
                <p className="text-sm text-gray-600">Average scores by department</p>
              </div>
              <button
                onClick={() => handleExportReport('department')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Export
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="class" 
                    stroke="#6b7280" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="avgScore" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Avg Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-zinc-100 rounded-xl border border-zinc-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-800">Risk Distribution</h3>
                <p className="text-sm text-zinc-500">Student risk level breakdown</p>
              </div>
              <button
                onClick={() => handleExportReport('risk')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Export
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Class Performance Table */}
      <div className="bg-zinc-100 rounded-xl border border-zinc-300 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-800">Detailed Class Performance</h3>
              <p className="text-sm text-zinc-500">Comprehensive breakdown by department</p>
            </div>
            <button
              onClick={() => handleExportReport('class-performance')}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Attendance Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Performance Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-50 divide-y divide-zinc-100">
              {classPerformanceData.map((classData, index) => (
                <tr key={classData.class} className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-zinc-50' : 'bg-zinc-100'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{classData.class}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{classData.studentCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-semibold text-zinc-800">{classData.attendance}%</div>
                      <div className="w-20 bg-zinc-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            classData.attendance >= 90
                              ? 'bg-emerald-500'
                              : classData.attendance >= 80
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(classData.attendance, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-semibold ${
                      classData.avgScore >= 80 ? 'text-emerald-600' : 
                      classData.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {classData.avgScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        classData.avgScore >= 85 && classData.attendance >= 90
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : classData.avgScore >= 75 && classData.attendance >= 80
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
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
