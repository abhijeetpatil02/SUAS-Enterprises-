import React from 'react';
import type { BacktestResult } from '../types/research';
import { Brain, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Lightbulb, TrendingUp, RefreshCw, Compass } from 'lucide-react';

interface StageLearnProps {
  results: BacktestResult;
  onPivotExperiment: (pivotParams: Partial<BacktestResult['params']>) => void;
  onRestart: () => void;
}

export const StageLearn: React.FC<StageLearnProps> = ({ results, onPivotExperiment, onRestart }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Brain className="w-3.5 h-3.5" />
            <span>Stage 5: Synthesis, Interpretation & Next Hypotheses</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Evidence-Based Learning & Research Conclusions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Distinguishing empirical dataset facts from system interpretations & potential blindspots.
          </p>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-xl transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Research Cycle</span>
        </button>
      </div>

      {/* 2-Column Section: What Data Shows vs What System Concludes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What the Data ACTUALLY Shows (Empirical Facts) */}
        <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 bg-blue-500/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>What the Data ACTUALLY Shows (Empirical Facts)</span>
          </div>

          <ul className="text-xs text-slate-300 space-y-3 font-mono">
            <li className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">TOTAL EVENTS TRIGGERED</span>
                <span className="font-bold text-slate-100">{results.totalTrades} occurrences</span> in 10 years
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-sans text-[10px]">
                {results.totalTrades < 30 ? 'Low Sample Size' : 'Adequate Sample'}
              </span>
            </li>

            <li className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">WIN RATE ACCURACY</span>
                <span className="font-bold text-emerald-400">{results.winRatePct}% of trades</span> ended positive
              </div>
              <span className="text-slate-400 text-[11px] font-sans">{results.winningTrades} Wins / {results.losingTrades} Losses</span>
            </li>

            <li className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">AVERAGE WIN VS LOSS</span>
                <span className="font-bold text-blue-300">+{results.avgWinPct}% avg win</span> vs <span className="font-bold text-rose-400">-{results.avgLossPct}% avg loss</span>
              </div>
            </li>

            <li className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">NET STRATEGY RETURN</span>
                <span className="font-bold text-slate-100">+{results.totalReturnPct}%</span> vs NIFTY +{results.benchmarkReturnPct}%
              </div>
            </li>
          </ul>
        </div>

        {/* Card 2: What the System BELIEVES or CONCLUDES */}
        <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 bg-purple-500/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            <span>What the System Concludes & Infers</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-purple-300 block">1. Short-Term Mean Reversion Bias:</strong>
              <p className="text-slate-400 text-[11px]">
                NIFTY 50 exhibits a measurable bounce effect following 1-day drops of {results.params.fallThreshold}%. However, without volatility filtering, win rate fluctuates around {results.winRatePct}%.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-purple-300 block">2. Friction Impact Assessment:</strong>
              <p className="text-slate-400 text-[11px]">
                Factoring in {results.params.frictionPct}% slippage & taxes reduces expectancy by approx ~{(results.params.frictionPct * 2).toFixed(2)}% per round trip. Slippage during market panic is the primary profit thief.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-purple-300 block">3. Regime Vulnerability:</strong>
              <p className="text-slate-400 text-[11px]">
                Buying sharp falls works exceptionally well during secular bull markets (e.g. 2020-2021 rally), but causes severe drawdown drops during structural bear crashes (e.g. March 2020 COVID waterfall).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Identified Blindspots & Risks Alert */}
      <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 bg-amber-500/5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Critical Risks & Systemic Blindspots to Keep in Mind</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-amber-300 font-bold block text-[11px]">1. Small Sample Size (N = {results.totalTrades})</span>
            <p className="text-slate-400 text-[10px]">
              With only {results.totalTrades} events over 10 years, sample error margin is high. N &lt; 30 is statistically noisy.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-amber-300 font-bold block text-[11px]">2. Impact Cost in Panics</span>
            <p className="text-slate-400 text-[10px]">
              During -3% crash days, ask liquidity vanishes. Market orders often suffer 0.3% - 0.5% negative slippage.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-amber-300 font-bold block text-[11px]">3. Structural Bear Cascades</span>
            <p className="text-slate-400 text-[10px]">
              Catching falling knives in multi-week bear regimes produces consecutive losses before any recovery bounce.
            </p>
          </div>
        </div>
      </div>

      {/* Next Hypotheses Recommendation Generator */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Suggested Next Follow-up Hypotheses
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click to instantly test next iteration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Recommendation 1: Add Volatility Filter */}
          <button
            onClick={() => onPivotExperiment({ vixFilterEnabled: true, minVixLevel: 20 })}
            className="p-4 rounded-xl glass-card glass-card-hover border border-slate-800 text-left space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> High Volatility Filter
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <p className="text-slate-300 text-[11px]">
              Only buy when drop magnitude exceeds 2.0x ATR to eliminate minor noise drops.
            </p>
          </button>

          {/* Recommendation 2: Extend Holding Days */}
          <button
            onClick={() => onPivotExperiment({ holdingDays: results.params.holdingDays === 5 ? 10 : 5 })}
            className="p-4 rounded-xl glass-card glass-card-hover border border-slate-800 text-left space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Adjust Holding Period
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>
            <p className="text-slate-300 text-[11px]">
              Test {results.params.holdingDays === 5 ? '10-day' : '5-day'} holding window to compare mean reversion recovery speeds.
            </p>
          </button>

          {/* Recommendation 3: Add Target/Stop Rules */}
          <button
            onClick={() => onPivotExperiment({ exitStrategy: 'TARGET_STOP', stopLossPct: 2.5, takeProfitPct: 5.0 })}
            className="p-4 rounded-xl glass-card glass-card-hover border border-slate-800 text-left space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Add Stop-Loss & Take-Profit
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <p className="text-slate-300 text-[11px]">
              Set 1:2 Risk-Reward rule (2.5% Stop Loss vs 5.0% Profit Target).
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
