
import React from 'react';
import { Search } from 'lucide-react';
import { departments } from '../../../data/mockData';

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  classFilter, 
  onClassFilterChange, 
  riskFilter, 
  onRiskFilterChange 
}) => {
  return (
    <div className="bg-zinc-50 rounded-lg shadow-sm border border-zinc-300 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Search Bar */}
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <select
              value={classFilter}
              onChange={(e) => onClassFilterChange(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select
              value={riskFilter}
              onChange={(e) => onRiskFilterChange(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
            >
              <option value="">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
