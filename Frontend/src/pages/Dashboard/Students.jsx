import React, { useState } from 'react';
import FilterBar from '../../components/dashboard/Filters/FilterBar';
import RiskTable from '../../components/dashboard/Tables/RiskTable';
import { mockStudents } from '../../data/mockData';

const Students = ({ onViewStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !classFilter || student.class === classFilter;
    const matchesRisk = !riskFilter || student.riskLevel === riskFilter;
    return matchesSearch && matchesClass && matchesRisk;
  });

  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Students</h2>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">
          {filteredStudents.length} of {mockStudents.length} students
        </p>
      </div>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        classFilter={classFilter}
        onClassFilterChange={setClassFilter}
        riskFilter={riskFilter}
        onRiskFilterChange={setRiskFilter}
      />
      <div className="overflow-x-auto">
        <RiskTable students={filteredStudents} onViewStudent={onViewStudent} />
      </div>
    </div>
  );
};

export default Students;
