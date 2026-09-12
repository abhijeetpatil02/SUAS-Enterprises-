# 2–3 Minute Video Presentation Script & Walkthrough

**Project:** AlphaSense AI — AI-Native Trading Research Platform  
**Challenge:** Option 2 (Thinking & Building Challenge)

---

## 🎙️ Video Script Outline (Total Duration: 2 mins 45 secs)

### 0:00 – 0:30 | Introduction & Problem Statement
- **Screen:** Show Stage 1 (`ASK`).
- **Speaker:** 
  > *"Hi team! I'm presenting my submission for Option 2: the AI-Native Trading Research Platform.*
  > *When a user asks 'Does buying NIFTY after a sharp fall work?', existing tools fail because the question is incomplete. What is a sharp fall? When do you enter? How long do you hold?*
  > *My platform guides users through a 5-stage scientific framework: Question → Hypothesis → Experiment → Evidence → Learning."*

---

### 0:30 – 1:00 | Stage 1 (ASK) & Stage 2 (CLARIFY)
- **Screen:** Click "Clarify Question" to move to Stage 2 (`CLARIFY`). Highlight the 3 comparison cards and interactive sliders.
- **Speaker:**
  > *"In Stage 2, the AI parses the query and explicitly separates what the user actually said from default system assumptions and required user decisions.*
  > *Here, the user can interactively adjust the 'Sharp Fall' definition — whether it's a 1-day absolute drop, 3-day drawdown, or volatility drop. Notice we default entry to Next Day Open to eliminate look-ahead bias, and include 0.08% friction for taxes and crash slippage."*

---

### 1:00 – 1:30 | Stage 3 (DEFINE) & Stage 4 (TEST)
- **Screen:** Click "Confirm & Define Spec" to view Stage 3 (`DEFINE`), then click "Execute 10-Yr Backtest" to enter Stage 4 (`TEST`).
- **Speaker:**
  > *"In Stage 3, the platform locks the mathematical specification and falsification criteria.*
  > *When we hit 'Execute', our backtest engine runs across 10 years of NIFTY 50 daily historical data (2015 to 2024, covering the 2020 COVID crash, 2016 demonetization, and 2022 war drops).*
  > *We immediately see the Strategy Return vs NIFTY Buy & Hold, Win Rate, Sharpe Ratio, Underwater Drawdown profile, and a filterable audit log of every trade."*

---

### 1:30 – 2:15 | Stage 5 (LEARN) & Next Hypothesis Pivot
- **Screen:** Click "Analyze & Learn" to move to Stage 5 (`LEARN`). Scroll through Data Facts vs System Inferences, then click the "High Volatility Filter" recommendation card.
- **Speaker:**
  > *"Stage 5 is where true learning happens. We explicitly distinguish between raw empirical data facts (like 22 total events and win rate) versus system qualitative conclusions and systemic risks like small sample size.*
  > *Most importantly, the research loop doesn't stop here. The system recommends logical follow-up hypotheses. Clicking 'High Volatility Filter' instantly re-tunes the backtest and updates our equity curve in real-time."*

---

### 2:15 – 2:45 | Architecture, AI Usage & Conclusion
- **Screen:** Show GitHub repository code structure and README.
- **Speaker:**
  > *"The app is built with React 19, Vite, TypeScript, Tailwind CSS, and Recharts.*
  > *AI was used as an autonomous engineering partner for boilerplate and backtester math, while I retained control over the 5-stage UX journey, look-ahead bias elimination, and friction modeling.*
  > *Thank you for your time, and I look forward to your feedback!"*
