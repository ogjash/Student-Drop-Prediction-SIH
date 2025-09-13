import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Overview from './pages/Overview';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import AddUser from './pages/AddUser';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={<Overview onViewStudent={handleViewStudent} />}
            />
            <Route
              path="/students"
              element={<Students onViewStudent={handleViewStudent} />}
            />
            <Route
              path="/students/:id"
              element={
                <StudentDetail
                  student={selectedStudent}
                  onBack={handleBackToList}
                />
              }
            />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-users" element={<AddUser />} />
            <Route
              path="*"
              element={<Overview onViewStudent={handleViewStudent} />}
            />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
