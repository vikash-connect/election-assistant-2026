import React from 'react';
import { Search, FileEdit, CreditCard, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Voter List Verification',
    subtitle: 'SSR - Summary Revision',
    description: 'Check your name in the draft electoral roll. Verify your details are correct before the final publication.',
    icon: Search,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Form 6 Submission',
    subtitle: 'New Registration',
    description: 'First time voter? Submit Form 6 online with required age and address proof documents.',
    icon: FileEdit,
    color: 'bg-eci-saffron',
    lightColor: 'bg-orange-100',
    textColor: 'text-orange-600'
  },
  {
    id: 3,
    title: 'Scrutiny & EPIC Generation',
    subtitle: 'Voter ID Processing',
    description: 'BLO verifies your application. Once approved, your unique EPIC number is generated.',
    icon: CreditCard,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  {
    id: 4,
    title: 'Polling Day',
    subtitle: 'Find your booth',
    description: 'Locate your designated polling booth, carry your EPIC or alternative ID, and cast your vote.',
    icon: MapPin,
    color: 'bg-eci-green',
    lightColor: 'bg-green-100',
    textColor: 'text-green-600'
  }
];

export default function ElectionTimeline() {
  return (
    <section id="roadmap" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Registration Roadmap</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Understanding the process from registration to polling day. Follow these steps to ensure you are ready to vote.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2" aria-hidden="true"></div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={step.id} 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center transform-gpu ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 rounded-full border-4 border-white ${step.color} flex items-center justify-center shadow-lg z-10 transition-transform`}
                      aria-label={`Step ${step.id}`}
                    >
                      <span className="text-white font-bold" aria-hidden="true">{step.id}</span>
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="glass-card p-6 bg-white/70 backdrop-blur-md border border-slate-200/50 hover:shadow-2xl transition-shadow group cursor-default rounded-2xl">
                      <div className={`inline-flex p-3 rounded-xl ${step.lightColor} ${step.textColor} mb-4 transition-transform`}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      <h4 className={`text-sm font-semibold mb-3 ${step.textColor}`}>{step.subtitle}</h4>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
