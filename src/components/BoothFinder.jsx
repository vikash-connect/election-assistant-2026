import React, { useState } from 'react';
import { MapPin, Map, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BoothFinder() {
  const [pincode, setPincode] = useState('');
  const [boothData, setBoothData] = useState(null);

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-in fade-in duration-500"
    >
      <form onSubmit={findBooth} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="pincode" className="block text-sm font-semibold text-slate-700 mb-2">
            Enter your Area Pincode
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="pincode"
              placeholder="e.g., 110001"
              maxLength="6"
              pattern="\d{6}"
              value={pincode}
              onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setBoothData(null); }}
              className="block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-eci-green focus:border-transparent transition-all shadow-sm"
              required
              aria-required="true"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          aria-label="Find polling booth location"
          className="w-full py-4 bg-gradient-to-r from-eci-green to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          Find Booth
        </button>
      </form>

      {boothData && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 max-w-lg mx-auto bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h4 className="font-bold text-slate-800 flex items-center">
              <Map className="w-5 h-5 text-eci-blue mr-2" aria-hidden="true" />
              Assigned Polling Booth
            </h4>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h5 className="text-xl font-bold text-slate-900 mb-1">{boothData.boothName}</h5>
              <p className="text-slate-600 flex items-start">
                <MapPin className="w-4 h-4 text-slate-400 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                {boothData.boothAddress}
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Booth Level Officer</p>
                <p className="font-bold text-slate-900 flex items-center">
                  <User className="w-4 h-4 text-eci-saffron mr-2" aria-hidden="true" />
                  {boothData.bloName}
                </p>
              </div>
              <div className="text-right">
                <a 
                  href={`tel:${boothData.bloContact}`} 
                  aria-label={`Call Booth Level Officer at ${boothData.bloContact}`}
                  className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
