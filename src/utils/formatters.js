/**
 * Utility functions for formatting numbers, currency, and odds in BetZone.
 * All currency values are strictly virtual credits.
 */

// Formats virtual credit amounts (e.g. 1000 -> "1,000 Credits")
export const formatCredits = (amount) => {
  if (amount === undefined || amount === null) return '0 Credits';
  return `${Number(amount).toLocaleString()} Credits`;
};

// Formats decimal odds to 2 decimal places (e.g. 2.1 -> "2.10")
export const formatOdds = (odds) => {
  if (!odds) return '1.00';
  return Number(odds).toFixed(2);
};

// Formats date or time for match schedules
export const formatMatchTime = (dateString) => {
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
