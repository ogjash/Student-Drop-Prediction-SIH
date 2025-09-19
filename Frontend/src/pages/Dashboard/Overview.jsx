import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';
import {StatsCard, RiskTable} from '../../components/index';
import { getAndStorePrediction } from '../../data/mockData';
import { useEffect, useState } from 'react';

const Overview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [dropoutRates, setDropoutRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getAndStorePrediction();
        setStats(data);
        setStudents(data.students || []);
        setDropoutRates(data.dropoutRate || []);
      } catch (err) {
        setStats(null);
        setStudents([]);
        setDropoutRates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleViewStudent = (student) => {
    navigate(`/dashboard/student/${student.student_id}`);
  };

  

  return (
  <div className="w-full h-screen flex items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : stats ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Students"
              value={stats.totalStudents.toString()}
              change="+12 this month"
              changeType="positive"
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="At-Risk Students"
              value={stats.atRiskStudents.toString()}
              change="-3 from last week"
              changeType="positive"
              icon={AlertTriangle}
              color="red"
            />
            <StatsCard
              title="Average Attendance"
              value={`${stats.averageAttendance}%`}
              change="+2.3% this month"
              changeType="positive"
              icon={BookOpen}
              color="green"
            />
            <StatsCard
              title="Average Test Score"
              value={`${stats.averageTestScore}%`}
              change="+1.8% this month"
              changeType="positive"
              icon={TrendingUp}
              color="purple"
            />
          </div>
          
          {/* Risk Table */}
          <div>
            <RiskTable students={students} onViewStudent={handleViewStudent} dropoutRates={dropoutRates} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-lg font-semibold text-gray-600">No data available.</div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate('/dashboard/add-user')}
          >
            Upload Data
          </button>
        </div>
      )}
    </div>
  );
};

export default Overview;