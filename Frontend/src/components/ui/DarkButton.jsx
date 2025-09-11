import React from 'react'

const DarkButton = ({ text }) => {
  return (
    <button className="border border-[#505967] bg-[#1c1d1f] text-[#ffff] px-7 py-1 rounded-lg font-semibold hover:bg-gradient-to-b from-[#505967] to-[#1c1d1f] transition">
      {text}
    </button>
  )
}

export default DarkButton