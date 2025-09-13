import React from 'react';
import { AlertTriangle, DollarSign, TrendingDown, Eye } from 'lucide-react';

const RiskTable = ({ students, onViewStudent }) => {
  const getRiskBadge = (riskLevel) => {
    const classes = {
      safe: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200',
    };
    const labels = {
      safe: 'Safe',
      warning: 'Warning',
      high: 'High Risk',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes[riskLevel]}`}>
        {labels[riskLevel]}
      </span>
    );
  };
  const getFeeStatusIcon = (status) => {
    if (status === 'overdue') {
      return <DollarSign className="h-4 w-4 text-red-500" />;
    }
    if (status === 'pending') {
      return <DollarSign className="h-4 w-4 text-yellow-500" />;
    }
    return null;
  };
  const getRiskFactors = (student) => {
    const factors = [];
    if (student.attendance < 80) {
      factors.push(<AlertTriangle key="attendance" className="h-4 w-4 text-yellow-500" title="Low attendance" />);
    }
    if (student.testScore < 60) {
      factors.push(<TrendingDown key="score" className="h-4 w-4 text-red-500" title="Declining test scores" />);
    }
    if (student.feeStatus !== 'paid') {
      factors.push(getFeeStatusIcon(student.feeStatus));
    }
    return factors;
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">At-Risk Students</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Score</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Factors</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.attendance}%</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.testScore}%</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.feeStatus}</td>
                <td className="px-4 py-2 whitespace-nowrap">{getRiskBadge(student.riskLevel)}</td>
                <td className="px-4 py-2 whitespace-nowrap flex space-x-1">{getRiskFactors(student)}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => onViewStudent(student)}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskTable;
