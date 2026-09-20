import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MonthlyReport } from "../../context/AppContext";

interface FinancialTrendChartProps {
  reports: MonthlyReport[];
}

export const FinancialTrendChart: React.FC<FinancialTrendChartProps> = ({ reports }) => {
  const chartData = reports.map((r) => ({
    name: r.month.split(" ")[0],
    omzet: r.omzet,
    hpp: r.hpp,
    netCash: r.netCash,
    hppRatio: r.hppRatio,
  }));

  const formatRupiahJt = (val: number) => `Rp${Math.round(val / 1000000)}Jt`;

  return (
    <div className="w-full h-64 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOmzet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#173F35" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#173F35" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="colorHpp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1F7A4D" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#1F7A4D" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />

          <XAxis
            dataKey="name"
            tick={{ fill: "#617369", fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatRupiahJt}
            tick={{ fill: "#617369", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#111E19] text-white p-3.5 rounded-2xl shadow-xl border border-white/10 text-xs flex flex-col gap-1.5 min-w-[170px]">
                    <p className="font-heading font-bold text-[#E8F4B8] border-b border-white/10 pb-1">
                      {label} 2026
                    </p>
                    <div className="flex items-center justify-between text-[#E8F4B8]">
                      <span>Omzet:</span>
                      <span className="font-bold tabular-nums">
                        Rp {Number(payload[0]?.value || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#FED440]">
                      <span>HPP:</span>
                      <span className="font-bold tabular-nums">
                        Rp {Number(payload[1]?.value || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#34D399]">
                      <span>Kas Bersih:</span>
                      <span className="font-bold tabular-nums">
                        Rp {Number(payload[2]?.value || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            type="monotone"
            dataKey="omzet"
            name="Omzet"
            stroke="#173F35"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorOmzet)"
          />
          <Area
            type="monotone"
            dataKey="hpp"
            name="HPP"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorHpp)"
          />
          <Area
            type="monotone"
            dataKey="netCash"
            name="Kas Bersih"
            stroke="#1F7A4D"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNet)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
