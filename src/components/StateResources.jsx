import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Users, Calendar, Info } from 'lucide-react';

const stateData = [
  { id: 'up', name: 'Uttar Pradesh', phase: 'Phase 1-7', date: 'April - June 2026', seats: 80, electors: '15.3 Crore' },
  { id: 'mh', name: 'Maharashtra', phase: 'Phase 1-5', date: 'April - May 2026', seats: 48, electors: '9.2 Crore' },
  { id: 'wb', name: 'West Bengal', phase: 'Phase 1-7', date: 'April - June 2026', seats: 42, electors: '7.3 Crore' },
  { id: 'br', name: 'Bihar', phase: 'Phase 1-7', date: 'April - June 2026', seats: 40, electors: '7.6 Crore' },
  { id: 'tn', name: 'Tamil Nadu', phase: 'Phase 1', date: 'April 19, 2026', seats: 39, electors: '6.2 Crore' }
];

export default function StateResources() {
  const [selectedState, setSelectedState] = useState(stateData[0]);

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="state-info">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">State-Wise Resources</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Find specific election dates, constituencies, and vital statistics for your state.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* State List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/3 space-y-3"
          >
            {stateData.map((state) => (
              <button
                key={state.id}
                onClick={() => setSelectedState(state)}
                aria-label={`View information for ${state.name}`}
                aria-pressed={selectedState.id === state.id}
                className={`w-full text-left px-6 py-4 rounded-2xl transition-all font-bold text-lg flex items-center justify-between ${
                  selectedState.id === state.id 
                    ? 'bg-eci-blue text-white shadow-lg' 
                    : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                {state.name}
                {selectedState.id === state.id && <Map className="w-5 h-5 text-blue-200" aria-hidden="true" />}
              </button>
            ))}
          </motion.div>

          {/* State Info Card */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedState.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="transform-gpu bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-3xl shadow-xl h-full flex flex-col justify-center"
              >
                <div className="flex items-center space-x-4 mb-8 border-b border-slate-100 pb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Map className="w-8 h-8 text-eci-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{selectedState.name}</h3>
                    <p className="text-slate-500 font-medium mt-1">2026 Lok Sabha Elections</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Polling Phase</p>
                    <p className="text-xl font-bold text-slate-900">{selectedState.phase}</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Polling Date</p>
                    <p className="text-xl font-bold text-eci-saffron">{selectedState.date}</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                      <Info className="w-4 h-4 mr-2" aria-hidden="true" />
                      Constituencies
                    </p>
                    <p className="text-xl font-bold text-slate-900">{selectedState.seats} Seats</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                      <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                      Total Electors
                    </p>
                    <p className="text-xl font-bold text-eci-green">{selectedState.electors}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
