import React, { useState } from 'react';
import { Search, Filter, ReceiptText, Sparkles } from 'lucide-react';
import { MOCK_MATCHES } from '../data/mockData';
import { useBet } from '../context/useBet';
import MatchCard from '../components/MatchCard';
import SportsNav from '../components/SportsNav';

export default function Sports() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { selections, setIsSlipOpen } = useBet();

  // Filter matches based on category and search query
  const filteredMatches = MOCK_MATCHES.filter((match) => {
    const matchesCategory =
      activeCategory === 'all' || match.sport === activeCategory;
    const matchesSearch =
      match.teamHome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teamAway.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.sportName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Lobby Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E701]/10 text-[#00E701] text-xs font-extrabold uppercase tracking-widest mb-2 border border-[#00E701]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sportsbook Lobby</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Sports Matches & Odds
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse demo decimal odds across Football, Cricket, Basketball, and Tennis
          </p>
        </div>

        {/* Search Input & Bet Slip Shortcut */}
        <div className="flex items-center gap-3">
          {selections.length > 0 && (
            <button
              type="button"
              onClick={() => setIsSlipOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00E701] bg-[#00E701]/15 hover:bg-[#00E701]/25 border border-[#00E701]/40 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm shadow-[#00E701]/15"
            >
              <ReceiptText className="w-4 h-4" />
              <span>Slip ({selections.length})</span>
            </button>
          )}

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teams, leagues, sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0E1524] border border-[#22314C] focus:border-[#00E701] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Attractive Category Navigation for Football, Cricket, Basketball, Tennis */}
      <SportsNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => setActiveCategory(catId)}
      />

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-20 bg-[#0C1220] rounded-3xl border border-[#1A263D] space-y-3">
          <Filter className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No matches found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            No fixtures match "{searchQuery}" under this category. Try selecting another sport or clearing your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 mt-2 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
