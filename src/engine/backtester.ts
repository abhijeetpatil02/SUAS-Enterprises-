import type { Candle, ExperimentParams, BacktestResult, Trade } from '../types/research';

export function runBacktest(candles: Candle[], params: ExperimentParams): BacktestResult {
  if (!candles || candles.length < 50) {
    throw new Error('Insufficient candles data for backtesting');
  }

  // Filter candles by date range
  const filteredCandles = candles.filter((c) => {
    if (params.startDate && c.date < params.startDate) return false;
    if (params.endDate && c.date > params.endDate) return false;
    return true;
  });

  const trades: Trade[] = [];
  const initialCapital = 100000;
  let strategyCapital = initialCapital;
  let inTrade = false;
  let currentTrade: Partial<Trade> | null = null;
  let entryIndex = -1;

  // Calculate 20-day SMA & 14-day ATR for volatility filters
  const smas: number[] = new Array(filteredCandles.length).fill(0);
  const atrs: number[] = new Array(filteredCandles.length).fill(0);

  for (let i = 0; i < filteredCandles.length; i++) {
    // 20-day SMA
    if (i >= 19) {
      let sum = 0;
      for (let j = i - 19; j <= i; j++) sum += filteredCandles[j].close;
      smas[i] = sum / 20;
    }

    // 14-day ATR
    if (i >= 14) {
      let trSum = 0;
      for (let j = i - 13; j <= i; j++) {
        const prevClose = filteredCandles[j - 1].close;
        const tr = Math.max(
          filteredCandles[j].high - filteredCandles[j].low,
          Math.abs(filteredCandles[j].high - prevClose),
          Math.abs(filteredCandles[j].low - prevClose)
        );
        trSum += tr;
      }
      atrs[i] = trSum / 14;
    }
  }

  const equityCurve: {
    date: string;
    strategyEquity: number;
    benchmarkEquity: number;
    drawdownPct: number;
  }[] = [];

  const benchmarkStartPrice = filteredCandles[0].close;
  let peakEquity = initialCapital;

  for (let i = 1; i < filteredCandles.length; i++) {
    const today = filteredCandles[i];
    const prevDay = filteredCandles[i - 1];

    // Benchmark equity calculation
    const benchmarkEquity = Math.round((today.close / benchmarkStartPrice) * initialCapital);

    // Check entry signal if not currently in a trade
    if (!inTrade) {
      let isDropTriggered = false;
      let dropPct = 0;

      if (params.fallType === 'SINGLE_DAY') {
        dropPct = ((today.close - prevDay.close) / prevDay.close) * 100;
        isDropTriggered = dropPct <= params.fallThreshold;
      } else if (params.fallType === 'MULTI_DAY' && i >= 3) {
        const threeDaysAgo = filteredCandles[i - 3];
        dropPct = ((today.close - threeDaysAgo.close) / threeDaysAgo.close) * 100;
        isDropTriggered = dropPct <= params.fallThreshold;
      } else if (params.fallType === 'VOLATILITY_ATR' && i >= 14 && atrs[i] > 0) {
        const dropPoints = prevDay.close - today.close;
        const atrMultiple = dropPoints / atrs[i];
        dropPct = ((today.close - prevDay.close) / prevDay.close) * 100;
        isDropTriggered = atrMultiple >= Math.abs(params.fallThreshold);
      }

      // Optional India VIX high volatility regime filter check
      let vixPass = true;
      if (params.vixFilterEnabled) {
        // High drop volatility condition check
        vixPass = Math.abs(dropPct) >= (params.minVixLevel / 10);
      }

      if (isDropTriggered && vixPass) {
        // Triggered drop! Determine execution day
        if (params.entryTiming === 'NEXT_OPEN' && i + 1 < filteredCandles.length) {
          const nextDay = filteredCandles[i + 1];
          const rawEntryPrice = nextDay.open;
          // Apply entry friction & slippage
          const entryPrice = rawEntryPrice * (1 + params.frictionPct / 100);

          inTrade = true;
          entryIndex = i + 1;
          currentTrade = {
            id: trades.length + 1,
            entryDate: nextDay.date,
            entryPrice,
            triggerDropPct: Math.round(dropPct * 100) / 100,
          };
        } else if (params.entryTiming === 'SAME_CLOSE') {
          const rawEntryPrice = today.close;
          const entryPrice = rawEntryPrice * (1 + params.frictionPct / 100);

          inTrade = true;
          entryIndex = i;
          currentTrade = {
            id: trades.length + 1,
            entryDate: today.date,
            entryPrice,
            triggerDropPct: Math.round(dropPct * 100) / 100,
          };
        }
      }
    } else if (inTrade && currentTrade) {
      // Manage active trade
      const daysHeld = i - entryIndex;
      let shouldExit = false;
      let exitReason: Trade['exitReason'] = 'HOLD_EXPIRED';
      let rawExitPrice = today.close;

      if (params.exitStrategy === 'TARGET_STOP') {
        const currentGainPct = ((today.high - currentTrade.entryPrice!) / currentTrade.entryPrice!) * 100;
        const currentLossPct = ((today.low - currentTrade.entryPrice!) / currentTrade.entryPrice!) * 100;

        if (currentLossPct <= -Math.abs(params.stopLossPct)) {
          shouldExit = true;
          exitReason = 'STOP_LOSS';
          rawExitPrice = currentTrade.entryPrice! * (1 - Math.abs(params.stopLossPct) / 100);
        } else if (currentGainPct >= params.takeProfitPct) {
          shouldExit = true;
          exitReason = 'TAKE_PROFIT';
          rawExitPrice = currentTrade.entryPrice! * (1 + params.takeProfitPct / 100);
        } else if (daysHeld >= params.holdingDays) {
          shouldExit = true;
          exitReason = 'HOLD_EXPIRED';
          rawExitPrice = today.close;
        }
      } else if (params.exitStrategy === 'MA_TOUCH' && smas[i] > 0) {
        if (today.high >= smas[i]) {
          shouldExit = true;
          exitReason = 'MA_RETOUCH';
          rawExitPrice = smas[i];
        } else if (daysHeld >= params.holdingDays * 2) {
          shouldExit = true;
          exitReason = 'HOLD_EXPIRED';
          rawExitPrice = today.close;
        }
      } else {
        // Default HOLD_DAYS
        if (daysHeld >= params.holdingDays) {
          shouldExit = true;
          exitReason = 'HOLD_EXPIRED';
          rawExitPrice = today.close;
        }
      }

      if (shouldExit) {
        // Apply exit friction
        const exitPrice = rawExitPrice * (1 - params.frictionPct / 100);
        const returnPct = ((exitPrice - currentTrade.entryPrice!) / currentTrade.entryPrice!) * 100;
        const netReturnPct = Math.round(returnPct * 100) / 100;

        // Capital update
        strategyCapital = Math.round(strategyCapital * (1 + netReturnPct / 100));

        const completedTrade: Trade = {
          id: currentTrade.id!,
          entryDate: currentTrade.entryDate!,
          entryPrice: Math.round(currentTrade.entryPrice! * 100) / 100,
          exitDate: today.date,
          exitPrice: Math.round(exitPrice * 100) / 100,
          holdingDays: daysHeld,
          returnPct: Math.round(returnPct * 100) / 100,
          netReturnPct,
          pnlAmount: Math.round((strategyCapital * (netReturnPct / 100))),
          exitReason,
          triggerDropPct: currentTrade.triggerDropPct!,
        };

        trades.push(completedTrade);
        inTrade = false;
        currentTrade = null;
      }
    }

    // Track peak equity and drawdown
    peakEquity = Math.max(peakEquity, strategyCapital);
    const drawdownPct = Math.round(((strategyCapital - peakEquity) / peakEquity) * 100 * 100) / 100;

    equityCurve.push({
      date: today.date,
      strategyEquity: strategyCapital,
      benchmarkEquity,
      drawdownPct,
    });
  }

  // Quantitative Stats Summary
  const totalTrades = trades.length;
  const winningTrades = trades.filter((t) => t.netReturnPct > 0).length;
  const losingTrades = trades.filter((t) => t.netReturnPct <= 0).length;
  const winRatePct = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 1000) / 10 : 0;

  const totalReturnPct = Math.round(((strategyCapital - initialCapital) / initialCapital) * 100 * 100) / 100;
  const benchmarkFinal = equityCurve[equityCurve.length - 1]?.benchmarkEquity || initialCapital;
  const benchmarkReturnPct = Math.round(((benchmarkFinal - initialCapital) / initialCapital) * 100 * 100) / 100;

  // CAGR calculation
  const totalYears = filteredCandles.length / 252;
  const cagrPct = totalYears > 0 ? Math.round((Math.pow(strategyCapital / initialCapital, 1 / totalYears) - 1) * 100 * 100) / 100 : 0;

  // Max Drawdown calculation
  let maxDrawdownPct = 0;
  equityCurve.forEach((e) => {
    if (e.drawdownPct < maxDrawdownPct) {
      maxDrawdownPct = e.drawdownPct;
    }
  });

  // Profit Factor & Average Win/Loss
  const grossProfit = trades.filter((t) => t.netReturnPct > 0).reduce((acc, t) => acc + t.netReturnPct, 0);
  const grossLoss = Math.abs(trades.filter((t) => t.netReturnPct < 0).reduce((acc, t) => acc + t.netReturnPct, 0));
  const profitFactor = grossLoss > 0 ? Math.round((grossProfit / grossLoss) * 100) / 100 : grossProfit > 0 ? 99 : 0;

  const avgWinPct = winningTrades > 0 ? Math.round((grossProfit / winningTrades) * 100) / 100 : 0;
  const avgLossPct = losingTrades > 0 ? Math.round((grossLoss / losingTrades) * 100) / 100 : 0;
  const expectancyPct = totalTrades > 0 ? Math.round((trades.reduce((acc, t) => acc + t.netReturnPct, 0) / totalTrades) * 100) / 100 : 0;

  // Sharpe Ratio (Assuming 6% Risk Free Rate in India)
  const returnsArray = trades.map((t) => t.netReturnPct);
  const meanReturn = returnsArray.length > 0 ? returnsArray.reduce((a, b) => a + b, 0) / returnsArray.length : 0;
  const variance = returnsArray.length > 1 ? returnsArray.reduce((a, b) => a + Math.pow(b - meanReturn, 2), 0) / (returnsArray.length - 1) : 1;
  const stdDev = Math.sqrt(variance);
  const annualizedFactor = Math.sqrt(252 / params.holdingDays);
  const sharpeRatio = stdDev > 0 ? Math.round(((meanReturn - (6 / 252 * params.holdingDays)) / stdDev) * annualizedFactor * 100) / 100 : 0;

  return {
    params,
    totalTrades,
    winningTrades,
    losingTrades,
    winRatePct,
    totalReturnPct,
    benchmarkReturnPct,
    cagrPct,
    maxDrawdownPct,
    sharpeRatio,
    profitFactor,
    avgWinPct,
    avgLossPct,
    expectancyPct,
    trades,
    equityCurve,
  };
}
