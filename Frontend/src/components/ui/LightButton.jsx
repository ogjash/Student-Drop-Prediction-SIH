import React from 'react'

const LightButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-800 bg-zinc-50 border border-zinc-300  hover:border-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors ${className}`}
    >
      {text}
    </button>
  )
}

export default LightButton