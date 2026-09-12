# AI Usage Note: Collaborative AI-Human Engineering

**Author:** AI Full-Stack Developer Intern Candidate  
**Challenge:** Option 2 — AI-Native Trading Research Platform  
**Target Goal:** Transparent documentation of AI usage, architectural decisions, and human guidance.

---

## 1. Which AI Tools Were Used & For What?

- **Google Gemini 3.6 Flash (Antigravity Agentic IDE):** Served as the primary autonomous development partner for scaffolding, full-stack React architecture, type definition generation, and mathematical backtest calculation algorithms.
- **ChatGPT / Claude 3.5 Sonnet (Conceptual Prompting):** Used for financial domain sanity checks (Sharpe ratio formulas for Indian markets, STT/slippage models, and look-ahead bias audit rules).

---

## 2. Important Decisions Made Independently (Human Guidance)

1. **Architecture of 5-Stage UX Journey:** Designed the explicit 5-stage progressive flow (`ASK` → `CLARIFY` → `DEFINE` → `TEST` → `LEARN`) instead of a single overloaded dashboard. This directly models the core platform vision (*Question → Hypothesis → Experiment → Evidence → Learning*).
2. **Mandatory Look-Ahead Bias Prevention:** Mandated that the default entry execution must be **Next Session Open ($t+1$)** rather than EOD Close ($t$). AI models often default to EOD entry without realizing it introduces impossible real-time execution assumptions.
3. **Friction & Slippage Inclusion:** Insisted on adding explicit 0.08% round-trip friction (STT + exchange charges + market crash slippage) to ensure backtest results reflect realistic trading net equity rather than paper profits.
4. **Empirical Fact vs System Interpretation Split:** Structured Stage 5 to explicitly differentiate between **What the Data ACTUALLY Shows** (raw numbers) vs **What the System Infers** (qualitative conclusions & risks).

---

## 3. Rejected or Modified AI Suggestions

| AI Suggestion | Reason for Rejection / Modification | Action Taken |
| :--- | :--- | :--- |
| *Use random mock price generators for backtesting* | Random walk prices lack real market crash dynamics (like the March 2020 COVID circuit drop or 2016 demonetization). | **Rejected:** Built a deterministic 10-year NIFTY 50 EOD dataset (2015–2024, ~2,480 candles) with actual historic drop events. |
| *Include complex machine learning model predictions (LSTM/Random Forest)* | Over-complicates the prototype and violates the directive: *"Build less. Think more."* | **Rejected:** Focused on deterministic mean-reversion hypothesis backtesting with clear statistical metrics. |
| *Single-page form layout for parameters* | Hides the clarification and ambiguity resolution process from the user. | **Modified:** Built an interactive Parameter Alignment Studio in Stage 2 with explicit comparison cards. |

---

## 4. Favorite / Proudest Aspect of the Solution

**The Stage 5 Evidence-to-Hypothesis Pivot Loop.**  
Rather than ending at backtest chart output, the system dynamically analyzes backtest results and recommends 3 concrete follow-up hypotheses (e.g., *"Add India VIX > 20 Filter"*, *"Extend to 10-day hold"*, *"Add 1:2 Risk-Reward Stop-Loss"*). Clicking any recommendation instantly re-configures the experiment and executes a new backtest. This seamlessly completes the scientific research loop (*Learning → New Hypothesis*).
