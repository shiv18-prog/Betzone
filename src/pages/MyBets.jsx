import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  Play,
  RotateCcw,
  Layers,
  Sparkles
} from 'lucide-react';
import { useBet } from '../context/useBet';
import { formatOdds } from '../utils/formatters';

export default function MyBets() {
  const { placedBets, simulateOutcome, resetAllDemoData } = useBet();
  const [filterTab, setFilterTab] = useState('ALL');

  // Filter bets based on selected tab
  const filteredBets = placedBets.filter((bet) => {
    if (filterTab === 'ACTIVE') return bet.status === 'Active';
    if (filterTab === 'WON') return bet.status === 'Won';
    if (filterTab === 'LOST') return bet.status === 'Lost';
    return true;
  });

  // Calculate live statistics
  const totalBets = placedBets.length;
  const activeBets = placedBets.filter((b) => b.status === 'Active').length;
  const wonBets = placedBets.filter((b) => b.status === 'Won').length;
  const lostBets = placedBets.filter((b) => b.status === 'Lost').length;
  const settledBetsCount = wonBets + lostBets;

  const winRate =
    settledBetsCount > 0 ? ((wonBets / settledBetsCount) * 100).toFixed(1) : '0.0';

  const totalSettledStakes = placedBets
    .filter((b) => b.status === 'Won' || b.status === 'Lost')
    .reduce((acc, curr) => acc + (curr.stake || 0), 0);

  const totalWonReturns = placedBets
    .filter((b) => b.status === 'Won')
    .reduce((acc, curr) => acc + (curr.potentialPayout || 0), 0);

  const netVirtualProfit = parseFloat((totalWonReturns - totalSettledStakes).toFixed(2));

  return (
    <div className="space-y-8 pb-20">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E701]/10 text-[#00E701] text-xs font-extrabold uppercase tracking-widest mb-2 border border-[#00E701]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Prediction Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            My Bets History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track active slips, review settlement history, and test simulation outcomes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetAllDemoData}
            title="Reset wallet to 10k and reload sample bets"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0E1524] hover:bg-[#151F33] text-slate-300 hover:text-white border border-[#22314C] text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00E701]" />
            <span>Reset Demo Data</span>
          </button>

          <Link
            to="/sports"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00E701] hover:bg-[#00c901] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(0,231,1,0.25)] hover:scale-105"
          >
            <span>Find Matches</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0E1524] p-5 rounded-2xl border border-[#1F2C42] shadow-xl">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Predictions</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">{totalBets}</p>
          <span className="text-[11px] text-[#00E701] flex items-center gap-1 mt-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> Saved in localStorage
          </span>
        </div>

        <div className="bg-[#0E1524] p-5 rounded-2xl border border-[#1F2C42] shadow-xl">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Slips</span>
          <p className="text-2xl sm:text-3xl font-black text-[#00E701] mt-1">{activeBets}</p>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-medium">
            <Clock className="w-3 h-3 text-[#00E701]" /> Ready to simulate
          </span>
        </div>

        <div className="bg-[#0E1524] p-5 rounded-2xl border border-[#1F2C42] shadow-xl">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Virtual Net Profit</span>
          <p
            className={`text-2xl sm:text-3xl font-black mt-1 ${
              netVirtualProfit >= 0 ? 'text-[#00E701] neon-text-glow' : 'text-rose-400'
            }`}
          >
            {netVirtualProfit >= 0 ? `+${netVirtualProfit.toLocaleString()}` : netVirtualProfit.toLocaleString()} VC
          </p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            Demo Credits Only
          </span>
        </div>

        <div className="bg-[#0E1524] p-5 rounded-2xl border border-[#1F2C42] shadow-xl">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Win Rate</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">{winRate}%</p>
          <span className="text-[11px] text-slate-400 mt-1 block font-medium">
            {wonBets} Won / {lostBets} Lost ({settledBetsCount} Settled)
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1A263D] pb-3 overflow-x-auto">
        {[
          { id: 'ALL', label: `All Bets (${totalBets})` },
          { id: 'ACTIVE', label: `Active (${activeBets})` },
          { id: 'WON', label: `Won (${wonBets})` },
          { id: 'LOST', label: `Lost (${lostBets})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
              filterTab === tab.id
                ? 'bg-[#00E701] text-black shadow-[0_0_15px_rgba(0,231,1,0.3)] ring-2 ring-[#00E701]'
                : 'bg-[#0E1524] text-slate-400 hover:text-white hover:bg-[#151F33] border border-[#1F2C42]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bets List */}
      <div className="space-y-4">
        {filteredBets.length === 0 ? (
          <div className="text-center py-20 bg-[#0C1220] rounded-3xl border border-[#1A263D] space-y-3">
            <Clock className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No slips found in this view</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Place a virtual bet from the Sports Lobby or select another tab to view historical slips.
            </p>
            <Link
              to="/sports"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-[#00E701] mt-2"
            >
              <span>Explore Sports Lobby</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          filteredBets.map((bet) => {
            const isWon = bet.status === 'Won';
            const isLost = bet.status === 'Lost';
            const isActive = bet.status === 'Active';

            return (
              <div
                key={bet.id}
                className="group bg-[#0E1524] hover:bg-[#121B2E] rounded-2xl border border-[#1F2C42] hover:border-emerald-500/40 p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xl hover:shadow-2xl"
              >
                {/* Left: Match & Pick Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm ${
                        isWon
                          ? 'bg-[#00E701]/20 text-[#00E701] border border-[#00E701]/50 shadow-[0_0_10px_rgba(0,231,1,0.2)]'
                          : isLost
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {isWon && <CheckCircle className="w-3.5 h-3.5" />}
                      {isLost && <XCircle className="w-3.5 h-3.5" />}
                      {isActive && <Clock className="w-3.5 h-3.5 animate-spin-slow" />}
                      {bet.status}
                    </span>

                    {bet.isAccumulator && (
                      <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        <span>Multi-Leg Parlay</span>
                      </span>
                    )}

                    <span className="text-xs text-slate-500">{bet.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                    {bet.matchTitle}
                  </h3>

                  <p className="text-xs text-slate-300">
                    Selection:{' '}
                    <span className="text-[#00E701] font-bold">{bet.selection}</span>
                    {' • '}Odds:{' '}
                    <span className="text-white font-extrabold">{formatOdds(bet.odds)}</span>
                  </p>

                  {/* If legs exist (Multi-bet) */}
                  {bet.legs && bet.legs.length > 1 && (
                    <div className="pt-1.5 flex flex-wrap gap-1.5">
                      {bet.legs.map((leg, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-[#141E30] text-slate-300 border border-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {leg.pick} @ {formatOdds(leg.odds)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Stake, Payout & Simulator Action */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#1A263D]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Virtual Stake
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {bet.stake?.toLocaleString()} VC
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      {isWon ? 'Won Payout' : 'Potential Return'}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-black ${
                        isWon
                          ? 'text-[#00E701] neon-text-glow'
                          : isLost
                          ? 'text-slate-500 line-through'
                          : 'text-slate-200'
                      }`}
                    >
                      {bet.potentialPayout?.toLocaleString()} VC
                    </span>
                  </div>

                  {/* Simulate Result Action for Active Bets */}
                  {isActive && (
                    <button
                      type="button"
                      onClick={() => simulateOutcome(bet.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00E701]/15 hover:bg-[#00E701]/30 border border-[#00E701]/50 text-[#00E701] text-xs font-black transition-all cursor-pointer shadow-sm shadow-[#00E701]/15 hover:scale-105"
                      title="Simulate match finish to test win/loss and virtual payout"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#00E701]" />
                      <span>Simulate Result</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transparent Disclaimer Callout */}
      <div className="bg-[#0C1220] border border-[#1A263D] rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#00E701] shrink-0" />
          <p className="text-xs sm:text-sm text-slate-300">
            All outcomes on BetZone are virtual simulations. Winnings are automatically added to your demo balance.
          </p>
        </div>
      </div>
    </div>
  );
}
