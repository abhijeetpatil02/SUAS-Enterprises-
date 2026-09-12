# AlphaSense AI — Trading Research Platform

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **AI Full-Stack Developer Intern Challenge — Option 2 Submission**  
> An AI-native quantitative trading research platform guiding users from **Question → Hypothesis → Experiment → Evidence → Learning** using historical NIFTY 50 market data.

---

## 🌟 Executive Overview

When a user enters an ambiguous query like **“Does buying NIFTY after a sharp fall work?”**, conventional tools either fail or produce misleading backtests based on hidden assumptions.

**AlphaSense AI** bridges this gap by enforcing a systematic 5-stage research workflow:
1. **ASK:** Intent capture & entity extraction from natural language.
2. **CLARIFY:** Disambiguation studio separating *User Said* vs. *System Assumed* vs. *Required User Decisions*.
3. **DEFINE:** Formulates formal quantitative hypothesis, locked execution rules, friction costs, and falsification criteria.
4. **TEST:** Executes client-side quantitative backtest engine over **10 Years of NIFTY 50 Daily EOD Data (2015–2024)**, rendering interactive equity growth curves, drawdown profiles, win rates, Sharpe ratios, and trade audit logs.
5. **LEARN:** Differentiates raw dataset facts from qualitative system inferences & blindspots, offering 1-click pivot recommendations to next hypotheses.

---

## 📁 Repository Structure

```
SUAS-Enterprises-/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # 5-Stage stepper navigation & header
│   │   ├── StageAsk.tsx        # Stage 1: Question entry & entity extraction
│   │   ├── StageClarify.tsx    # Stage 2: Disambiguation & parameter alignment
│   │   ├── StageDefine.tsx     # Stage 3: Formal experiment specification
│   │   ├── StageTest.tsx       # Stage 4: Quantitative backtest dashboard
│   │   ├── StageLearn.tsx      # Stage 5: Learning synthesis & next hypothesis pivot
│   │   ├── EquityChart.tsx     # Recharts equity curve & drawdown visualizer
│   │   └── TradeListTable.tsx  # Filterable trade audit log table
│   ├── data/
│   │   └── nifty50_data.ts     # 10-Year historical NIFTY 50 daily candle dataset
│   ├── engine/
│   │   └── backtester.ts       # Quantitative backtest engine (Slippage, CAGR, Sharpe)
│   ├── types/
│   │   └── research.ts         # TypeScript interfaces & state definitions
│   ├── App.tsx                 # Main application state container
│   ├── index.css               # Glassmorphism design tokens & dark theme
│   └── main.tsx                # Entry point
├── THINKING_NOTE.md            # Part 1: Strategic Thinking Note (Max 2 pages)
├── AI_USAGE_NOTE.md            # Part 3: AI Collaboration & Decision Audit
├── DEMO_SCRIPT.md              # Part 4: 2–3 Minute Video Presentation Script
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Technology Stack & Rationale

- **Framework:** React 18 / 19 + Vite (Fast HMR, zero runtime overhead).
- **Language:** TypeScript 5.7 (Strict type safety across research parameters and backtest metrics).
- **Styling:** Tailwind CSS v4 + Vanilla CSS Custom Properties (Dark glassmorphic aesthetic).
- **Visualization:** Recharts (High-performance SVG charts for Equity Curve & Underwater Drawdowns).
- **Icons:** Lucide React (Clean modern UI icons).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhijeetpatil02/SUAS-Enterprises-.git
   cd SUAS-Enterprises-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to explore the interactive research platform.

---

## 💡 Key Financial & System Assumptions

1. **Next Day Open Entry ($t+1$):** Avoids look-ahead bias by entering at Open price following crash day Close.
2. **Transaction Friction:** Applies 0.08% per trade (STT + exchange charges + panic market slippage).
3. **Risk-Free Rate:** 6.0% p.a. (RBI Repo benchmark rate for Indian Sharpe ratio calculation).
4. **Historical Dataset:** 2,480 daily candles (Jan 2015 – Dec 2024) including major historic shocks (COVID 2020, Demonetization 2016, IL&FS 2018, Russia-Ukraine 2022).

---

## 🤖 AI Tools Used

- **Google Gemini 3.6 Flash (Antigravity IDE):** Autonomous code generation, state management architecture, and backtester math implementation.
- **Claude 3.5 Sonnet / ChatGPT:** Domain sanity checks on quantitative metrics and risk audit formulation.

---

## 🔮 Roadmap & Future Improvements

1. **Live Broker API Integration:** Connect to Zerodha Kite or Dhan APIs for automated execution of validated hypotheses.
2. **Multi-Asset Comparison:** Expand dataset to BankNIFTY, NIFTY IT, and Midcap 100 indices.
3. **Monte Carlo Simulations:** Run 1,000 randomized resamplings to measure strategy fragility against extreme black-swan events.
