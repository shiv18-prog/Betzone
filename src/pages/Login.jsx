import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWallet } from '../context/useWallet';

export default function Login() {
  const { user, loginDemoUser, logoutUser, resetBalance, balance } = useWallet();
  const [usernameInput, setUsernameInput] = useState(user.username || 'DemoPlayer');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginDemoUser(usernameInput);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-[#0E1524] rounded-3xl border border-[#1F2C42] p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E701]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E701] to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,231,1,0.35)]">
            <Zap className="w-6 h-6 text-black stroke-[3]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Demo Account Access
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Instant guest session with 10,000 free virtual credits
          </p>
        </div>

        {/* Success Alert */}
        {submitted && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#00E701]/15 border border-[#00E701]/40 text-[#00E701] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Demo session active! Redirecting to home...</span>
          </div>
        )}

        {/* Demo Notice Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-[#131C2D] border border-[#22314C] text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#00E701]">
            <Sparkles className="w-4 h-4" />
            <span>No Password or Credit Card Needed</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            BetZone is completely free. Simply enter your player nickname to test predictions with 10,000 virtual credits.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Player Nickname
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter player nickname"
                className="w-full bg-[#162032] border border-[#22314C] focus:border-[#00E701] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#00E701] hover:bg-[#00c901] text-black font-black text-sm transition-all shadow-[0_0_20px_rgba(0,231,1,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            Enter BetZone (Free Demo)
          </button>
        </form>

        {/* Existing Session Info */}
        {user.isLoggedIn && (
          <div className="mt-6 pt-6 border-t border-[#1F2C42] text-center space-y-3">
            <div className="text-xs text-slate-400">
              Current Session: <strong className="text-white">{user.username}</strong> ({balance.toLocaleString()} VC)
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetBalance}
                className="text-xs text-[#00E701] font-bold hover:underline cursor-pointer"
              >
                Refill 10k Credits
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={logoutUser}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Clear Session
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00E701]" />
          <span>No personal data or payment details stored</span>
        </div>
      </div>
    </div>
  );
}
