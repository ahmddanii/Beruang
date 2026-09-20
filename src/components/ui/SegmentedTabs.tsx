import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SegmentedTabsProps {
  options: { key: string; label: string; count?: number }[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  options,
  activeKey,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[#ECEEF5] p-1 rounded-full flex items-center gap-1 select-none w-full relative",
        className
      )}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = activeKey === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.key)}
            className={cn(
              "flex-1 py-2 px-3.5 text-xs font-semibold rounded-full transition-colors cursor-pointer outline-none text-center relative z-10 flex items-center justify-center gap-1.5",
              isActive
                ? "text-white"
                : "text-[#5C6180] hover:text-[#1A1A1A]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-tab-active"
                className="absolute inset-0 bg-[#111318] rounded-full -z-10 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full tabular-nums",
                  isActive ? "bg-white/20 text-white" : "bg-black/5 text-[#5C6180]"
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
