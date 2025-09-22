import React, { useState, useRef, useEffect } from 'react';

const Demo = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // YouTube video ID
  const youtubeVideoId = "-1o0vFkMksA";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&rel=0&modestbranding=1`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVideoExpanded(false);
      }
    };

    const handleVideoPlay = () => {
      setIsVideoExpanded(true);
    };

    // Listen for YouTube iframe API events
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      if (event.data && typeof event.data === 'string') {
        const data = JSON.parse(event.data);
        if (data.event === 'video-progress' || data.info === 1) {
          handleVideoPlay();
        }
      }
    });

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      {/* Main Platform */}
      <div 
        className={`w-full bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl border border-zinc-300 overflow-hidden transition-all duration-500 ${
          isVideoExpanded ? 'max-w-full p-4' : 'max-w-7xl p-12'
        }`}
      >
        {/* Video Container */}
        <div 
          ref={containerRef}
          className={`relative w-full bg-black rounded-xl overflow-hidden shadow-inner transition-all duration-500 ${
            isVideoExpanded ? 'aspect-video' : 'aspect-video'
          }`}
          onClick={() => setIsVideoExpanded(true)}
        >
          {/* YouTube Video Iframe */}
          <iframe
            ref={videoRef}
            className="w-full h-full rounded-xl"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Data Links Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-zinc-800 mb-6 text-center">
            Dataset Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Attendance Link */}
            <a
              href="https://docs.google.com/spreadsheets/d/1PZID0imfEW1mYoS-uh0BTfMy_Wphg_A_cjJttG3LXu8/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-50 bg-opacity-70 hover:bg-opacity-90 rounded-lg p-4 border border-zinc-300 hover:border-zinc-400 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="font-medium text-zinc-800 mb-1">Attendance</h4>
                <p className="text-sm text-zinc-600">Student attendance records</p>
              </div>
            </a>

            {/* Fees Link */}
            <a
              href="https://docs.google.com/spreadsheets/d/1BwkEK2feXAGPr_5nmH3CQ7IzORErQxEGM_PI34id8pc/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-50 bg-opacity-70 hover:bg-opacity-90 rounded-lg p-4 border border-zinc-300 hover:border-zinc-400 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="font-medium text-zinc-800 mb-1">Fees</h4>
                <p className="text-sm text-zinc-600">Fee payment details</p>
              </div>
            </a>

            {/* Marksheet Link */}
            <a
              href="https://docs.google.com/spreadsheets/d/1QQ0uqt2DrfC_tdFmsZizT48Vkz6tUZbzg8Z7XxjbCSU/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-50 bg-opacity-70 hover:bg-opacity-90 rounded-lg p-4 border border-zinc-300 hover:border-zinc-400 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-zinc-800 mb-1">Marksheet</h4>
                <p className="text-sm text-zinc-600">Academic performance data</p>
              </div>
            </a>

            {/* Student Details Link */}
            <a
              href="https://docs.google.com/spreadsheets/d/117zIo6u0yxPAaFR4De6JaueVOto8ZqIwCdPIa1azIBI/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-50 bg-opacity-70 hover:bg-opacity-90 rounded-lg p-4 border border-zinc-300 hover:border-zinc-400 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="font-medium text-zinc-800 mb-1">Student Details</h4>
                <p className="text-sm text-zinc-600">Personal information records</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;