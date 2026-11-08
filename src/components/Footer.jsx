import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, AlertCircle } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#06090F] border-t border-[#162032] text-slate-400 mt-auto">
      {/* Platform Disclaimer Banner */}
      <div className="bg-[#0C121E] border-b border-[#162032] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm text-slate-300">
          <AlertCircle className="w-4 h-4 text-[#00E701] shrink-0" />
          <span>
            <strong className="text-[#00E701]">Virtual Simulation Only:</strong> BetZone uses
            exclusively free virtual credits. No real money deposits, withdrawals, or cashouts
            are supported.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E701] to-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,231,1,0.3)]">
                <Zap className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                BET<span className="text-[#00E701]">ZONE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A premium, beginner-friendly sports prediction demo platform. Test your sports knowledge,
              analyze match odds, and track prediction accuracy in a 100% risk-free sandbox environment.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#00E701]" />
              <span>Free-to-play educational simulation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#00E701] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/sports" className="hover:text-[#00E701] transition-colors">
                  Sports Lobby
                </Link>
              </li>
              <li>
                <Link to="/my-bets" className="hover:text-[#00E701] transition-colors">
                  My Bets Tracker
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#00E701] transition-colors">
                  Demo Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Sports Available
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E701]"></span>
                <span>⚽ Football (Premier League, La Liga, UCL)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E701]"></span>
                <span>🏏 Cricket (T20 World Cup, IPL, The Ashes)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E701]"></span>
                <span>🏀 Basketball (NBA Championship)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E701]"></span>
                <span>🎾 Tennis (Wimbledon, US Open)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#162032] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {CURRENT_YEAR} BetZone Demo Platform. Pure Virtual Credits • Zero Real Money Risk.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
