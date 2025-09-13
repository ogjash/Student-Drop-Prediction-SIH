import React, { useState } from 'react';
import { GraduationCap, Menu, X as Close } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Static user for demonstration
const staticUser = {
  username: 'sardarji',
  status: 'owner',
};

const Header = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', path: '/' },
    { id: 'students', label: 'Students', path: '/students' },
    { id: 'alerts', label: 'Alerts', path: '/alerts' },
    { id: 'reports', label: 'Reports', path: '/reports' },
    { id: 'settings', label: 'Settings', path: '/settings' },
  ];

  const ownerTabs =
    (user ?? staticUser)?.status === 'owner'
      ? [...tabs, { id: 'addUsers', label: 'Add Users', path: '/add-users' }]
      : tabs;

  const getActiveTab = () => {
    const found = ownerTabs.find((tab) => tab.path === location.pathname);
    return found ? found.id : 'overview';
  };
  const activeTab = getActiveTab();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 overflow-x-hidden">
          <div className="flex items-center space-x-3 overflow-hidden">
            <GraduationCap className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <h1 className="text-xl font-semibold text-gray-900 hidden sm:inline truncate max-w-[160px] md:max-w-xs lg:max-w-md">
              Student Risk Monitoring Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-8 overflow-x-auto">
              {ownerTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            {/* Username display */}
            {(user ?? staticUser)?.username && (
              <span className="text-gray-700 text-sm font-medium truncate max-w-[100px]">
                {(user ?? staticUser).username}
                {(user ?? staticUser).status === 'owner' && (
                  <span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Owner
                  </span>
                )}
              </span>
            )}
            {/* Hamburger button for mobile */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile nav overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-200 ${
            mobileOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Mobile nav */}
        <div
          className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow transition-transform duration-200 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ transitionProperty: 'transform,opacity' }}
        >
          <div className="flex flex-col px-4 pt-4 pb-2 overflow-x-hidden">
            {ownerTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setMobileOpen(false);
                  navigate(tab.path);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium mb-1 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            {(user ?? staticUser)?.username && (
              <div className="mt-2 px-2 text-gray-700 text-sm font-medium truncate max-w-[120px]">
                {(user ?? staticUser).username}
                {(user ?? staticUser).status === 'owner' && (
                  <span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Owner
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
