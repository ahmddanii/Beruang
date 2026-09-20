import React from "react";
import { cn } from "@/lib/utils";

export interface ScoreSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  helper?: string;
  className?: string;
}

export const ScoreSlider: React.FC<ScoreSliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  description,
  helper,
  className,
}) => {
  const effectiveDesc = description || helper;
  const percentage = ((value - min) / (max - min)) * 100;


  return (
    <div className={cn("space-y-2 select-none", className)}>
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-[#5C6180] mt-0.5">{description}</p>
          )}
        </div>
        <span className="font-heading text-xs font-bold text-[#173F35] bg-[#E8F4B8] px-2.5 py-1 rounded-full border border-[#173F35]/15 tabular-nums">
          {value}/100
        </span>
      </div>

      <div className="relative flex items-center py-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #173F35 0%, #173F35 ${percentage}%, #E2E8E4 ${percentage}%, #E2E8E4 100%)`,
          }}
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#173F35] accent-[#173F35]"
        />
      </div>
    </div>
  );
};
