import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Zap, Wallet, RotateCcw, Menu, X, User, ReceiptText, ShieldCheck } from 'lucide-react';
import { useWallet } from '../context/useWallet';
import { useBet } from '../context/useBet';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { balance, resetBalance, user } = useWallet();
  const { selections, setIsSlipOpen } = useBet();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sports Lobby', path: '/sports' },
    { name: 'My Bets', path: '/my-bets' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#080B11]/95 backdrop-blur-xl border-b border-[#1A2438] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with Neon Glow */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E701] to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,231,1,0.4)] group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#00E701] border-2 border-[#080B11] animate-ping" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                BET<span className="text-[#00E701] neon-text-glow">ZONE</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#00E701] font-bold -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E701]" />
                Demo Sportsbook
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00E701]/10 text-[#00E701] border border-[#00E701]/40 shadow-sm shadow-[#00E701]/10'
                      : 'text-slate-300 hover:text-white hover:bg-[#121A2B]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Action Area: Virtual Wallet & Login */}
          <div className="hidden md:flex items-center gap-3">
            {/* Bet Slip Trigger (Visible whenever selections exist) */}
            {selections.length > 0 && (
              <button
                type="button"
                onClick={() => setIsSlipOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00E701]/15 hover:bg-[#00E701]/25 border border-[#00E701]/50 text-[#00E701] text-xs font-extrabold transition-all duration-150 cursor-pointer shadow-[0_0_15px_rgba(0,231,1,0.2)] hover:scale-105"
                title="Open active bet slip"
              >
                <ReceiptText className="w-4 h-4" />
                <span>Slip ({selections.length})</span>
              </button>
            )}

            {/* Virtual Wallet Balance Pill */}
            <div className="flex items-center gap-2.5 bg-[#0E1524] border border-[#22314C] hover:border-[#00E701]/40 rounded-2xl px-4 py-2 shadow-inner transition-colors">
              <div className="w-7 h-7 rounded-lg bg-[#00E701]/20 flex items-center justify-center text-[#00E701]">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none">
                  Virtual Balance
                </span>
                <span className="text-sm font-extrabold text-white tracking-wide flex items-center gap-1">
                  {balance.toLocaleString()}
                  <span className="text-[#00E701] text-xs font-black">VC</span>
                </span>
              </div>
              <button
                type="button"
                onClick={resetBalance}
                title="Refill 10,000 Virtual Credits"
                className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-[#00E701] hover:bg-[#162032] transition-colors cursor-pointer group"
              >
                <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>

            {/* User Profile Pill */}
            {user?.isLoggedIn ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#121A2B] hover:bg-[#182338] border border-[#22314C] text-slate-200 text-sm font-semibold transition-all hover:border-slate-600"
              >
                <div className="w-6 h-6 rounded-full bg-[#00E701]/20 flex items-center justify-center text-[#00E701]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{user.username}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-[#00E701] hover:bg-[#00c901] text-black font-extrabold text-sm transition-all shadow-[0_0_15px_rgba(0,231,1,0.25)] hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Bet Slip Pill for Mobile */}
            {selections.length > 0 && (
              <button
                type="button"
                onClick={() => setIsSlipOpen(true)}
                className="flex items-center gap-1 bg-[#00E701]/15 text-[#00E701] border border-[#00E701]/40 px-2.5 py-1.5 rounded-xl text-xs font-bold"
              >
                <ReceiptText className="w-3.5 h-3.5" />
                <span>{selections.length}</span>
              </button>
            )}

            {/* Balance Badge for Mobile */}
            <div className="flex items-center gap-1.5 bg-[#0E1524] border border-[#22314C] rounded-xl px-2.5 py-1.5 text-xs font-bold text-white">
              <span className="text-[#00E701]">{balance.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400">VC</span>
              <button
                type="button"
                onClick={resetBalance}
                title="Refill 10k"
                className="ml-1 text-slate-400 hover:text-[#00E701]"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121A2B] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0E17] border-b border-[#1A2438] px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#00E701]/15 text-[#00E701] border border-[#00E701]/40'
                      : 'text-slate-300 hover:text-white hover:bg-[#121A2B]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1A2438] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00E701]" />
              <span className="text-xs text-slate-300">100% Virtual Practice</span>
            </div>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs bg-[#121A2B] hover:bg-[#182338] text-slate-200 px-3.5 py-1.5 rounded-xl border border-[#22314C] font-semibold"
            >
              {user?.isLoggedIn ? user.username : 'Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
