import React, { useState, useEffect } from 'react';
import { Info, X, Copy, Check, Terminal, Sparkles, ExternalLink } from 'lucide-react';

export default function PromptModalFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const repoUrl = "https://github.com/vikash-connect/election-assistant-2026";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(repoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const prompts = [
    {
      title: "1. Structure & Foundation",
      description: "Used Google Antigravity to setup a Vite React application with Tailwind CSS and Lucide React icons, establishing the base architecture and routing."
    },
    {
      title: "2. Indian Context",
      description: "Implement the Hero section, Timeline, Form Guide, and Checklist using the specific Election Commission of India (ECI) color palette."
    },
    {
      title: "3. Eligibility Tool",
      description: "Add interactive tabs for Date of Birth age verification (18+ as of Jan 2026) and a Booth Finder simulation with dynamic data."
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:shadow-[0_0_20px_rgba(30,58,138,0.5)] hover:scale-110 transition-all duration-300 group"
        aria-label="Prompt Strategy Info"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Info className="w-6 h-6 group-hover:rotate-12 transition-transform" aria-hidden="true" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>
          
          {/* Modal Content - Glassmorphism */}
          <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-white/50">
              <h2 id="modal-title" className="text-2xl font-bold text-slate-900 flex items-center">
                <Sparkles className="w-6 h-6 text-eci-saffron mr-3" aria-hidden="true" />
                Build with AI: Prompt Strategy
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
              <p className="text-slate-600 mb-8 text-lg">
                This Indian Election Assistant was constructed using <strong>Google Antigravity</strong> through an iterative prompt engineering approach. Here are the 3 main prompts used:
              </p>

              <div className="space-y-6">
                {prompts.map((prompt, index) => (
                  <div key={index} className="flex gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-200/50 hover:bg-white transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <Terminal className="w-6 h-6 text-eci-blue" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{prompt.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{prompt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200/50 bg-slate-50/50 flex items-center justify-end space-x-4">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Project on GitHub"
                className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-eci-blue transition-colors"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
              </a>
              <button 
                onClick={handleCopy}
                aria-label="Copy Repository Link"
                className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2 text-eci-green-light" aria-hidden="true" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" aria-hidden="true" />
                    Copy Repo Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
