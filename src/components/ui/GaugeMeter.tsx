import React from "react";

interface ArcGaugeProps {
  score: number;
  maxScore?: number;
  label?: string;
  statusText?: string;
  className?: string;
}

export const ArcGauge: React.FC<ArcGaugeProps> = ({
  score,
  maxScore = 100,
  label = "Skor Indeks",
  statusText = "Baik",
  className = "",
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  // Semi-circle path
  const radius = 60;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center relative select-none ${className}`}>
      <svg className="w-36 h-20 overflow-visible" viewBox="0 0 140 80">
        {/* Background track */}
        <path
          d="M 10 75 A 60 60 0 0 1 130 75"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <path
          d="M 10 75 A 60 60 0 0 1 130 75"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute top-7 flex flex-col items-center text-center">
        <span className="text-2xl font-black text-[#111827] tracking-tight">{score}</span>
        <span className="text-[11px] font-bold text-gray-400 mt-[-2px]">{statusText}</span>
      </div>
      <p className="text-xs font-semibold text-gray-500 mt-1">{label}</p>
    </div>
  );
};

interface BatteryRodProps {
  percentage: number;
  totalBars?: number;
  label?: string;
}

export const BatteryRod: React.FC<BatteryRodProps> = ({
  percentage,
  totalBars = 16,
  label = "Stabilitas Arus Kas",
}) => {
  const activeBars = Math.round((percentage / 100) * totalBars);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="bg-white/80 p-2 rounded-2xl flex items-center justify-between gap-1 shadow-inner border border-black/5">
        {Array.from({ length: totalBars }).map((_, i) => (
          <div
            key={i}
            className={`h-6 flex-1 rounded-full transition-colors duration-200 ${
              i < activeBars ? "bg-[#10B981]" : "bg-gray-200/80"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[11px] font-bold text-gray-500 px-1">
        <span>{label}</span>
        <span className="text-[#10B981] font-extrabold">{percentage}% Efisien</span>
      </div>
    </div>
  );
};

interface GradientSliderProps {
  leftLabel?: string;
  rightLabel?: string;
  valueRatio?: number; // 0 to 100, 50 is center
}

export const GradientSlider: React.FC<GradientSliderProps> = ({
  leftLabel = "HPP Tinggi",
  rightLabel = "Margin Optimal",
  valueRatio = 65,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full select-none">
      <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-[#F97316] via-[#FEF08A] to-[#3B82F6] p-0.5 shadow-inner">
        {/* Thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 size-5 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] border border-black/10 transition-all duration-300"
          style={{ left: `calc(${valueRatio}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-gray-400">
        <span>{leftLabel}</span>
        <span className="text-gray-900 font-extrabold">{valueRatio}% Sehat</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};
