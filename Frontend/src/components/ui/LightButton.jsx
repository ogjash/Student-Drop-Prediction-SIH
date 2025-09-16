import React from 'react'

const LightButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#1c1d1f] bg-white border border-[#1c1d1f] hover:bg-gray-50 rounded-lg transition-colors ${className}`}
    >
      {text}
    </button>
  )
}

export default LightButton