import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DepartmentAnalysisChart = ({ students, dropoutRates }) => {
  // Calculate department statistics
  const departmentStats = students.reduce((acc, student, idx) => {
    const department = student.department || 'Unknown';
    const dropoutRate = Array.isArray(dropoutRates) && dropoutRates.length > idx ? dropoutRates[idx] : student.dropoutRate;
    
    if (!acc[department]) {
      acc[department] = {
        name: department,
        totalStudents: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        avgAttendance: 0,
        avgTestScore: 0,
        attendanceSum: 0,
        testScoreSum: 0
      };
    }
    
    const dept = acc[department];
    dept.totalStudents += 1;
    
    // Calculate risk level
    let riskLevel = 'lowRisk';
    if (typeof dropoutRate === 'number') {
      if (dropoutRate > 70) riskLevel = 'highRisk';
      else if (dropoutRate > 40) riskLevel = 'mediumRisk';
    } else {
      // Fallback logic
      if (student.attendance_percentage < 70) riskLevel = 'highRisk';
      else if (student.attendance_percentage < 80 || student.Pending_Fees === 1) riskLevel = 'mediumRisk';
    }
    
    dept[riskLevel] += 1;
    
    // Sum for averages
    if (typeof student.attendance_percentage === 'number') {
      dept.attendanceSum += student.attendance_percentage;
    }
    
    if (typeof student.test_score_1 === 'number' && typeof student.test_score_2 === 'number' && typeof student.test_score_3 === 'number') {
      dept.testScoreSum += (student.test_score_1 + student.test_score_2 + student.test_score_3) / 3;
    }
    
    return acc;
  }, {});

  // Calculate averages and format data for chart
  const chartData = Object.values(departmentStats).map(dept => ({
    name: dept.name.length > 10 ? dept.name.substring(0, 10) + '...' : dept.name,
    fullName: dept.name,
    'High Risk': dept.highRisk,
    'Medium Risk': dept.mediumRisk,
    'Low Risk': dept.lowRisk,
    'Avg Attendance': Math.round(dept.attendanceSum / dept.totalStudents) || 0,
    'Avg Test Score': Math.round(dept.testScoreSum / dept.totalStudents) || 0,
    totalStudents: dept.totalStudents
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-50 p-4 rounded-xl shadow-xl border border-slate-200 backdrop-blur-sm">
          <div className="border-b border-zinc-300 pb-2 mb-3">
            <p className="font-semibold text-zinc-800 text-base">{data.fullName}</p>
            <p className="text-xs text-zinc-500 mt-1">Department Overview</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Total Students:</span>
              <span className="font-semibold text-zinc-800">{data.totalStudents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-red-600 rounded-full mr-2"></div>
                High Risk:
              </span>
              <span className="font-semibold text-rose-600">{data['High Risk']}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-2"></div>
                Medium Risk:
              </span>
              <span className="font-semibold text-amber-600">{data['Medium Risk']}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mr-2"></div>
                Low Risk:
              </span>
              <span className="font-semibold text-emerald-600">{data['Low Risk']}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Avg Attendance:</span>
                <span className="font-semibold text-blue-600">{data['Avg Attendance']}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Avg Test Score:</span>
                <span className="font-semibold text-purple-600">{data['Avg Test Score']}%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-800 mb-1">Department Risk Analysis</h3>
          <p className="text-slate-500 text-sm">Risk distribution across academic departments</p>
        </div>
      </div>
      
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            barCategoryGap="20%"
          >
            <defs>
              <linearGradient id="highRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="mediumRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="lowRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={{ stroke: '#cbd5e1' }}
              axisLine={{ stroke: '#cbd5e1' }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={{ stroke: '#cbd5e1' }}
              axisLine={{ stroke: '#cbd5e1' }}
              label={{ 
                value: 'Number of Students', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#64748b', fontSize: '12px' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="High Risk" 
              stackId="a" 
              fill="url(#highRiskGradient)"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="Medium Risk" 
              stackId="a" 
              fill="url(#mediumRiskGradient)"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="Low Risk" 
              stackId="a" 
              fill="url(#lowRiskGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-sm"></div>
          <span className="text-sm font-medium text-slate-700">High Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-sm"></div>
          <span className="text-sm font-medium text-slate-700">Medium Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-sm"></div>
          <span className="text-sm font-medium text-slate-700">Low Risk</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAnalysisChart;