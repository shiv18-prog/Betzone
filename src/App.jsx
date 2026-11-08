import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WalletProvider from './context/WalletProvider';
import BetProvider from './context/BetProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BetSlip from './components/BetSlip';
import NotificationToast from './components/NotificationToast';

// Application Pages
import Home from './pages/Home';
import Sports from './pages/Sports';
import MyBets from './pages/MyBets';
import Login from './pages/Login';

export default function App() {
  return (
    <WalletProvider>
      <BetProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-[#0B0E14] text-slate-100 selection:bg-emerald-500 selection:text-black relative">
            {/* Real-time Toast Notifications */}
            <NotificationToast />

            {/* Reusable Header Navbar */}
            <Navbar />

            {/* Main Application Content Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/my-bets" element={<MyBets />} />
                <Route path="/login" element={<Login />} />
                {/* Fallback to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Floating Interactive Bet Slip */}
            <BetSlip />

            {/* Reusable Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </BetProvider>
    </WalletProvider>
  );
}
