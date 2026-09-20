import React, { useState } from "react";
import {
  TrendingUp,
  Plus,
  ReceiptText,
  Calendar,
  BarChart3,
  FileCheck2,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Calculator,
  X
} from "lucide-react";
import { FinancialTrendChart } from "@/components/charts/FinancialTrendChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModalDialog } from "@/components/ui/ModalDialog";
import { useApp } from "@/context/AppContext";

export const UmkmProgressView: React.FC = () => {
  const { monthlyReports, submitMonthlyReport } = useApp();

  const [showInputModal, setShowInputModal] = useState(false);
  const [omzetInput, setOmzetInput] = useState("54000000");
  const [hppInput, setHppInput] = useState("23500000");
  const [operationalInput, setOperationalInput] = useState("13200000");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Calculations
  const numOmzet = Number(omzetInput) || 0;
  const numHpp = Number(hppInput) || 0;
  const numOp = Number(operationalInput) || 0;
  const grossProfit = numOmzet - numHpp;
  const netProfit = grossProfit - numOp;
  const hppRatio = numOmzet > 0 ? ((numHpp / numOmzet) * 100).toFixed(1) : "0";
  const netMargin = numOmzet > 0 ? ((netProfit / numOmzet) * 100).toFixed(1) : "0";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMonthlyReport({
      omzet: numOmzet,
      hpp: numHpp,
      operationalCost: numOp,
    });
    setToastMessage("Rapor keuangan bulanan berhasil disimpan dan masuk antrean verifikasi!");
    setShowInputModal(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#173F35] text-white flex items-center justify-between gap-3 shadow-lg border border-[#173F35]/20 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
            <Sparkles className="h-4 w-4 text-[#E8F4B8] shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/70 hover:text-white p-1 cursor-pointer"
            aria-label="Tutup notifikasi"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block mb-1">
            Rekam Jejak Finansial Terverifikasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Tren Finansial & Pembukuan Bulanan
          </h1>
          <p className="text-sm text-[#617369] mt-1">
            Riwayat performa omzet, efisiensi HPP, dan laba bersih yang diaudit langsung oleh konsultan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="default"
            onClick={() => setShowInputModal(true)}
            className="cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Catat Rapor Bulan Baru</span>
          </Button>
        </div>
      </div>

      {/* 2. Interactive Financial Charts Bento Card */}
      <Card className="bg-white space-y-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Grafik Pertumbuhan & Arus Kas</CardTitle>
              <CardDescription className="mt-0.5">
                Visualisasi historis Omzet (Hijau Tua), HPP (Kuning-Emas), dan Kas Bersih (Emerald).
              </CardDescription>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-[#617369]">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#173F35]" />
                <span className="text-[#111E19]">Omzet</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="text-[#111E19]">HPP</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1F7A4D]" />
                <span className="text-[#111E19]">Kas Bersih</span>
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="h-72 sm:h-80 w-full pt-1">
            <FinancialTrendChart reports={monthlyReports} />
          </div>

          {/* 3 Summary Stats in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8E4]">
            <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-1">
              <span className="text-xs font-medium text-[#617369]">Rata-rata Omzet / Bulan</span>
              <div className="text-xl font-bold font-heading text-[#111E19] tabular-nums">
                Rp 49.5 Juta
              </div>
              <p className="text-[11px] text-[#1F7A4D] font-semibold">+12.4% tren stabil</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-1">
              <span className="text-xs font-medium text-[#617369]">Rasio HPP Terkini</span>
              <div className="text-xl font-bold font-heading text-[#111E19] tabular-nums">
                44.2%
              </div>
              <p className="text-[11px] text-[#1F7A4D] font-semibold">Turun dari 49.8% (Maret 2026)</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-1">
              <span className="text-xs font-medium text-[#617369]">Total Kas Terkumpul</span>
              <div className="text-xl font-bold font-heading text-[#111E19] tabular-nums">
                Rp 38.5 Juta
              </div>
              <p className="text-[11px] text-[#617369] font-medium">Cadangan 2.8 bulan operasional</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Monthly Ledger Table */}
      <Card className="bg-white space-y-4">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Riwayat Laporan Keuangan Bulanan</CardTitle>
              <CardDescription className="mt-0.5">
                Data terverifikasi yang dapat diakses calon investor pada Bilik Data (Data Room).
              </CardDescription>
            </div>
            <Badge variant="neutral" className="tabular-nums">
              {monthlyReports.length} Laporan Tercatat
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border border-[#E2E8E4] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#F0F2EB]">
                <TableRow className="border-[#E2E8E4]">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-[#617369]">Periode Bulan</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-[#617369]">Total Omzet</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-[#617369]">Total HPP</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-[#617369]">Biaya Operasional</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-[#617369]">Laba Bersih</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-[#617369]">Status Audit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyReports.map((report) => {
                  const profit = report.omzet - report.hpp - report.operationalCost;
                  return (
                    <TableRow key={report.id} className="border-[#E2E8E4] hover:bg-[#F0F2EB]/50 transition-colors">
                      <TableCell className="font-semibold text-[#111E19]">{report.month}</TableCell>
                      <TableCell className="font-medium text-[#111E19] tabular-nums">
                        Rp {report.omzet.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="font-medium text-[#617369] tabular-nums">
                        Rp {report.hpp.toLocaleString("id-ID")} ({((report.hpp / report.omzet) * 100).toFixed(1)}%)
                      </TableCell>
                      <TableCell className="font-medium text-[#617369] tabular-nums">
                        Rp {report.operationalCost.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="font-bold text-[#1F7A4D] tabular-nums">
                        Rp {profit.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.status === "verified" ? "verified" : "warning"}>
                          {report.status === "verified" ? "Terverifikasi" : "Menunggu Audit"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 4. Monthly Record Modal Dialog */}
      <ModalDialog
        open={showInputModal}
        onOpenChange={setShowInputModal}
        title="Catat Rapor Telemetri Bulanan"
        description="Masukkan data omzet, biaya HPP, dan operasional bulan berjalan untuk diverifikasi konsultan."
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#111E19]">
              Total Omzet Penjualan (Rp)
            </label>
            <Input
              type="number"
              value={omzetInput}
              onChange={(e) => setOmzetInput(e.target.value)}
              placeholder="54000000"
              required
            />
            <p className="text-[11px] text-[#617369]">Total pemasukan kotor dari seluruh transaksi penjualan.</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#111E19]">
              Total Biaya HPP (Rp)
            </label>
            <Input
              type="number"
              value={hppInput}
              onChange={(e) => setHppInput(e.target.value)}
              placeholder="23500000"
              required
            />
            <p className="text-[11px] text-[#617369]">Biaya langsung bahan baku, kemasan, dan modal barang dagangan.</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#111E19]">
              Biaya Operasional (Rp)
            </label>
            <Input
              type="number"
              value={operationalInput}
              onChange={(e) => setOperationalInput(e.target.value)}
              placeholder="13200000"
              required
            />
            <p className="text-[11px] text-[#617369]">Gaji tim, sewa tempat, listrik, internet, dan utilitas operasional.</p>
          </div>

          {/* Live Metric Preview Card */}
          <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-2 text-xs">
            <span className="font-bold text-[#111E19] flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-[#173F35]" />
              Kalkulasi Otomatis (Live Preview):
            </span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[#617369] block">Rasio HPP:</span>
                <strong className={`tabular-nums ${Number(hppRatio) <= 45 ? "text-[#1F7A4D]" : "text-[#D97706]"}`}>
                  {hppRatio}% {Number(hppRatio) <= 45 ? "(Efisien)" : "(Perlu Waspada)"}
                </strong>
              </div>
              <div>
                <span className="text-[#617369] block">Estimasi Laba Bersih:</span>
                <strong className="text-[#173F35] tabular-nums font-bold">
                  Rp {netProfit.toLocaleString("id-ID")} ({netMargin}%)
                </strong>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8E4]">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={() => setShowInputModal(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="default"
            >
              Simpan & Ajukan Verifikasi
            </Button>
          </div>
        </form>
      </ModalDialog>
    </div>
  );
};
