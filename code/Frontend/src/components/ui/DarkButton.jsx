import React from 'react'

const DarkButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-50 border border-zinc-300 bg-zinc-800 hover:bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-lg transition ${className}`}
    >
      {text}
    </button>
  )
}

export default DarkButton