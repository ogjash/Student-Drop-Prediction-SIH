import React from 'react';
import { Users, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';
import StatsCard from '../components/Cards/StatsCard';
import AttendanceChart from '../components/Charts/AttendanceChart';
import RiskTable from '../components/Tables/RiskTable';
import { dashboardStats, mockStudents } from '../data/mockData';

const Overview = ({ onViewStudent }) => {
  const chartData = [
    { date: '2024-01-01', attendance: 88, testScore: 82 },
    { date: '2024-01-02', attendance: 85, testScore: 79 },
    { date: '2024-01-03', attendance: 90, testScore: 85 },
    { date: '2024-01-04', attendance: 87, testScore: 81 },
    { date: '2024-01-05', attendance: 92, testScore: 88 },
    { date: '2024-01-06', attendance: 89, testScore: 84 },
    { date: '2024-01-07', attendance: 91, testScore: 86 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={dashboardStats.totalStudents.toString()}
          change="+12 this month"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="At-Risk Students"
          value={dashboardStats.atRiskStudents.toString()}
          change="-3 from last week"
          changeType="positive"
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Average Attendance"
          value={`${dashboardStats.averageAttendance}%`}
          change="+2.3% this month"
          changeType="positive"
          icon={BookOpen}
          color="green"
        />
        <StatsCard
          title="Average Test Score"
          value={`${dashboardStats.averageTestScore}%`}
          change="+1.8% this month"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
      </div>
      {/* Chart */}
      <AttendanceChart data={chartData} />
      {/* Risk Table */}
      <RiskTable students={mockStudents} onViewStudent={onViewStudent} />
    </div>
  );
};

export default Overview;
