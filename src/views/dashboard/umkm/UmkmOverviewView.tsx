import React from "react";
import {
  TrendingUp,
  Plus,
  Receipt,
  ShieldCheck,
  FolderLock,
  ArrowUpRight,
  ChevronRight,
  Coffee,
  Award,
  BarChart3,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BusinessRadarChart } from "@/components/charts/BusinessRadarChart";
import { useApp } from "@/context/AppContext";
import { TabKey } from "@/components/ui/TabBar";

interface UmkmOverviewViewProps {
  onNavigateTab: (tab: TabKey) => void;
  onOpenRecordModal?: () => void;
  onOpenAi?: () => void;
}

export const UmkmOverviewView: React.FC<UmkmOverviewViewProps> = ({
  onNavigateTab,
  onOpenRecordModal,
  onOpenAi,
}) => {
  const { activeBusiness, tasks, monthlyReports } = useApp();

  const latestReport = monthlyReports[monthlyReports.length - 1] || {
    omzet: 52000000,
    hpp: 23000000,
    operationalCost: 13000000,
  };

  const netProfit = latestReport.omzet - latestReport.hpp - latestReport.operationalCost;
  const hppPercentage = ((latestReport.hpp / latestReport.omzet) * 100).toFixed(1);

  // Weekly Telemetry Bar Items
  const weeklyData = [
    { day: "Sen", amount: 1650000, percent: 58 },
    { day: "Sel", amount: 1820000, percent: 64 },
    { day: "Rab", amount: 2450000, percent: 86, highlight: true },
    { day: "Kam", amount: 1750000, percent: 61 },
    { day: "Jum", amount: 1980000, percent: 69 },
    { day: "Sab", amount: 2850000, percent: 100, highlight: true },
    { day: "Min", amount: 2600000, percent: 91 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Deep Botanical Hero Wallet Card (Stitch Institutional Finish) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#173F35] text-white p-6 sm:p-8 shadow-sm border border-[#173F35]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                Saldo Operasional — {activeBusiness.name}
              </span>
              <Badge variant="lime" className="text-[10px] px-2 py-0.5">
                Skor {activeBusiness.assessment.compositeScore}% • Siap Modal
              </Badge>
            </div>

            <div className="text-display font-heading text-white tabular-nums tracking-tight">
              Rp {latestReport.omzet.toLocaleString("id-ID")}
            </div>

            <p className="text-xs sm:text-sm text-white/80 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F4B8] px-2 py-0.5 text-xs font-bold text-[#173F35] tabular-nums">
                <TrendingUp className="h-3 w-3" />
                +14.2%
              </span>
              <span>vs bulan lalu • Rasio HPP Efisien {hppPercentage}%</span>
            </p>
          </div>

          {/* Action CTAs inside Hero using shadcn Button */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            <Button
              variant="secondary"
              size="default"
              onClick={onOpenRecordModal}
              className="bg-[#E8F4B8] text-[#173F35] font-semibold hover:bg-[#DCEDB0]"
            >
              <Plus className="h-4 w-4" />
              <span>Catat Omzet</span>
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={onOpenRecordModal}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              <Receipt className="h-4 w-4" />
              <span>Biaya HPP</span>
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={() => onNavigateTab("progres")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Audit Radar</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 2. AI Anomaly Alert Card */}
      <Card className="bg-[#FFFBEB] border-[#FEF3C7]">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#111E19]">
                  Peluang Efisiensi Biaya Bahan Baku Terdeteksi
                </h4>
                <p className="text-xs text-[#617369] leading-relaxed">
                  Penghematan estimasi <strong className="text-[#111E19] tabular-nums">Rp 1.200.000/bulan</strong> dengan skema beli grosir B2B mitra Beruang, memperbaiki rasio HPP ke 41.9%.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAi}
              className="border-[#D97706]/30 text-[#D97706] hover:bg-[#FEF3C7] shrink-0"
            >
              Konsultasikan ke AI Copilot →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. Telemetry Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Thick Pill Bar Chart in shadcn Card (7 cols) */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tren Penjualan Harian Minggu Ini</CardTitle>
                <CardDescription>Rata-rata transaksi: Rp 2.157.000/hari</CardDescription>
              </div>
              <Badge variant="verified">Puncak: Sabtu</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-4">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  {/* Tooltip */}
                  <span className="text-[10px] font-semibold text-[#173F35] opacity-0 group-hover:opacity-100 transition-opacity mb-1.5 tabular-nums">
                    Rp {(d.amount / 1000000).toFixed(1)}Jt
                  </span>

                  {/* Pill Bar Track */}
                  <div className="w-full max-w-[24px] sm:max-w-[28px] h-full rounded-full bg-[#F0F2EB] flex flex-col justify-end p-0.5">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ease-out ${
                        d.highlight ? "bg-[#173F35]" : "bg-[#173F35]/70 group-hover:bg-[#173F35]"
                      }`}
                      style={{ height: `${d.percent}%` }}
                    />
                  </div>

                  <span className={`mt-2 text-xs font-medium ${d.highlight ? "text-[#173F35] font-bold" : "text-[#617369]"}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: Radar Diagnostik in shadcn Card (5 cols) */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Radar 5 Dimensi Kelayakan</CardTitle>
                <CardDescription>Skor komposit: 79/100 (Layak Modal)</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateTab("progres")}
                className="text-[#173F35] text-xs font-semibold p-0 h-auto hover:bg-transparent"
              >
                Detail <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <BusinessRadarChart assessment={activeBusiness.assessment} />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E2E8E4] text-center">
              <div>
                <span className="text-[10px] text-[#617369] block">Finansial</span>
                <span className="text-sm font-bold font-heading text-[#111E19] tabular-nums">
                  {activeBusiness.assessment.financial}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#617369] block">Operasional</span>
                <span className="text-sm font-bold font-heading text-[#1F7A4D] tabular-nums">
                  {activeBusiness.assessment.operations_hpp}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#617369] block">Legalitas</span>
                <span className="text-sm font-bold font-heading text-[#111E19] tabular-nums">
                  {activeBusiness.assessment.legal}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Strategic Goals Section using shadcn Card & Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-[#111E19]">
              Target Pengembangan Usaha (Action Milestones)
            </h3>
            <p className="text-xs text-[#617369]">
              Dipandu oleh Coach {activeBusiness.consultantName} ({activeBusiness.consultantFirm})
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateTab("tugas")}
            className="text-[#173F35] text-xs font-semibold"
          >
            Lihat Semua Misi ({tasks.length}) <ChevronRight className="h-4 w-4 ml-0.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:border-[#173F35]/30 transition-colors cursor-pointer" onClick={() => onNavigateTab("tugas")}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#EBF5EE] text-[#1F7A4D] flex items-center justify-center shrink-0">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111E19]">Pengadaan Mesin Roaster Kopi 5kg</h4>
                    <span className="text-xs text-[#617369]">Ekspansi Kapasitas Produksi</span>
                  </div>
                </div>
                <Badge variant="verified">70% Selesai</Badge>
              </div>

              <div className="mt-4 flex items-baseline justify-between text-xs tabular-nums">
                <span className="font-heading font-bold text-sm text-[#111E19]">Rp 28.000.000</span>
                <span className="text-xs text-[#617369]">Target: Rp 40.000.000</span>
              </div>

              <div className="mt-2">
                <Progress value={70} />
              </div>

              <p className="mt-2 text-[11px] text-[#617369]">
                15 hari lagi menuju closing penawaran sindikasi modal kerja.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#173F35]/30 transition-colors cursor-pointer" onClick={() => onNavigateTab("tugas")}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111E19]">Sertifikasi Halal BPJPH & BPOM MD</h4>
                    <span className="text-xs text-[#617369]">Kepatuhan & Standarisasi Pangan</span>
                  </div>
                </div>
                <Badge variant="warning">80% Selesai</Badge>
              </div>

              <div className="mt-4 flex items-baseline justify-between text-xs tabular-nums">
                <span className="font-heading font-bold text-sm text-[#111E19]">Rp 12.000.000</span>
                <span className="text-xs text-[#617369]">Target: Rp 15.000.000</span>
              </div>

              <div className="mt-2">
                <Progress value={80} />
              </div>

              <p className="mt-2 text-[11px] text-[#617369]">
                Dokumen audit tahap 2 telah diserahkan ke auditor LPPOM MUI.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 5. Key Supporting Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 space-y-1">
            <span className="text-xs text-[#617369]">Laba Bersih Bulan Ini</span>
            <div className="font-heading text-2xl font-bold text-[#111E19] tabular-nums">
              Rp {(netProfit / 1000000).toFixed(1)} Jt
            </div>
            <p className="text-xs text-[#1F7A4D] font-medium">+18.5% vs rata-rata Q2</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1">
            <span className="text-xs text-[#617369]">Rasio Biaya HPP</span>
            <div className="font-heading text-2xl font-bold text-[#111E19] tabular-nums">
              {hppPercentage}%
            </div>
            <p className="text-xs text-[#1F7A4D] font-medium">Efisiensi bahan baku stabil</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1">
            <span className="text-xs text-[#617369]">Minat Investor Masuk</span>
            <div className="font-heading text-2xl font-bold text-[#173F35] tabular-nums">
              2 Investor
            </div>
            <button
              onClick={() => onNavigateTab("data")}
              className="text-xs text-[#173F35] font-semibold hover:underline flex items-center gap-1 cursor-pointer pt-0.5"
            >
              Buka Bilik Data Room →
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
