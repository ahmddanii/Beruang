import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth, UserRole } from "../../context/AuthContext";
import { TabKey } from "../../components/ui/TabBar";
import { Navbar } from "../../components/ui/Navbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { AiAssistantModal } from "../../components/ui/AiAssistantModal";
import { OnboardingWizard } from "../../components/onboarding/OnboardingWizard";
import { UmkmViews } from "./umkm/UmkmViews";
import { KonsultanViews } from "./konsultan/KonsultanViews";
import { InvestorViews } from "./investor/InvestorViews";
import {
  LogOut,
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  FolderLock,
  Sparkles,
} from "lucide-react";

export const RoleDashboard: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("beranda");
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!user) return null;

  const roleLabels: Record<UserRole, string> = {
    umkm: "Owner UMKM",
    konsultan: "Business Consultant",
    investor: "Verified Investor",
    admin: "Platform Admin",
  };

  const navTabs = [
    { key: "beranda" as TabKey, label: "Overview", icon: LayoutDashboard },
    { key: "tugas" as TabKey, label: "Action Plan", icon: CheckSquare },
    { key: "progres" as TabKey, label: "Audit & Kas", icon: BarChart3 },
    { key: "data" as TabKey, label: "Data Room", icon: FolderLock },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F4] text-[#111E19] flex flex-col font-sans selection:bg-[#E8F4B8] selection:text-[#173F35]">
      {/* 1. Global Navigation Bar */}
      <Navbar
        userRole={user.role}
        onSwitchRole={(r) => switchRole(r)}
        userName={user.name}
        businessName={user.businessName}
        onOpenAi={() => setShowAiAssistant(true)}
        onOpenNotifications={() => setActiveTab("data")}
        onOpenProfile={() => setShowProfileSheet(true)}
        onLogout={logout}
      />

      {/* 2. Secondary Subnav Tabs (Clean Stitch Segmented Navigation) */}
      <div className="border-b border-[#E2E8E4] bg-white/80 backdrop-blur-md sticky top-[61px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-14">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#173F35] text-white shadow-xs"
                      : "text-[#617369] hover:text-[#111E19] hover:bg-[#F0F2EB]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="verified">
              Verifikasi Aktif
            </Badge>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container (Spacious, No Fake Phone Mockup Gimmick) */}
      <main className="w-full max-w-7xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={`${user.role}-${activeTab}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {user.role === "umkm" && (
            <UmkmViews
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onOpenAiAssistant={() => setShowAiAssistant(true)}
              onOpenProfile={() => setShowProfileSheet(true)}
              onOpenNotifications={() => setActiveTab("data")}
            />
          )}

          {user.role === "konsultan" && (
            <KonsultanViews
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}

          {user.role === "investor" && (
            <InvestorViews
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
        </motion.div>
      </main>

      {/* 4. AI Copilot Dialog */}
      <AiAssistantModal
        open={showAiAssistant}
        onOpenChange={setShowAiAssistant}
        businessName={user.businessName || "Bisnis UMKM"}
      />

      {/* 5. Onboarding Wizard Modal */}
      <OnboardingWizard
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={() => setShowOnboarding(false)}
      />

      {/* 6. User Profile Modal Dialog (shadcn Dialog) */}
      <Dialog open={showProfileSheet} onOpenChange={setShowProfileSheet}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl border-[#E2E8E4]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#111E19]">
              Profil & Pengaturan Akun
            </DialogTitle>
            <DialogDescription className="text-xs text-[#617369]">
              Kelola peran pengguna dan sesi platform Beruang Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* User Details */}
            <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-[#173F35] text-white flex items-center justify-center font-bold text-base shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-[#111E19] truncate">{user.name}</h4>
                <p className="text-xs text-[#617369] truncate">{user.email}</p>
                <div className="mt-1">
                  <Badge variant="lime">
                    {roleLabels[user.role]}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Role Switcher Demo */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#111E19] block">
                Ganti Peran Pengguna (Demo):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["umkm", "konsultan", "investor"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      switchRole(r);
                      setShowProfileSheet(false);
                    }}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer capitalize text-center ${
                      user.role === r
                        ? "bg-[#173F35] text-white border-[#173F35] shadow-xs"
                        : "bg-white text-[#617369] border-[#E2E8E4] hover:bg-[#F0F2EB]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <div className="pt-2">
              <Button
                variant="destructive"
                className="w-full h-10 text-xs font-semibold"
                onClick={() => {
                  setShowProfileSheet(false);
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar dari Sesi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
