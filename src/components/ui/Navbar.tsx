import React from "react";
import { Sparkles, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";

export interface NavbarProps {
  userRole: "umkm" | "konsultan" | "investor" | "admin";
  onSwitchRole?: (role: "umkm" | "konsultan" | "investor" | "admin") => void;
  userName?: string;
  businessName?: string;
  onOpenAi?: () => void;
  onOpenNotifications?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  userRole,
  onSwitchRole,
  userName = "Budi Santoso",
  businessName = "Kopi Kenangan Senja",
  onOpenAi,
  onOpenNotifications,
  onLogout,
  onOpenProfile,
  className,
}) => {
  const roleLabel =
    {
      umkm: "Owner UMKM",
      konsultan: "Business Consultant",
      investor: "Verified Investor",
      admin: "Platform Admin",
    }[userRole] || "User";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8E4] px-4 sm:px-8 py-3 transition-colors",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Telemetry Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Beruang Logo" className="h-8 w-8 object-contain" />
            <div>
              <span className="font-heading font-bold text-lg tracking-tight text-[#111E19]">
                Beruang
              </span>
              <span className="text-[10px] block text-[#617369] font-medium -mt-1 tracking-tight">
                Capital & Growth
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF5EE] border border-[#1F7A4D]/20 text-xs font-semibold text-[#1F7A4D]">
            <span className="h-2 w-2 rounded-full bg-[#1F7A4D] animate-pulse" />
            <span className="tabular-nums">Live Telemetry</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Badge */}
          <Badge variant="lime" className="hidden sm:inline-flex text-xs px-2.5 py-1 font-semibold">
            {roleLabel}
          </Badge>

          {/* AI Copilot Button */}
          {onOpenAi && (
            <Button
              size="sm"
              onClick={onOpenAi}
              className="bg-[#173F35] hover:bg-[#204F43] text-white rounded-xl h-8.5 px-3 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#E8F4B8]" />
              <span className="hidden sm:inline">AI Copilot</span>
            </Button>
          )}

          {/* Notifications */}
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notifikasi"
            className="relative h-8.5 w-8.5 rounded-xl bg-white border border-[#E2E8E4] flex items-center justify-center text-[#617369] hover:text-[#111E19] hover:bg-[#F0F2EB] transition-colors cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#1F7A4D] ring-2 ring-white" />
          </button>

          {/* User Profile Pill */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-1 sm:pl-2 rounded-xl hover:bg-[#F0F2EB] p-1 transition-colors cursor-pointer text-left"
          >
            <div className="h-8.5 w-8.5 rounded-xl bg-[#173F35] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-[#111E19] leading-tight truncate max-w-[120px]">
                {userName}
              </div>
              <div className="text-[10px] text-[#617369] font-medium leading-tight">
                {roleLabel}
              </div>
            </div>
          </button>

          {/* Logout Button */}
          {onLogout && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              title="Keluar dari akun"
              className="h-8.5 px-2.5 text-xs text-[#617369] hover:text-[#DC2626] hover:bg-[#FEE2E2]/60 rounded-xl"
            >
              <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
