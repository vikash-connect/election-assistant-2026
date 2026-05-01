import React, { useState } from 'react';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function BoothFinder() {
  const position = { lat: 28.6129, lng: 77.2295 }; // Coordinates for ECI HQ

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-in fade-in duration-500 w-full"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-eci-blue mr-2" aria-hidden="true" />
            Locate Your Nearest Polling Station
          </h3>
          <p className="text-slate-600 mb-6">Explore the interactive map below.</p>
        </div>

        <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <APIProvider apiKey={'AIzaSyC6iZy_jMUY7H1dTZ6ilpwTbQ1E3kxPNbQ'}>
            <Map
              defaultCenter={position}
              defaultZoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
            >
              <Marker position={position} title="ECI Headquarters - National Monitoring Center" />
            </Map>
          </APIProvider>
        </div>
      </div>
    </motion.div>
  );
}
