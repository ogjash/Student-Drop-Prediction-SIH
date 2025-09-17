import React from 'react'

const DarkButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-[#a1a9b7] bg-[#28292c] hover:bg-gradient-to-b from-[#505967] to-[#1c1d1f] rounded-lg transition ${className}`}
    >
      {text}
    </button>
  )
}

export default DarkButton