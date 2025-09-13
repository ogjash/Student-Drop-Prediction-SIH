import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DarkButton from './ui/DarkButton'
import LightButton from './ui/LightButton'

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <nav className="border-b border-[#c4c8cf] bg-[#ffff] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-[#1c1d1f]">
            ImpactCrew
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <NavLink to="/problem" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Problem</NavLink>
              <NavLink to="/solution" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Our Solution</NavLink>
              <NavLink to="/features" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Features</NavLink>
              <NavLink to="/impact" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Impact</NavLink>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button aria-label="Open menu" className="p-2 text-[#1c1d1f]" onClick={() => setIsMobileOpen(v => !v)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="hidden md:block space-x-3">
            <LightButton text="Login" />
            <DarkButton text="SignUp" />
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-[#c4c8cf] bg-[#ffff]">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
            <NavLink to="/problem" onClick={closeMobile} className={({ isActive }) => `block ${isActive ? 'text-[#1c1d1f]' : 'text-[#505967] hover:text-[#1c1d1f]'}`}>Problem</NavLink>
            <NavLink to="/solution" onClick={closeMobile} className={({ isActive }) => `block ${isActive ? 'text-[#1c1d1f]' : 'text-[#505967] hover:text-[#1c1d1f]'}`}>Our Solution</NavLink>
            <NavLink to="/impact" onClick={closeMobile} className={({ isActive }) => `block ${isActive ? 'text-[#1c1d1f]' : 'text-[#505967] hover:text-[#1c1d1f]'}`}>Impact</NavLink>
            <NavLink to="/features" onClick={closeMobile} className={({ isActive }) => `block ${isActive ? 'text-[#1c1d1f]' : 'text-[#505967] hover:text-[#1c1d1f]'}`}>Features</NavLink>
            <NavLink to="/about" onClick={closeMobile} className={({ isActive }) => `block ${isActive ? 'text-[#1c1d1f]' : 'text-[#505967] hover:text-[#1c1d1f]'}`}>About</NavLink>
            <div className="pt-2">
              <DarkButton text="Login" />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar