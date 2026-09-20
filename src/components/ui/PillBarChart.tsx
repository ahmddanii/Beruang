import React from "react";

export interface PillBarItem {
  label: string;
  value: number;
  displayValue?: string;
  isHighlight?: boolean;
  accentColor?: string;
}

interface PillBarChartProps {
  title?: string;
  subtitle?: string;
  items: PillBarItem[];
  height?: number;
  highlightLabel?: string;
  className?: string;
}

export const PillBarChart: React.FC<PillBarChartProps> = ({
  title = "Analitik Arus Kas",
  subtitle = "Rata-rata mingguan",
  items,
  height = 140,
  highlightLabel,
  className = "",
}) => {
  const maxValue = Math.max(...items.map((i) => i.value), 1);

  return (
    <div
      className={`rounded-[26px] bg-white p-6 shadow-[0_4px_20px_rgba(18,19,22,0.03)] border border-black/[0.04] ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="font-heading text-base font-semibold text-[#121316]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#71768E] mt-0.5">{subtitle}</p>
          )}
        </div>
        {highlightLabel && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            {highlightLabel}
          </span>
        )}
      </div>

      {/* Bars Row */}
      <div
        className="flex items-end justify-between gap-2 sm:gap-3 px-1"
        style={{ height: `${height}px` }}
      >
        {items.map((item, idx) => {
          const percentage = Math.min(Math.round((item.value / maxValue) * 100), 100);
          const isHighlighted = item.isHighlight;

          return (
            <div
              key={idx}
              className="group relative flex flex-1 flex-col items-center justify-end h-full cursor-pointer"
            >
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute -top-8 z-10 hidden rounded-md bg-[#111215] px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:flex">
                {item.displayValue || item.value}
              </div>

              {/* Pill Bar Track */}
              <div className="relative w-full max-w-[20px] sm:max-w-[24px] h-full rounded-full bg-[#ECEEF2] overflow-hidden flex flex-col justify-end">
                {/* Filled Bar */}
                <div
                  className={`w-full rounded-full transition-all duration-500 ease-out ${
                    item.accentColor
                      ? item.accentColor
                      : isHighlighted
                      ? "bg-emerald-500"
                      : "bg-[#111215] opacity-75 group-hover:opacity-100"
                  }`}
                  style={{ height: `${percentage}%` }}
                />
              </div>

              {/* Bar Label */}
              <span
                className={`mt-2.5 text-[11px] font-medium transition-colors ${
                  isHighlighted ? "text-[#121316] font-semibold" : "text-[#71768E]"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
