import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Overview from './pages/Overview';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedStudent(null);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  const renderContent = () => {
    if (selectedStudent) {
      return <StudentDetail student={selectedStudent} onBack={handleBackToList} />;
    }

    switch (activeTab) {
      case 'overview':
        return <Overview onViewStudent={handleViewStudent} />;
      case 'students':
        return <Students onViewStudent={handleViewStudent} />;
      case 'alerts':
        return <Alerts />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview onViewStudent={handleViewStudent} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
