import React, { useState, useRef } from 'react';

export default function Buy() {
  // Mortgage Calculator State
  const [price, setPrice] = useState(325000);
  const [downPayment, setDownPayment] = useState(16250); // 5% default
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(2.25); // Houston avg %
  const [insurance, setInsurance] = useState(220); // Monthly Gulf Coast avg
  const [hoa, setHoa] = useState(50); // Monthly HOA

  // AI Market Insight State
  const [zipCode, setZipCode] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  // Grant Finder State
  const [householdSize, setHouseholdSize] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [grantResult, setGrantResult] = useState(null);

  // Lead Capture & CTA Routing State
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', timeline: 'ASAP' });
  const [leadStatus, setLeadStatus] = useState('');
  const [ctaSource, setCtaSource] = useState('General Buyer Game Plan');
  const [highlightForm, setHighlightForm] = useState(false);

  // References for smooth scrolling and auto-focusing the lead form
  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  // Mortgage & PITI Math
  const principal = Math.max(0, price - downPayment);
  const r = rate / 100 / 12;
  const n = term * 12;
  const monthlyPI = principal > 0 && r > 0 ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
  const monthlyTax = (price * (taxRate / 100)) / 12;
  const totalMonthlyPayment = monthlyPI + monthlyTax + Number(insurance) + Number(hoa);

  // Upfront Cash Math
  const estClosingCosts = price * 0.03;
  const totalCashNeeded = downPayment + estClosingCosts;

  // Trigger CTA -> Scroll to Form, Highlight, and Tag the Lead Source
  const triggerAgentCTA = (sourceLabel) => {
    setCtaSource(sourceLabel);
    setLeadStatus(''); // Reset if previously submitted
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightForm(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
    setTimeout(() => {
      setHighlightForm(false);
    }, 2500);
  };

  // Handle Zip Code API call
  const handleGenerateReport = async () => {
    if (!zipCode.trim()) return;
    setLoading(true);
    setReport('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/market-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip_code: zipCode })
      });
      const data = await res.json();
      setReport(data.report);
    } catch (err) {
      setReport('Unable to reach the local AI server. Ensure backend is running and Ollama is active.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Grant Eligibility Logic
  const handleCheckGrants = () => {
    const size = parseInt(householdSize);
    const income = parseInt(String(annualIncome).replace(/[^0-9]/g, ''));

    if (!size || !income) {
      setGrantResult({ type: 'error', message: 'Please enter valid numbers for both fields.', qualified: false });
      return;
    }

    const incomeLimit = 55000 + ((size - 1) * 8000);

    if (income <= incomeLimit) {
      setGrantResult({ 
        type: 'success', 
        qualified: true,
        message: `Great news! Based on a household of ${size} and income of $${income.toLocaleString()}, you fall under the $${incomeLimit.toLocaleString()} limit. You may qualify for up to $30,000 in Houston HAP grants!` 
      });
    } else {
      setGrantResult({ 
        type: 'warning', 
        qualified: false,
        message: `Your income of $${income.toLocaleString()} exceeds the standard Houston HAP limit ($${incomeLimit.toLocaleString()}), but you likely still qualify for Texas State (TSAHC) down payment assistance.` 
      });
    }
  };

  // Apply $30k HAP Grant directly to Calculator
  const applyGrantToCalculator = () => {
    setDownPayment(30000);
  };

  // Handle Lead Form Submission (Includes CTA Trigger + Calculator Context)
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadStatus('sending');

    const buyerContext = `CTA Trigger: [${ctaSource}] | Target Price: $${price.toLocaleString()} | Down Payment: $${downPayment.toLocaleString()} | Est. Monthly: $${totalMonthlyPayment.toFixed(0)}/mo | Zip Searched: ${zipCode || 'None'} | Grant Check: ${grantResult ? `${grantResult.type.toUpperCase()} (Size: ${householdSize}, Inc:$${annualIncome})` : 'Not checked'}`;

    try {
      const res = await fetch('http://127.0.0.1:8000/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          notes: buyerContext
        })
      });
      
      if (res.ok) {
        setLeadStatus('success');
        setLeadForm({ name: '', email: '', phone: '', timeline: 'ASAP' });
      } else {
        setLeadStatus('error');
      }
    } catch (err) {
      setLeadStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
      {/* Main Content Column */}
      <div className="w-full lg:w-2/3 space-y-8">
        
        <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-rockets-red">
          <h1 className="text-4xl font-black text-gray-900 mb-2">First-Time Buyer Toolkit</h1>
          <p className="text-lg text-gray-600">
            Skip the generic searches. We equip you with true Houston tax numbers, local grants, and AI insights before you tour a single home.
          </p>
        </div>

        {/* 1. AI Market Insights + Agent CTA */}
        <div className="bg-gradient-to-br from-rockets-red to-red-900 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🤖 Local AI Market Insights
          </h2>
          <p className="mb-4 opacity-90">
            Enter a Houston zip code or click a popular hotspot below to generate a real-time market report using our local AI.
          </p>
          
          {/* Quick Zip Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { zip: '77008', name: 'The Heights' },
              { zip: '77003', name: 'EaDo' },
              { zip: '77007', name: 'Washington Corridor' },
              { zip: '77494', name: 'Katy' },
              { zip: '77433', name: 'Cypress' }
            ].map((item) => (
              <button
                key={item.zip}
                type="button"
                onClick={() => setZipCode(item.zip)}
                className="text-xs bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-full font-semibold transition"
              >
                {item.name} ({item.zip})
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g., 77008" 
              className="flex-grow p-4 bg-white rounded-lg text-gray-900 font-bold outline-none focus:ring-2 focus:ring-court-orange" 
            />
            <button 
              onClick={handleGenerateReport}
              disabled={loading}
              className="bg-court-orange hover:bg-orange-600 transition px-6 py-4 rounded-lg font-black whitespace-nowrap shadow-md disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Generate Report'}
            </button>
          </div>

          {report && (
            <div className="mt-6 p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white space-y-4">
              <p className="font-medium text-sm leading-relaxed">{report}</p>
              
              {/* Dynamic Post-Report CTA */}
              <div className="pt-3 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-orange-200">
                  Want a curated list of homes & off-market deals in {zipCode}?
                </span>
                <button
                  type="button"
                  onClick={() => triggerAgentCTA(`AI Market Report Follow-Up (Zip: ${zipCode})`)}
                  className="bg-white text-rockets-red hover:bg-gray-100 font-black text-xs px-4 py-2.5 rounded-lg transition shadow-sm whitespace-nowrap"
                >
                  Send Me {zipCode} Listings →
                </button>
              </div>
            </div>
          )}

          {/* Always-Visible AI Section CTA */}
          {!report && (
            <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="opacity-90">Not sure which Houston neighborhood fits your commute and budget?</span>
              <button
                type="button"
                onClick={() => triggerAgentCTA(`Neighborhood Match Consultation ${zipCode ? `(Interested in ${zipCode})` : ''}`)}
                className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
              >
                Speak with a Local Specialist →
              </button>
            </div>
          )}
        </div>

        {/* 2. True Houston Mortgage & PITI Calculator + Agent CTA */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Houston True-Payment Calculator</h2>
              <p className="text-sm text-gray-500">Includes Harris/Fort Bend property taxes & Gulf Coast insurance.</p>
            </div>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setTaxRate(2.15)} 
                className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition ${taxRate === 2.15 ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
              >
                Inner Loop Tax (~2.15%)
              </button>
              <button 
                type="button"
                onClick={() => setTaxRate(3.10)} 
                className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition ${taxRate === 3.10 ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
              >
                Suburb MUD Tax (~3.10%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Home Price ($)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Down Payment ($)</label>
              <input 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(Number(e.target.value))} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1" 
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Property Tax Rate (%)</label>
              <input 
                type="number" 
                step="0.05" 
                value={taxRate} 
                onChange={(e) => setTaxRate(Number(e.target.value))} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Home Insurance ($/mo)</label>
              <input 
                type="number" 
                value={insurance} 
                onChange={(e) => setInsurance(Number(e.target.value))} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">HOA Fees ($/mo)</label>
              <input 
                type="number" 
                value={hoa} 
                onChange={(e) => setHoa(Number(e.target.value))} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-court-orange font-semibold" 
              />
            </div>
          </div>

          {/* Monthly Payment & Cash to Close Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-gray-500 font-bold text-sm mb-1">Total Est. Monthly Payment</div>
              <div className="text-4xl font-black text-rockets-red mb-4">${totalMonthlyPayment.toFixed(0)}<span className="text-lg text-gray-500 font-bold">/mo</span></div>
              <div className="space-y-1.5 text-sm text-gray-600 border-t border-gray-200 pt-3">
                <div className="flex justify-between"><span>Principal & Interest:</span> <span className="font-bold text-gray-900">${monthlyPI.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Property Taxes ({taxRate}%):</span> <span className="font-bold text-gray-900">${monthlyTax.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Homeowners Insurance:</span> <span className="font-bold text-gray-900">${insurance}</span></div>
                <div className="flex justify-between"><span>HOA Dues:</span> <span className="font-bold text-gray-900">${hoa}</span></div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-gray-500 font-bold text-sm mb-1">Estimated Cash to Close</div>
                <div className="text-4xl font-black text-gray-900 mb-4">${totalCashNeeded.toLocaleString()}</div>
                <div className="space-y-1.5 text-sm text-gray-600 border-t border-gray-200 pt-3">
                  <div className="flex justify-between"><span>Down Payment ({((downPayment / price) * 100 || 0).toFixed(1)}%):</span> <span className="font-bold text-gray-900">${downPayment.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Est. Closing Costs (~3%):</span> <span className="font-bold text-gray-900">${estClosingCosts.toLocaleString()}</span></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                *Tip: In Houston's current market, we frequently negotiate for the seller to pay part or all of your 3% closing costs.
              </p>
            </div>
          </div>

          {/* Mortgage Calculator CTA Banner */}
          <div className="bg-gray-900 text-white p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-black text-base">Want to lock in a ~${totalMonthlyPayment.toFixed(0)}/mo payment?</h4>
              <p className="text-xs text-gray-300 mt-0.5">
                Have a Clutch City agent send you matching homes under ${price.toLocaleString()} and connect you with local lenders offering seller-paid rate buydowns.
              </p>
            </div>
            <button
              type="button"
              onClick={() => triggerAgentCTA(`Lock In $${totalMonthlyPayment.toFixed(0)}/mo Payment ($${price.toLocaleString()} Budget)`)}
              className="bg-court-orange hover:bg-orange-600 text-white font-black text-xs px-5 py-3.5 rounded-lg transition whitespace-nowrap shadow-md w-full sm:w-auto text-center"
            >
              Send My Numbers to an Agent →
            </button>
          </div>
        </div>

        {/* 3. Grant Finder + Agent CTA */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Houston Grant & Assistance Finder</h2>
          <p className="text-gray-600 mb-6">
            You might qualify for the Houston Homebuyer Assistance Program (HAP) or Texas state down payment grants.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <input 
              type="number" 
              value={householdSize}
              onChange={(e) => setHouseholdSize(e.target.value)}
              placeholder="Household Size (e.g., 2)" 
              className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red" 
            />
            <input 
              type="text" 
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="Annual Income ($)" 
              className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red" 
            />
            <button 
              onClick={handleCheckGrants}
              className="bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition py-3"
            >
              Check Eligibility
            </button>
          </div>
          
          {grantResult && (
            <div className={`p-5 rounded-lg mt-4 text-sm font-bold border space-y-4 ${
              grantResult.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 
              grantResult.type === 'warning' ? 'bg-orange-50 text-orange-800 border-orange-200' : 
              'bg-red-50 text-red-800 border-red-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span>{grantResult.message}</span>
                {grantResult.qualified && (
                  <button
                    type="button"
                    onClick={applyGrantToCalculator}
                    className="bg-green-700 hover:bg-green-800 text-white text-xs px-4 py-2.5 rounded-lg whitespace-nowrap transition shadow-sm"
                  >
                    Apply $30k Grant to Calculator ↑
                  </button>
                )}
              </div>

              {/* Dynamic Post-Check Grant CTA */}
              {grantResult.type !== 'error' && (
                <div className="pt-3 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-semibold">
                    {grantResult.qualified 
                      ? "Ready to claim your grant? An agent can connect you with an approved Houston HAP & TSAHC lender today."
                      : "Want to see how much Texas State (TSAHC) assistance you qualify for? Let an agent run your exact numbers."}
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerAgentCTA(
                      grantResult.qualified 
                        ? `Claim $30k Houston HAP Grant (Size: ${householdSize}, Income: $${annualIncome})`
                        : `Texas TSAHC Down Payment Assistance Check (Income: $${annualIncome})`
                    )}
                    className="bg-rockets-red hover:bg-red-700 text-white font-black text-xs px-4 py-2.5 rounded-lg whitespace-nowrap transition shadow-sm"
                  >
                     Verify My Grant With an Agent →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Always-Visible Grant Section CTA */}
          {!grantResult && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
              <span>Want our complete list of zero-down and grant-approved lenders in Houston?</span>
              <button
                type="button"
                onClick={() => triggerAgentCTA('Request Houston Grant & Zero-Down Lender List')}
                className="text-rockets-red hover:text-red-800 font-black underline whitespace-nowrap"
              >
                Have an Agent Send Me the Grant List →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Lead Capture */}
      <div className="w-full lg:w-1/3" ref={formRef}>
        <div className={`bg-white rounded-xl shadow-md p-8 sticky top-24 border-2 transition-all duration-300 ${
          highlightForm ? 'border-court-orange ring-4 ring-court-orange/20' : 'border-gray-100'
        }`}>
          <h3 className="text-xl font-black text-gray-900 mb-1">Connect With an Agent</h3>
          <p className="text-sm text-gray-600 mb-4">Drop your info below and we'll reach out with your custom numbers and game plan.</p>
          
          {/* Active CTA Topic Badge */}
          <div className="bg-red-50 border border-red-200 text-rockets-red px-3 py-2 rounded-lg mb-4 text-xs">
            <span className="font-black uppercase tracking-wider block text-[10px] text-gray-500">Selected Inquiry:</span>
            <span className="font-bold">{ctaSource}</span>
          </div>

          {/* Live Summary Pill showing what's attached */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 text-xs text-gray-600 space-y-1">
            <div className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">Attached Toolkit Data:</div>
            <div className="flex justify-between"><span>Target Budget:</span> <span className="font-bold text-gray-900">${price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Down Payment:</span> <span className="font-bold text-gray-900">${downPayment.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Payment:</span> <span className="font-bold text-rockets-red">${totalMonthlyPayment.toFixed(0)}/mo</span></div>
            {zipCode && <div className="flex justify-between"><span>Target Zip Code:</span> <span className="font-bold text-gray-900">{zipCode}</span></div>}
            {grantResult && <div className="flex justify-between"><span>Grant Check:</span> <span className="font-bold text-green-700">{grantResult.qualified ? 'HAP Eligible ($30k)' : 'TSAHC State Eligible'}</span></div>}
          </div>

          {leadStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg font-bold text-center space-y-2">
              <div>✅ Sent to Clutch City Realty!</div>
              <p className="text-xs font-normal text-green-700">We've received your contact info and toolkit numbers, and an agent will reach out shortly.</p>
              <button 
                type="button"
                onClick={() => setLeadStatus('')}
                className="text-xs underline font-bold text-green-900 mt-2"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleLeadSubmit}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  ref={nameInputRef}
                  type="text" 
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                  placeholder="John Doe" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red transition" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                  placeholder="john@example.com" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red transition" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  required
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                  placeholder="(713) 555-0199" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red transition" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Buying Timeline</label>
                <select 
                  value={leadForm.timeline}
                  onChange={(e) => setLeadForm({...leadForm, timeline: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rockets-red transition"
                >
                  <option>ASAP</option>
                  <option>1-3 Months</option>
                  <option>3-6 Months</option>
                  <option>Just browsing</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={leadStatus === 'sending'}
                className="w-full bg-court-orange text-white py-4 rounded-lg font-black hover:bg-orange-600 transition shadow-md mt-4 disabled:opacity-50"
              >
                {leadStatus === 'sending' ? 'Sending to Agent...' : 'Send to an Agent'}
              </button>
              
              {leadStatus === 'error' && (
                <p className="text-red-600 text-sm font-bold text-center mt-2">Error sending. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}