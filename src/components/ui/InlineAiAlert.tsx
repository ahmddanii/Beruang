import React from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface InlineAiAlertProps {
  title: string;
  description: string;
  points?: string[];
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function InlineAiAlert({
  title,
  description,
  points,
  actionLabel = "Tinjau Anomali",
  onAction,
  onDismiss,
  className,
}: InlineAiAlertProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-[#F0F4EC] border border-[#C8DCBE] border-l-4 border-l-[#173F35] p-4 mb-6 shadow-xs relative transition-all animate-in fade-in slide-in-from-top-2 duration-300",
        className
      )}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#E8F4B8] text-[#173F35] shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-[#111E19] tracking-tight flex items-center gap-2">
              {title}
              <span className="text-[10px] uppercase tracking-wider bg-[#E8F4B8] text-[#173F35] font-bold px-2 py-0.5 rounded-md border border-[#173F35]/15">
                AI Telemetry
              </span>
            </h4>
            <p className="text-sm text-[#617369] mt-1 leading-relaxed">
              {description}
            </p>

            {points && points.length > 0 && (
              <ul className="mt-2.5 space-y-1">
                {points.map((pt, idx) => (
                  <li key={idx} className="text-xs text-[#111E19] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#173F35] shrink-0" />
                    <span className="tabular-nums">{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {onAction && (
              <div className="mt-3.5 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={onAction}
                  className="bg-[#173F35] hover:bg-[#204F43] text-white text-xs font-semibold rounded-lg h-8 px-3"
                >
                  {actionLabel}
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-[#5C6180] hover:text-[#1A1A1A] p-1 rounded-lg hover:bg-[#FEF3C7] transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
