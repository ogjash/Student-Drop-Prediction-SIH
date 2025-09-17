import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-semibold text-xl mb-4">ImpactCrew</h3>
            <p className="text-gray-300 max-w-md">
              Empowering universities with AI-driven insights to prevent student dropouts and enhance academic success.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-gray-900">Dashboard</Link></li>
              <li><Link to="/analysis" className="text-gray-400 hover:text-gray-900">Analysis</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@impactcrew.ai</li>
              <li>Phone: 99******99</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-500 mt-8 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} ImpactCrew. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer