import React, { useState } from 'react';
import { CheckCircle, Download, Search, UserCheck } from 'lucide-react';

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
  const [completed, setCompleted] = useState([]);

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
        <div className="glass-card bg-gradient-to-br from-slate-50 to-white p-8 md:p-12 border-t-8 border-eci-blue overflow-hidden relative">
          
          {/* Progress Background */}
          <div 
            className="absolute bottom-0 left-0 h-2 bg-eci-green transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Voter Readiness Checklist</h2>
            <p className="text-lg text-slate-600">
              Complete these essential tasks to ensure a smooth voting experience on polling day.
            </p>
          </div>

          <div className="space-y-4">
            {checklistItems.map((item) => {
              const isDone = completed.includes(item.id);
              const Icon = item.icon;
              
              return (
                <div 
                  key={item.id} 
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer
                    ${isDone 
                      ? 'border-eci-green/50 bg-green-50/50' 
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
                    }`}
                  onClick={() => toggleCheck(item.id)}
                >
                  <div className="flex items-start md:items-center space-x-4">
                    <div className="mt-1 md:mt-0 flex-shrink-0">
                      <CheckCircle className={`w-8 h-8 transition-colors ${isDone ? 'text-eci-green' : 'text-slate-300'}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold transition-colors ${isDone ? 'text-slate-700 line-through' : 'text-slate-900'}`}>
                        {item.task}
                      </h3>
                      <p className="text-slate-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                  
                  <button 
                    className="ml-12 md:ml-0 inline-flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-eci-blue hover:bg-slate-50 hover:border-eci-blue transition-colors"
                    onClick={(e) => { e.stopPropagation(); /* Handle action */ }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.linkText}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              {completed.length} of {checklistItems.length} Tasks Completed
            </p>
            {completed.length === checklistItems.length && (
              <div className="inline-flex items-center space-x-2 text-eci-green font-bold animate-bounce mt-2">
                <CheckCircle className="w-5 h-5" />
                <span>You are completely ready for the elections!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
