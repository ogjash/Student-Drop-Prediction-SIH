import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import DarkButton from './ui/DarkButton'

const Navbar = () => {
  return (
    <nav className="border-b border-[#c4c8cf] bg-[#ffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-[#1c1d1f]">
            ImpactCrew
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <NavLink to="/problem" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Problem</NavLink>
              <NavLink to="/solution" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Our Solution</NavLink>
              <NavLink to="/impact" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Impact</NavLink>
              <NavLink to="/features" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>Features</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? "text-[#1c1d1f]" : "text-[#505967] hover:text-[#1c1d1f]"}>About</NavLink>
            </div>
          </div>

          <div>
            <DarkButton text="Login" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar