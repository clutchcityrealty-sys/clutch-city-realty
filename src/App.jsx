import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Buy from './pages/Buy';
import Apartments from './pages/Apartments';
import Sell from './pages/Sell';
import AITools from './pages/AITools';

function Home({ onOpenContact }) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate('/buy');
  };

  const hotspots = [
    {
      name: 'The Heights',
      zip: '77008',
      vibe: 'Historic bungalows, walkable dining on 19th St, and hike-and-bike trails.',
      priceTag: 'Avg. $550k+ | Rent $1,950+',
      badge: 'Inner Loop Favorite'
    },
    {
      name: 'EaDo (East Downtown)',
      zip: '77003',
      vibe: 'Modern 3-story townhomes, breweries, and walking distance to stadiums.',
      priceTag: 'Avg. $390k+ | Rent $1,650+',
      badge: 'High Growth'
    },
    {
      name: 'Katy',
      zip: '77494',
      vibe: 'Top-rated master-planned communities, resort pools, and premier schools.',
      priceTag: 'Avg. $360k+ | Rent $1,550+',
      badge: 'Top Suburb'
    },
    {
      name: 'Cypress',
      zip: '77433',
      vibe: 'Bridgeland & Towne Lake waterfront living with massive new-build incentives.',
      priceTag: 'Avg. $375k+ | Rent $1,600+',
      badge: 'New Construction Hub'
    },
    {
      name: 'Washington / Rice Military',
      zip: '77007',
      vibe: 'Minutes from Memorial Park and Downtown with vibrant nightlife and dining.',
      priceTag: 'Avg. $460k+ | Rent $1,850+',
      badge: 'Commuter Hotspot'
    },
    {
      name: 'Midtown / Montrose',
      zip: '77006',
      vibe: 'Houston cultural heart—tree-lined streets, coffee shops, and luxury mid-rises.',
      priceTag: 'Avg. $480k+ | Rent $1,750+',
      badge: 'Walkable Urban'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-rockets-red text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-white/10 border border-white/20 text-orange-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Houston Real Estate • Powered by Local AI
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Smarter Moves in <span className="text-court-orange">Clutch City.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Skip the outdated listing grids. Use our true Houston property tax calculators, down payment grant finders, free apartment locators, and local AI market tools.
          </p>

          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter a Houston Zip Code or Neighborhood (e.g., 77008, Katy)..."
              className="flex-grow p-4 bg-white text-gray-900 rounded-xl font-bold outline-none focus:ring-2 focus:ring-court-orange"
            />
            <button
              type="submit"
              className="bg-court-orange hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl transition shadow-lg whitespace-nowrap"
            >
              Launch Buyer Toolkit →
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold">
            <Link to="/buy" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
              🏠 Check $30k Houston Grants
            </Link>
            <Link to="/apartments" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
              🏢 Free Apartment Locator (Up to 8 Weeks Free)
            </Link>
            <Link to="/sell" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
              📈 Request Free Home Valuation
            </Link>
            <button
              type="button"
              onClick={() => onOpenContact('Homepage Hero Consultation Request')}
              className="bg-rockets-red hover:bg-red-700 px-4 py-2 rounded-full transition"
            >
              💬 Speak to a Houston Agent
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Service Pillars */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-rockets-red flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">First-Time Buyers</h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate true monthly PITI + MUD taxes and check eligibility for up to $30,000 in Houston HAP down payment grants.
              </p>
            </div>
            <Link to="/buy" className="text-rockets-red font-black text-sm hover:underline inline-flex items-center gap-1">
              Open Buyer Toolkit →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-court-orange flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Apartment Locating</h3>
              <p className="text-sm text-gray-600 mb-4">
                100% free service. We track every Inner Loop and suburb move-in special—including 1 to 2 months free rent.
              </p>
            </div>
            <Link to="/apartments" className="text-court-orange font-black text-sm hover:underline inline-flex items-center gap-1">
              Find Apartment Deals →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-gray-900 flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Sell Your Home</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get an AI-backed comparative valuation and learn how our marketing system nets Houston sellers top dollar.
              </p>
            </div>
            <Link to="/sell" className="text-gray-900 font-black text-sm hover:underline inline-flex items-center gap-1">
              Get Home Value →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-rockets-red flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Local AI Insights</h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate instant neighborhood breakdowns and zip code comparisons powered by our in-house AI engine.
              </p>
            </div>
            <Link to="/ai-tools" className="text-rockets-red font-black text-sm hover:underline inline-flex items-center gap-1">
              Explore AI Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Houston Hotspots Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Trending Houston Markets</h2>
            <p className="text-gray-600 mt-1">
              Click any neighborhood to request a custom off-market & active listing list directly from an agent.
            </p>
          </div>
          <Link to="/buy" className="mt-4 md:mt-0 text-sm font-black text-rockets-red hover:underline">
            Run Any Zip Code in the AI Toolkit →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotspots.map((spot) => (
            <div key={spot.zip} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-black uppercase tracking-wider bg-red-50 text-rockets-red px-2.5 py-1 rounded-md">
                    {spot.badge}
                  </span>
                  <span className="text-xs font-bold text-gray-400">Zip: {spot.zip}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{spot.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{spot.vibe}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-gray-800">{spot.priceTag}</span>
                <button
                  type="button"
                  onClick={() => onOpenContact(`Custom ${spot.name} (${spot.zip}) Listings Request`)}
                  className="bg-gray-900 hover:bg-rockets-red text-white text-xs font-bold px-3.5 py-2 rounded-lg transition"
                >
                  Get {spot.name} List →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-rockets-red to-red-900 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-2">Have a Question About Buying, Renting, or Selling in Houston?</h2>
            <p className="text-red-100 text-sm md:text-base max-w-2xl">
              Skip the call centers. Connect directly with Clutch City Realty for a zero-pressure game plan tailored to your timeline and budget.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact('Homepage Bottom Banner Strategy Call')}
            className="bg-court-orange hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl shadow-lg transition whitespace-nowrap"
          >
            Contact Us Today →
          </button>
        </div>
      </section>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  const [contactOpen, setContactOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('General Website Inquiry');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    timeline: 'ASAP',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState('');

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm the Clutch City AI. How can I help you navigate the Houston market today?" }
  ]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const openContactModal = (topic = 'Top Navbar Contact Us Button') => {
    setContactTopic(topic);
    setContactStatus('');
    setContactOpen(true);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          timeline: contactForm.timeline,
          notes: `Source: [${contactTopic}] | Message: ${contactForm.message || 'No additional message provided.'}`
        })
      });

      if (res.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', phone: '', timeline: 'ASAP', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch (err) {
      setContactStatus('error');
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setChatLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Error communicating with AI server.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const navLinkClass = (path) =>
    `font-bold transition ${
      location.pathname === path ? 'text-rockets-red' : 'text-gray-700 hover:text-rockets-red'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tighter text-rockets-red flex items-center gap-2">
            🏀 CLUTCH CITY <span className="text-gray-900">REALTY</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/buy" className={navLinkClass('/buy')}>First-Time Buyers</Link>
            <Link to="/apartments" className={navLinkClass('/apartments')}>Apartments</Link>
            <Link to="/sell" className={navLinkClass('/sell')}>Sell</Link>
            <Link to="/ai-tools" className={navLinkClass('/ai-tools')}>AI Market Tools</Link>
          </div>

          <button
            type="button"
            onClick={() => openContactModal('Navbar Contact Us Button')}
            className="bg-rockets-red hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold transition shadow-sm"
          >
            Contact Us
          </button>
        </div>

        <div className="flex md:hidden justify-around border-t border-gray-100 py-2 bg-gray-50 text-xs font-bold">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/buy" className={navLinkClass('/buy')}>Buy</Link>
          <Link to="/apartments" className={navLinkClass('/apartments')}>Apartments</Link>
          <Link to="/sell" className={navLinkClass('/sell')}>Sell</Link>
          <Link to="/ai-tools" className={navLinkClass('/ai-tools')}>AI Tools</Link>
        </div>
      </nav>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenContact={openContactModal} />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/ai-tools" element={<AITools />} />
        </Routes>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-black text-white">CLUTCH CITY REALTY</span> • Houston, TX
          </div>
          <div className="flex gap-6 font-semibold">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/buy" className="hover:text-white">Buy</Link>
            <Link to="/apartments" className="hover:text-white">Apartments</Link>
            <Link to="/sell" className="hover:text-white">Sell</Link>
            <button type="button" onClick={() => openContactModal('Footer Contact Link')} className="hover:text-white">
              Contact
            </button>
          </div>
        </div>
      </footer>

      {contactOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border-t-4 border-rockets-red">
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-black text-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-1">Contact Clutch City Realty</h3>
            <p className="text-xs text-gray-500 mb-4">
              Send us a message and a Houston specialist will reach out right away.
            </p>

            <div className="bg-red-50 border border-red-200 text-rockets-red px-3 py-2 rounded-lg mb-4 text-xs">
              <span className="font-black uppercase tracking-wider block text-[10px] text-gray-500">Topic:</span>
              <span className="font-bold">{contactTopic}</span>
            </div>

            {contactStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center space-y-3">
                <div className="text-2xl">✅</div>
                <div className="font-black text-base">Message Sent!</div>
                <p className="text-xs text-green-700">
                  We have emailed your request to our team and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="bg-green-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg mt-2"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="(713) 555-0199"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Timeline</label>
                  <select
                    value={contactForm.timeline}
                    onChange={(e) => setContactForm({ ...contactForm, timeline: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red text-sm"
                  >
                    <option>ASAP</option>
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>Just have a question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">How can we help?</label>
                  <textarea
                    rows="3"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what neighborhood, budget, or questions you have..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === 'sending'}
                  className="w-full bg-court-orange hover:bg-orange-600 text-white font-black py-3.5 rounded-lg transition shadow-md disabled:opacity-50"
                >
                  {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {contactStatus === 'error' && (
                  <p className="text-red-600 text-xs font-bold text-center">
                    Error reaching server. Make sure your Python backend is running!
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-rockets-red hover:bg-red-700 text-white px-5 py-4 rounded-full shadow-2xl font-black flex items-center gap-2 transition transform hover:scale-105"
          >
            <span>🤖</span> Ask Clutch City AI
          </button>
        ) : (
          <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[28rem]">
            <div className="bg-rockets-red text-white p-4 flex justify-between items-center font-bold">
              <span className="flex items-center gap-2">🤖 Clutch City AI</span>
              <button onClick={() => setChatOpen(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl max-w-[80%] ${
                    m.role === 'user' ? 'bg-court-orange text-white font-semibold' : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {chatLoading && <div className="text-xs text-gray-400 italic">Clutch City AI is thinking...</div>}
            </div>
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about Houston real estate..."
                className="flex-grow p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-rockets-red"
              />
              <button
                onClick={sendMessage}
                className="bg-rockets-red text-white px-4 rounded-lg font-bold text-sm hover:bg-red-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}