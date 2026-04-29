import React from 'react';
import { Vote } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-eci-blue p-2 rounded-lg">
              <Vote className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Election Commission<br/><span className="text-eci-saffron">of India</span></h1>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#timeline" className="text-slate-600 hover:text-eci-blue font-medium transition-colors">Election Cycle</a>
            <a href="#forms" className="text-slate-600 hover:text-eci-blue font-medium transition-colors">Know Your Form</a>
            <a href="#checklist" className="text-slate-600 hover:text-eci-blue font-medium transition-colors">Voter Checklist</a>
          </nav>
          <div className="flex items-center">
            <button className="bg-eci-saffron hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Voter Portal Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
