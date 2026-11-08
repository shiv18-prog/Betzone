import React from 'react';
import { Trophy, Target, CircleDot, Activity, Flame } from 'lucide-react';
import { SPORTS_CATEGORIES } from '../data/mockData';

export default function SportsNav({ activeCategory, onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-4 h-4" />;
      case 'Target':
        return <Target className="w-4 h-4" />;
      case 'CircleDot':
        return <CircleDot className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      {SPORTS_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#00E701] text-black shadow-[0_0_20px_rgba(0,231,1,0.35)] ring-2 ring-[#00E701]'
                : 'bg-[#0E1524] hover:bg-[#151F33] text-slate-300 border border-[#1F2C42] hover:border-emerald-500/40 hover:text-white'
            }`}
          >
            <span
              className={`p-1 rounded-lg ${
                isActive ? 'bg-black/15 text-black' : 'bg-slate-800 text-emerald-400 group-hover:scale-110 transition-transform'
              }`}
            >
              {getIcon(cat.icon)}
            </span>

            <span>{cat.name}</span>

            {cat.symbol && (
              <span className="text-xs" aria-hidden="true">
                {cat.symbol}
              </span>
            )}

            <span
              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                isActive ? 'bg-black text-[#00E701]' : 'bg-[#182338] text-slate-400'
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
