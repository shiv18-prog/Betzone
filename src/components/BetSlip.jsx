import React from 'react';
import { 
  ReceiptText, 
  X, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  AlertTriangle,
  Layers
} from 'lucide-react';
import { useBet } from '../context/useBet';
import { useWallet } from '../context/useWallet';
import { formatOdds } from '../utils/formatters';

export default function BetSlip() {
  const { 
    selections, 
    removeSelection, 
    betType, 
    setBetType, 
    stake, 
    setStake, 
    isSlipOpen, 
    setIsSlipOpen, 
    clearSlip, 
    placeBet, 
    totalOdds, 
    potentialWinnings, 
    potentialProfit 
  } = useBet();

  const { balance, resetBalance } = useWallet();

  // If no selection and slip is closed, show nothing
  if (selections.length === 0 && !isSlipOpen) {
    return null;
  }

  const numericStake = parseFloat(stake) || 0;
  const isInsufficientFunds = numericStake > balance;
  const isValidStake = numericStake > 0 && !isInsufficientFunds && selections.length > 0;

  const quickStakes = [50, 100, 250, 500, 1000];

  const handleQuickStake = (amount) => {
    setStake(amount);
  };

  const handleMaxStake = () => {
    setStake(balance);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-full sm:w-[390px] shadow-2xl transition-all duration-300">
      {/* Minimized Bar */}
      {!isSlipOpen && selections.length > 0 && (
        <button
          type="button"
          onClick={() => setIsSlipOpen(true)}
          className="w-full bg-[#131D2D] hover:bg-[#18253A] border-2 border-emerald-500/80 text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-xl shadow-emerald-500/10 cursor-pointer animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              {selections.length}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                Bet Slip <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span className="text-[11px] text-emerald-400 block truncate max-w-[190px]">
                {selections.length === 1
                  ? `${selections[0].pick} @ ${formatOdds(selections[0].odds)}`
                  : `${selections.length} Selections (Multi @ ${formatOdds(totalOdds)})`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500 text-black font-bold px-2.5 py-1 rounded-lg">
              Open Slip
            </span>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </div>
        </button>
      )}

      {/* Expanded Bet Slip Panel */}
      {isSlipOpen && (
        <div className="bg-[#111723] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#151E2E] px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ReceiptText className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Bet Slip</h3>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                {selections.length} {selections.length === 1 ? 'Selection' : 'Selections'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {selections.length > 0 && (
                <button
                  type="button"
                  onClick={clearSlip}
                  title="Clear all selections"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSlipOpen(false)}
                title="Minimize slip"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bet Type Tabs (Singles vs Accumulator if > 1 selection) */}
          {selections.length > 1 && (
            <div className="grid grid-cols-2 p-1.5 bg-[#0D121B] border-b border-slate-800 gap-1">
              <button
                type="button"
                onClick={() => setBetType('single')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  betType === 'single'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Single (First Leg)
              </button>
              <button
                type="button"
                onClick={() => setBetType('accumulator')}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  betType === 'accumulator'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Multi Parlay ({selections.length})</span>
              </button>
            </div>
          )}

          {/* Slip Body */}
          <div className="p-4 space-y-4 overflow-y-auto">
            {selections.length > 0 ? (
              <>
                {/* Selections List */}
                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                  {selections.map((item) => (
                    <div
                      key={item.matchId}
                      className="bg-[#162032] border border-slate-700/70 hover:border-emerald-500/40 rounded-xl p-3 space-y-1.5 relative transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => removeSelection(item.matchId)}
                        className="absolute top-2.5 right-2.5 text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="Remove selection"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="text-[10px] font-semibold uppercase text-emerald-400 tracking-wider">
                        {item.league}
                      </div>

                      <div className="text-xs text-slate-200 font-medium pr-5 truncate">
                        {item.matchTitle}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
                        <span className="text-xs font-bold text-white">
                          Pick: <span className="text-emerald-400">{item.pick}</span>
                        </span>
                        <span className="text-xs font-bold bg-emerald-500 text-black px-2 py-0.5 rounded-md">
                          {formatOdds(item.odds)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stake Input Area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="bet-stake-input" className="font-semibold text-slate-300">
                      Virtual Stake (VC)
                    </label>
                    <span className="text-slate-400">
                      Balance:{' '}
                      <strong className="text-white font-semibold">
                        {balance.toLocaleString()} VC
                      </strong>
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      id="bet-stake-input"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Enter stake amount..."
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      className={`w-full bg-[#162032] border rounded-xl px-3.5 py-2.5 text-sm text-white font-semibold placeholder-slate-500 focus:outline-none transition-colors ${
                        isInsufficientFunds
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-700 focus:border-emerald-500'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400">
                      VC
                    </span>
                  </div>

                  {/* Insufficient Balance Alert */}
                  {isInsufficientFunds && (
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs text-rose-300">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Stake exceeds balance!</span>
                      </div>
                      <button
                        type="button"
                        onClick={resetBalance}
                        className="text-[11px] underline font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                      >
                        Refill 10k
                      </button>
                    </div>
                  )}

                  {/* Quick Stake Chips */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {quickStakes.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleQuickStake(amt)}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          numericStake === amt
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                            : 'bg-[#162032] text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        +{amt}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleMaxStake}
                      className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700 cursor-pointer"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="bg-[#141C2B] border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>
                      {betType === 'accumulator' && selections.length > 1
                        ? `Combined Parlay Odds (${selections.length} legs)`
                        : 'Decimal Odds'}
                    </span>
                    <span className="text-white font-bold text-sm">
                      {formatOdds(totalOdds)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Est. Return</span>
                    <span className="text-white font-bold text-sm">
                      {potentialWinnings.toLocaleString()} <span className="text-emerald-400 text-xs">VC</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-1.5 text-slate-400">
                    <span>Net Profit</span>
                    <span className="text-emerald-400 font-bold">
                      +{potentialProfit.toLocaleString()} VC
                    </span>
                  </div>
                </div>

                {/* Place Bet Button */}
                <button
                  type="button"
                  disabled={!isValidStake}
                  onClick={placeBet}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isValidStake
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 hover:shadow-emerald-500/35 cursor-pointer hover:-translate-y-0.5'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {betType === 'accumulator' && selections.length > 1
                      ? `Place Multi Bet (${selections.length} Legs)`
                      : 'Place Virtual Bet'}
                  </span>
                </button>
              </>
            ) : (
              <div className="text-center py-8 space-y-3">
                <ReceiptText className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  Your bet slip is currently empty.
                </p>
                <p className="text-[11px] text-slate-500">
                  Click on any match odds button on the Homepage or Sports Lobby to add selections. Combine up to 6 matches for accumulator bets!
                </p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="bg-[#0D121B] px-4 py-2 text-[10px] text-slate-500 text-center border-t border-slate-800">
            Virtual Credits Demo • Zero Real Money Involved
          </div>
        </div>
      )}
    </div>
  );
}
