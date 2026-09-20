import React, { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  FileLock2,
  Lock,
  Unlock,
  CheckCircle2,
  DollarSign,
  FileText,
  AlertCircle,
  Building2,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { TabKey } from "@/components/ui/TabBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalDialog } from "@/components/ui/ModalDialog";
import { FinancialTrendChart } from "@/components/charts/FinancialTrendChart";
import { BusinessRadarChart } from "@/components/charts/BusinessRadarChart";
import { useApp } from "@/context/AppContext";

interface InvestorViewsProps {
  activeTab: TabKey;
  onTabChange?: (tab: TabKey) => void;
}

export const InvestorViews: React.FC<InvestorViewsProps> = ({ activeTab, onTabChange }) => {
  const {
    businesses,
    monthlyReports,
    documents,
    accessRequests,
    requestAccess,
  } = useApp();

  const [selectedBizForRequest, setSelectedBizForRequest] = useState<string | null>(null);
  const [ticketInput, setTicketInput] = useState("250000000");
  const [requestSuccess, setRequestSuccess] = useState(false);

  const readyBusinesses = businesses.filter((b) => b.status === "READY_FOR_FUNDING");
  const selectedBiz = businesses.find((b) => b.id === selectedBizForRequest);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBizForRequest) {
      const ticketFormatted = `Rp ${(Number(ticketInput) / 1000000).toLocaleString("id-ID")} Juta`;
      requestAccess(selectedBizForRequest, ticketFormatted);
      setRequestSuccess(true);
      setTimeout(() => {
        setSelectedBizForRequest(null);
        setRequestSuccess(false);
      }, 2500);
    }
  };

  return (
    <div className="space-y-8 pb-32">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block mb-1">
            Verified Investor Deal Flow
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Katalog UMKM Terverifikasi & Due Diligence
          </h1>
          <p className="text-sm text-[#617369] mt-1">
            Peluang investasi UMKM yang telah lulus audit kelayakan 5 pilar oleh Business Consultant terakreditasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="lime" className="px-3 py-1 text-xs sm:text-sm">
            Investor Terakreditasi: OJK & Kemenkop
          </Badge>
        </div>
      </div>

      {/* 2. Commitment Card (Deep Forest Botanical Green Surface) */}
      <Card className="bg-[#173F35] text-white border-[#173F35] shadow-lg p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#E8F4B8] uppercase tracking-wider block">
              Komitmen Alokasi Modal Aktif
            </span>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tabular-nums tracking-tight">
              Rp 1.500.000.000
            </div>
            <p className="text-xs sm:text-sm text-[#D1E0D9]">
              Sindikasi: <strong className="text-white">Nusantara Impact Angels</strong> • Tiket: Rp 100Jt – Rp 500Jt per UMKM
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-white space-y-1">
              <span className="text-[#D1E0D9] block">Status Kurasi:</span>
              <strong className="text-[#E8F4B8] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                {readyBusinesses.length} UMKM Siap Pendanaan
              </strong>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Deal Flow Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block">
              Peluang Investasi Terkurasi
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111E19] mt-0.5">
              Daftar UMKM Lulus Sertifikasi
            </h3>
          </div>
          <Badge variant="verified">
            {readyBusinesses.length} Peluang Terverifikasi
          </Badge>
        </div>

        {readyBusinesses.length === 0 ? (
          <Card className="bg-white p-12 text-center border border-[#E2E8E4] text-sm text-[#617369] space-y-2">
            <AlertCircle className="h-8 w-8 text-[#D97706] mx-auto" />
            <h4 className="font-bold text-[#111E19]">Belum Ada Listing Baru</h4>
            <p className="text-xs text-[#617369] max-w-md mx-auto">
              UMKM binaan sedang menuntaskan misi audit mingguan. Profil akan otomatis muncul setelah dinyatakan lulus sertifikasi kelayakan.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readyBusinesses.map((biz) => {
              const hasRequested = accessRequests.some(
                (r) => r.businessId === biz.id && (r.status === "pending" || r.status === "approved")
              );
              const requestStatus = accessRequests.find((r) => r.businessId === biz.id)?.status;

              return (
                <Card
                  key={biz.id}
                  className="bg-white hover:border-[#173F35]/40 shadow-xs flex flex-col justify-between space-y-6 transition-all duration-150"
                >
                  <CardHeader className="space-y-4 pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-[#173F35] uppercase tracking-wider block mb-1">
                          {biz.sector}
                        </span>
                        <CardTitle className="text-lg">
                          {biz.name}
                        </CardTitle>
                        <p className="text-xs text-[#617369] mt-0.5">
                          Merek: {biz.brand} • {biz.location}
                        </p>
                      </div>

                      <Badge variant="lime">
                        Siap Modal {biz.assessment.compositeScore}%
                      </Badge>
                    </div>

                    <CardDescription className="text-xs leading-relaxed line-clamp-2">
                      {biz.description}
                    </CardDescription>

                    {/* Vetted Key Financial Metrics */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] text-center">
                      <div>
                        <span className="text-[10px] text-[#617369] uppercase tracking-wider block">Rata-rata Omzet</span>
                        <span className="text-xs sm:text-sm font-bold font-heading text-[#111E19] mt-0.5 block tabular-nums">
                          Rp 52 Jt/bln
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#617369] uppercase tracking-wider block">Rasio HPP</span>
                        <span className="text-xs sm:text-sm font-bold font-heading text-[#1F7A4D] mt-0.5 block tabular-nums">
                          44.2%
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#617369] uppercase tracking-wider block">Skor Audit</span>
                        <span className="text-xs sm:text-sm font-bold font-heading text-[#173F35] mt-0.5 block tabular-nums">
                          {biz.assessment.compositeScore}/100
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Actions & Due Diligence CTA */}
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-[#E2E8E4] gap-3">
                      <div className="text-xs text-[#617369]">
                        Konsultan: <strong className="text-[#111E19]">{biz.consultantName}</strong>
                      </div>

                      {hasRequested ? (
                        <Badge variant={requestStatus === "approved" ? "verified" : "warning"}>
                          {requestStatus === "approved" ? "Akses Terbuka" : "Menunggu Persetujuan"}
                        </Badge>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedBizForRequest(biz.id)}
                          className="cursor-pointer"
                        >
                          <FileLock2 className="h-4 w-4" />
                          <span>Minta Akses Data Room</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Request Access Modal Dialog */}
      <ModalDialog
        open={!!selectedBizForRequest}
        onOpenChange={(open) => !open && setSelectedBizForRequest(null)}
        title="Ajukan Akses Bilik Data Rahasia (Due Diligence)"
        description={selectedBiz ? `Target UMKM: ${selectedBiz.name}` : ""}
      >
        <form onSubmit={handleSendRequest} className="space-y-4 pt-2">
          {requestSuccess ? (
            <div className="p-6 text-center rounded-xl bg-[#EBF5EE] text-[#1F7A4D] space-y-2 border border-[#1F7A4D]/20">
              <CheckCircle2 className="h-8 w-8 mx-auto text-[#1F7A4D]" />
              <h4 className="font-bold">Permintaan Akses Terkirim!</h4>
              <p className="text-xs">
                Notifikasi persetujuan NDA telah dikirimkan ke pemilik usaha. Anda akan menerima pemberitahuan begitu akses dibuka.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-1 text-xs text-[#111E19]">
                <p className="font-bold flex items-center gap-1.5 text-[#173F35]">
                  <ShieldCheck className="h-4 w-4" />
                  Klausul Kerahasiaan (NDA Standard):
                </p>
                <p className="text-[#617369]">
                  Dengan mengajukan akses, Anda berkomitmen menjaga kerahasiaan pembukuan, laporan bank, dan data internal UMKM semata-mata untuk tujuan analisis investasi.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#111E19]">
                  Perkiraan Alokasi Tiket Investasi (Rp)
                </label>
                <Input
                  type="number"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="250000000"
                  required
                />
                <p className="text-[11px] text-[#617369]">Nilai penjajakan modal yang diminati firma Anda (misal: Rp 250 Juta).</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8E4]">
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={() => setSelectedBizForRequest(null)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="default"
                >
                  Kirim Permintaan Resmi
                </Button>
              </div>
            </>
          )}
        </form>
      </ModalDialog>
    </div>
  );
};
