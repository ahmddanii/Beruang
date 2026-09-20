import React from "react";
import { LucideIcon } from "lucide-react";

export interface DockItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

interface FloatingIslandDockProps {
  items: DockItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const FloatingIslandDock: React.FC<FloatingIslandDockProps> = ({
  items,
  activeId,
  onSelect,
  className = "",
}) => {
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${className}`}
    >
      <nav
        aria-label="Floating Island Navigation"
        className="flex items-center gap-1 rounded-full bg-white/90 p-1.5 shadow-[0_12px_36px_rgba(18,19,22,0.12)] backdrop-blur-2xl border border-black/[0.06]"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`relative flex items-center gap-1.5 rounded-full transition-all duration-150 focus:outline-none ${
                isActive
                  ? "bg-[#111215] text-white px-3.5 py-2 shadow-sm"
                  : "text-[#71768E] hover:text-[#111215] hover:bg-black/[0.03] p-2.5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {isActive && (
                <span className="text-xs font-semibold whitespace-nowrap">
                  {item.label}
                </span>
              )}

              {item.badge !== undefined && (
                <span
                  className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-[#111215] text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
