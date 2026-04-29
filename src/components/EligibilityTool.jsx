import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, ExternalLink, User, Phone, Map } from 'lucide-react';

export default function EligibilityTool() {
  const [activeTab, setActiveTab] = useState('eligibility');
  
  // Tab 1 state
  const [dob, setDob] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Tab 2 state
  const [pincode, setPincode] = useState('');
  const [boothData, setBoothData] = useState(null);

  const checkEligibility = (e) => {
    e.preventDefault();
    if (!dob) return;

    // Cutoff date: Jan 1st, 2026
    const cutoffDate = new Date('2026-01-01');
    const userDob = new Date(dob);
    
    // Calculate age difference in years
    let age = cutoffDate.getFullYear() - userDob.getFullYear();
    const m = cutoffDate.getMonth() - userDob.getMonth();
    
    if (m < 0 || (m === 0 && cutoffDate.getDate() < userDob.getDate())) {
        age--;
    }

    if (age >= 18) {
      setEligibilityResult('eligible');
    } else {
      setEligibilityResult('ineligible');
    }
  };

  const findBooth = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) return;

    // Dummy simulation logic
    setBoothData({
      boothName: `Govt. Primary School, Sector ${pincode.substring(4, 6)}`,
      boothAddress: `Near Main Post Office, Zone ${pincode.substring(3, 4)}, Pincode ${pincode}`,
      bloName: 'Rajesh Kumar',
      bloContact: '+91-9876543210'
    });
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Gradients to match Saffron/Green theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -left-48 top-20 w-96 h-96 bg-eci-saffron rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -right-48 bottom-20 w-96 h-96 bg-eci-green rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Voter Tools</h2>
          <p className="text-lg text-slate-600">Check your eligibility and find your polling booth instantly.</p>
        </div>

        {/* Glassmorphism Container */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Tabs Header */}
          <div className="flex border-b border-slate-200/50">
            <button 
              className={`flex-1 py-5 text-center font-bold text-lg transition-all ${
                activeTab === 'eligibility' 
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 text-eci-saffron border-b-2 border-eci-saffron' 
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('eligibility')}
            >
              <span className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Voter Eligibility Tool
              </span>
            </button>
            <button 
              className={`flex-1 py-5 text-center font-bold text-lg transition-all ${
                activeTab === 'booth' 
                  ? 'bg-gradient-to-r from-green-50 to-green-100/50 text-eci-green border-b-2 border-eci-green' 
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('booth')}
            >
              <span className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2" />
                Booth Finder Simulation
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12">
            
            {/* Eligibility Tab */}
            {activeTab === 'eligibility' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <form onSubmit={checkEligibility} className="max-w-md mx-auto space-y-6">
                  <div>
                    <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 mb-2">
                      Enter your Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => { setDob(e.target.value); setEligibilityResult(null); }}
                        className="block w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-eci-saffron focus:border-transparent transition-all shadow-sm"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Checking age as of January 1st, 2026</p>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-eci-saffron to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    Check Eligibility
                  </button>
                </form>

                {eligibilityResult === 'eligible' && (
                  <div className="mt-8 p-6 bg-green-50/80 border border-green-200 rounded-2xl text-center max-w-md mx-auto animate-in zoom-in-95 duration-300">
                    <CheckCircle className="w-12 h-12 text-eci-green mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">You are eligible!</h3>
                    <p className="text-slate-600 mb-6">Directing to Form 6 for new voter registration...</p>
                    <a 
                      href="https://voters.eci.gov.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-3 px-6 bg-white border-2 border-eci-green text-eci-green rounded-xl font-bold hover:bg-eci-green hover:text-white transition-colors"
                    >
                      Go to Official ECI Portal
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                )}

                {eligibilityResult === 'ineligible' && (
                  <div className="mt-8 p-6 bg-red-50/80 border border-red-200 rounded-2xl text-center max-w-md mx-auto animate-in zoom-in-95 duration-300">
                    <h3 className="text-xl font-bold text-red-700 mb-2">Not Eligible Yet</h3>
                    <p className="text-red-600">You must be 18 years or older as of Jan 1st, 2026 to register for these elections.</p>
                  </div>
                )}
              </div>
            )}

            {/* Booth Finder Tab */}
            {activeTab === 'booth' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <form onSubmit={findBooth} className="max-w-md mx-auto space-y-6">
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-semibold text-slate-700 mb-2">
                      Enter your Area Pincode
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="pincode"
                        placeholder="e.g., 110001"
                        maxLength="6"
                        pattern="\d{6}"
                        value={pincode}
                        onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setBoothData(null); }}
                        className="block w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-eci-green focus:border-transparent transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-eci-green to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    Find Booth
                  </button>
                </form>

                {boothData && (
                  <div className="mt-10 max-w-lg mx-auto bg-white/90 border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className="bg-slate-50 border-b border-slate-200 p-4">
                      <h4 className="font-bold text-slate-800 flex items-center">
                        <Map className="w-5 h-5 text-eci-blue mr-2" />
                        Assigned Polling Booth
                      </h4>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <h5 className="text-xl font-bold text-slate-900 mb-1">{boothData.boothName}</h5>
                        <p className="text-slate-600 flex items-start">
                          <MapPin className="w-4 h-4 text-slate-400 mt-1 mr-2 flex-shrink-0" />
                          {boothData.boothAddress}
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Booth Level Officer</p>
                          <p className="font-bold text-slate-900 flex items-center">
                            <User className="w-4 h-4 text-eci-saffron mr-2" />
                            {boothData.bloName}
                          </p>
                        </div>
                        <div className="text-right">
                          <a href={`tel:${boothData.bloContact}`} className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors">
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
