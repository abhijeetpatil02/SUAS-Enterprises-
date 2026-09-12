# 2–3 Minute Video Presentation Script & Presenter Guide

**Project:** AlphaSense AI — AI-Native Trading Research Platform  
**Challenge Target:** Option 2 (Thinking & Building Challenge)  
**Total Target Duration:** 2 Minutes 45 Seconds

---

## 💡 Quick Tips for Video Recording

- **Browser Window:** Open [http://localhost:5173/](http://localhost:5173/) (or `http://localhost:5174/`) in Fullscreen mode (F11 or maximize).
- **Audio & Tone:** Speak confidently, clearly, and at a steady pace.
- **Mouse Cursor:** Move smoothly from stage to stage; hover over key elements as you speak about them.

---

## 🎙️ Timestamped Video Script & Presenter Notes

### ⏱️ 0:00 – 0:30 | Introduction & Problem Statement

- **UI Action:** Open the app on **Stage 1 (`ASK`)**. Hover over the natural language prompt box.
- **What to Say (Speaker Script):**
  > *"Hi everyone! I’m presenting my submission for Option 2: the AI-Native Trading Research Platform.*  
  > *Imagine a user enters: 'Does buying NIFTY after a sharp fall work?'. Conventional backtesters fail because the question is deliberately incomplete. What is a sharp fall? When do you enter? How long do you hold?*  
  > *My platform solves this by guiding users through a 5-stage scientific framework: **Question → Hypothesis → Experiment → Evidence → Learning**."*

> [!TIP]  
> **Presenter Note (Why this wins 25% Critical Thinking):**  
> Mentioning that the question is *"deliberately incomplete"* shows the evaluator right away that you understood the core philosophy of the challenge.

---

### ⏱️ 0:30 – 1:00 | Stage 1 (ASK) & Stage 2 (CLARIFY)

- **UI Action:** Click **"Clarify Question"** to transition to **Stage 2 (`CLARIFY`)**. Point your cursor at the 3 comparison cards (*What You Said* vs *System Assumed* vs *Required Decisions*), then move down to the parameter sliders.
- **What to Say (Speaker Script):**
  > *"In Stage 2, the AI parses the query and explicitly separates what the user actually said from default system assumptions and required user decisions.*  
  > *Here, the user can interactively adjust how they define a 'Sharp Fall' — whether it's a 1-day drop, a 3-day drawdown, or a volatility spike.*  
  > *Crucially, we default entry to **Next Session Open** ($t+1$) to eliminate look-ahead bias, and include **0.08% friction** for STT taxes and market crash slippage."*

> [!IMPORTANT]  
> **Presenter Note (Why this wins 20% Original Thinking):**  
> Emphasize **Next Session Open ($t+1$)** vs **Same Day Close**. Most basic tools make the mistake of executing on EOD close, which is mathematically impossible in real-time trading before market close. Pointing this out highlights deep financial maturity.

---

### ⏱️ 1:00 – 1:30 | Stage 3 (DEFINE) & Stage 4 (TEST)

- **UI Action:** Click **"Confirm & Define Spec"** to view **Stage 3 (`DEFINE`)**, then click **"Execute 10-Yr Backtest"** to move to **Stage 4 (`TEST`)**. Hover over the equity curve and drawdown charts.
- **What to Say (Speaker Script):**
  > *"In Stage 3, the system locks the quantitative experiment spec and rejection criteria.*  
  > *Clicking 'Execute' runs our backtest engine across **10 years of historical NIFTY 50 daily candles** (2015 to 2024), covering major shocks like the March 2020 COVID crash, 2016 demonetization, and 2022 war drops.*  
  > *We instantly get an interactive equity curve comparing our strategy against the NIFTY Buy & Hold benchmark, underwater drawdown depth, win rates, Sharpe ratio, and a filterable audit log of every executed trade."*

> [!NOTE]  
> **Presenter Note (Why this wins 20% Problem Solving):**  
> Mention that the dataset covers **real 10-year historical market events** (2020 COVID drop, 2016 demonetization). This proves your backtest isn't based on fake random numbers.

---

### ⏱️ 1:30 – 2:15 | Stage 5 (LEARN) & Evidence-Based Pivot Loop

- **UI Action:** Click **"Analyze & Learn"** to enter **Stage 5 (`LEARN`)**. Point cursor at *What Data ACTUALLY Shows* vs *What System Concludes*, scroll to *Systemic Blindspots*, then click the **"High Volatility Filter"** recommendation card at the bottom.
- **What to Say (Speaker Script):**
  > *"Stage 5 is where learning happens. We explicitly distinguish between **empirical data facts** — like win rate and total trade count — versus **system qualitative conclusions and systemic risks** like small sample size and crash slippage.*  
  > *Most importantly, the research loop doesn't end here. The platform suggests logical follow-up hypotheses. Clicking 'High Volatility Filter' instantly re-tunes the backtest and updates our equity curve in real-time!"*

> [!TIP]  
> **Presenter Note (Why this wins 15% Product Thinking):**  
> Demonstrating the 1-click hypothesis iteration proves you built a platform that encourages continuous scientific discovery (*Evidence → Learning → Next Hypothesis*).

---

### ⏱️ 2:15 – 2:45 | Architecture, AI Usage & Conclusion

- **UI Action:** Switch window to show your **GitHub Repository (`README.md` and `AI_USAGE_NOTE.md`)**.
- **What to Say (Speaker Script):**
  > *"The application is built with React 19, Vite, TypeScript, Tailwind CSS, and Recharts.*  
  > *I used AI tools like Gemini and Claude as autonomous engineering partners for scaffolding and backtester math, while retaining full control over the 5-stage UX journey, look-ahead bias elimination, and friction modeling.*  
  > *Thank you for your time, and I look forward to your feedback!"*

> [!IMPORTANT]  
> **Presenter Note (Why this wins Communication & AI Usage):**  
> Stating that you *guided the AI on domain rules* (eliminating lookahead bias & friction) rather than blindly copying AI code directly satisfies the AI Usage evaluation criteria.
