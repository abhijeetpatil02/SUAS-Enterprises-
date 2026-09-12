import React from 'react';
import type { ExperimentParams } from '../types/research';
import { CheckCircle2, Play, AlertCircle, FileSpreadsheet, ShieldAlert, ArrowLeft } from 'lucide-react';

interface StageDefineProps {
  params: ExperimentParams;
  onBack: () => void;
  onRunTest: () => void;
}

export const StageDefine: React.FC<StageDefineProps> = ({ params, onBack, onRunTest }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Stage 3: Structured Experiment Specification</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Formulated Research Experiment Spec
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mathematical parameters locked. Ready for quantitative backtest execution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/60 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Params</span>
          </button>
          <button
            onClick={onRunTest}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Execute 10-Yr Backtest</span>
          </button>
        </div>
      </div>

      {/* Main Experiment Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 glow-emerald">
        {/* Formulated Hypothesis Statement */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Formal Mathematical Hypothesis</span>
          </div>
          <p className="text-sm font-mono text-slate-200 leading-relaxed">
            "Buying the <strong className="text-blue-400">NIFTY 50 Index</strong> at the next session's <strong className="text-emerald-400">Open price</strong> following a sharp fall of <strong className="text-amber-400 font-bold">{params.fallThreshold}%</strong> yields positive net expectancy over a <strong className="text-purple-400">{params.holdingDays}-day</strong> holding period after accounting for <strong className="text-rose-400">{params.frictionPct}%</strong> round-trip transaction costs."
          </p>
        </div>

        {/* Structured Experiment Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 font-semibold">Parameter</th>
                <th className="p-3.5 font-semibold">Locked Specification</th>
                <th className="p-3.5 font-semibold">Implementation Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 text-slate-300">
              <tr>
                <td className="p-3.5 font-bold text-blue-400">MARKET / INSTRUMENT</td>
                <td className="p-3.5 font-mono text-slate-100 font-semibold">{params.instrument}</td>
                <td className="p-3.5 text-slate-400">Benchmark Indian equity index representing top 50 liquid stocks.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-amber-400">FALL CONDITION</td>
                <td className="p-3.5 font-mono text-amber-300 font-semibold">
                  {params.fallType === 'SINGLE_DAY'
                    ? `1-Day Close Return ≤ ${params.fallThreshold}%`
                    : params.fallType === 'MULTI_DAY'
                    ? `3-Day Drawdown ≤ ${params.fallThreshold}%`
                    : `Drop ≥ ${Math.abs(params.fallThreshold)}x ATR(14)`}
                </td>
                <td className="p-3.5 text-slate-400">Quantitative trigger for abnormal mean-reversion opportunity.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-emerald-400">ENTRY RULE</td>
                <td className="p-3.5 font-mono text-emerald-300 font-semibold">
                  {params.entryTiming === 'NEXT_OPEN' ? 'Next Day Open (t+1)' : 'Same Day Close (t)'}
                </td>
                <td className="p-3.5 text-slate-400">
                  {params.entryTiming === 'NEXT_OPEN'
                    ? 'Strict execution logic avoiding look-ahead bias.'
                    : 'Requires execution right before market close.'}
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-purple-400">EXIT RULE</td>
                <td className="p-3.5 font-mono text-purple-300 font-semibold">
                  Hold for exactly {params.holdingDays} trading sessions
                </td>
                <td className="p-3.5 text-slate-400">Fixed time-based exit to test short-term mean reversion bounce.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-rose-400">COST ASSUMPTION</td>
                <td className="p-3.5 font-mono text-rose-300 font-semibold">{params.frictionPct}% per trade</td>
                <td className="p-3.5 text-slate-400">Includes STT tax, exchange fee, brokerage, and crash slippage.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-300">TEST PERIOD</td>
                <td className="p-3.5 font-mono text-slate-100 font-semibold">2015 – 2024 (10 Years, 2,480 Candles)</td>
                <td className="p-3.5 text-slate-400">Includes 2016 demonetization, 2018 IL&FS, 2020 COVID, 2022 war shocks.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Falsification Criteria */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Falsification & Rejection Criteria</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The hypothesis will be <strong>REJECTED</strong> if:
          </p>
          <ul className="text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono">
            <li className="p-2 rounded bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              Win Rate &lt; 55.0%
            </li>
            <li className="p-2 rounded bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              Sharpe Ratio &lt; 0.50
            </li>
            <li className="p-2 rounded bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              Max Drawdown &gt; 15.0%
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
