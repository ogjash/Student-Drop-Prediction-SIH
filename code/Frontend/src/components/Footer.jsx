import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, Database, Users, Shield, Star, Zap } from 'lucide-react'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-zinc-50 font-semibold text-xl mb-4">MentorSignal</h3>
            <p className="text-zinc-400 max-w-md mb-6">
              ML-powered early warning system helping educators act early to reduce dropout rates in government colleges through unified data insights.
            </p>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Brain className="h-4 w-4" />
              <span>SIH 2025 Prototype</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-zinc-50 font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Database className="h-3 w-3" />
                  Data Integration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Brain className="h-3 w-3" />
                  AI Prediction
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Shield className="h-3 w-3" />
                  Smart Alerts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Users className="h-3 w-3" />
                  Department Access
                </button>
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="text-zinc-50 font-semibold mb-4">Learn More</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('problem')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Problem Statement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('solution')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Our Solution
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('quote')} 
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Vision
                </button>
              </li>
              <li><Link to="/auth/login" className="text-zinc-400 hover:text-zinc-200 transition-colors">Get Started</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-zinc-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-500 text-sm">
              <p>© {new Date().getFullYear()} ImpactCrew. Built for SIH 2025.</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <button 
                onClick={() => scrollToSection('problem')} 
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Why This Matters
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => scrollToSection('solution')} 
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                How It Works
              </button>
              <span className="text-zinc-600">•</span>
              <Link to="/dashboard" className="text-zinc-400 hover:text-zinc-200 transition-colors">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer