import React from 'react';
import { Vote } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-eci-saffron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="bg-white/10 p-2 rounded-lg">
              <Vote className="h-6 w-6 text-eci-saffron" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Election Commission<br/><span className="text-eci-saffron text-sm">of India</span></h2>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-400">
              Created for PromptWars: Virtual 2026<br/>
              An initiative to empower the Indian voter.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; 2026 Election Commission of India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
