import React from 'react';
import type { Stage } from '../types/research';
import { Sparkles, HelpCircle, CheckCircle2, Sliders, Play, Brain, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentStage: Stage;
  setStage: (stage: Stage) => void;
  resetAll: () => void;
}

const STAGES: { id: Stage; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'ASK', label: '1. Ask', icon: HelpCircle },
  { id: 'CLARIFY', label: '2. Clarify', icon: Sliders },
  { id: 'DEFINE', label: '3. Define', icon: CheckCircle2 },
  { id: 'TEST', label: '4. Test', icon: Play },
  { id: 'LEARN', label: '5. Learn', icon: Brain },
];

export const Navbar: React.FC<NavbarProps> = ({ currentStage, setStage, resetAll }) => {
  const currentStageIndex = STAGES.findIndex((s) => s.id === currentStage);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={resetAll}>
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 text-white">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight">AlphaSense AI</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Quant Engine 2.0
              </span>
            </div>
            <p className="text-xs text-slate-400">Hypothesis-Driven Trading Research Platform</p>
          </div>
        </div>

        {/* 5-Stage Stepper Progress Bar */}
        <nav className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 overflow-x-auto max-w-full">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = stage.id === currentStage;
            const isPassed = idx < currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => setStage(stage.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isPassed
                    ? 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isPassed ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{stage.label}</span>
                {idx < STAGES.length - 1 && (
                  <span className="text-slate-700 ml-1 text-[10px]">›</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all"
            title="Reset to New Question"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Research</span>
          </button>
        </div>
      </div>
    </header>
  );
};
