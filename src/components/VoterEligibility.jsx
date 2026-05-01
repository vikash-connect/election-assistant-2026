import React, { useState } from 'react';
import { Calendar, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import useVoterLogic from '../hooks/useVoterLogic';
import Logger from '../utils/Logger';

// Zod Schema for validation
const eligibilitySchema = z.object({
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  isNRI: z.boolean(),
  hasPriorVoterId: z.boolean(),
});

export default function VoterEligibility() {
  const { dob, isNRI, hasPriorVoterId, status, message, evaluateStatus, updateField } = useVoterLogic();
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    
    try {
      // Validate inputs using Zod
      eligibilitySchema.parse({ dob, isNRI, hasPriorVoterId });
      evaluateStatus({ dob, isNRI, hasPriorVoterId });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message);
        Logger.warn('Validation failed in VoterEligibility', err.errors);
      } else {
        Logger.error('Unexpected error during validation', err);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-in fade-in duration-500"
    >
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => updateField('dob', e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-eci-saffron focus:border-transparent transition-all shadow-sm"
              required
              aria-required="true"
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Checking age as of January 1st, 2026</p>
          {validationError && (
            <p className="text-sm text-red-600 mt-2 font-medium flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {validationError}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isNRI"
            checked={isNRI}
            onChange={(e) => updateField('isNRI', e.target.checked)}
            className="w-5 h-5 text-eci-saffron border-slate-300 rounded focus:ring-eci-saffron focus:ring-2"
          />
          <label htmlFor="isNRI" className="text-sm font-medium text-slate-700">
            I am an Overseas Indian (NRI)
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hasPriorVoterId"
            checked={hasPriorVoterId}
            onChange={(e) => updateField('hasPriorVoterId', e.target.checked)}
            className="w-5 h-5 text-eci-saffron border-slate-300 rounded focus:ring-eci-saffron focus:ring-2"
          />
          <label htmlFor="hasPriorVoterId" className="text-sm font-medium text-slate-700">
            I already have a Voter ID
          </label>
        </div>
        
        <button 
          type="submit" 
          aria-label="Check my voter eligibility"
          className="w-full py-4 bg-gradient-to-r from-eci-saffron to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          Check Eligibility
        </button>
      </form>

      {status && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-8 p-6 border rounded-2xl text-center max-w-md mx-auto ${
            status === 'ineligible' || status === 'unknown' ? 'bg-red-50/80 border-red-200' : 'bg-green-50/80 border-green-200'
          }`}
          role="alert"
          aria-live="polite"
        >
          {(status === 'ineligible' || status === 'unknown') ? (
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" aria-hidden="true" />
          ) : (
            <CheckCircle className="w-12 h-12 text-eci-green mx-auto mb-3" aria-hidden="true" />
          )}
          
          <h3 className={`text-xl font-bold mb-2 ${status === 'ineligible' ? 'text-red-700' : 'text-slate-900'}`}>
            {status === 'ineligible' ? 'Not Eligible' : 'Status Validated'}
          </h3>
          <p className={`${status === 'ineligible' ? 'text-red-600' : 'text-slate-600'} mb-6`}>{message}</p>
          
          {status.startsWith('eligible') && (
            <a 
              href="https://voters.eci.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Go to Official ECI Portal to register"
              className="inline-flex items-center justify-center w-full py-3 px-6 bg-white border-2 border-eci-green text-eci-green rounded-xl font-bold hover:bg-eci-green hover:text-white transition-colors"
            >
              Go to Official ECI Portal
              <ExternalLink className="w-5 h-5 ml-2" aria-hidden="true" />
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
