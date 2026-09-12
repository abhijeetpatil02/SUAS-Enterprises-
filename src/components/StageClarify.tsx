import React from 'react';
import type { ExperimentParams } from '../types/research';
import { Sliders, HelpCircle, ArrowRight, ShieldAlert, CheckCircle2, Clock, DollarSign, Activity } from 'lucide-react';

interface StageClarifyProps {
  userQuery: string;
  params: ExperimentParams;
  onChangeParams: (updated: Partial<ExperimentParams>) => void;
  onProceed: () => void;
}

export const StageClarify: React.FC<StageClarifyProps> = ({
  userQuery,
  params,
  onChangeParams,
  onProceed,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Stage 2: Disambiguation & Parameter Alignment</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Original Query: <span className="text-blue-300 font-mono">"{userQuery}"</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            The question is missing critical parameters required for a mathematical backtest.
          </p>
        </div>
        <button
          onClick={onProceed}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer shrink-0"
        >
          <span>Confirm & Define Spec</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3-Column Comparison: User Said vs System Assumed vs System Asks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: User Said */}
        <div className="p-5 rounded-xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <span>What You Said</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-2 font-mono">
            <li className="p-2 rounded bg-slate-900/60 border border-slate-800">
              "Buying NIFTY" → Long NIFTY 50 Index
            </li>
            <li className="p-2 rounded bg-slate-900/60 border border-slate-800">
              "After a sharp fall" → Undefined drop
            </li>
            <li className="p-2 rounded bg-slate-900/60 border border-slate-800">
              "Does it work?" → Undefined outcome metric
            </li>
          </ul>
        </div>

        {/* Column 2: System Assumed */}
        <div className="p-5 rounded-xl glass-panel border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Default System Assumptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="p-2 rounded bg-slate-900/80 border border-amber-500/20">
              <strong>Sharp Fall:</strong> Single-day drop ≤ -2.0%
            </li>
            <li className="p-2 rounded bg-slate-900/80 border border-amber-500/20">
              <strong>Entry:</strong> Next Day Open (eliminates look-ahead bias)
            </li>
            <li className="p-2 rounded bg-slate-900/80 border border-amber-500/20">
              <strong>Friction:</strong> 0.08% STT + brokerage + slippage
            </li>
          </ul>
        </div>

        {/* Column 3: System Asks User */}
        <div className="p-5 rounded-xl glass-panel border border-blue-500/30 bg-blue-500/5 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Required User Decisions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="p-2 rounded bg-slate-900/80 border border-blue-500/20">
              1. What threshold defines a "sharp fall"?
            </li>
            <li className="p-2 rounded bg-slate-900/80 border border-blue-500/20">
              2. When do you enter & exit the market?
            </li>
            <li className="p-2 rounded bg-slate-900/80 border border-blue-500/20">
              3. How long do you hold the position?
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Parameter Tuning Studio */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-slate-200">Interactive Parameter Tuning Studio</h3>
          </div>
          <span className="text-xs text-slate-400">Adjust parameters below to auto-update experiment definition</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Question 1: Sharp Fall Definition */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-400" />
                1. Sharp Fall Definition
              </label>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {params.fallType === 'SINGLE_DAY'
                  ? `${params.fallThreshold}% 1-Day Drop`
                  : params.fallType === 'MULTI_DAY'
                  ? `${params.fallThreshold}% 3-Day Drop`
                  : `${Math.abs(params.fallThreshold)}x ATR Drop`}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onChangeParams({ fallType: 'SINGLE_DAY', fallThreshold: -2.0 })}
                className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                  params.fallType === 'SINGLE_DAY'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                1-Day Absolute
              </button>
              <button
                type="button"
                onClick={() => onChangeParams({ fallType: 'MULTI_DAY', fallThreshold: -4.0 })}
                className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                  params.fallType === 'MULTI_DAY'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                3-Day Drawdown
              </button>
              <button
                type="button"
                onClick={() => onChangeParams({ fallType: 'VOLATILITY_ATR', fallThreshold: -2.0 })}
                className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                  params.fallType === 'VOLATILITY_ATR'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                Volatility ATR
              </button>
            </div>

            {/* Slider for threshold */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Sensitivity Threshold</span>
                <span className="font-mono text-slate-200">{params.fallThreshold}%</span>
              </div>
              <input
                type="range"
                min="-6.0"
                max="-1.0"
                step="0.5"
                value={params.fallThreshold}
                onChange={(e) => onChangeParams({ fallThreshold: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* Question 2: Entry Timing */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                2. Entry Timing Execution
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {params.entryTiming === 'NEXT_OPEN' ? 'Next Day Open' : 'EOD Close'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onChangeParams({ entryTiming: 'NEXT_OPEN' })}
                className={`p-3 rounded-lg border text-left space-y-1 transition-all ${
                  params.entryTiming === 'NEXT_OPEN'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">Next Day Open (Recommended)</div>
                <div className="text-[10px] text-slate-400">No look-ahead bias. Realistic market order fill.</div>
              </button>
              <button
                type="button"
                onClick={() => onChangeParams({ entryTiming: 'SAME_CLOSE' })}
                className={`p-3 rounded-lg border text-left space-y-1 transition-all ${
                  params.entryTiming === 'SAME_CLOSE'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">Same Day Close</div>
                <div className="text-[10px] text-amber-400/80">Warning: Suffers from look-ahead bias.</div>
              </button>
            </div>
          </div>

          {/* Question 3: Exit & Holding Period */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                3. Exit Condition & Holding Period
              </label>
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {params.holdingDays} Trading Days
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs">
              {[3, 5, 10, 20].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => onChangeParams({ holdingDays: days })}
                  className={`p-2 rounded-lg border text-center font-bold font-mono transition-all ${
                    params.holdingDays === days
                      ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Friction & Slippage Cost */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                4. Friction & Slippage Rate
              </label>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {params.frictionPct}% per trade
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              {[0.04, 0.08, 0.15].map((fric) => (
                <button
                  key={fric}
                  type="button"
                  onClick={() => onChangeParams({ frictionPct: fric })}
                  className={`p-2.5 rounded-lg border text-center font-mono font-semibold transition-all ${
                    params.frictionPct === fric
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fric}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
