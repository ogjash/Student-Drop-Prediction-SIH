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
    <nav className="border-b border-zinc-300 bg-zinc-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-zinc-800">
            MentorSignal
          </Link>
          
          <div className="hidden md:block">
            <div className="flex  items-center space-x-8">
              <button onClick={() => navigate('')} className="text-zinc-500 hover:text-zinc-800">Home</button>
              <button onClick={() => scrollToSection('problem')} className="text-zinc-500 hover:text-zinc-800">Problem</button>
              <button onClick={() => scrollToSection('solution')} className="text-zinc-500 hover:text-zinc-800">Our Solution</button>
              <button onClick={() => scrollToSection('features')} className="text-zinc-500 hover:text-zinc-800">Features</button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button aria-label="Open menu" className="p-2 text-zinc-800" onClick={() => setIsMobileOpen(v => !v)}>
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
          <div className="bg-zinc-50 rounded-lg shadow-lg border border-zinc-300 py-4">
            <div className="px-4 py-3 space-y-4">
              <button onClick={() => navigate('')} 
                className="block w-full text-left px-3 py-2 text-zinc-500 hover:text-zinc-800  rounded-md transition-colors">
                Problem
              </button>
              <button onClick={() => scrollToSection('problem')} 
                className="block w-full text-left px-3 py-2 text-zinc-500 hover:text-zinc-800  rounded-md transition-colors">
                Problem
              </button>
              <button onClick={() => scrollToSection('solution')} 
                className="block w-full text-left px-3 py-2 text-zinc-500 hover:text-zinc-800  rounded-md transition-colors">
                Our Solution
              </button>
              <button onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2 text-zinc-500 hover:text-zinc-800 rounded-md transition-colors">
                Features
              </button>
              
              <div className="pt-4 px-3 space-y-3 space-x-3 border-t border-zinc-300">
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