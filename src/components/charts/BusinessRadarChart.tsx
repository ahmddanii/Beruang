import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BusinessAssessment } from "../../context/AppContext";

interface BusinessRadarChartProps {
  assessment: BusinessAssessment;
  showBenchmark?: boolean;
}

export const BusinessRadarChart: React.FC<BusinessRadarChartProps> = ({
  assessment,
  showBenchmark = true,
}) => {
  const data = [
    { subject: "Finansial", score: assessment.financial, benchmark: 75, fullMark: 100 },
    { subject: "HPP & Operasi", score: assessment.operations_hpp, benchmark: 75, fullMark: 100 },
    { subject: "Pemasaran", score: assessment.marketing, benchmark: 70, fullMark: 100 },
    { subject: "SDM & Tim", score: assessment.hr_team, benchmark: 65, fullMark: 100 },
    { subject: "Legalitas", score: assessment.legal, benchmark: 75, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 sm:h-72 select-none -my-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E2E8E4" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#111E19", fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#617369", fontSize: 9 }}
            stroke="#E2E8E4"
          />
          {showBenchmark && (
            <Radar
              name="Ambang Batas Investor"
              dataKey="benchmark"
              stroke="#D97706"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              fill="#F59E0B"
              fillOpacity={0.12}
            />
          )}
          <Radar
            name="Skor Aktual Usaha"
            dataKey="score"
            stroke="#173F35"
            strokeWidth={2.5}
            fill="#173F35"
            fillOpacity={0.25}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-[#111E19] text-white p-3 rounded-2xl shadow-xl border border-white/10 text-xs">
                    <p className="font-heading font-bold text-[#E8F4B8]">{item.subject}</p>
                    <p className="font-semibold mt-1 tabular-nums">Skor Aktual: {item.score} / 100</p>
                    {showBenchmark && (
                      <p className="text-[11px] text-[#FEF3C7] mt-0.5 tabular-nums">Target Minimal: {item.benchmark}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
