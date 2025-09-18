import React, { useState, useEffect } from 'react';

const getStudentSeverity = (student, dropoutRate) => {
  if (!student) return 'low';
  // High severity: dropoutRate >= 60, attendance < 70, avg test score < 60, or Pending_Fees === 1
  if (typeof dropoutRate === 'number' && dropoutRate >= 60) return 'high';
  if (typeof student.attendance_percentage === 'number' && student.attendance_percentage < 70) return 'high';
  if (typeof student.test_score_1 === 'number' && typeof student.test_score_2 === 'number' && typeof student.test_score_3 === 'number') {
    const avgScore = (student.test_score_1 + student.test_score_2 + student.test_score_3) / 3;
    if (avgScore < 60) return 'high';
  }
  if (student.Pending_Fees === 1) return 'medium';
  // Medium severity: dropoutRate >= 30, attendance < 80, avg test score < 70
  if (typeof dropoutRate === 'number' && dropoutRate >= 30) return 'medium';
  if (typeof student.attendance_percentage === 'number' && student.attendance_percentage < 80) return 'medium';
  if (typeof student.test_score_1 === 'number' && typeof student.test_score_2 === 'number' && typeof student.test_score_3 === 'number') {
    const avgScore = (student.test_score_1 + student.test_score_2 + student.test_score_3) / 3;
    if (avgScore < 70) return 'medium';
  }
  return 'low';
};
import { AlertTriangle, Clock, CheckCircle, Send, Eye } from 'lucide-react';
import { getAndStorePrediction } from '../../data/mockData';

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [students, setStudents] = useState([]);
  const [dropoutRates, setDropoutRates] = useState([]);

  useEffect(() => {
      const fetchStats = async () => {
        setLoading(true);
        try {
          const data = await getAndStorePrediction();
          
          setStudents(data.students || []);
          setDropoutRates(data.dropoutRate || []);
        } catch (err) {
         
          setStudents([]);
          setDropoutRates([]);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }, []);

  const getStudent = (studentId) => {
    return mockStudents.find(s => s.id === studentId);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSendNotification = () => {
    alert('Notification sent to mentor and guardian!');
  };

  // Generate alerts from students data
  const generatedAlerts = students.map((student, idx) => {
    const dropoutRate = Array.isArray(dropoutRates) && dropoutRates.length > idx ? dropoutRates[idx] : student.dropoutRate;
    const severity = getStudentSeverity(student, dropoutRate);
    let type = '';
    let message = '';
    if (severity === 'high') {
      if (student.attendance_percentage < 70) {
        type = 'attendance';
        message = `Attendance below critical threshold (${student.attendance_percentage}%) - Immediate intervention required`;
      } else if (((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3) < 60) {
        type = 'performance';
        message = `Test scores consistently declining - Current average: ${((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3).toFixed(2)}%`;
      } else if (student.Pending_Fees === 1) {
        type = 'fees';
        message = 'Fee payment pending for current semester';
      }
    } else if (severity === 'medium') {
      if (student.attendance_percentage < 80) {
        type = 'attendance';
        message = `Attendance approaching threshold (${student.attendance_percentage}%) - Monitor closely`;
      } else if (((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3) < 70) {
        type = 'performance';
        message = `Test scores below department average - Counseling recommended`;
      } else if (student.Pending_Fees === 1) {
        type = 'fees';
        message = 'Fee payment pending - Grace period active';
      }
    } else {
      type = 'performance';
      message = 'Good standing';
    }
    return {
      id: idx + 1,
      studentId: student.student_id || student.id,
      studentName: student.name,
      type,
      severity,
      message,
      dropoutRate,
      created: new Date().toISOString(),
      resolved: false,
      department: student.department,
      class: student.class,
    };
  });

  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <span className="text-sm text-gray-500">
            {generatedAlerts.filter(a => !a.resolved).length} active alerts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto">
        {/* High Priority Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            High Priority
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {generatedAlerts.filter(a => a.severity === 'high' && !a.resolved).length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Critical alerts</p>
          </div>
        </div>

        {/* Medium Priority Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 text-yellow-500 mr-2" />
            Medium Priority
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {generatedAlerts.filter(a => a.severity === 'medium' && !a.resolved).length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Attention needed</p>
          </div>
        </div>

        {/* Low Priority Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
            Low Priority
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {generatedAlerts.filter(a => a.severity === 'low' && !a.resolved).length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Monitor closely</p>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {generatedAlerts.map((alert) => {
            const student = students.find(s => String(s.student_id || s.id) === String(alert.studentId));
            const severity = alert.severity;
            return (
              <div
                key={alert.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  selectedAlert === alert.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getSeverityIcon(severity)}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(severity)}`}
                      >
                        {severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {alert.type}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {student?.name}
                    </h4>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(alert.created)}
                    </p>
                    <p className="text-xs text-gray-400">Dropout Rate: {typeof alert.dropoutRate === 'number' ? alert.dropoutRate.toFixed(2) + '%' : 'N/A'}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleSendNotification(alert.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Notify
                    </button>
                    <button
                      onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </button>
                  </div>
                </div>
                {selectedAlert === alert.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Student Details</h5>
                    {student && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Class:</span> {student.class}
                        </div>
                        <div>
                          <span className="text-gray-500">Attendance:</span> {student.attendance_percentage}%
                        </div>
                        <div>
                          <span className="text-gray-500">Test Score:</span> {((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3).toFixed(2)}%
                        </div>
                        <div>
                          <span className="text-gray-500">Fee Status:</span> {student.Pending_Fees === 1 ? 'Pending' : 'Paid'}
                        </div>
                        <div>
                          <span className="text-gray-500">Dropout Rate:</span> {typeof alert.dropoutRate === 'number' ? alert.dropoutRate.toFixed(2) + '%' : 'N/A'}
                        </div>
                        {/* Add more fields as needed */}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
