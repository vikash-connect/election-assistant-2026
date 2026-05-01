import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import VoterEligibility from './VoterEligibility';
import BoothFinder from './BoothFinder';

export default function VoterTools() {
  const [activeTab, setActiveTab] = useState('eligibility');

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Gradients to match Saffron/Green theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -left-48 top-20 w-96 h-96 bg-eci-saffron rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -right-48 bottom-20 w-96 h-96 bg-eci-green rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Voter Tools</h2>
          <p className="text-lg text-slate-600">Check your eligibility and find your polling booth instantly.</p>
        </motion.div>

        {/* Glassmorphism Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="transform-gpu bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden"
        >
          
          {/* Tabs Header */}
          <div className="flex border-b border-slate-200/50" role="tablist">
            <button 
              role="tab"
              aria-selected={activeTab === 'eligibility'}
              id="tab-eligibility"
              aria-controls="panel-eligibility"
              className={`flex-1 py-5 text-center font-bold text-lg transition-all ${
                activeTab === 'eligibility' 
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 text-eci-saffron border-b-2 border-eci-saffron' 
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('eligibility')}
            >
              <span className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                Voter Eligibility Tool
              </span>
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'booth'}
              id="tab-booth"
              aria-controls="panel-booth"
              className={`flex-1 py-5 text-center font-bold text-lg transition-all ${
                activeTab === 'booth' 
                  ? 'bg-gradient-to-r from-green-50 to-green-100/50 text-eci-green border-b-2 border-eci-green' 
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('booth')}
            >
              <span className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                Booth Finder Simulation
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12">
            {activeTab === 'eligibility' && (
              <div role="tabpanel" id="panel-eligibility" aria-labelledby="tab-eligibility">
                <VoterEligibility />
              </div>
            )}
            {activeTab === 'booth' && (
              <div role="tabpanel" id="panel-booth" aria-labelledby="tab-booth">
                <BoothFinder />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
