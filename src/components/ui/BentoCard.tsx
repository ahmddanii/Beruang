import React from "react";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "dark" | "hero";
}

export function BentoCard({
  title,
  subtitle,
  badge,
  action,
  variant = "default",
  children,
  className,
  ...props
}: BentoCardProps) {
  const isHero = variant === "hero" || variant === "dark";

  return (
    <div
      className={cn(
        "rounded-[26px] p-6 transition-all duration-150 flex flex-col justify-between relative overflow-hidden",
        isHero
          ? "bg-[#111215] text-white shadow-[0_12px_32px_rgba(17,18,21,0.15)] border border-white/5"
          : "bg-white text-[#121316] border border-black/[0.04] shadow-[0_4px_20px_rgba(18,19,22,0.03)]",
        className
      )}
      {...props}
    >
      {(title || subtitle || badge || action) && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            {badge && <div className="mb-2">{badge}</div>}
            {title && (
              <h3
                className={cn(
                  "font-heading text-base font-semibold tracking-tight",
                  isHero ? "text-white" : "text-[#121316]"
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-xs mt-1 leading-relaxed",
                  isHero ? "text-[#8F95B2]" : "text-[#71768E]"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
