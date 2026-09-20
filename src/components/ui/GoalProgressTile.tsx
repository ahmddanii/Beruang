import React from "react";
import { LucideIcon, ChevronRight } from "lucide-react";

interface GoalProgressTileProps {
  title: string;
  category?: string;
  currentAmount: string;
  targetAmount: string;
  percentage: number;
  timeRemaining?: string;
  icon: LucideIcon;
  accentColor?: string;
  progressBg?: string;
  onClick?: () => void;
}

export const GoalProgressTile: React.FC<GoalProgressTileProps> = ({
  title,
  category,
  currentAmount,
  targetAmount,
  percentage,
  timeRemaining,
  icon: Icon,
  accentColor = "bg-emerald-500",
  progressBg = "bg-emerald-50 text-emerald-700",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(18,19,22,0.03)] border border-black/[0.04] transition-all hover:shadow-[0_8px_24px_rgba(18,19,22,0.06)] cursor-pointer"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${progressBg}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#121316] group-hover:text-blue-600 transition-colors">
              {title}
            </h4>
            {category && (
              <span className="text-[11px] text-[#71768E]">{category}</span>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-[#A0A5BD] transition-transform group-hover:translate-x-0.5" />
      </div>

      <div className="mt-4 flex items-baseline justify-between text-xs tabular-nums">
        <span className="font-heading text-base font-bold text-[#121316]">
          {currentAmount}
        </span>
        <span className="text-xs text-[#71768E]">Target {targetAmount}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEEF2]">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${accentColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-[#71768E]">
        <span>{timeRemaining || "Sedang berjalan"}</span>
        <span className="font-semibold text-[#121316] tabular-nums">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
