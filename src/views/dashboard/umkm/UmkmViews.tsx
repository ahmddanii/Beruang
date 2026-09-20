import React from "react";
import { TabKey } from "@/components/ui/TabBar";
import { UmkmOverviewView } from "./UmkmOverviewView";
import { UmkmAssessmentView } from "./UmkmAssessmentView";
import { UmkmActionPlanView } from "./UmkmActionPlanView";
import { UmkmProgressView } from "./UmkmProgressView";
import { UmkmDataRoomView } from "./UmkmDataRoomView";

export interface UmkmViewsProps {
  activeTab: TabKey;
  onTabChange?: (tab: TabKey) => void;
  onOpenAiAssistant?: () => void;
  onOpenProfile?: () => void;
  onOpenNotifications?: () => void;
}

export const UmkmViews: React.FC<UmkmViewsProps> = ({
  activeTab,
  onTabChange,
  onOpenAiAssistant,
}) => {
  const isBeranda = activeTab === "beranda" || activeTab === "home";
  const isTugas = activeTab === "tugas" || activeTab === "misi";
  const isProgres = activeTab === "progres";
  const isData = activeTab === "data" || activeTab === "funding";

  return (
    <div className="w-full">
      {isBeranda && (
        <UmkmOverviewView
          onNavigateTab={(tab) => onTabChange && onTabChange(tab)}
          onOpenRecordModal={() => onTabChange && onTabChange("progres")}
          onOpenAi={onOpenAiAssistant}
        />
      )}

      {isTugas && <UmkmActionPlanView />}

      {isProgres && (
        <div className="space-y-12">
          {/* Progress View includes both Assessment Radar and Monthly Telemetry */}
          <UmkmProgressView />
          <div className="border-t border-[#ECEEF5] pt-8">
            <UmkmAssessmentView />
          </div>
        </div>
      )}

      {isData && <UmkmDataRoomView />}
    </div>
  );
};
