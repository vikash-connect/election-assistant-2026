import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import VoterEligibility from '../components/VoterEligibility';
import useVoterLogic from '../hooks/useVoterLogic';
import { renderHook, act } from '@testing-library/react';

// Mock matchMedia for Framer Motion
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

describe('App Smoke Test', () => {
  it('renders without crashing', () => {
    render(<VoterEligibility />);
    expect(screen.getByText(/Check Eligibility/i)).toBeInTheDocument();
  });
});

describe('useVoterLogic Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useVoterLogic());
    expect(result.current.dob).toBe('');
    expect(result.current.isNRI).toBe(false);
    expect(result.current.status).toBe(null);
  });

  it('updates fields correctly', () => {
    const { result } = renderHook(() => useVoterLogic());
    act(() => {
      result.current.updateField('isNRI', true);
    });
    expect(result.current.isNRI).toBe(true);
  });

  it('returns eligible for 18+ year old', () => {
    const { result } = renderHook(() => useVoterLogic());
    act(() => {
      result.current.evaluateStatus({ dob: '2000-01-01', isNRI: false, hasPriorVoterId: false });
    });
    expect(result.current.status).toBe('eligible');
  });

  it('returns ineligible for under 18', () => {
    const { result } = renderHook(() => useVoterLogic());
    act(() => {
      result.current.evaluateStatus({ dob: '2010-01-01', isNRI: false, hasPriorVoterId: false });
    });
    expect(result.current.status).toBe('ineligible');
  });

  it('returns eligible_nri when NRI is true', () => {
    const { result } = renderHook(() => useVoterLogic());
    act(() => {
      result.current.evaluateStatus({ dob: '2000-01-01', isNRI: true, hasPriorVoterId: false });
    });
    expect(result.current.status).toBe('eligible_nri');
  });

  it('returns already_registered when prior voter ID exists', () => {
    const { result } = renderHook(() => useVoterLogic());
    act(() => {
      result.current.evaluateStatus({ dob: '2000-01-01', isNRI: false, hasPriorVoterId: true });
    });
    expect(result.current.status).toBe('already_registered');
  });
});
