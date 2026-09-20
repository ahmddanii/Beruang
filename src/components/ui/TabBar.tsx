import React from "react";
import { motion } from "framer-motion";
import { Home, CheckSquare, BarChart3, FolderLock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabKey =
  | "beranda"
  | "tugas"
  | "progres"
  | "data"
  | "ai"
  | "home"
  | "misi"
  | "funding";

export interface TabBarProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  className?: string;
  onOpenAi?: () => void;
}

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "beranda", label: "Beranda", icon: Home },
  { key: "tugas", label: "Aksi", icon: CheckSquare },
  { key: "progres", label: "Audit", icon: BarChart3 },
  { key: "data", label: "Data Room", icon: FolderLock },
  { key: "ai", label: "AI Copilot", icon: Sparkles },
];

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onChange,
  className,
  onOpenAi,
}) => {
  return (
    <nav
      className={cn(
        "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-200",
        className
      )}
      aria-label="Navigasi Utama Bawah"
    >
      <div className="flex items-center gap-1 rounded-full bg-white/95 p-1.5 shadow-[0_12px_36px_rgba(18,19,22,0.14)] backdrop-blur-2xl border border-black/[0.06]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                if (tab.key === "ai" && onOpenAi) {
                  onOpenAi();
                } else {
                  onChange(tab.key);
                }
              }}
              className={cn(
                "relative flex items-center justify-center rounded-full transition-all duration-150 cursor-pointer focus:outline-none",
                isActive
                  ? "bg-[#111215] text-white px-4 py-2 gap-1.5 shadow-sm"
                  : "text-[#71768E] hover:text-[#111215] hover:bg-black/[0.03] p-2.5"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  isActive && "scale-105 text-white"
                )}
              />
              {isActive && (
                <span className="text-xs font-semibold whitespace-nowrap">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
