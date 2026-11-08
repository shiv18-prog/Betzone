import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Coins, 
  Flame, 
  ReceiptText,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import { useWallet } from '../context/useWallet';
import { useBet } from '../context/useBet';
import { MOCK_MATCHES } from '../data/mockData';
import MatchCard from '../components/MatchCard';
import SportsNav from '../components/SportsNav';

export default function Home() {
  const { balance, resetBalance } = useWallet();
  const { selections, setIsSlipOpen } = useBet();
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter featured matches by sport category
  const featuredMatches = MOCK_MATCHES.filter((m) => {
    const isFeatured = m.isFeatured;
    const matchesCategory = activeCategory === 'all' || m.sport === activeCategory;
    return isFeatured && matchesCategory;
  });

  const liveMatchesCount = MOCK_MATCHES.filter((m) => m.status === 'LIVE').length;

  return (
    <div className="space-y-12 pb-20">
      {/* Attractive Hero Section with BETZONE Branding */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0E1729] via-[#0A101C] to-[#070B12] border border-[#1E2D47] p-6 sm:p-10 lg:p-14 shadow-2xl sports-grid-bg">
        {/* Neon Green Ambient Atmospheric Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00E701]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#00E701]/10 border border-[#00E701]/30 text-[#00E701] text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm shadow-[#00E701]/10">
            <Sparkles className="w-4 h-4 text-[#00E701] animate-spin-slow" />
            <span>Virtual Sportsbook Demo • 100% Risk Free</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            PREDICT MATCHES. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E701] via-emerald-300 to-green-400 drop-shadow-[0_0_35px_rgba(0,231,1,0.4)]">
              DOMINATE THE ODDS.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl font-normal">
            Welcome to <strong className="text-white font-bold">BETZONE</strong> — the modern virtual sports betting simulator.
            Practice decimal odds analysis, build single and multi-accumulator slips, and master sports predictions across
            Football, Cricket, Basketball, and Tennis with zero real money.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/sports"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#00E701] hover:bg-[#00c901] text-black font-black text-sm transition-all shadow-[0_0_25px_rgba(0,231,1,0.3)] hover:shadow-[0_0_35px_rgba(0,231,1,0.5)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>Explore All Sports Matches</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <Link
              to="/my-bets"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#121A2B] hover:bg-[#182338] text-white font-bold text-sm border border-[#22314C] hover:border-slate-600 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>My Bets History</span>
            </Link>

            <button
              type="button"
              onClick={resetBalance}
              title="Refill 10,000 Virtual Credits"
              className="inline-flex items-center gap-2 px-4 py-4 rounded-2xl bg-[#0E1524] hover:bg-[#151F33] text-slate-300 hover:text-white text-sm font-semibold border border-[#22314C] transition-all cursor-pointer"
            >
              <Coins className="w-4 h-4 text-[#00E701]" />
              <span>Refill 10,000 VC</span>
            </button>
          </div>
        </div>

        {/* Dashboard Quick Stats Bar */}
        <div className="mt-12 pt-8 border-t border-[#1E2D47]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="bg-[#0B101C]/80 p-4 rounded-2xl border border-[#1A263D] shadow-inner">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Virtual Balance</p>
            <p className="text-xl sm:text-2xl font-black text-[#00E701] mt-1 flex items-baseline gap-1">
              {balance.toLocaleString()} <span className="text-xs text-slate-400 font-normal">VC</span>
            </p>
          </div>

          <div className="bg-[#0B101C]/80 p-4 rounded-2xl border border-[#1A263D] shadow-inner">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Live Matches</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              {liveMatchesCount} In Progress
            </p>
          </div>

          <div className="bg-[#0B101C]/80 p-4 rounded-2xl border border-[#1A263D] shadow-inner">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Demo Markets</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">
              4 Top Sports
            </p>
          </div>

          <div className="bg-[#0B101C]/80 p-4 rounded-2xl border border-[#1A263D] shadow-inner">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Financial Risk</p>
            <p className="text-xl sm:text-2xl font-black text-[#00E701] mt-1">
              $0.00 (Zero)
            </p>
          </div>
        </div>
      </section>

      {/* Featured Matches Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E701]/15 text-[#00E701] flex items-center justify-center shadow-sm shadow-[#00E701]/20">
              <Flame className="w-5 h-5 fill-[#00E701]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Featured Matches
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#141E30] text-[#00E701] px-2.5 py-0.5 rounded-full border border-[#00E701]/30">
                  Top Fixtures
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any odds button to populate your Bet Slip in real time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selections.length > 0 && (
              <button
                type="button"
                onClick={() => setIsSlipOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00E701] bg-[#00E701]/15 hover:bg-[#00E701]/25 border border-[#00E701]/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm shadow-[#00E701]/15"
              >
                <ReceiptText className="w-4 h-4" />
                <span>Open Bet Slip ({selections.length})</span>
              </button>
            )}

            <Link
              to="/sports"
              className="text-xs sm:text-sm font-bold text-[#00E701] hover:underline flex items-center gap-1 transition-colors"
            >
              <span>Full Sports Lobby</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills on Home */}
        <SportsNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
        />

        {/* Featured Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* How BetZone Works - Educational 3-Step Sportsbook Flow */}
      <section className="bg-[#0C1220] rounded-3xl border border-[#1A263D] p-8 sm:p-12 shadow-xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Interactive Demo Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How The BetZone Platform Works
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Practice modern sports betting odds mechanics with zero real-money risk:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#101728] p-6 rounded-2xl border border-[#1D2A42] hover:border-[#00E701]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E701]/10 text-[#00E701] flex items-center justify-center font-black text-lg shadow-sm">
              1
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Select Matches & Odds</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Click any decimal odds (Home, Draw, Away) on Football, Cricket, Basketball, or Tennis. Combine multiple picks for a parlay accumulator!
            </p>
          </div>

          <div className="bg-[#101728] p-6 rounded-2xl border border-[#1D2A42] hover:border-[#00E701]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E701]/10 text-[#00E701] flex items-center justify-center font-black text-lg shadow-sm">
              2
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Virtual Stake & Payouts</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Enter your demo credit stake or click quick chips (+50, +100, +500). Estimated returns and net profits calculate automatically.
            </p>
          </div>

          <div className="bg-[#101728] p-6 rounded-2xl border border-[#1D2A42] hover:border-[#00E701]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E701]/10 text-[#00E701] flex items-center justify-center font-black text-lg shadow-sm">
              3
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Track & Simulate Results</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Review active slips in "My Bets", check your win rate %, and click "Simulate Result" to test match finishes and receive virtual payouts!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
