import React, { useState } from "react";
import { Eye, EyeOff, Plus, Receipt, ShieldCheck, FolderLock, TrendingUp } from "lucide-react";

interface HeroWalletCardProps {
  businessName?: string;
  balance?: string;
  growthPercent?: string;
  growthLabel?: string;
  fundingReadinessScore?: number;
  fundingStatusText?: string;
  onCatatOmzet?: () => void;
  onBiayaHpp?: () => void;
  onAuditRadar?: () => void;
  onDataRoom?: () => void;
}

export const HeroWalletCard: React.FC<HeroWalletCardProps> = ({
  businessName = "Kopi Nusantara",
  balance = "Rp 52.000.000",
  growthPercent = "+14.2%",
  growthLabel = "vs bulan lalu",
  fundingReadinessScore = 79,
  fundingStatusText = "Siap Pendanaan",
  onCatatOmzet,
  onBiayaHpp,
  onAuditRadar,
  onDataRoom,
}) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#111215] text-white p-6 sm:p-7 shadow-[0_12px_32px_rgba(17,18,21,0.18)] transition-all">
      {/* Subtle Ambient Radial Highlight */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium tracking-wide text-[#8F95B2]">
            Saldo Operasional — {businessName}
          </span>
          <button
            type="button"
            onClick={() => setShowBalance(!showBalance)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#8F95B2] transition-colors hover:text-white"
            title={showBalance ? "Sembunyikan Saldo" : "Tampilkan Saldo"}
          >
            {showBalance ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Readiness Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-3 py-1 text-[11px] font-semibold text-[#92400E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
          <span>Skor {fundingReadinessScore}% • {fundingStatusText}</span>
        </div>
      </div>

      {/* Balance & Growth Display */}
      <div className="relative z-10 mt-4">
        <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
          {showBalance ? balance : "••••••••••"}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 tabular-nums">
            <TrendingUp className="h-3 w-3" />
            {growthPercent}
          </span>
          <span className="text-xs text-[#8F95B2]">{growthLabel}</span>
        </div>
      </div>

      {/* Action Buttons Row (White Circular / Capsule Buttons matching Image 2 & 5) */}
      <div className="relative z-10 mt-6 grid grid-cols-4 gap-2 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={onCatatOmzet}
          className="group flex flex-col items-center gap-1.5 text-center focus:outline-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111215] shadow-sm transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
            <Plus className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-medium text-white/90 group-hover:text-white">
            Catat Omzet
          </span>
        </button>

        <button
          type="button"
          onClick={onBiayaHpp}
          className="group flex flex-col items-center gap-1.5 text-center focus:outline-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-150 group-hover:bg-white/20 group-hover:scale-105 group-active:scale-95">
            <Receipt className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium text-[#8F95B2] group-hover:text-white">
            Biaya HPP
          </span>
        </button>

        <button
          type="button"
          onClick={onAuditRadar}
          className="group flex flex-col items-center gap-1.5 text-center focus:outline-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-150 group-hover:bg-white/20 group-hover:scale-105 group-active:scale-95">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium text-[#8F95B2] group-hover:text-white">
            Audit Radar
          </span>
        </button>

        <button
          type="button"
          onClick={onDataRoom}
          className="group flex flex-col items-center gap-1.5 text-center focus:outline-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-150 group-hover:bg-white/20 group-hover:scale-105 group-active:scale-95">
            <FolderLock className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium text-[#8F95B2] group-hover:text-white">
            Data Room
          </span>
        </button>
      </div>
    </div>
  );
};
