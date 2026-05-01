import React, { useState, useEffect } from 'react';
import { Activity, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveElectionData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch from Google Cloud mock endpoint
    const fetchLiveElectionData = async () => {
      try {
        // In a real scenario: await fetch('https://us-central1-eci-mock.cloudfunctions.net/api/live-status')
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setData({
          timestamp: new Date().toLocaleTimeString(),
          turnout: '45.2%',
          activeBooths: '1,045,923',
          status: 'Phase 1 Voting Active'
        });
      } catch (error) {
        console.error("Error fetching live data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveElectionData();
    // Optional: set up interval for live updates
    const interval = setInterval(fetchLiveElectionData, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-eci-blue text-white py-3 px-4 relative z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="flex items-center space-x-2 font-semibold">
          <Activity className="w-4 h-4 text-eci-saffron animate-pulse" aria-hidden="true" />
          <span>Live Election Data Feed</span>
        </div>
        
        {loading ? (
          <div className="flex items-center space-x-2 opacity-70">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
            </motion.div>
            <span>Fetching from secure endpoint...</span>
          </div>
        ) : data ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0"
          >
            <span className="bg-white/10 px-3 py-1 rounded-full">{data.status}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Turnout: {data.turnout}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Active Booths: {data.activeBooths}</span>
            <span className="text-white/60 flex items-center">
              <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
              Last Updated: {data.timestamp}
            </span>
          </motion.div>
        ) : (
          <div className="text-white/70">Data temporarily unavailable.</div>
        )}
      </div>
    </div>
  );
}
