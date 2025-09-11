import React from 'react'
import DarkButton from '../components/ui/DarkButton.jsx'
import LightButton from '../components/ui/LightButton.jsx'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#ffff] flex flex-col items-center">
      <div className="text-center pt-32">
        <h1 className="text-5xl font-bold text-[#1c1d1f] mb-4">
          Smarter Insights <br /> Stronger Support.
        </h1>
        <h2 className="text-2xl text-[#505967] mb-8">
          Helping educators act early to reduce dropout rates.
        </h2>
        <div className="space-x-4">
          <DarkButton text="Demo" />
          <LightButton text="Preview"/>
        </div>
      </div>

      <div className="w-full mt-20">
        <div className="border-t border-[#d6d9e4] w-full">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex mb-8 -mt-px relative">
              <div className='absolute border-2 border-dashed h-90 border-[#d6d9e4]'></div>
              <button className="flex-1 py-5 px-7 border-t border-b border-[#d6d9e4] bg-white text-[#505967] font-medium transition">
                Student Analysis
              </button>
              <button className="flex-1 py-5 px-7 border-t border-b border-r border-[#d6d9e4] bg-white text-[#505967] font-medium transition">
                Attendance Tracking
              </button>
              <button className="flex-1 py-5 px-7 border-t border-b border-r border-[#d6d9e4] bg-white text-[#505967] font-medium transition">
                Performance Metrics
              </button>
              <button className="flex-1 py-5 px-7 border-t border-r border-b border-[#d6d9e4] bg-white text-[#505967] font-medium transition">
                Intervention Planner
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full aspect-[16/9] bg-[#edeef1] rounded-xl max-w-7xl mx-auto px-6 py-8">
          {/* Dashboard video will go here */}
        </div>
      </div>
    </div>
  )
}

export default Home