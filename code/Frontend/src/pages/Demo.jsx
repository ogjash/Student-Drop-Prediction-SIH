import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Demo = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // YouTube video ID
  const youtubeVideoId = "-1o0vFkMksA";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&rel=0&modestbranding=1`;

  // Dataset links
  const datasetLinks = [
    {
      id: 1,
      title: "Attendance Google Sheet link",
      url: "https://docs.google.com/spreadsheets/d/1PZID0imfEW1mYoS-uh0BTfMy_Wphg_A_cjJttG3LXu8/edit?gid=0#gid=0",
      description: "Student attendance records",
      requiredFields: ["Student ID", "Attendance Percentage"]
    },
    {
      id: 2,
      title: "Fees Google Sheet link",
      url: "https://docs.google.com/spreadsheets/d/1BwkEK2feXAGPr_5nmH3CQ7IzORErQxEGM_PI34id8pc/edit?gid=0#gid=0",
      description: "Fee payment details",
      requiredFields: ["Student ID", "Pending Fees", "Family Income"]
    },
    {
      id: 3,
      title: "Marksheet Google Sheet link",
      url: "https://docs.google.com/spreadsheets/d/1QQ0uqt2DrfC_tdFmsZizT48Vkz6tUZbzg8Z7XxjbCSU/edit?gid=0#gid=0",
      description: "Academic performance data",
      requiredFields: ["Student ID", "Test Score 1", "Test Score 2", "Test Score 3"]
    },
    {
      id: 4,
      title: "StudentDetail Sheet link",
      url: "https://docs.google.com/spreadsheets/d/117zIo6u0yxPAaFR4De6JaueVOto8ZqIwCdPIa1azIBI/edit?gid=0#gid=0",
      description: "Personal information records",
      requiredFields: ["Student ID", "Name", "Email", "Phone", "Department"]
    }
  ];

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center p-2 sm:p-4 lg:p-6">
      {/* Main Platform */}
      <div className="w-full max-w-7xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100 rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-xl overflow-hidden p-4 sm:p-8 lg:p-12">
        {/* Video Container */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden aspect-video">
          {/* Video Element */}
          <iframe
            className="w-full h-full rounded-xl sm:rounded-2xl"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Data Links Section */}
        <div className="mt-6 sm:mt-8 lg:mt-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-2">
              Sheets Link
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
              Access our comprehensive datasets for student dropout prediction analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {datasetLinks.map((dataset, index) => (
              <div 
                key={dataset.id} 
                className="bg-zinc-50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-300 p-4 sm:p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <label className="text-xs sm:text-sm font-semibold text-zinc-800 w-full text-start">
                    <span className="block truncate pr-2">{dataset.title}</span>
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={dataset.url}
                    readOnly
                    className="flex-1 min-w-0 px-3 py-2 sm:py-2.5 border border-zinc-300/60 rounded-lg sm:rounded-xl shadow-sm bg-zinc-50/50 text-zinc-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-zinc-50"
                  />
                  <button
                    onClick={() => copyToClipboard(dataset.url, index)}
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center ${
                      copiedIndex === index 
                        ? 'bg-zinc-200 text-zinc-700' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}
                    title={copiedIndex === index ? 'Copied!' : 'Copy link'}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Demo;