import React from 'react';

const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    blue: {
      icon: 'text-indigo-600 bg-indigo-50',
      accent: 'bg-indigo-300',
      border: 'border-zinc-200'
    },
    red: {
      icon: 'text-red-600 bg-red-50',
      accent: 'bg-red-300',
      border: 'border-zinc-200'
    },
    green: {
      icon: 'text-emerald-600 bg-emerald-50',
      accent: 'bg-emerald-300',
      border: 'border-zinc-200'
    },
    purple: {
      icon: 'text-purple-600 bg-purple-50',
      accent: 'bg-purple-300',
      border: 'border-zinc-200'
    }
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`
      relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out
      hover:scale-[1.02] hover:-translate-y-1
      bg-zinc-100
      ${currentColor.border}
    `}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-500 mb-1 tracking-wide uppercase">
              {title}
            </p>
            <p className="text-3xl font-bold text-zinc-800 mb-2 leading-none">
              {value}
            </p>
            {change && (
              <div className={`
                inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full
                ${changeType === 'positive' 
                  ? 'text-emerald-700 bg-emerald-100' 
                  : changeType === 'negative'
                  ? 'text-red-700 bg-red-100'
                  : 'text-gray-700 bg-gray-100'
                }
              `}>
                {changeType === 'positive' && '↗'}
                {changeType === 'negative' && '↘'}
                {change}
              </div>
            )}
          </div>
          <div className={`
            p-3 rounded-xl shadow-sm ring-1 ring-white/20
            transition-transform duration-300 ease-in-out
            hover:scale-110 hover:rotate-3
            ${currentColor.icon}
          `}>
            <Icon className="h-7 w-7" />
          </div>
        </div>
      </div>
      
      {/* Solid color bottom accent */}
      <div className={`h-1 ${currentColor.accent}`}></div>
    </div>
  );
};

export default StatsCard;
