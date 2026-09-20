import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  FolderLock,
  Lock,
  Unlock,
  FileText,
  ShieldCheck,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Download,
  X
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export const UmkmDataRoomView: React.FC = () => {
  const { documents, accessRequests, respondAccessRequest } = useApp();

  const [activeTab, setActiveTab] = useState<"documents" | "requests">("documents");
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingRequests = accessRequests.filter((r) => r.status === "pending");
  const activeDetailObj = accessRequests.find((r) => r.id === selectedRequestForDetail);

  const handleRespond = (requestId: string, approve: boolean, investorName: string) => {
    respondAccessRequest(requestId, approve);
    if (approve) {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.65 },
      });
      setToastMessage(`Akses data room resmi dibuka untuk ${investorName}.`);
    } else {
      setToastMessage(`Permintaan akses ${investorName} telah ditolak secara sopan.`);
    }
    setSelectedRequestForDetail(null);
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
            Bilik Data Rahasia & Kesiapan Due Diligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Verified Data Room
          </h1>
          <p className="text-sm text-[#617369] mt-1">
            Penyimpanan dokumen kepatuhan terenkripsi dan kendali izin akses calon investor kredibel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="lime" className="px-3 py-1 text-xs sm:text-sm">
            Status: Kesiapan Pendanaan Aktif
          </Badge>
        </div>
      </div>

      {/* 2. Security Banner: Deep Forest Botanical Green Surface */}
      <Card className="bg-[#173F35] text-white border-[#173F35] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-[#E8F4B8]">
            <FolderLock className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
              Bilik Data Terlindungi Enkripsi & NDA Standar
            </h3>
            <p className="text-xs sm:text-sm text-[#D1E0D9] max-w-xl leading-relaxed">
              Seluruh berkas sensitif hanya dapat dibuka oleh investor terverifikasi yang menandatangani perjanjian kerahasiaan (*Non-Disclosure Agreement*) dan telah Anda setujui secara tertulis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="lime" className="text-xs py-1 px-3">
            Terenkripsi AES-256
          </Badge>
        </div>
      </Card>

      {/* 3. Sub Tabs: Dokumen vs Permintaan Akses */}
      <div className="flex items-center gap-2 border-b border-[#E2E8E4] pb-3">
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
            activeTab === "documents"
              ? "bg-[#173F35] text-white shadow-xs"
              : "bg-white text-[#617369] hover:text-[#111E19] border border-[#E2E8E4]"
          }`}
        >
          Berkas Terverifikasi ({documents.length})
        </button>

        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer select-none relative ${
            activeTab === "requests"
              ? "bg-[#173F35] text-white shadow-xs"
              : "bg-white text-[#617369] hover:text-[#111E19] border border-[#E2E8E4]"
          }`}
        >
          <span>Permintaan Izin Investor</span>
          {pendingRequests.length > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-[#E8F4B8] text-[#173F35] font-bold text-[10px]">
              {pendingRequests.length} Baru
            </span>
          )}
        </button>
      </div>

      {/* 4. Tab 1: Documents Vault */}
      {activeTab === "documents" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="bg-white flex flex-col justify-between space-y-4 hover:border-[#173F35]/40 transition-colors"
            >
              <CardHeader className="pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-[#E8F4B8] text-[#173F35] flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-sm font-bold text-[#111E19] truncate">{doc.name}</h4>
                      <p className="text-xs text-[#617369]">
                        Kategori: <strong className="text-[#111E19]">{doc.category}</strong> • {doc.size}
                      </p>
                    </div>
                  </div>

                  <Badge variant="neutral" className="gap-1">
                    <Lock className="h-3 w-3" />
                    Privat
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8E4] text-xs text-[#617369]">
                  <span>Diverifikasi: {doc.verifiedAt}</span>
                  <span className="text-[#173F35] font-semibold hover:underline cursor-pointer flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span>Unduh Dokumen</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 5. Tab 2: Investor Access Requests */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {accessRequests.map((req) => {
            const isPending = req.status === "pending";
            const isApproved = req.status === "approved";

            return (
              <Card
                key={req.id}
                className="bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] flex items-center justify-center shrink-0 text-[#173F35]">
                    <Building2 className="h-6 w-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#173F35] uppercase tracking-wider">
                        Minat Investasi Masuk
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-[#617369]">{req.requestedAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#111E19]">
                      {req.investorName}
                    </h3>
                    <p className="text-xs text-[#617369]">
                      Firma: <strong className="text-[#111E19]">{req.investorFirm}</strong> • Estimasi Tiket Modal:{" "}
                      <strong className="text-[#173F35] font-bold tabular-nums">{req.proposedTicket}</strong>
                    </p>

                    <p className="text-xs text-[#617369] leading-relaxed pt-1 italic max-w-xl">
                      "Berminat mempelajari data telemetri historis dan audit 5 pilar untuk penjajakan sindikasi investasi modal kerja."
                    </p>
                  </div>
                </div>

                {/* Response Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E2E8E4]">
                  {isPending ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleRespond(req.id, true, req.investorName)}
                        className="cursor-pointer"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Beri Izin Akses</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRespond(req.id, false, req.investorName)}
                        className="cursor-pointer"
                      >
                        Tolak
                      </Button>
                    </>
                  ) : (
                    <Badge variant={isApproved ? "verified" : "destructive"}>
                      {isApproved ? "Akses Diberikan (Aktif)" : "Permintaan Ditolak"}
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
