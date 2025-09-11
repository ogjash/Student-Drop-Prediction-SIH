import React from 'react'

const LightButton = ({ text }) => {
  return (
    <button className="border border-[#c4c8cf] text-[#1c1d1f] px-7 py-1 rounded-lg font-semibold hover:border-[#505967] transition inline-flex items-center gap-2">
      {text}
    </button>
  )
}

export default LightButton