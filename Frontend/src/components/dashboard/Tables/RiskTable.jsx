import { Eye, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { departments } from '../../../data/mockData';

const getAvgTestScore = (student) => {
  const t1 = typeof student.test_score_1 === 'number' ? student.test_score_1 : 0;
  const t2 = typeof student.test_score_2 === 'number' ? student.test_score_2 : 0;
  const t3 = typeof student.test_score_3 === 'number' ? student.test_score_3 : 0;
  return ((t1 + t2 + t3) / 3).toFixed(2);
};

const getAttendanceStatus = (percentage) => {
  if (percentage >= 85) return { color: 'text-emerald-600', icon: TrendingUp };
  if (percentage >= 70) return { color: 'text-amber-600', icon: Minus };
  return { color: 'text-red-600', icon: TrendingDown };
};

const getScoreStatus = (score) => {
  if (score >= 80) return { color: 'text-emerald-600', icon: TrendingUp };
  if (score >= 60) return { color: 'text-amber-600', icon: Minus };
  return { color: 'text-red-600', icon: TrendingDown };
};
const RiskTable = ({ students, onViewStudent, dropoutRates }) => {
  
const getRiskColor = (level) => {
  switch (level) {
    case 'high':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: AlertTriangle,
        iconColor: 'text-red-500'
      };
    case 'medium':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: Minus,
        iconColor: 'text-amber-500'
      };
    case 'low':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: TrendingUp,
        iconColor: 'text-emerald-500'
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        icon: Minus,
        iconColor: 'text-gray-500'
      };
  }
};  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Student Risk Assessment</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-200 rounded-full mr-2"></div>
              High Risk
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-amber-200 rounded-full mr-2"></div>
              Medium Risk
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-emerald-200 rounded-full mr-2"></div>
              Low Risk
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Student Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Attendance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {students.map((student, idx) => {
              // Get dropoutRate from dropoutRates prop if available, else fallback to student.dropoutRate
              const dropoutRate =
                Array.isArray(dropoutRates) && dropoutRates.length > idx
                  ? dropoutRates[idx]
                  : student.dropoutRate;
              
              const avgScore = parseFloat(getAvgTestScore(student));
              const attendanceStatus = getAttendanceStatus(student.attendance_percentage);
              const scoreStatus = getScoreStatus(avgScore);
              
              return (
              <tr key={student.student_id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">ID: {student.student_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {
                      (() => {
                        const dept = departments.find(
                          (d) => d.name === student.department
                        );
                        return dept ? student.class : dept?.code || student.class;
                      })()
                    }
                  </div>
                  <div className="text-sm text-gray-500">{student.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-semibold ${attendanceStatus.color}`}>
                    {student.attendance_percentage}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-semibold ${scoreStatus.color}`}>
                    {avgScore}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(() => {
                    let riskLevel = student.riskLevel;
                    if (!riskLevel) {
                      riskLevel = 'low';
                      if (typeof dropoutRate === 'number') {
                        if (dropoutRate > 70) riskLevel = 'high';
                        else if (dropoutRate < 70 && dropoutRate > 40) riskLevel = 'medium';
                      }
                    }
                    const riskConfig = getRiskColor(riskLevel);
                    
                    return (
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${riskConfig.bg} ${riskConfig.text} ${riskConfig.border}`}
                        >
                          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
                        </span>
                        {typeof dropoutRate === 'number' && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({dropoutRate.toFixed(1)}%)
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewStudent && onViewStudent(student)}
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskTable;

