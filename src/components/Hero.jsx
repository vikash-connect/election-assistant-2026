import React from 'react';
import { ArrowRight, ShieldCheck, Users, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-eci-saffron rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-eci-blue rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-48 w-96 h-96 bg-eci-green rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-eci-green animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700">PromptWars: Virtual 2026 Elections</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
            Empowering the <br/>
            <span className="gradient-text">World's Largest Democracy</span>
          </h1>
          
          <p className="mt-6 text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Your voice matters. Register to vote, track your application, and be part of the decision-making process for the 2026 elections. Fast, secure, and fully digital.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-eci-blue hover:bg-blue-800 text-white rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transform hover:-translate-y-1 flex items-center justify-center">
              Register to Vote
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center">
              Track Application
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-eci-blue-light rounded-2xl flex items-center justify-center mb-4 text-eci-blue">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">900M+ Voters</h3>
            <p className="text-slate-500 mt-2 text-sm">Join the massive network of registered voters across India.</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-eci-green-light rounded-2xl flex items-center justify-center mb-4 text-eci-green">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Secure & Verified</h3>
            <p className="text-slate-500 mt-2 text-sm">Your data is protected with state-of-the-art security measures.</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-eci-saffron-light rounded-2xl flex items-center justify-center mb-4 text-eci-saffron">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">100% Digital</h3>
            <p className="text-slate-500 mt-2 text-sm">From Form 6 to e-EPIC download, complete the process online.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
