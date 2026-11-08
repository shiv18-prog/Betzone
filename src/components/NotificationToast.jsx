import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useBet } from '../context/useBet';

export default function NotificationToast() {
  const { notification, closeNotification } = useBet();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-3 duration-200">
      <div
        className={`p-4 rounded-2xl border shadow-2xl flex items-start justify-between gap-3.5 backdrop-blur-xl ${
          isSuccess
            ? 'bg-[#0A1713]/95 border-[#00E701]/60 text-white shadow-[0_0_25px_rgba(0,231,1,0.25)]'
            : isError
            ? 'bg-[#210D12]/95 border-rose-500/60 text-white shadow-[0_0_25px_rgba(244,63,94,0.2)]'
            : 'bg-[#0E1524]/95 border-[#22314C] text-white shadow-xl'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isSuccess
                ? 'bg-[#00E701]/20 text-[#00E701]'
                : isError
                ? 'bg-rose-500/20 text-rose-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
            {isError && <AlertTriangle className="w-4 h-4 stroke-[2.5]" />}
            {!isSuccess && !isError && <Info className="w-4 h-4 stroke-[2.5]" />}
          </div>

          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
              {isSuccess ? 'BETZONE ACTION' : isError ? 'ACTION RESTRICTED' : 'NOTIFICATION'}
            </span>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-100">
              {notification.message}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={closeNotification}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
