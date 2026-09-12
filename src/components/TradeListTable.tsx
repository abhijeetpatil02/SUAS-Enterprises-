import React, { useState } from 'react';
import type { Trade } from '../types/research';
import { TrendingUp, TrendingDown, Clock, Filter } from 'lucide-react';

interface TradeListTableProps {
  trades: Trade[];
}

export const TradeListTable: React.FC<TradeListTableProps> = ({ trades }) => {
  const [filter, setFilter] = useState<'ALL' | 'WIN' | 'LOSS'>('ALL');

  const filteredTrades = trades.filter((t) => {
    if (filter === 'WIN') return t.netReturnPct > 0;
    if (filter === 'LOSS') return t.netReturnPct <= 0;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200">Executed Trades Audit Log</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
            {filteredTrades.length} / {trades.length} Trades
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              filter === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Trades
          </button>
          <button
            onClick={() => setFilter('WIN')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              filter === 'WIN' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Winners ({trades.filter((t) => t.netReturnPct > 0).length})
          </button>
          <button
            onClick={() => setFilter('LOSS')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              filter === 'LOSS' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Losers ({trades.filter((t) => t.netReturnPct <= 0).length})
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-80 overflow-y-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider sticky top-0 border-b border-slate-800">
            <tr>
              <th className="p-3 font-semibold">#</th>
              <th className="p-3 font-semibold">Trigger Drop</th>
              <th className="p-3 font-semibold">Entry Date & Price</th>
              <th className="p-3 font-semibold">Exit Date & Price</th>
              <th className="p-3 font-semibold">Hold Days</th>
              <th className="p-3 font-semibold text-right">Net Return (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 text-slate-300">
            {filteredTrades.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-500 font-sans text-xs">
                  No trades match the selected filter criterion.
                </td>
              </tr>
            ) : (
              filteredTrades.map((t) => {
                const isWin = t.netReturnPct > 0;
                return (
                  <tr key={t.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 text-slate-500">{t.id}</td>
                    <td className="p-3 text-amber-400 font-bold">{t.triggerDropPct}%</td>
                    <td className="p-3">
                      <div className="text-slate-200">{t.entryDate}</div>
                      <div className="text-[10px] text-slate-400">₹{t.entryPrice.toLocaleString()}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-200">{t.exitDate}</div>
                      <div className="text-[10px] text-slate-400">₹{t.exitPrice.toLocaleString()}</div>
                    </td>
                    <td className="p-3 text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {t.holdingDays} days
                    </td>
                    <td className={`p-3 text-right font-bold ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {isWin ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{isWin ? '+' : ''}{t.netReturnPct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
