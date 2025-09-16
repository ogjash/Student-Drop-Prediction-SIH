import React from 'react'

const DarkButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#1c1d1f] hover:bg-[#000] rounded-lg transition-colors ${className}`}
    >
      {text}
    </button>
  )
}

export default DarkButton