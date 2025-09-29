import React from "react";

const Spinner = ({ size = "md", className = "", color = "white" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4", 
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const colorClasses = {
    white: "border-white/20 border-t-white",
    dark: "border-gray-400/20 border-t-gray-600",
    primary: "border-blue-300/20 border-t-blue-600",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 rounded-full ${colorClasses[color]} ${className}`}
      style={{
        animation: 'spin 1s linear infinite',
        borderTopWidth: '2px'
      }}
    ></div>
  );
};

export default Spinner;