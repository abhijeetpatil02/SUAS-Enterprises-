# Thinking Note: Deconstructing "Does Buying NIFTY After a Sharp Fall Work?"

**Author:** AI Full-Stack Developer Intern Candidate  
**Target Platform:** AI-Native Quantitative Trading Research Engine  
**Core Question:** *"Does buying NIFTY after a sharp fall work?"*

---

## 1. Interpretation & Ambiguity Identification

The user query *"Does buying NIFTY after a sharp fall work?"* is deliberately open-ended and incomplete. Before any backtest or financial claim can be made, the system must deconstruct every ambiguous term:

### What does "Sharp Fall" mean?
1. **Absolute Single-Day Drop:** A daily close-to-close return $\le -1.5\%$, $-2.0\%$, or $-3.0\%$.
2. **Multi-Day Cumulative Drawdown:** A 3-session cumulative fall of $\ge -4.0\%$ or $-5.0\%$.
3. **Volatility-Adjusted Drop (Statistical Shock):** Price dropping $\ge 2 \times \text{ATR}(14)$ or RSI(14) plunging below 25.
4. **Market Regime Context:** A sharp fall during a secular bull trend (a buy-the-dip opportunity) vs. a sharp fall at the start of a structural bear crash (catching a falling knife, e.g., March 2020 COVID crash).

### What information is missing before testing?
- **Exact Instrument:** Are we trading NIFTY 50 Spot Index (un-tradeable directly), NIFTY Futures, NIFTY Index ETFs (e.g., NIFBEES), or Options?
- **Entry Execution Timing:** Buying on EOD Close of the crash session (suffers from look-ahead bias if using the EOD price before market close) vs. Next Session Open ($t+1$, realistic execution).
- **Exit Condition & Holding Window:** Fixed holding period ($N$ trading days) vs. Dynamic Profit Target / Stop-Loss (e.g., $+5\%$ target / $-2.5\%$ stop) vs. Retouch of 20-day SMA.
- **Friction & Costs:** Exchange fees, brokerage, STT (Securities Transaction Tax in India), and **slippage** (which spikes significantly during market crash sessions due to order book illiquidity).

---

## 2. Assumptions & User Clarification Matrix

To bridge the gap between human intuition and quantitative execution, our system explicitly categorizes information into three buckets:

| What the User Actually Said | What the System Assumes (Defaults) | What the System Asks the User to Confirm |
| :--- | :--- | :--- |
| *"Buying NIFTY"* | Trade NIFTY 50 Index benchmark ($t+1$ Open) | *"Do you plan to trade NIFTY ETFs, Futures, or Spot Index?"* |
| *"After a sharp fall"* | 1-Day Close drop $\le -2.0\%$ | *"How do you define a sharp fall? (1-Day drop, 3-Day drawdown, or Volatility ATR drop?)"* |
| *"Does it work?"* | Outcome = Positive CAGR & Sharpe Ratio $> 0.5$ | *"What is your holding window and profit/risk target?"* |
| *(Unstated)* | Friction = 0.08% round-trip costs | *"Would you like to include transaction costs and slippage?"* |

---

## 3. Minimum Required Questions Before Testing

Before running a backtest, the platform presents **4 non-negotiable questions**:
1. **Drop Sensitivity:** *What exact drop threshold triggers a buy signal? (Default: -2.0% single day)*
2. **Execution Timing:** *Do you enter at Next Session Open ($t+1$) or EOD Close ($t$)? (Default: Next Open to prevent look-ahead bias)*
3. **Holding Window:** *How many trading sessions do you hold before exiting? (Options: 3, 5, 10, or 20 days)*
4. **Transaction Cost & Friction:** *What slippage and STT allowance should be deducted? (Default: 0.08% per trade)*

---

## 4. Formal Experiment Specification

```
MARKET           : NIFTY 50 Index (Daily EOD Candles)
TRIGGER CONDITION: 1-Day Return <= -2.0% (Close_t vs Close_t-1)
ENTRY RULE       : Buy Next Day Open (Open_t+1) with 0.08% round-trip friction
EXIT RULE        : Market exit after 5 trading sessions at Close_t+5
HOLDING PERIOD   : 5 Trading Days
TEST PERIOD      : Jan 2015 – Dec 2024 (10 Years, 2,480 Daily Candles)
COST ASSUMPTION  : 0.08% STT + Brokerage + Slippage per trade
HYPOTHESIS       : Buying NIFTY 50 on Next Open after a >= 2.0% single-day drop 
                   yields positive net expectancy & outperforms Buy & Hold over 5 days.
```

---

## 5. Risk Audit & How Misleading Conclusions Can Occur

1. **Look-Ahead Bias:** Assuming entry at the exact close price of the crash day. In real trading, you cannot execute at EOD close until the session is already over. *Mitigation: Require Next Day Open entry.*
2. **Small Sample Size ($N < 30$):** Extreme drops of $\ge -2.0\%$ occur infrequently (~15–25 times in a decade). A backtest with 18 trades has high sample error margin.
3. **Crash Slippage & Impact Cost:** In market crashes (e.g. March 23, 2020), bid-ask spreads explode. Market orders get filled 0.3%–0.5% lower than anticipated. *Mitigation: Apply explicit friction multiplier.*
4. **Regime Shift Risk:** Buying sharp falls worked exceptionally well in the 2020–2024 zero-rate liquidity rally, but failed catastrophically during the 2008 multi-month structural bear market.
5. **Overfitting & Curve Fitting:** Tuning the crash threshold to $-2.37\%$ simply because it fit 2021 historical data. *Mitigation: Out-of-sample testing & parameter sensitivity analysis.*
