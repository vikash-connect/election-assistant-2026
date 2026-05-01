import React, { useState, useEffect } from 'react';
import { CheckCircle, Download, Search, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const checklistItems = [
  {
    id: 1,
    task: 'Check name in Electoral Roll',
    icon: Search,
    description: 'Verify your details in the latest voter list online.',
    linkText: 'Search in Roll'
  },
  {
    id: 2,
    task: 'Download e-EPIC',
    icon: Download,
    description: 'Get your digital Voter ID card on your mobile device.',
    linkText: 'Download PDF'
  },
  {
    id: 3,
    task: 'Verify Booth Officer (BLO)',
    icon: UserCheck,
    description: 'Know your BLO details for local assistance and verification.',
    linkText: 'Find BLO'
  }
];

export default function Checklist() {
  const [completed, setCompleted] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('voterChecklist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing localStorage for checklist', e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('voterChecklist', JSON.stringify(completed));
  }, [completed]);

  const toggleCheck = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(itemId => itemId !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const progress = (completed.length / checklistItems.length) * 100;

  return (
    <section id="checklist" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card transform-gpu bg-white/60 backdrop-blur-xl border border-white p-8 md:p-12 border-t-8 border-t-eci-blue overflow-hidden relative shadow-2xl rounded-3xl"
        >
          
          {/* Progress Background */}
          <div 
            className="absolute bottom-0 left-0 h-2 bg-eci-green transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Voter Readiness Checklist</h2>
            <p className="text-lg text-slate-600">
              Complete these essential tasks to ensure a smooth voting experience on polling day.
              Your progress is automatically saved!
            </p>
          </div>

          <div className="space-y-4">
            {checklistItems.map((item) => {
              const isDone = completed.includes(item.id);
              const Icon = item.icon;
              
              return (
                <button 
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  aria-pressed={isDone}
                  aria-label={`Mark "${item.task}" as ${isDone ? 'incomplete' : 'complete'}`}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-4 focus:ring-eci-blue/30
                    ${isDone 
                      ? 'border-eci-green/50 bg-green-50/50' 
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-start md:items-center space-x-4 pointer-events-none">
                    <div className="mt-1 md:mt-0 flex-shrink-0">
                      <CheckCircle className={`w-8 h-8 transition-colors ${isDone ? 'text-eci-green' : 'text-slate-300'}`} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold transition-colors ${isDone ? 'text-slate-700 line-through' : 'text-slate-900'}`}>
                        {item.task}
                      </h3>
                      <p className="text-slate-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="ml-12 md:ml-0 inline-flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-eci-blue hover:bg-slate-50 hover:border-eci-blue transition-colors z-10"
                    onClick={(e) => { e.stopPropagation(); /* Handle action */ }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Action for ${item.task}: ${item.linkText}`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.linkText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 text-center" aria-live="polite">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              {completed.length} of {checklistItems.length} Tasks Completed
            </p>
            {completed.length === checklistItems.length && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center space-x-2 text-eci-green font-bold bg-green-50 px-6 py-3 rounded-full border border-green-200"
              >
                <CheckCircle className="w-6 h-6" aria-hidden="true" />
                <span>You are completely ready for the elections!</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
