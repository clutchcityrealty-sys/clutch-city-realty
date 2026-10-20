import React from 'react';

function Apartments() {
  const luxuryBuildings = [
    { id: 1, name: "The Preston", area: "Downtown", price: "Starting at $2,400", perks: "Rooftop Pool, Valet" },
    { id: 2, name: "Hanover River Oaks", area: "River Oaks", price: "Starting at $2,800", perks: "Movie Theater, Pet Spa" },
    { id: 3, name: "Drewery Place", area: "Midtown", price: "Starting at $1,900", perks: "Direct Light Rail Access" },
    { id: 4, name: "The Bowen", area: "Washington Ave", price: "Starting at $2,100", perks: "Private Cabanas, Gym" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
      
      {/* Left Column: The Locator Pitch & Form */}
      <div className="w-full lg:w-1/3">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 text-white sticky top-24">
          <h1 className="text-3xl font-black text-court-orange mb-4">100% Free Apartment Locating</h1>
          <p className="text-gray-300 mb-6">
            Tell us what you want. We leverage our network to find hidden specials, negotiate rent, and send you a curated list of luxury high-rises and hidden gems. The buildings pay our fee.
          </p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" className="w-full p-3 bg-white text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-court-orange" />
            <input type="tel" placeholder="Phone Number" className="w-full p-3 bg-white text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-court-orange" />
            
            <div className="flex gap-2">
              <select className="w-1/2 p-3 bg-white text-gray-900 rounded-lg outline-none cursor-pointer">
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3+ Bedrooms</option>
              </select>
              <input type="text" placeholder="Max Budget" className="w-1/2 p-3 bg-white text-gray-900 rounded-lg outline-none" />
            </div>

            <input type="text" placeholder="Preferred Areas (e.g., Midtown, Galleria)" className="w-full p-3 bg-white text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-court-orange" />
            
            <button className="w-full bg-court-orange hover:bg-orange-600 text-white font-black py-4 rounded-lg transition mt-4 shadow-md">
              Start My Search
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Featured Properties */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-3xl font-black text-gray-900 mb-8">Hot Houston High-Rises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {luxuryBuildings.map(bldg => (
            <div key={bldg.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition group">
              <div className="h-48 bg-gray-200 relative flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 font-bold">[Building Image]</span>
                <div className="absolute top-4 right-4 bg-rockets-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {bldg.area}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900">{bldg.name}</h3>
                <p className="text-court-orange font-bold text-lg mb-2">{bldg.price}</p>
                <p className="text-sm text-gray-600 font-semibold mb-4">✨ {bldg.perks}</p>
                <button className="w-full bg-gray-100 text-gray-800 font-bold py-2 rounded-md group-hover:bg-rockets-red group-hover:text-white transition">
                  Request Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Apartments;