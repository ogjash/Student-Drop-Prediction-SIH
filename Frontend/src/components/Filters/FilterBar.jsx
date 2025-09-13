import React from 'react';
import { Filter, Search } from 'lucide-react';

const FilterBar = ({ searchTerm, onSearchChange, classFilter, onClassFilterChange, riskFilter, onRiskFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <select
          value={classFilter}
          onChange={(e) => onClassFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Classes</option>
          <option value="9A">Class 9A</option>
          <option value="9B">Class 9B</option>
          <option value="10A">Class 10A</option>
          <option value="10B">Class 10B</option>
          <option value="10C">Class 10C</option>
          <option value="11A">Class 11A</option>
          <option value="11B">Class 11B</option>
        </select>
        <select
          value={riskFilter}
          onChange={(e) => onRiskFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Risk Levels</option>
          <option value="safe">Safe</option>
          <option value="warning">Warning</option>
          <option value="high">High Risk</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
