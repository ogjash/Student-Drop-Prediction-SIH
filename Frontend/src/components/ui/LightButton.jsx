import React from 'react'

const LightButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#1c1d1f] bg-white border border-[#a1a9b7] hover:bg-gray-50 hover:border-[#1c1d1f] rounded-lg transition-colors ${className}`}
    >
      {text}
    </button>
  )
}

export default LightButton