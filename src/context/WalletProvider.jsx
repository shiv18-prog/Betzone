import React, { useState, useEffect } from 'react';
import { WalletContext } from './WalletContext';

/**
 * WalletProvider manages the user's virtual credit balance.
 * Stored in localStorage so the user can refresh without losing their demo progress.
 * Initial starting bankroll: 10,000 Virtual Credits (VC).
 */
export default function WalletProvider({ children }) {
  const INITIAL_BALANCE = 10000;

  // Retrieve existing balance from localStorage or initialize with 10,000 credits
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('betzone_wallet_balance');
    if (saved !== null) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed) && parsed >= 0) return parsed;
    }
    return INITIAL_BALANCE;
  });

  const [user, setUser] = useState({
    username: 'DemoPlayer',
    email: 'demo@betzone.local',
    isLoggedIn: true,
  });

  // Sync balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('betzone_wallet_balance', balance.toString());
  }, [balance]);

  // Refill balance to 10,000 free virtual credits
  const resetBalance = () => {
    setBalance(INITIAL_BALANCE);
    localStorage.setItem('betzone_wallet_balance', INITIAL_BALANCE.toString());
  };

  const loginDemoUser = (username) => {
    setUser({
      username: username || 'DemoPlayer',
      email: `${username || 'demo'}@betzone.local`,
      isLoggedIn: true,
    });
  };

  const logoutUser = () => {
    setUser({
      username: '',
      email: '',
      isLoggedIn: false,
    });
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        setBalance,
        resetBalance,
        initialBalance: INITIAL_BALANCE,
        user,
        loginDemoUser,
        logoutUser,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
