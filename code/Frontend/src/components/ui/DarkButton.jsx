import React from 'react'
import Spinner from './Spinner'

const DarkButton = ({ text, onClick, className = '', loading = false, disabled = false }) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={loading ? undefined : onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-50 border border-zinc-300 bg-zinc-800 hover:bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading && <Spinner size="sm" className="mr-2" color="white" />}
      {text}
    </button>
  )
}

export default DarkButton