import React from 'react'
import Spinner from './Spinner'

const LightButton = ({ text, onClick, className = '', loading = false, disabled = false }) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={loading ? undefined : onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-800 bg-zinc-50 border border-zinc-300  hover:border-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading && <Spinner size="sm" className="mr-2" color="dark" />}
      {text}
    </button>
  )
}

export default LightButton