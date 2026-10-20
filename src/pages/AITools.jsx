import React, { useState } from 'react';

function AITools() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Clutch City <span className="text-rockets-red">Intelligence</span></h1>
          <p className="text-gray-600 mt-2">Local real estate trend generation powered by offline AI.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          AI Server Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Input Dashboard */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Generate Market Trend</h2>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red resize-none mb-4"
              placeholder="e.g., Compare the rental yield of 1-bedroom apartments in Montrose vs. The Heights over the last 12 months..."
            ></textarea>
            <button className="w-full bg-rockets-red hover:bg-red-800 text-white font-black py-3 rounded-lg transition shadow-md">
              Execute Query
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-md text-white">
            <h3 className="font-bold mb-2">Hardware Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Processor</span>
                <span className="font-mono text-court-orange">Local Backend</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Model</span>
                <span className="font-mono">Qwen2.5:14b</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Memory</span>
                <span className="font-mono">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Output Terminal */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden h-[600px]">
          <div className="bg-gray-100 border-b border-gray-200 p-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-grow p-6 bg-gray-50 font-mono text-sm text-gray-800 overflow-y-auto">
            <p className="text-gray-400 mb-4">{'>'} Ready for input. Awaiting query execution...</p>
            {/* AI Response will populate here later */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AITools;