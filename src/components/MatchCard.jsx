import React from 'react';
import { Clock } from 'lucide-react';
import { useBet } from '../context/useBet';
import { formatOdds } from '../utils/formatters';

export default function MatchCard({ match }) {
  const { selectOdd, isOddSelected } = useBet();

  const isHomeSelected = isOddSelected(match.id, match.teamHome);
  const isDrawSelected = isOddSelected(match.id, 'Draw');
  const isAwaySelected = isOddSelected(match.id, match.teamAway);

  return (
    <div className="group relative bg-[#0E1524] hover:bg-[#121B2E] rounded-2xl border border-[#1F2C42] hover:border-emerald-500/50 p-5 transition-all duration-200 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 overflow-hidden">
      {/* Top subtle highlight glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/0 group-hover:via-emerald-400 to-transparent transition-all duration-300" />

      {/* Match Header: League & Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base" title={match.sportName}>
              {match.sportIcon}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider truncate max-w-[170px] sm:max-w-[200px]">
              {match.league}
            </span>
          </div>

          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0 ${
              match.status === 'LIVE'
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/40 shadow-sm shadow-rose-500/20'
                : 'bg-[#162032] text-slate-300 border border-slate-700/80'
            }`}
          >
            {match.status === 'LIVE' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>LIVE • {match.time}</span>
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{match.time}</span>
              </>
            )}
          </span>
        </div>

        {/* Teams and Logos / Badges */}
        <div className="space-y-3.5 mb-6">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Team Emblem Badge */}
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${match.homeColor} flex items-center justify-center text-white text-[11px] font-extrabold shadow-md tracking-wider shrink-0 ring-1 ring-white/10`}
              >
                {match.homeCode}
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors block">
                  {match.teamHome}
                </span>
                {match.homeForm && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {match.homeForm.slice(0, 4).map((res, i) => (
                      <span
                        key={i}
                        className={`w-3.5 h-3.5 rounded text-[9px] font-bold flex items-center justify-center ${
                          res === 'W'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : res === 'D'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {match.status === 'LIVE' && (
              <span className="text-base sm:text-lg font-extrabold text-white bg-[#162032] px-2.5 py-0.5 rounded-lg border border-slate-700">
                {match.scoreHome}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Team Emblem Badge */}
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${match.awayColor} flex items-center justify-center text-white text-[11px] font-extrabold shadow-md tracking-wider shrink-0 ring-1 ring-white/10`}
              >
                {match.awayCode}
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors block">
                  {match.teamAway}
                </span>
                {match.awayForm && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {match.awayForm.slice(0, 4).map((res, i) => (
                      <span
                        key={i}
                        className={`w-3.5 h-3.5 rounded text-[9px] font-bold flex items-center justify-center ${
                          res === 'W'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : res === 'D'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {match.status === 'LIVE' && (
              <span className="text-base sm:text-lg font-extrabold text-white bg-[#162032] px-2.5 py-0.5 rounded-lg border border-slate-700">
                {match.scoreAway}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Odds Selection Buttons Bar */}
      <div>
        <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Match Winner</span>
          </span>
          <span className="text-emerald-400 font-bold">Decimal</span>
        </div>

        <div className={`grid gap-2 ${match.odds.draw ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {/* Home Win Button */}
          <button
            type="button"
            onClick={() => selectOdd(match, match.teamHome, match.odds.home)}
            className={`py-2 px-2 rounded-xl text-center transition-all duration-150 cursor-pointer ${
              isHomeSelected
                ? 'bg-[#00E701] text-black font-extrabold shadow-[0_0_15px_rgba(0,231,1,0.45)] ring-2 ring-[#00E701] scale-[1.02]'
                : 'bg-[#141E30] hover:bg-[#1A2740] text-slate-200 border border-[#23334D] hover:border-emerald-500/50'
            }`}
          >
            <span className={`block text-[10px] uppercase tracking-wider ${isHomeSelected ? 'text-black font-extrabold' : 'text-slate-400 font-medium'}`}>
              1 ({match.homeCode})
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              {formatOdds(match.odds.home)}
            </span>
          </button>

          {/* Draw Button (Football / Ashes) */}
          {match.odds.draw && (
            <button
              type="button"
              onClick={() => selectOdd(match, 'Draw', match.odds.draw)}
              className={`py-2 px-2 rounded-xl text-center transition-all duration-150 cursor-pointer ${
                isDrawSelected
                  ? 'bg-[#00E701] text-black font-extrabold shadow-[0_0_15px_rgba(0,231,1,0.45)] ring-2 ring-[#00E701] scale-[1.02]'
                  : 'bg-[#141E30] hover:bg-[#1A2740] text-slate-200 border border-[#23334D] hover:border-emerald-500/50'
              }`}
            >
              <span className={`block text-[10px] uppercase tracking-wider ${isDrawSelected ? 'text-black font-extrabold' : 'text-slate-400 font-medium'}`}>
                X (Draw)
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                {formatOdds(match.odds.draw)}
              </span>
            </button>
          )}

          {/* Away Win Button */}
          <button
            type="button"
            onClick={() => selectOdd(match, match.teamAway, match.odds.away)}
            className={`py-2 px-2 rounded-xl text-center transition-all duration-150 cursor-pointer ${
              isAwaySelected
                ? 'bg-[#00E701] text-black font-extrabold shadow-[0_0_15px_rgba(0,231,1,0.45)] ring-2 ring-[#00E701] scale-[1.02]'
                : 'bg-[#141E30] hover:bg-[#1A2740] text-slate-200 border border-[#23334D] hover:border-emerald-500/50'
            }`}
          >
            <span className={`block text-[10px] uppercase tracking-wider ${isAwaySelected ? 'text-black font-extrabold' : 'text-slate-400 font-medium'}`}>
              2 ({match.awayCode})
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              {formatOdds(match.odds.away)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
