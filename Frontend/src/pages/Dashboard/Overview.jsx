import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';
import {StatsCard, RiskTable} from '../../components/index';
import { getAndStorePrediction } from '../../data/mockData';
import { useEffect, useState } from 'react';
import { OverviewSkeleton } from '../../components/ui/Skeleton';

// Import chart components
import DropoutRiskChart from '../../components/dashboard/Charts/DropoutRiskChart';
import DepartmentAnalysisChart from '../../components/dashboard/Charts/DepartmentAnalysisChart';

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
      } catch (error) {
        console.error('Failed to fetch stats:', error);
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
  <div className="space-y-6 w-full">
      {loading ? (
        <OverviewSkeleton />
      ) : stats ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-zinc-800">Overview</h2>
            <p className="text-sm text-zinc-500 mt-1 md:mt-0">
              Dashboard insights and analytics
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Students"
              value={stats.totalStudents.toString()}
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="At-Risk Students"
              value={stats.atRiskStudents.toString()}
              icon={AlertTriangle}
              color="red"
            />
            <StatsCard
              title="Average Attendance"
              value={`${stats.averageAttendance}%`}
              icon={BookOpen}
              color="green"
            />
            <StatsCard
              title="Average Test Score"
              value={`${stats.averageTestScore}%`}
              icon={TrendingUp}
              color="purple"
            />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Dropout Risk Distribution */}
            <DropoutRiskChart students={students} dropoutRates={dropoutRates} />
            
            {/* Department Analysis */}
            <DepartmentAnalysisChart students={students} dropoutRates={dropoutRates} />
          </div>
          
          {/* Risk Table */}
          <div>
            <RiskTable students={students} onViewStudent={handleViewStudent} dropoutRates={dropoutRates} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-lg font-semibold text-zinc-500">No data available.</div>
          <button
            className="px-4 py-2 bg-blue-600 text-zinc-50 rounded hover:bg-blue-700 transition"
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