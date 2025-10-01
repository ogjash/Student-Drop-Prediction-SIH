
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

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAndStorePrediction();
        setStudents(data.students|| []);
      } catch (error) {
        setStudents([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const filteredStudents = students.filter((student) => {
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
            <RiskTable students={filteredStudents} onViewStudent={handleViewStudent} />
          </div>
        </>
      )}
    </div>
  );
};

export default Students;
