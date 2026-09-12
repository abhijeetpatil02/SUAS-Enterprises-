export type Stage = 'ASK' | 'CLARIFY' | 'DEFINE' | 'TEST' | 'LEARN';

export type SharpFallType = 'SINGLE_DAY' | 'MULTI_DAY' | 'VOLATILITY_ATR';
export type EntryTiming = 'NEXT_OPEN' | 'SAME_CLOSE';
export type ExitStrategy = 'HOLD_DAYS' | 'TARGET_STOP' | 'MA_TOUCH';

export interface ExperimentParams {
  instrument: string;
  fallType: SharpFallType;
  fallThreshold: number; // e.g. -2.0 for -2% single day, or -5.0 for 3-day drop
  entryTiming: EntryTiming;
  exitStrategy: ExitStrategy;
  holdingDays: number;
  stopLossPct: number;
  takeProfitPct: number;
  frictionPct: number; // Slippage + brokerage + STT, default 0.08%
  startDate: string;
  endDate: string;
  vixFilterEnabled: boolean;
  minVixLevel: number;
}

export interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  id: number;
  entryDate: string;
  entryPrice: number;
  exitDate: string;
  exitPrice: number;
  holdingDays: number;
  returnPct: number;
  netReturnPct: number;
  pnlAmount: number;
  exitReason: 'HOLD_EXPIRED' | 'STOP_LOSS' | 'TAKE_PROFIT' | 'MA_RETOUCH';
  triggerDropPct: number;
}

export interface BacktestResult {
  params: ExperimentParams;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRatePct: number;
  totalReturnPct: number;
  benchmarkReturnPct: number; // NIFTY Buy & Hold return over same period
  cagrPct: number;
  maxDrawdownPct: number;
  sharpeRatio: number;
  profitFactor: number;
  avgWinPct: number;
  avgLossPct: number;
  expectancyPct: number; // Avg net return per trade
  trades: Trade[];
  equityCurve: {
    date: string;
    strategyEquity: number; // normalized starting at 100,000
    benchmarkEquity: number;
    drawdownPct: number;
  }[];
}

export interface ClarificationOption {
  id: string;
  question: string;
  userSaid: string;
  systemAssumption: string;
  whyImportant: string;
}
