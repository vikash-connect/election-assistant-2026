import React, { useState } from 'react';
import { FileText, UserPlus, Edit3, Link as LinkIcon, ChevronRight } from 'lucide-react';

const forms = [
  {
    id: 'form6',
    name: 'Form 6',
    title: 'New Voter Registration',
    icon: UserPlus,
    description: 'For first-time voters (18+ years) or individuals moving to a new constituency.',
    color: 'border-eci-blue',
    bg: 'bg-eci-blue-light',
    text: 'text-eci-blue',
    requirements: ['Age Proof (Birth Certificate/Aadhaar/PAN)', 'Address Proof (Passport/Utility Bill)', 'Passport Size Photo']
  },
  {
    id: 'form8',
    name: 'Form 8',
    title: 'Correction & Shifting',
    icon: Edit3,
    description: 'For correction of entries in electoral roll, shifting residence, or replacement of EPIC.',
    color: 'border-eci-saffron',
    bg: 'bg-eci-saffron-light',
    text: 'text-eci-saffron',
    requirements: ['Existing EPIC Number', 'Document proof for correction (if applicable)', 'New Address Proof (if shifting)']
  },
  {
    id: 'form6b',
    name: 'Form 6B',
    title: 'Aadhaar Linkage',
    icon: LinkIcon,
    description: 'Voluntary linking of Aadhaar number with Electoral Photo Identity Card (EPIC) data.',
    color: 'border-eci-green',
    bg: 'bg-eci-green-light',
    text: 'text-eci-green',
    requirements: ['Existing EPIC Number', 'Aadhaar Card Number', 'Registered Mobile Number']
  }
];

export default function FormGuide() {
  const [activeForm, setActiveForm] = useState(forms[0]);

  return (
    <section id="forms" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Know Your Form</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select the right form for your needs. Quick, simple, and digital.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Selector */}
          <div className="w-full lg:w-1/3 space-y-4">
            {forms.map((form) => {
              const isActive = activeForm.id === form.id;
              const Icon = form.icon;
              return (
                <button
                  key={form.id}
                  onClick={() => setActiveForm(form)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${
                    isActive 
                      ? `${form.color} bg-white shadow-md transform scale-105` 
                      : 'border-transparent bg-white shadow-sm hover:bg-slate-100 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${form.bg} ${form.text}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{form.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{form.title}</p>
                    </div>
                  </div>
                  {isActive && <ChevronRight className={`w-5 h-5 ${form.text}`} />}
                </button>
              );
            })}
          </div>

          {/* Form Details */}
          <div className="w-full lg:w-2/3">
            <div className={`glass-card h-full p-8 md:p-12 border-t-4 ${activeForm.color}`}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{activeForm.name}</h3>
                  <h4 className={`text-xl font-semibold ${activeForm.text}`}>{activeForm.title}</h4>
                </div>
                <div className={`p-4 rounded-2xl ${activeForm.bg} ${activeForm.text}`}>
                  <FileText className="w-10 h-10" />
                </div>
              </div>
              
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {activeForm.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
                <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                  <span className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded mr-3">REQUIRED</span>
                  Key Documents Needed
                </h5>
                <ul className="space-y-3">
                  {activeForm.requirements.map((req, i) => (
                    <li key={i} className="flex items-center text-slate-700">
                      <div className={`w-2 h-2 rounded-full mr-3 ${activeForm.bg.replace('-light', '')}`}></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full md:w-auto px-8 py-3 rounded-full text-white font-bold transition-all shadow-md hover:shadow-lg ${activeForm.id === 'form6' ? 'bg-eci-blue hover:bg-blue-800' : activeForm.id === 'form8' ? 'bg-eci-saffron hover:bg-orange-600' : 'bg-eci-green hover:bg-green-700'}`}>
                Apply Online Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
