import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  ReceiptText,
  FolderLock,
  Building2,
  Users,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

export interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  userRole: "umkm" | "konsultan" | "investor" | "admin";
  className?: string;
}

export interface NavItem {

  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  userRole,
  className,
}) => {
  const navItemsMap: Record<"umkm" | "konsultan" | "investor" | "admin", NavItem[]> = {
    umkm: [
      { id: "beranda", label: "Dashboard Telemetri", icon: LayoutDashboard },
      { id: "action_plan", label: "Action Plan", icon: CheckSquare, badge: "3 Aktif" },
      { id: "laporan_keuangan", label: "Laporan & Kas Harian", icon: ReceiptText },
      { id: "radar_diagnostik", label: "Audit 5-Dimensi", icon: BarChart3 },
      { id: "data_room", label: "Verified Data Room", icon: FolderLock },
      { id: "profil_bisnis", label: "Profil & Dokumen", icon: Building2 },
    ],
    konsultan: [
      { id: "klien", label: "Daftar Portofolio Klien", icon: Users },
      { id: "diagnostik", label: "Radar Diagnostic", icon: BarChart3 },
      { id: "verifikasi", label: "Verifikasi Laporan", icon: ShieldCheck, badge: "2 Baru" },
      { id: "action_plan", label: "Review Action Plan", icon: CheckSquare },
    ],
    investor: [
      { id: "deal_flow", label: "Curated Deal Flow", icon: TrendingUp },
      { id: "data_room", label: "Data Room Due Diligence", icon: FolderLock },
      { id: "portofolio", label: "Investasi Aktif", icon: LayoutDashboard },
    ],
    admin: [
      { id: "beranda", label: "Admin Console", icon: LayoutDashboard },
      { id: "klien", label: "User Management", icon: Users },
      { id: "data_room", label: "Compliance & Audit", icon: ShieldCheck },
    ],
  };

  const navItems: NavItem[] = navItemsMap[userRole] || [];



  return (
    <aside
      className={cn(
        "w-60 shrink-0 hidden xl:flex flex-col justify-between p-4 bg-white border-r border-[#ECEEF5] min-h-[calc(100vh-61px)] sticky top-[61px]",
        className
      )}
    >
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-semibold text-[#5C6180] uppercase tracking-wider px-3 mb-2 block">
            Menu Utama
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left",
                    isActive
                      ? "bg-[#0066FF] text-white shadow-xs"
                      : "text-[#5C6180] hover:text-[#1A1A1A] hover:bg-[#F5F6FB]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-[#5C6180]")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-md font-bold tabular-nums",
                        isActive ? "bg-white/20 text-white" : "bg-[#ECEEF5] text-[#1A1A1A]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Status Card */}
      {userRole === "umkm" && (
        <div className="p-4 rounded-2xl bg-[#F5F6FB] border border-[#ECEEF5] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#5C6180]">Status Kesiapan</span>
            <StatusBadge variant="funding">Ready</StatusBadge>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-heading font-extrabold text-xl text-[#1A1A1A] tabular-nums">
                84/100
              </span>
              <span className="text-[10px] text-[#10B981] font-semibold">Memenuhi Syarat</span>
            </div>
            <div className="w-full h-1.5 bg-[#ECEEF5] rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-[#0066FF] rounded-full w-[84%]" />
            </div>
          </div>
          <p className="text-[10px] text-[#5C6180] leading-snug">
            3 dari 3 pilar fundamental keuangan telah terverifikasi oleh Konsultan Akuntan.
          </p>
        </div>
      )}
    </aside>
  );
};
