import { Eye } from 'lucide-react';
import { departments } from '../../../data/mockData';

const getAvgTestScore = (student) => {
  const t1 = typeof student.test_score_1 === 'number' ? student.test_score_1 : 0;
  const t2 = typeof student.test_score_2 === 'number' ? student.test_score_2 : 0;
  const t3 = typeof student.test_score_3 === 'number' ? student.test_score_3 : 0;
  return ((t1 + t2 + t3) / 3).toFixed(2);
};

// Accept dropoutRates as a prop
const RiskTable = ({ students, onViewStudent, dropoutRates }) => {
  
  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Student Risk Assessment</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, idx) => {
              // Get dropoutRate from dropoutRates prop if available, else fallback to student.dropoutRate
              const dropoutRate =
                Array.isArray(dropoutRates) && dropoutRates.length > idx
                  ? dropoutRates[idx]
                  : student.dropoutRate;
              return (
              <tr key={student.student_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {
                    (() => {
                      const dept = departments.find(
                        (d) => d.name === student.department
                      );
                      return dept ? student.class : dept.code;
                    })()
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.attendance_percentage}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getAvgTestScore(student)}%
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
                    return (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`}
                      >
                        {riskLevel}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewStudent && onViewStudent(student)}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center"
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

