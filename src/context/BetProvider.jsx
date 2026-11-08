import React, { useState, useEffect } from 'react';
import { BetContext } from './BetContext';
import { useWallet } from './useWallet';
import { INITIAL_USER_BETS } from '../data/mockData';

export default function BetProvider({ children }) {
  const { balance, setBalance, resetBalance: resetWalletBalance } = useWallet();

  // Multi-selection support: array of { matchId, matchTitle, league, pick, odds }
  const [selections, setSelections] = useState([]);
  const [betType, setBetType] = useState('single'); // 'single' | 'accumulator'
  const [stake, setStake] = useState(100);
  const [isSlipOpen, setIsSlipOpen] = useState(false);

  // Modal inspection state for match details
  const [inspectedMatch, setInspectedMatch] = useState(null);

  // Global toast notification system
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message, id: Date.now() });
    setTimeout(() => {
      setNotification((curr) => (curr?.id ? null : curr));
    }, 3500);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Placed bets history saved in localStorage
  const [placedBets, setPlacedBets] = useState(() => {
    const saved = localStorage.getItem('betzone_user_bets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return INITIAL_USER_BETS;
      }
    }
    return INITIAL_USER_BETS;
  });

  // Keep localStorage synchronized whenever bets change
  useEffect(() => {
    localStorage.setItem('betzone_user_bets', JSON.stringify(placedBets));
  }, [placedBets]);

  // Check if a specific odd is currently selected in the slip
  const isOddSelected = (matchId, pick) => {
    return selections.some((s) => s.matchId === matchId && s.pick === pick);
  };

  // Clickable odds selector (handles adding, toggling, or replacing odds for the same match)
  const selectOdd = (match, pick, odds) => {
    const existingIndex = selections.findIndex((s) => s.matchId === match.id);

    // If clicking the exact same odd, toggle/remove it
    if (existingIndex !== -1 && selections[existingIndex].pick === pick) {
      setSelections((prev) => prev.filter((_, idx) => idx !== existingIndex));
      showNotification('info', `Removed ${pick} from your bet slip.`);
      return;
    }

    const newSelection = {
      matchId: match.id,
      matchTitle: `${match.teamHome} vs ${match.teamAway}`,
      league: match.league,
      pick,
      odds,
    };

    // If an odd from the same match exists with a different pick, replace it
    if (existingIndex !== -1) {
      setSelections((prev) => {
        const updated = [...prev];
        updated[existingIndex] = newSelection;
        return updated;
      });
      showNotification('info', `Switched pick to ${pick} @ ${odds.toFixed(2)}.`);
    } else {
      // Add as new selection (max 6 selections in slip)
      if (selections.length >= 6) {
        showNotification('error', 'Maximum 6 selections allowed per slip.');
        return;
      }
      setSelections((prev) => [...prev, newSelection]);
      showNotification('success', `Added ${pick} @ ${odds.toFixed(2)} to slip.`);
    }

    setIsSlipOpen(true);
  };

  // Remove a single selection by match ID
  const removeSelection = (matchId) => {
    setSelections((prev) => prev.filter((s) => s.matchId !== matchId));
  };

  // Clear current bet slip
  const clearSlip = () => {
    setSelections([]);
  };

  // Backwards-compatible activeSelection (first selection in array)
  const activeSelection = selections[0] || null;

  // Compute Total Combined Decimal Odds
  const numericStake = Math.max(0, parseFloat(stake) || 0);

  const totalOdds =
    selections.length === 0
      ? 1.0
      : betType === 'accumulator' && selections.length > 1
      ? parseFloat(
          selections.reduce((acc, curr) => acc * curr.odds, 1).toFixed(2)
        )
      : parseFloat((selections[0]?.odds || 1.0).toFixed(2));

  // Automated winnings calculation
  const potentialWinnings =
    selections.length > 0
      ? parseFloat((numericStake * totalOdds).toFixed(2))
      : 0;

  const potentialProfit = Math.max(
    0,
    parseFloat((potentialWinnings - numericStake).toFixed(2))
  );

  // Place Bet handler
  const placeBet = () => {
    if (selections.length === 0) {
      showNotification('error', 'Your betting slip is empty. Click any match odds to begin!');
      return false;
    }

    if (!numericStake || numericStake <= 0) {
      showNotification('error', 'Please enter a valid virtual credit stake (greater than 0).');
      return false;
    }

    if (numericStake > balance) {
      showNotification(
        'error',
        `Insufficient credits! You need ${numericStake.toLocaleString()} VC, but only have ${balance.toLocaleString()} VC.`
      );
      return false;
    }

    // Deduct credits from user's balance
    const updatedBalance = balance - numericStake;
    setBalance(updatedBalance);

    const formattedDate = new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const isMulti = selections.length > 1 && betType === 'accumulator';

    const newBet = {
      id: `bet_${Date.now()}`,
      matchTitle: isMulti
        ? `${selections.length}-Leg Accumulator`
        : selections[0].matchTitle,
      selection: isMulti
        ? selections.map((s) => `${s.pick} (${s.odds.toFixed(2)})`).join(', ')
        : selections[0].pick,
      odds: totalOdds,
      stake: numericStake,
      potentialPayout: potentialWinnings,
      status: 'Active',
      date: formattedDate,
      isAccumulator: isMulti,
      legs: selections.map((s) => ({
        matchTitle: s.matchTitle,
        pick: s.pick,
        odds: s.odds,
      })),
    };

    // Save to history and localStorage
    const updatedBets = [newBet, ...placedBets];
    setPlacedBets(updatedBets);

    // Reset bet slip
    clearSlip();

    // Trigger success notification
    showNotification(
      'success',
      `Bet placed! Wagered ${numericStake.toLocaleString()} VC on ${newBet.matchTitle} @ ${newBet.odds.toFixed(2)}.`
    );

    return true;
  };

  // Simulate match outcome for demo testing (Win / Loss)
  const simulateOutcome = (betId) => {
    const targetBet = placedBets.find((b) => b.id === betId);
    if (!targetBet || targetBet.status !== 'Active') return;

    // Realistic probability based on total odds
    const winProbability = Math.min(0.85, Math.max(0.12, 1 / targetBet.odds));
    const isWin = Math.random() < winProbability;

    if (isWin) {
      // Add payout back to balance
      setBalance((prev) => prev + targetBet.potentialPayout);
      showNotification(
        'success',
        `🎉 Prediction Settled! You won +${targetBet.potentialPayout.toLocaleString()} Virtual Credits on "${targetBet.matchTitle}"!`
      );
    } else {
      showNotification(
        'info',
        `Prediction Settled: "${targetBet.matchTitle}" did not win this time. Better luck on the next one!`
      );
    }

    setPlacedBets((prevBets) =>
      prevBets.map((b) => {
        if (b.id !== betId) return b;
        return {
          ...b,
          status: isWin ? 'Won' : 'Lost',
        };
      })
    );
  };

  // Reset entire demo data (wallet + bets)
  const resetAllDemoData = () => {
    resetWalletBalance();
    setPlacedBets(INITIAL_USER_BETS);
    localStorage.removeItem('betzone_user_bets');
    clearSlip();
    showNotification('success', 'Reset complete: Wallet restored to 10,000 VC and demo slips reloaded.');
  };

  return (
    <BetContext.Provider
      value={{
        selections,
        activeSelection,
        isOddSelected,
        betType,
        setBetType,
        stake,
        setStake,
        isSlipOpen,
        setIsSlipOpen,
        selectOdd,
        removeSelection,
        clearSlip,
        placeBet,
        placedBets,
        simulateOutcome,
        totalOdds,
        potentialWinnings,
        potentialProfit,
        notification,
        showNotification,
        closeNotification,
        inspectedMatch,
        setInspectedMatch,
        resetAllDemoData,
      }}
    >
      {children}
    </BetContext.Provider>
  );
}
