import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  id: string | number;
  title: string;
  subtitle?: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
}

interface StepMilestoneTimelineProps {
  title?: string;
  badge?: string;
  steps: StepItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const StepMilestoneTimeline: React.FC<StepMilestoneTimelineProps> = ({
  title = "Tahapan Validasi Pendanaan",
  badge = "Proses Audit",
  steps,
  orientation = "horizontal",
  className = "",
}) => {
  return (
    <div
      className={`rounded-[26px] bg-white p-6 shadow-[0_4px_20px_rgba(18,19,22,0.03)] border border-black/[0.04] ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-5">
        <h3 className="font-heading text-base font-semibold text-[#121316]">
          {title}
        </h3>
        {badge && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
            {badge}
          </span>
        )}
      </div>

      {orientation === "horizontal" ? (
        <div className="mt-2">
          {/* Progress Tracker Bar */}
          <div className="relative flex items-center justify-between">
            {/* Connecting Line */}
            <div className="absolute left-3 right-3 top-3.5 h-[2px] -translate-y-1/2 bg-[#ECEEF2]">
              {/* Calculate completed width */}
              <div
                className="h-full bg-[#111215] transition-all duration-500"
                style={{
                  width: `${
                    (steps.filter((s) => s.status === "completed").length /
                      Math.max(steps.length - 1, 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            {steps.map((step, idx) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <div key={step.id || idx} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                      isCompleted
                        ? "bg-[#111215] text-white shadow-sm"
                        : isCurrent
                        ? "border-2 border-[#111215] bg-white text-[#111215]"
                        : "border-2 border-[#ECEEF2] bg-white text-[#A0A5BD]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  <span
                    className={`mt-2 text-center text-xs font-medium max-w-[80px] leading-tight ${
                      isCompleted || isCurrent ? "text-[#121316]" : "text-[#A0A5BD]"
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.timestamp && (
                    <span className="text-[10px] text-[#71768E] mt-0.5">
                      {step.timestamp}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Vertical Orientation */
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#ECEEF2]">
          {steps.map((step, idx) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <div key={step.id || idx} className="relative flex items-start gap-3">
                <div
                  className={`absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isCompleted
                      ? "bg-[#111215] text-white shadow-sm"
                      : isCurrent
                      ? "border-2 border-[#111215] bg-white text-[#111215]"
                      : "border-2 border-[#ECEEF2] bg-white text-[#A0A5BD]"
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3 stroke-[2.5]" /> : idx + 1}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#121316]">
                    {step.title}
                  </div>
                  {step.subtitle && (
                    <div className="text-[11px] text-[#71768E] mt-0.5">
                      {step.subtitle}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
