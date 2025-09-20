import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, Send, Eye, RefreshCw, Filter, Bell, Calendar, User } from 'lucide-react';

import { AlertsSkeleton } from '../../components/ui/Skeleton';
import { predictDropout,refreshPrediction } from '../../api/auth';

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [students, setStudents] = useState([]);
  const [dropoutRates, setDropoutRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      setLoading(true);
      const response = await predictDropout();
      const data = response.data;
      
      setStudents(data.mergedData || []);
      setDropoutRates(data.dropoutRate || []);
    } catch (error) {
      console.error('Failed to fetch backend data:', error);
      setStudents([]);
      setDropoutRates([]);
    } finally {
      setLoading(false);
    }
  };


  
  const getStudentSeverity = (student, dropoutRate) => {
    if (!student) return 'low';
    
    // Follow RiskTable logic: High risk if dropoutRate > 70, Medium if 40-70, Low if <= 40
    if (typeof dropoutRate === 'number') {
      if (dropoutRate > 70) return 'high';
      if (dropoutRate > 40) return 'medium';
      return 'low';
    }
    
    // Fallback logic based on other factors if no dropout rate
    if (typeof student.attendance_percentage === 'number' && student.attendance_percentage < 70) return 'high';
    if (typeof student.test_score_1 === 'number' && typeof student.test_score_2 === 'number' && typeof student.test_score_3 === 'number') {
      const avgScore = (student.test_score_1 + student.test_score_2 + student.test_score_3) / 3;
      if (avgScore < 60) return 'high';
      if (avgScore < 70) return 'medium';
    }
    if (student.Pending_Fees === 1) return 'medium';
    if (typeof student.attendance_percentage === 'number' && student.attendance_percentage < 80) return 'medium';
    
    return 'low';
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'low':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
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

  const handleSendNotification = (alertId) => {
    const alert = generatedAlerts.find(a => a.id === alertId);
    if (alert) {
      alert('Notification sent to mentor and guardian for ' + alert.studentName + '!');
    } else {
      alert('Notification sent to mentor and guardian!');
    }
  };

  const handleNotifyAll = () => {
    const highRiskAlerts = filteredAlerts.filter(a => a.severity === 'high' && !a.resolved);
    const mediumRiskAlerts = filteredAlerts.filter(a => a.severity === 'medium' && !a.resolved);
    
    if (highRiskAlerts.length > 0) {
      alert(`Bulk notification sent to mentors and guardians for ${highRiskAlerts.length} high-risk students!`);
    } else if (mediumRiskAlerts.length > 0) {
      alert(`Bulk notification sent to mentors and guardians for ${mediumRiskAlerts.length} medium-risk students!`);
    } else {
      alert('No students found to notify.');
    }
  };

  const handleRefreshAlerts = async () => {
      setLoading(true);
      try {
        const refreshResponse = await refreshPrediction();
        if (refreshResponse.data) {
          setStudents(refreshResponse.data.mergedData  []);
          setDropoutRates(refreshResponse.data.dropoutRate  []);
          return; 
        }
        await fetchBackendData(); // Only fetch if refresh didn't return data
      } catch (error) {
        console.error('Failed to refresh prediction:', error);
        const errorMessage = error.response?.data?.message || 'Failed to refresh predictions';
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
  };

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

  const filteredAlerts = severityFilter === 'all' 
    ? generatedAlerts.filter(alert => alert.severity === 'high' || alert.severity === 'medium') // Show high and medium risk students
    : generatedAlerts.filter(alert => alert.severity === severityFilter);

  if (loading) {
      return <AlertsSkeleton />;
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Student Risk Alerts
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Monitor and send notifications to students requiring attention</p>
        </div>
        
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
          {/* Filter and Refresh Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
            >
              <option value="all">All Students</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
            </select>
            <button
              onClick={handleRefreshAlerts}
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Refresh</span>
              <span className="sm:hidden">Refresh</span>
            </button>
          </div>
          
          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleNotifyAll}
              disabled={filteredAlerts.filter(a => (a.severity === 'high' || a.severity === 'medium') && !a.resolved).length === 0}
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>Notify All</span>
            </button>
            <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">
                {filteredAlerts.filter(a => !a.resolved).length} need attention
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* High Risk Students */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-red-50 border-b border-red-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 flex-shrink-0" />
              <span className="truncate">High Risk Students</span>
            </h3>
          </div>
          <div className="p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
              {filteredAlerts.filter(a => a.severity === 'high').length}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Requiring immediate attention</p>
            <div className="text-xs text-gray-500">
              Dropout rate {'>'} 70%
            </div>
          </div>
        </div>

        {/* Medium Risk Students */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-amber-50 border-b border-amber-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mr-2 flex-shrink-0" />
              <span className="truncate">Medium Risk Students</span>
            </h3>
          </div>
          <div className="p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-600 mb-2">
              {filteredAlerts.filter(a => a.severity === 'medium').length}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Requiring monitoring</p>
            <div className="text-xs text-gray-500">
              Dropout rate 40-70%
            </div>
          </div>
        </div>

        {/* Pending Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-blue-50 border-b border-blue-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 flex-shrink-0" />
              <span className="truncate">Pending Notifications</span>
            </h3>
          </div>
          <div className="p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
              {filteredAlerts.filter(a => (a.severity === 'high' || a.severity === 'medium') && !a.resolved).length}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Awaiting notification</p>
            <div className="text-xs text-gray-500">
              Ready to alert mentors & guardians
            </div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900">At-Risk Students</h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">
                Showing {filteredAlerts.length} students requiring alerts
              </span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No at-risk students found</p>
              <p className="text-sm">No students in the selected category require alerts at this time</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const student = students.find(s => String(s.student_id || s.id) === String(alert.studentId));
              const severity = alert.severity;
              return (
                <div
                  key={alert.id}
                  className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedAlert === alert.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Status and Type Row */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {getSeverityIcon(severity)}
                        <span
                          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(severity)}`}
                        >
                          {severity.toUpperCase()}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700 capitalize">
                          {alert.type}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="hidden sm:inline">{formatDate(alert.created)}</span>
                          <span className="sm:hidden">{new Date(alert.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {/* Student Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                            {student?.name}
                          </h4>
                        </div>
                        <span className="text-sm text-gray-500 ml-6 sm:ml-0">
                          {student?.department} • {student?.class}
                        </span>
                      </div>
                      
                      {/* Alert Message */}
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{alert.message}</p>
                      
                      {/* Stats Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                        <span className="text-gray-500">
                          Dropout Risk: <span className="font-medium text-red-600">
                            {typeof alert.dropoutRate === 'number' ? alert.dropoutRate.toFixed(1) + '%' : 'N/A'}
                          </span>
                        </span>
                        {student && (
                          <>
                            <span className="text-gray-500">
                              Attendance: <span className="font-medium">
                                {student.attendance_percentage}%
                              </span>
                            </span>
                            <span className="text-gray-500">
                              Avg Score: <span className="font-medium">
                                {((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3).toFixed(1)}%
                              </span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:ml-6">
                      <button
                        onClick={() => handleSendNotification(alert.id)}
                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Notify</span>
                        <span className="sm:hidden">Notify</span>
                      </button>
                      <button
                        onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedAlert === alert.id ? 'Hide' : 'Details'}
                      </button>
                    </div>
                  </div>
                  {selectedAlert === alert.id && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-4 flex items-center text-sm sm:text-base">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-600 flex-shrink-0" />
                        Detailed Student Information
                      </h5>
                      {student && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
                          {/* Academic Info */}
                          <div className="space-y-3">
                            <h6 className="font-medium text-gray-900 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">Academic Info</h6>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Department:</span>
                                <span className="font-medium text-right">{student.department}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Class:</span>
                                <span className="font-medium text-right">{student.class}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Year:</span>
                                <span className="font-medium text-right">{student.year}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Performance Metrics */}
                          <div className="space-y-3">
                            <h6 className="font-medium text-gray-900 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">Performance</h6>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Attendance:</span>
                                <span className={`font-medium text-right ${
                                  student.attendance_percentage >= 85 ? 'text-emerald-600' : 
                                  student.attendance_percentage >= 70 ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                  {student.attendance_percentage}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Test 1:</span>
                                <span className="font-medium text-right">{student.test_score_1}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Test 2:</span>
                                <span className="font-medium text-right">{student.test_score_2}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Test 3:</span>
                                <span className="font-medium text-right">{student.test_score_3}%</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Risk Assessment */}
                          <div className="space-y-3 sm:col-span-2 xl:col-span-1">
                            <h6 className="font-medium text-gray-900 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">Risk Assessment</h6>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Average Score:</span>
                                <span className={`font-medium text-right ${
                                  ((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3) >= 80 ? 'text-emerald-600' : 
                                  ((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3) >= 60 ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                  {((student.test_score_1 + student.test_score_2 + student.test_score_3) / 3).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Fee Status:</span>
                                <span className={`font-medium text-right ${student.Pending_Fees === 1 ? 'text-red-600' : 'text-emerald-600'}`}>
                                  {student.Pending_Fees === 1 ? 'Pending' : 'Paid'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Dropout Risk:</span>
                                <span className="font-semibold text-red-600 text-right">
                                  {typeof alert.dropoutRate === 'number' ? alert.dropoutRate.toFixed(1) + '%' : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
