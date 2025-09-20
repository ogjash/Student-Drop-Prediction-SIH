
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterBar, RiskTable } from '../../components/index';
import { getAndStorePrediction } from '../../data/mockData';
import { StudentsSkeleton } from '../../components/ui/Skeleton';


const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [students, setStudents] = useState([]);
  const [dropoutRates, setDropoutRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAndStorePrediction();
        setStudents(data.students || []);
        setDropoutRates(data.dropoutRate || []);
      } catch (error) {
        setStudents([]);
        setDropoutRates([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const getRiskLevel = (dropoutRate) => {
    if (typeof dropoutRate === 'number') {
      if (dropoutRate > 70) return 'high';
      if (dropoutRate > 40) return 'medium';
    }
    return 'low';
  };

  const studentsWithRisk = students.map((student, idx) => {
    const rate = Array.isArray(dropoutRates) ? dropoutRates[idx] : student.dropoutRate;
    const riskLevel = getRiskLevel(rate);
    return {
      ...student,
      riskLevel
    };
  });

  // Debug: log risk levels and filters
  console.log('studentsWithRisk', studentsWithRisk);
  console.log('riskFilter', riskFilter);

  const filteredStudents = studentsWithRisk.filter((student) => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !classFilter || student.department === classFilter;
    const matchesRisk = !riskFilter || (student.riskLevel && student.riskLevel === riskFilter);
    return matchesSearch && matchesClass && matchesRisk;
  });
  // Debug: log filtered students
  console.log('filteredStudents', filteredStudents);

  const handleViewStudent = (student) => {
    navigate(`/dashboard/student/${student.student_id}`);
  };

  return (
    <div className="space-y-6 w-full">
      {loading ? (
        <StudentsSkeleton />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-zinc-800">Students</h2>
            <p className="text-sm text-zinc-500 mt-1 md:mt-0">
              {`${filteredStudents.length} of ${students.length} students`}
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
          <div>
            <RiskTable students={filteredStudents} onViewStudent={handleViewStudent} dropoutRates={dropoutRates} />
          </div>
        </>
      )}
    </div>
  );
};

export default Students;
