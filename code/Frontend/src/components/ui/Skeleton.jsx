import React from 'react';

// Basic skeleton component for individual elements
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
};

// Reports page specific skeleton
const ReportsSkeleton = () => {
  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-zinc-100 rounded-xl border border-zinc-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1 */}
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-300 bg-zinc-50">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-36 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="p-6">
            <Skeleton className="h-64 w-full rounded" />
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-zinc-100 rounded-xl border border-zinc-300 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-300 bg-zinc-50">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="p-6">
            <Skeleton className="h-64 w-full rounded" />
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-zinc-100 rounded-xl border border-zinc-300 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-300 bg-zinc-50">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-48 mb-1" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="px-6 py-3 bg-zinc-100 border-b">
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          {/* Table Rows */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-zinc-100">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-lg mr-3" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-8" />
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-2 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// StudentDetail page specific skeleton
const StudentDetailSkeleton = () => {
  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Avatar */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <Skeleton className="h-32 w-32 rounded-full mx-auto lg:mx-0" />
            </div>
            
            {/* Student Info */}
            <div className="flex-1 space-y-6">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="p-6">
            <Skeleton className="h-64 w-full rounded" />
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="p-6">
            <Skeleton className="h-64 w-full rounded" />
          </div>
        </div>
      </div>

      {/* Performance History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-6 rounded" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// Alerts page specific skeleton
const AlertsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 rounded mr-2" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <div className="p-6 text-center">
              <Skeleton className="h-10 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-3 w-28 mx-auto mt-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-36" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-20 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Students page specific skeleton
const StudentsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-48 mt-1 md:mt-0" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg border">
        <Skeleton className="h-10 w-full md:w-64" />
        <Skeleton className="h-10 w-full md:w-32" />
        <Skeleton className="h-10 w-full md:w-32" />
        <Skeleton className="h-10 w-full md:w-24" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border rounded-xl">
        {/* Table Header */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-6 gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-18" />
            <Skeleton className="h-4 w-22" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
          </div>
        </div>
        
        {/* Table Rows */}
        <div className="divide-y">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="p-6">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-12 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Overview page specific skeleton
const OverviewSkeleton = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Risk Table Skeleton */}
      <div className="bg-white border rounded-xl">
        {/* Table Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-7 w-40" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </div>
        </div>
        
        {/* Table Content */}
        <div className="p-6">
          {/* Table Headers */}
          <div className="grid grid-cols-6 gap-4 pb-4 border-b">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-18" />
            <Skeleton className="h-4 w-22" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
          </div>
          
          {/* Table Rows */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 py-4 border-b last:border-b-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simpler loading skeleton for smaller components
const LoadingSkeleton = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
};

export { Skeleton, ReportsSkeleton, StudentDetailSkeleton, AlertsSkeleton, StudentsSkeleton, OverviewSkeleton, LoadingSkeleton };
export default Skeleton;