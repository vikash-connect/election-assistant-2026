import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealthCheck() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    // Simulate a Google Cloud Health Check ping
    const checkHealth = async () => {
      try {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('operational');
      } catch (error) {
        setStatus('down');
      }
    };

    checkHealth();
    // Simulate periodic heartbeat
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-2xl shadow-xl flex items-center space-x-3"
        role="status"
        aria-live="polite"
      >
        <div className="relative flex items-center justify-center">
          {status === 'operational' ? (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-eci-green opacity-30 animate-ping" aria-hidden="true"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-eci-green"></span>
            </>
          ) : status === 'checking' ? (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400 animate-pulse"></span>
          ) : (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-white flex items-center">
            <Activity className="w-3 h-3 mr-1 text-slate-400" aria-hidden="true" />
            GCP Backend
          </p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">
            {status === 'operational' ? 'System Operational' : status === 'checking' ? 'Checking Status...' : 'System Outage'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
