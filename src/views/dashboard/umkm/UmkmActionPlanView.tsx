import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  UploadCloud,
  FileText,
  X,
  Sparkles,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ModalDialog } from "@/components/ui/ModalDialog";
import { useApp } from "@/context/AppContext";

export const UmkmActionPlanView: React.FC = () => {
  const { tasks, submitTaskEvidence, verifyTask } = useApp();

  const [activeFilter, setActiveFilter] = useState<"all" | "in_progress" | "verified">("all");
  const [selectedTaskForUpload, setSelectedTaskForUpload] = useState<string | null>(null);
  const [evidenceNotes, setEvidenceNotes] = useState("");
  const [evidenceFileName, setEvidenceFileName] = useState("");
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const completedCount = tasks.filter((t) => t.status === "verified").length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === "in_progress") return t.status !== "verified";
    if (activeFilter === "verified") return t.status === "verified";
    return true;
  });

  const selectedTaskObj = tasks.find((t) => t.id === selectedTaskForUpload);

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForUpload) return;

    submitTaskEvidence(
      selectedTaskForUpload,
      evidenceNotes || "Bukti implementasi telah diterapkan dan dicek bersama tim.",
      evidenceFileName || "Dokumen_Bukti_Implementasi.pdf"
    );

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
    });

    setFeedbackToast("Bukti misi berhasil dikirim ke Coach Sarah untuk diverifikasi! 🎉");
    setSelectedTaskForUpload(null);
    setEvidenceNotes("");
    setEvidenceFileName("");
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleQuickCheck = (taskId: string, currentStatus: string) => {
    if (currentStatus === "verified") return;
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
    });
    verifyTask(taskId, true, "Verifikasi mandiri oleh pemilik UMKM.");
    setFeedbackToast("Misi ditandai selesai! Status diperbarui.");
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="p-4 rounded-2xl bg-[#173F35] text-white flex items-center justify-between gap-3 shadow-lg border border-[#173F35]/20 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
            <Sparkles className="h-4 w-4 text-[#E8F4B8] shrink-0" />
            <span>{feedbackToast}</span>
          </div>
          <button
            onClick={() => setFeedbackToast(null)}
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
            Peta Jalan Perbaikan Terukur
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Action Plan: Roadmap Q3
          </h1>
          <p className="text-sm text-[#617369] mt-1">
            Selesaikan misi mingguan yang dirancang bersama konsultan untuk menaikkan skor kelayakan usaha.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="lime" className="px-3 py-1 text-xs sm:text-sm">
            {completedCount} dari {tasks.length} Selesai ({progressPercent}%)
          </Badge>
        </div>
      </div>

      {/* 2. Overall Progress Overview Bento Card */}
      <Card className="bg-white space-y-4">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Kemajuan Implementasi Misi</CardTitle>
              <CardDescription className="mt-0.5">
                Setiap misi yang terverifikasi akan menaikkan skor pilar pada Radar Diagnostic.
              </CardDescription>
            </div>
            <span className="text-sm font-bold font-heading text-[#173F35] tabular-nums bg-[#E8F4B8] px-3 py-1 rounded-full border border-[#173F35]/15">
              {progressPercent}% Tuntas
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <Progress value={progressPercent} className="h-3" />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#617369]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1F7A4D]" />
                <span className="font-medium text-[#111E19]">{completedCount} Terverifikasi Konsultan</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D97706]" />
                <span>{tasks.length - completedCount} Dalam Proses</span>
              </span>
            </div>

            <span className="text-[#111E19] font-medium flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#173F35]" />
              Target Selesai: 30 September 2026
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Filter Controls */}
      <div className="flex items-center gap-2 border-b border-[#E2E8E4] pb-3">
        {[
          { key: "all", label: "Semua Misi" },
          { key: "in_progress", label: "Perlu Tindakan" },
          { key: "verified", label: "Sudah Terverifikasi" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
              activeFilter === tab.key
                ? "bg-[#173F35] text-white shadow-xs"
                : "bg-white text-[#617369] hover:text-[#111E19] border border-[#E2E8E4]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Task List Items */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const isDone = task.status === "verified";
          const isSubmitted = task.status === "submitted";

          return (
            <Card
              key={task.id}
              className={`p-5 sm:p-6 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? "bg-[#F0F2EB]/50 border-[#E2E8E4] opacity-85"
                  : "bg-white border-[#E2E8E4] hover:border-[#173F35]/40 shadow-xs"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => handleQuickCheck(task.id, task.status)}
                  className="mt-0.5 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer shrink-0"
                  style={{
                    borderColor: isDone ? "#173F35" : "#E2E8E4",
                    backgroundColor: isDone ? "#173F35" : "transparent",
                  }}
                  aria-label={isDone ? "Sudah selesai" : "Tandai selesai"}
                >
                  {isDone && <CheckCircle2 className="h-4 w-4 text-white" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#617369] uppercase tracking-wider">
                      Misi Strategis
                    </span>

                    <span className="text-gray-300">•</span>
                    <span
                      className={`text-[11px] font-semibold ${
                        task.priority === "Mendesak" ? "text-[#DC2626]" : "text-[#617369]"
                      }`}
                    >
                      Prioritas {task.priority}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold font-heading text-[#111E19] ${
                      isDone ? "line-through text-[#617369]" : ""
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="text-xs text-[#617369] leading-relaxed max-w-2xl">
                    {task.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-xs text-[#617369]">
                    <Clock className="h-3.5 w-3.5 text-[#173F35]" />
                    <span>Jatuh Tempo: <strong className="text-[#111E19]">{task.due}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Side */}
              <div className="flex items-center gap-3 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8E4]">
                {isDone ? (
                  <Badge variant="verified">
                    Terverifikasi
                  </Badge>
                ) : isSubmitted ? (
                  <Badge variant="warning">
                    Sedang Ditinjau Konsultan
                  </Badge>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedTaskForUpload(task.id)}
                    className="cursor-pointer"
                  >
                    <UploadCloud className="h-4 w-4" />
                    <span>Unggah Bukti</span>
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* 5. Upload Evidence Modal Dialog */}
      <ModalDialog
        open={!!selectedTaskForUpload}
        onOpenChange={(open) => !open && setSelectedTaskForUpload(null)}
        title="Kirim Bukti Penyelesaian Misi"
        description={selectedTaskObj ? `Misi: ${selectedTaskObj.title}` : ""}
      >
        <form onSubmit={handleSubmitProof} className="space-y-4 pt-2">
          <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-1 text-xs text-[#617369]">
            <p className="font-semibold text-[#111E19]">Instruksi Bukti Verifikasi:</p>
            <p>Unggah foto dokumen SOP, nota pembelian, atau tangkapan layar sistem yang menunjukkan misi telah Anda terapkan di lapangan.</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#111E19]">
              Nama Dokumen / Berkas Bukti
            </label>
            <Input
              placeholder="Contoh: Bukti_SOP_Takaran_Porsi.pdf"
              value={evidenceFileName}
              onChange={(e) => setEvidenceFileName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#111E19]">
              Catatan untuk Konsultan
            </label>
            <textarea
              rows={3}
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              placeholder="Jelaskan secara ringkas bagaimana Anda menerapkan langkah ini bersama tim..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8E4] text-sm text-[#111E19] placeholder:text-[#617369]/60 focus:outline-none focus:ring-2 focus:ring-[#173F35] transition-colors"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8E4]">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={() => setSelectedTaskForUpload(null)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="default"
            >
              Kirim ke Konsultan
            </Button>
          </div>
        </form>
      </ModalDialog>
    </div>
  );
};
