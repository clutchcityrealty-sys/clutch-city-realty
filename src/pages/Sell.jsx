import React from 'react';

function Sell() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      
      <h1 className="text-5xl font-black text-gray-900 mb-6">
        Sell Smarter with <span className="text-rockets-red">AI</span>
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        We don't just put a sign in your yard. We use local AI models to analyze hyper-local market trends, optimizing your listing price and marketing strategy for maximum ROI.
      </p>

      {/* AI Valuation Tool */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-court-orange mb-16 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-9xl opacity-5">🤖</div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 relative z-10">Instant AI Home Valuation</h2>
        <p className="text-gray-600 mb-6 relative z-10">Enter your address to let our local models run a preliminary comparative market analysis (CMA).</p>
        
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
          <input 
            type="text" 
            placeholder="Enter your Houston address..." 
            className="flex-grow p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange text-lg" 
          />
          <button className="bg-court-orange hover:bg-orange-600 text-white font-black px-8 py-4 rounded-lg transition shadow-md whitespace-nowrap">
            Analyze Property
          </button>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Data-Driven Pricing</h3>
          <p className="text-sm text-gray-600">Our local AI models aggregate historical sales data to find the absolute sweet spot for your listing price.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="text-3xl mb-4">📸</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Next-Gen Media</h3>
          <p className="text-sm text-gray-600">Professional photography paired with AI-enhanced virtual staging to make empty rooms pop on HAR.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="text-3xl mb-4">🎯</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Targeted Marketing</h3>
          <p className="text-sm text-gray-600">We push your listing beyond the MLS, targeting out-of-state buyers relocating to the Houston metro.</p>
        </div>
      </div>

    </div>
  );
}

export default Sell;