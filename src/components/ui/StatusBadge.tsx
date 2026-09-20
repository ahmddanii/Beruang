import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "funding"
  | "validated"
  | "warning"
  | "danger"
  | "neutral"
  | "gold"
  | "yellow"
  | "green"
  | "orange"
  | "red"
  | "blue"
  | "dark"
  | "ice-blue"
  | "transit"
  | "mint";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeVariant;
  showDot?: boolean;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

const variantStyles: Record<string, { container: string; dot: string }> = {
  funding: {
    container: "bg-[#E8F4B8] text-[#173F35] font-semibold border border-[#173F35]/10",
    dot: "bg-[#173F35]",
  },
  gold: {
    container: "bg-[#FEF3C7] text-[#92400E] font-semibold border border-[#92400E]/15",
    dot: "bg-[#F59E0B]",
  },
  yellow: {
    container: "bg-[#FEF3C7] text-[#92400E] font-semibold border border-[#92400E]/15",
    dot: "bg-[#F59E0B]",
  },
  validated: {
    container: "bg-[#EBF5EE] text-[#1F7A4D] font-semibold border border-[#1F7A4D]/20",
    dot: "bg-[#1F7A4D]",
  },
  green: {
    container: "bg-[#EBF5EE] text-[#1F7A4D] font-semibold border border-[#1F7A4D]/20",
    dot: "bg-[#1F7A4D]",
  },
  mint: {
    container: "bg-[#EBF5EE] text-[#1F7A4D] font-semibold border border-[#1F7A4D]/20",
    dot: "bg-[#1F7A4D]",
  },
  "ice-blue": {
    container: "bg-[#F0F2EB] text-[#173F35] font-semibold border border-[#E2E8E4]",
    dot: "bg-[#173F35]",
  },
  transit: {
    container: "bg-[#F0F2EB] text-[#173F35] font-semibold border border-[#E2E8E4]",
    dot: "bg-[#173F35]",
  },
  warning: {
    container: "bg-[#FEF3C7] text-[#92400E] font-semibold border border-[#92400E]/20",
    dot: "bg-[#D97706]",
  },
  orange: {
    container: "bg-[#FFF7ED] text-[#C2410C] font-semibold border border-[#C2410C]/20",
    dot: "bg-[#F97316]",
  },
  danger: {
    container: "bg-[#FEE2E2] text-[#991B1B] font-semibold border border-[#DC2626]/20",
    dot: "bg-[#DC2626]",
  },
  red: {
    container: "bg-[#FEE2E2] text-[#991B1B] font-semibold border border-[#DC2626]/20",
    dot: "bg-[#DC2626]",
  },
  blue: {
    container: "bg-[#173F35]/10 text-[#173F35] font-semibold border border-[#173F35]/20",
    dot: "bg-[#173F35]",
  },
  neutral: {
    container: "bg-[#F0F2EB] text-[#617369] font-medium border border-[#E2E8E4]",
    dot: "bg-[#617369]",
  },
  dark: {
    container: "bg-[#173F35] text-[#E8F4B8] font-semibold",
    dot: "bg-[#E8F4B8]",
  },
};

export function StatusBadge({
  children,
  variant,
  tone,
  showDot = true,
  size = "md",
  icon,
  className,
  ...props
}: StatusBadgeProps) {
  const activeKey = variant || tone || "neutral";
  const current = variantStyles[activeKey] || variantStyles.neutral;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full tracking-wide transition-colors select-none",
        size === "sm" ? "text-[10px] px-2.5 py-0.5 gap-1.5" : "text-xs px-3 py-1 gap-1.5",
        current.container,
        className
      )}
      {...props}
    >
      {icon ? (
        <span className="shrink-0">{icon}</span>
      ) : showDot ? (
        <span
          className={cn(
            size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5",
            "rounded-full shrink-0",
            current.dot
          )}
          aria-hidden="true"
        />
      ) : null}
      <span>{children}</span>
    </span>
  );
}
