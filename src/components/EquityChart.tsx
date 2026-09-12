import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

interface EquityChartProps {
  data: {
    date: string;
    strategyEquity: number;
    benchmarkEquity: number;
    drawdownPct: number;
  }[];
}

export const EquityChart: React.FC<EquityChartProps> = ({ data }) => {
  // Downsample data points for smooth performance if data is large
  const step = Math.max(1, Math.floor(data.length / 300));
  const sampledData = data.filter((_, idx) => idx % step === 0 || idx === data.length - 1);

  return (
    <div className="space-y-6">
      {/* Chart 1: Equity Curve Comparison */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">
            Cumulative Equity Growth (Starting Capital: ₹1,00,000)
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Strategy Equity
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> NIFTY Buy & Hold
            </span>
          </div>
        </div>

        <div className="h-72 w-full bg-slate-950/60 rounded-xl p-3 border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampledData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{ fontSize: 10 }}
                tickFormatter={(val: string) => val.substring(0, 7)}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 10 }}
                domain={['auto', 'auto']}
                tickFormatter={(val: number) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Capital']}
              />
              <Line
                type="monotone"
                dataKey="strategyEquity"
                name="Strategy Equity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="benchmarkEquity"
                name="NIFTY Buy & Hold"
                stroke="#64748b"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Underwater Drawdown Profile */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">
            Underwater Drawdown Profile (%)
          </span>
          <span className="text-rose-400 font-mono text-[11px]">
            Peak Drawdown Depth
          </span>
        </div>

        <div className="h-36 w-full bg-slate-950/60 rounded-xl p-3 border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampledData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{ fontSize: 10 }}
                tickFormatter={(val: string) => val.substring(0, 7)}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[-40, 0]} tickFormatter={(val: number) => `${val}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                formatter={(value: any) => [`${value}%`, 'Drawdown']}
              />
              <Area type="monotone" dataKey="drawdownPct" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.25} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
