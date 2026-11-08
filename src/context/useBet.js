import { useContext } from 'react';
import { BetContext } from './BetContext';

export const useBet = () => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error('useBet must be used within a BetProvider');
  }
  return context;
};
