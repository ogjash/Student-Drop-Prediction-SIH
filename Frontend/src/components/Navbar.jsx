import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import DarkButton from './ui/DarkButton'
import LightButton from './ui/LightButton'

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navigate = useNavigate()

  const closeMobile = () => setIsMobileOpen(false)

  const scrollToSection = (id) => {
    setIsMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAuth = (path) => {
    setIsMobileOpen(false)
    navigate(path)
  }

  return (
    <nav className="border-b border-[#c4c8cf] bg-[#ffff] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-[#1c1d1f]">
            ImpactCrew
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button onClick={() => scrollToSection('problem')} className="text-[#505967] hover:text-[#1c1d1f]">Problem</button>
              <button onClick={() => scrollToSection('solution')} className="text-[#505967] hover:text-[#1c1d1f]">Our Solution</button>
              <button onClick={() => scrollToSection('features')} className="text-[#505967] hover:text-[#1c1d1f]">Features</button>
              <button onClick={() => scrollToSection('impact')} className="text-[#505967] hover:text-[#1c1d1f]">Impact</button>
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
            <LightButton text="Login" onClick={() => handleAuth('/auth/login')} />
            <DarkButton text="SignUp" onClick={() => handleAuth('/auth/signup')} />
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden absolute top-16 inset-x-4 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-4">
            <div className="px-4 py-3 space-y-4">
              <button onClick={() => scrollToSection('problem')} 
                className="block w-full text-left px-3 py-2 text-[#505967] hover:text-[#1c1d1f] hover:bg-gray-50 rounded-md transition-colors">
                Problem
              </button>
              <button onClick={() => scrollToSection('solution')} 
                className="block w-full text-left px-3 py-2 text-[#505967] hover:text-[#1c1d1f] hover:bg-gray-50 rounded-md transition-colors">
                Our Solution
              </button>
              <button onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2 text-[#505967] hover:text-[#1c1d1f] hover:bg-gray-50 rounded-md transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('impact')} 
                className="block w-full text-left px-3 py-2 text-[#505967] hover:text-[#1c1d1f] hover:bg-gray-50 rounded-md transition-colors">
                Impact
              </button>
              <NavLink to="/about" onClick={closeMobile} 
                className={({ isActive }) => `block px-3 py-2 rounded-md transition-colors ${isActive ? 'text-[#1c1d1f]' : 'text-[#505967] hover:text-[#1c1d1f] hover:bg-gray-50'}`}>
                About
              </NavLink>
              
              <div className="pt-4 px-3 space-y-3 space-x-3 border-t border-gray-100">
                <DarkButton 
                  text="Login" 
                  onClick={() => handleAuth('/auth/login')} 
                  className="w-full justify-center" 
                />
                <LightButton 
                  text="Sign Up" 
                  onClick={() => handleAuth('/auth/signup')} 
                  className="w-full justify-center" 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar