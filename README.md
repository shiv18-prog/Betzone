# BetZone 🎯⚡
A modern, beginner-friendly virtual sports prediction demo website.

> ⚠️ **IMPORTANT DISCLAIMER:**
> BetZone is strictly an educational and entertainment platform using **100% free virtual credits**.
> There are **no real-money deposits, withdrawals, payment gateways, or cash payouts**.

---

## 🛠️ Tech Stack
- **Framework:** React 19 (via [Vite](https://vite.dev))
- **Language:** JavaScript
- **Styling:** Tailwind CSS (Dark theme with Emerald green accents)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Persistence:** Browser `localStorage` (wallet balance & betting history)

---

## 🚀 How to Run the Project

### 1. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

### 2. Verify Code Quality & Production Build
```bash
# Run oxlint (0 warnings, 0 errors)
npm run lint

# Production build verification
npm run build
```

---

## ✨ Implemented Features

### 1. Multi-Sport Match Simulation
- **Football:** Premier League, La Liga, UEFA Champions League.
- **Cricket:** T20 World Cup, Indian Premier League (IPL), The Ashes Test Series.
- **Basketball:** NBA Championship and Eastern Conference.
- **Tennis:** Wimbledon Men's Singles, US Open.
- Match cards display teams, league tags, live/upcoming match timing, and real-time scores.

### 2. Clickable Demo Odds
- 1X2 decimal odds buttons for football and test cricket (Home, Draw, Away).
- 2-way moneyline odds for basketball, limited-overs cricket, and tennis.
- Dynamic selection highlight with emerald glow and ring states.

### 3. Interactive Betting Slip (`src/components/BetSlip.jsx`)
- Floating / docked betting slip in the bottom-right corner.
- Minimized pill badge (`Slip (1)`) with quick-expand toggle.
- Shows selected match, league, pick, and decimal odds.
- Quick stake buttons: `+50`, `+100`, `+250`, `+500`, `+1,000`, `MAX`.
- Real-time automated calculation of **Estimated Return** (`stake * odds`) and **Net Profit** (`return - stake`).
- Insufficient credits warning when stake exceeds available balance.

### 4. Virtual Bankroll (10,000 Demo Credits)
- Every user starts with **10,000 Virtual Credits (VC)**.
- Quick "Refill 10k" button available in the top navigation bar and bet slip.
- Automatically deducts credits upon placing a bet.

### 5. Persistent History (`localStorage`)
- **Wallet balance** saved under `'betzone_wallet_balance'`.
- **Placed bets** saved under `'betzone_user_bets'`.
- Data persists across browser refreshes and page reloads.

### 6. My Bets Performance Tracker (`src/pages/MyBets.jsx`)
- Displays all previous bets with status tags (`Active`, `Won`, `Lost`).
- Live statistics cards: Total Predictions, Active Slips, Virtual Net Profit, and Win Rate %.
- **Simulate Match Result button:** Click on active bets to simulate the match finish in real time. Winning bets automatically credit virtual payouts back to your wallet balance!

### 7. Real-Time Notification System (`src/components/NotificationToast.jsx`)
- Success toasts when bets are placed or simulated winnings are credited.
- Error alerts when stake exceeds balance or is invalid.
- Info toasts when selections are added or removed.

---

## 📁 Project Architecture
```text
inbet/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Top navbar with live credit counter & refill
│   │   ├── Footer.jsx            # Disclaimer footer
│   │   ├── BetSlip.jsx           # Floating bet slip with auto winnings calculation
│   │   └── NotificationToast.jsx # Real-time success & error toast notifications
│   ├── context/
│   │   ├── WalletContext.js      # Wallet context instance
│   │   ├── WalletProvider.jsx    # 10,000 VC initial balance & refill logic
│   │   ├── useWallet.js          # Custom hook for wallet access
│   │   ├── BetContext.js         # Bet context instance
│   │   ├── BetProvider.jsx       # Odds selection, bet placement & match simulation
│   │   └── useBet.js             # Custom hook for betting slip state
│   ├── data/
│   │   └── mockData.js           # Sample matches across 4 sports & initial bets
│   ├── pages/
│   │   ├── Home.jsx              # Hero, featured matches, and educational guide
│   │   ├── Sports.jsx            # Match lobby with sport category tabs & search
│   │   ├── MyBets.jsx            # Placed bets tracker with outcome simulator
│   │   └── Login.jsx             # Guest demo account access
│   ├── utils/
│   │   └── formatters.js         # Decimal odds & credit formatting utilities
│   ├── App.jsx                   # React Router layout shell
│   ├── index.css                 # Tailwind CSS v4 styling
│   └── main.jsx                  # React DOM root
├── index.html
├── package.json
└── vite.config.js
```
