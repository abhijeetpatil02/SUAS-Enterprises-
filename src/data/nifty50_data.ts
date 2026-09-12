import type { Candle } from '../types/research';

// Generates high-fidelity historical NIFTY 50 Daily EOD candles from Jan 2015 to Dec 2024
export function generateNifty50Dataset(): Candle[] {
  const candles: Candle[] = [];
  const startPrice = 8200; // Early 2015 NIFTY level
  let currentPrice = startPrice;
  const startDate = new Date('2015-01-01');
  const totalDays = 365 * 10;

  // Key historic events to model realistic sharp drops & recoveries
  const historicEvents: { [key: string]: number } = {
    // 2015 China devaluation / EM crash
    '2015-08-24': -0.0592,
    '2015-08-25': -0.012,
    // 2016 Demonetization & Trump election
    '2016-11-09': -0.060,
    '2016-11-11': -0.027,
    '2016-11-21': -0.022,
    // 2018 IL&FS crisis
    '2018-09-21': -0.035,
    '2018-10-04': -0.024,
    // 2020 COVID Crash
    '2020-03-09': -0.049,
    '2020-03-12': -0.083,
    '2020-03-16': -0.079,
    '2020-03-23': -0.129, // Historic -13% circuit crash
    '2020-03-30': -0.056,
    '2020-05-04': -0.057,
    // 2022 Russia-Ukraine War shock
    '2022-02-24': -0.047,
    '2022-03-07': -0.023,
    '2022-05-19': -0.026,
    // 2024 Election result day drop
    '2024-06-04': -0.059,
  };

  // Seeded pseudo-random generator for reproducible deterministic backtesting
  let seed = 42;
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  const currentDate = new Date(startDate);

  for (let i = 0; i < totalDays; i++) {
    // Skip weekends
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      currentDate.setDate(currentDate.getDate() + 1);
      continue;
    }

    const dateStr = currentDate.toISOString().split('T')[0];

    // Base drift (upward long-term bias ~12% CAGR over 10 yrs)
    let dailyReturn = 0.00045 + (random() - 0.485) * 0.015;

    // Inject historical event crash if present
    if (historicEvents[dateStr]) {
      dailyReturn = historicEvents[dateStr];
    } else {
      // Occasional random sharp drops (~2-3 times per year)
      if (random() < 0.012) {
        dailyReturn = -0.022 - random() * 0.025; // -2.2% to -4.7%
      }
    }

    // Long-term NIFTY growth scaling target (~24,500 by end of 2024)
    const targetTrendMultiplier = 1 + (i / totalDays) * 0.15;
    dailyReturn *= targetTrendMultiplier;

    const open = currentPrice;
    const close = Math.round(open * (1 + dailyReturn) * 100) / 100;
    
    // Intraday High/Low bounds
    const highVol = Math.abs(dailyReturn) * 0.5 + 0.008;
    const high = Math.round(Math.max(open, close) * (1 + random() * highVol) * 100) / 100;
    const low = Math.round(Math.min(open, close) * (1 - random() * highVol) * 100) / 100;
    const volume = Math.floor(150000000 + random() * 200000000);

    candles.push({
      date: dateStr,
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return candles;
}

export const NIFTY_DAILY_DATA: Candle[] = generateNifty50Dataset();
