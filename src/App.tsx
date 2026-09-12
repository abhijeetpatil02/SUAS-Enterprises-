import { useState, useMemo } from 'react';
import type { Stage, ExperimentParams, BacktestResult } from './types/research';
import { Navbar } from './components/Navbar';
import { StageAsk } from './components/StageAsk';
import { StageClarify } from './components/StageClarify';
import { StageDefine } from './components/StageDefine';
import { StageTest } from './components/StageTest';
import { StageLearn } from './components/StageLearn';
import { NIFTY_DAILY_DATA } from './data/nifty50_data';
import { runBacktest } from './engine/backtester';

const DEFAULT_PARAMS: ExperimentParams = {
  instrument: 'NIFTY 50 Index',
  fallType: 'SINGLE_DAY',
  fallThreshold: -2.0,
  entryTiming: 'NEXT_OPEN',
  exitStrategy: 'HOLD_DAYS',
  holdingDays: 5,
  stopLossPct: 2.5,
  takeProfitPct: 5.0,
  frictionPct: 0.08,
  startDate: '2015-01-01',
  endDate: '2024-12-31',
  vixFilterEnabled: false,
  minVixLevel: 20,
};

export function App() {
  const [currentStage, setStage] = useState<Stage>('ASK');
  const [userQuery, setUserQuery] = useState<string>("Does buying NIFTY after a sharp fall work?");
  const [params, setParams] = useState<ExperimentParams>(DEFAULT_PARAMS);

  // Run quantitative backtest on current params
  const backtestResults: BacktestResult = useMemo(() => {
    return runBacktest(NIFTY_DAILY_DATA, params);
  }, [params]);

  const handleAskProceed = (query: string) => {
    setUserQuery(query);
    setStage('CLARIFY');
  };

  const handleClarifyProceed = () => {
    setStage('DEFINE');
  };

  const handleDefineRunTest = () => {
    setStage('TEST');
  };

  const handleTestProceedToLearn = () => {
    setStage('LEARN');
  };

  const handleUpdateParams = (updated: Partial<ExperimentParams>) => {
    setParams((prev) => ({ ...prev, ...updated }));
  };

  const handlePivotExperiment = (pivotParams: Partial<ExperimentParams>) => {
    setParams((prev) => ({ ...prev, ...pivotParams }));
    setStage('TEST');
  };

  const handleResetAll = () => {
    setUserQuery("Does buying NIFTY after a sharp fall work?");
    setParams(DEFAULT_PARAMS);
    setStage('ASK');
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header Navigation */}
      <Navbar currentStage={currentStage} setStage={setStage} resetAll={handleResetAll} />

      {/* Main Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {currentStage === 'ASK' && <StageAsk onProceed={handleAskProceed} />}

        {currentStage === 'CLARIFY' && (
          <StageClarify
            userQuery={userQuery}
            params={params}
            onChangeParams={handleUpdateParams}
            onProceed={handleClarifyProceed}
          />
        )}

        {currentStage === 'DEFINE' && (
          <StageDefine
            params={params}
            onBack={() => setStage('CLARIFY')}
            onRunTest={handleDefineRunTest}
          />
        )}

        {currentStage === 'TEST' && (
          <StageTest
            results={backtestResults}
            onProceedToLearn={handleTestProceedToLearn}
            onReConfigure={() => setStage('CLARIFY')}
          />
        )}

        {currentStage === 'LEARN' && (
          <StageLearn
            results={backtestResults}
            onPivotExperiment={handlePivotExperiment}
            onRestart={handleResetAll}
          />
        )}
      </main>

      {/* Footer Credentials */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500 glass-panel">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            AI Full-Stack Developer Challenge Submission — <strong className="text-slate-300">Option 2 (Trading Research Platform)</strong>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>10-Yr Historical NIFTY Data (2015-2024)</span>
            <span>•</span>
            <span className="text-blue-400 font-mono">Vite + React + TS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
