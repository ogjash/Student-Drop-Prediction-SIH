import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DropoutRiskChart = ({ students, dropoutRates }) => {
  // Calculate risk distribution
  const getRiskLevel = (student, dropoutRate) => {
    if (typeof dropoutRate === 'number') {
      if (dropoutRate > 70) return 'High Risk';
      if (dropoutRate > 40) return 'Medium Risk';
      return 'Low Risk';
    }
    
    // Fallback logic based on other factors
    if (typeof student.attendance_percentage === 'number' && student.attendance_percentage < 70) return 'High Risk';
    if (typeof student.test_score_1 === 'number' && typeof student.test_score_2 === 'number' && typeof student.test_score_3 === 'number') {
      const avgScore = (student.test_score_1 + student.test_score_2 + student.test_score_3) / 3;
      if (avgScore < 60) return 'High Risk';
      if (avgScore < 70) return 'Medium Risk';
    }
    if (student.Pending_Fees === 1) return 'Medium Risk';
    if (typeof student.attendance_percentage === 'number' && student.attendance_percentage < 80) return 'Medium Risk';
    
    return 'Low Risk';
  };

  const riskDistribution = students.reduce((acc, student, idx) => {
    const dropoutRate = Array.isArray(dropoutRates) && dropoutRates.length > idx ? dropoutRates[idx] : student.dropoutRate;
    const riskLevel = getRiskLevel(student, dropoutRate);
    
    acc[riskLevel] = (acc[riskLevel] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { name: 'High Risk', value: riskDistribution['High Risk'] || 0, color: '#f43f5e' },
    { name: 'Medium Risk', value: riskDistribution['Medium Risk'] || 0, color: '#f59e0b' },
    { name: 'Low Risk', value: riskDistribution['Low Risk'] || 0, color: '#10b981' }
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / students.length) * 100).toFixed(1);
      return (
        <div className="bg-zinc-50 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-zinc-300 backdrop-blur-sm max-w-xs">
          <div className="border-b border-zinc-300 pb-1 sm:pb-2 mb-2 sm:mb-3">
            <p className="font-semibold text-zinc-800 text-sm sm:text-base flex items-center">
              <div 
                className="w-2 sm:w-3 h-2 sm:h-3 rounded-full mr-1 sm:mr-2" 
                style={{ backgroundColor: data.payload.color }}
              ></div>
              {data.name}
            </p>
            <p className="text-xs text-zinc-500 mt-1">Risk Level Distribution</p>
          </div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Student Count:</span>
              <span className="font-semibold text-zinc-800">{data.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Percentage:</span>
              <span className="font-semibold text-blue-600">{percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-50 rounded-xl sm:rounded-2xl border border-zinc-200 p-3 sm:p-4 md:p-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-800 mb-1">Dropout Risk Distribution</h3>
          <p className="text-zinc-500 text-xs sm:text-sm">Student distribution by risk level</p>
        </div>
      </div>
      
      <div className="h-64 sm:h-72 md:h-80 mb-3 sm:mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="highRiskPieGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="mediumRiskPieGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="lowRiskPieGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              innerRadius="40%"
              paddingAngle={3}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.name === 'High Risk' ? 'url(#highRiskPieGradient)' :
                    entry.name === 'Medium Risk' ? 'url(#mediumRiskPieGradient)' :
                    'url(#lowRiskPieGradient)'
                  }
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center pt-3 sm:pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-sm"></div>
          <span className="text-xs sm:text-sm font-medium text-slate-700">High Risk</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-sm"></div>
          <span className="text-xs sm:text-sm font-medium text-slate-700">Medium Risk</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-sm"></div>
          <span className="text-xs sm:text-sm font-medium text-slate-700">Low Risk</span>
        </div>
      </div>
    </div>
  );
};

export default DropoutRiskChart;