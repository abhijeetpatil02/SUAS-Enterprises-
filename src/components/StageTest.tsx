import React from 'react';
import type { BacktestResult } from '../types/research';
import { EquityChart } from './EquityChart';
import { TradeListTable } from './TradeListTable';
import { Play, ArrowRight, BarChart3, RotateCcw } from 'lucide-react';

interface StageTestProps {
  results: BacktestResult;
  onProceedToLearn: () => void;
  onReConfigure: () => void;
}

export const StageTest: React.FC<StageTestProps> = ({ results, onProceedToLearn, onReConfigure }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Play className="w-3.5 h-3.5" />
            <span>Stage 4: Quantitative Execution & Backtest Evidence</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Backtest Execution Results (10-Year NIFTY 50 Data)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulated strategy execution across 2,480 daily candles from Jan 2015 to Dec 2024.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReConfigure}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/60 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Tune Params</span>
          </button>
          <button
            onClick={onProceedToLearn}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>Analyze & Learn</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quantitative Metrics Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Metric 1: Strategy Return vs Benchmark */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">STRATEGY RETURN</span>
          <div className={`text-xl font-extrabold font-mono ${results.totalReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {results.totalReturnPct >= 0 ? '+' : ''}{results.totalReturnPct}%
          </div>
          <span className="text-[10px] text-slate-500 block">vs NIFTY {results.benchmarkReturnPct}%</span>
        </div>

        {/* Metric 2: Win Rate */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">WIN RATE</span>
          <div className="text-xl font-extrabold font-mono text-blue-400">{results.winRatePct}%</div>
          <span className="text-[10px] text-slate-500 block">
            {results.winningTrades}W / {results.losingTrades}L
          </span>
        </div>

        {/* Metric 3: Profit Factor */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">PROFIT FACTOR</span>
          <div className="text-xl font-extrabold font-mono text-purple-400">{results.profitFactor}</div>
          <span className="text-[10px] text-slate-500 block">Gross Win / Gross Loss</span>
        </div>

        {/* Metric 4: Sharpe Ratio */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">SHARPE RATIO</span>
          <div className="text-xl font-extrabold font-mono text-amber-400">{results.sharpeRatio}</div>
          <span className="text-[10px] text-slate-500 block">Risk Free Rate = 6.0%</span>
        </div>

        {/* Metric 5: Max Drawdown */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">MAX DRAWDOWN</span>
          <div className="text-xl font-extrabold font-mono text-rose-400">{results.maxDrawdownPct}%</div>
          <span className="text-[10px] text-slate-500 block">Peak-to-Trough Drop</span>
        </div>

        {/* Metric 6: Expectancy / Trade */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">EXPECTANCY</span>
          <div className="text-xl font-extrabold font-mono text-teal-400">{results.expectancyPct}%</div>
          <span className="text-[10px] text-slate-500 block">Net Gain / Trade</span>
        </div>
      </div>

      {/* Equity & Drawdown Chart Section */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Equity Performance & Drawdown Charts
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Total Trades Triggered: <strong className="text-slate-200 font-mono">{results.totalTrades}</strong>
          </span>
        </div>
        <EquityChart data={results.equityCurve} />
      </div>

      {/* Trade Log Audit Section */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <TradeListTable trades={results.trades} />
      </div>
    </div>
  );
};
