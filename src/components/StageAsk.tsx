import React, { useState } from 'react';
import { Search, Sparkles, AlertTriangle, ArrowRight, TrendingDown, Info, Compass } from 'lucide-react';

interface StageAskProps {
  onProceed: (query: string) => void;
}

const PRESET_QUESTIONS = [
  "Does buying NIFTY after a sharp fall work?",
  "Is buying BankNIFTY on 3 consecutive red days profitable?",
  "Does buying NIFTY after a -2% single-day crash outperform Buy & Hold over 10 days?",
  "What happens if we buy NIFTY when India VIX spikes above 22?",
];

export const StageAsk: React.FC<StageAskProps> = ({ onProceed }) => {
  const [query, setQuery] = useState<string>("Does buying NIFTY after a sharp fall work?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      onProceed(query);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Stage 1: Intent Capture & Ambiguity Detection</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
          Systematic Trading Research Platform
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Move from informal market questions to rigorous backtested evidence. State your trading hypothesis in natural language to begin.
        </p>
      </div>

      {/* Main Query  Prompt Box */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 glow-blue">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
            Enter Market Question or Hypothesis
          </label>
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 pl-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm leading-relaxed"
              placeholder="e.g. Does buying NIFTY after a sharp fall work?"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4.5" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>Ambiguity Level: <strong>HIGH</strong> (Undefined parameters detected)</span>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !query.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Parsing Intent...</span>
                </>
              ) : (
                <>
                  <span>Clarify Question</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Real-Time Entity Extraction Preview */}
        {query && (
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                AI Natural Language Parser Extraction
              </span>
              <span className="text-slate-500">Auto-detected</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">TARGET INSTRUMENT</span>
                <span className="font-semibold text-slate-200">NIFTY 50 Index</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">EVENT TRIGGER</span>
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> Sharp Fall
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">STRATEGY ACTION</span>
                <span className="font-semibold text-emerald-400">Buy / Long Position</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preset Questions Selector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          <span>Or choose a sample hypothesis:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(q)}
              className="text-left p-3.5 rounded-xl glass-card glass-card-hover border border-slate-800/80 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
            >
              <span className="line-clamp-2 pr-2">{q}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
