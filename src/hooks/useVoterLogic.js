import { useState, useEffect } from 'react';

export default function useVoterLogic() {
  const [voterData, setVoterData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('voterLogicData');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing localStorage for voter logic', e);
        }
      }
    }
    return { dob: '', isNRI: false, hasPriorVoterId: false, status: null, message: '' };
  });

  useEffect(() => {
    localStorage.setItem('voterLogicData', JSON.stringify(voterData));
  }, [voterData]);

  const evaluateStatus = (data) => {
    const { dob, isNRI, hasPriorVoterId } = data;
    
    if (!dob) {
      setVoterData(prev => ({ ...prev, dob, isNRI, hasPriorVoterId, status: 'unknown', message: 'Please enter a valid Date of Birth.' }));
      return;
    }

    const cutoffDate = new Date('2026-01-01');
    const userDob = new Date(dob);
    
    let age = cutoffDate.getFullYear() - userDob.getFullYear();
    const m = cutoffDate.getMonth() - userDob.getMonth();
    
    if (m < 0 || (m === 0 && cutoffDate.getDate() < userDob.getDate())) {
        age--;
    }

    if (age < 18) {
      setVoterData(prev => ({ ...prev, dob, isNRI, hasPriorVoterId, status: 'ineligible', message: 'You must be 18 years or older as of Jan 1st, 2026 to register.' }));
      return;
    }

    if (hasPriorVoterId) {
      setVoterData(prev => ({ ...prev, dob, isNRI, hasPriorVoterId, status: 'already_registered', message: 'You are already registered. Use Form 8 for any corrections or shifting.' }));
      return;
    }

    if (isNRI) {
      setVoterData(prev => ({ ...prev, dob, isNRI, hasPriorVoterId, status: 'eligible_nri', message: 'As an Overseas Indian (NRI), you are eligible. Please submit Form 6A.' }));
      return;
    }

    setVoterData(prev => ({ ...prev, dob, isNRI, hasPriorVoterId, status: 'eligible', message: 'You are eligible! Use Form 6 for new voter registration.' }));
  };

  const updateField = (field, value) => {
    setVoterData(prev => ({ ...prev, [field]: value, status: null, message: '' }));
  };

  const resetStatus = () => {
    setVoterData(prev => ({ ...prev, status: null, message: '' }));
  };

  return { ...voterData, evaluateStatus, resetStatus, updateField };
}
