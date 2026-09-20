import React, { useState } from "react";
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Plus,
  Check,
  X,
  FileCheck,
  Sliders,
  Sparkles,
  Building2,
  Calendar,
  BarChart3,
  Award
} from "lucide-react";
import { TabKey } from "@/components/ui/TabBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InlineAiAlert } from "@/components/ui/InlineAiAlert";
import { ScoreSlider } from "@/components/ui/ScoreSlider";
import { BusinessRadarChart } from "@/components/charts/BusinessRadarChart";
import { useApp } from "@/context/AppContext";

interface KonsultanViewsProps {
  activeTab: TabKey;
  onTabChange?: (tab: TabKey) => void;
}

export const KonsultanViews: React.FC<KonsultanViewsProps> = ({ activeTab, onTabChange }) => {
  const {
    businesses,
    tasks,
    verifyTask,
    updateAssessment,
    certifyFundingReadiness,
  } = useApp();

  // Selected client for assessment
  const [selectedBizId, setSelectedBizId] = useState(businesses[0]?.id || "");
  const currentBiz = businesses.find((b) => b.id === selectedBizId) || businesses[0];

  // Assessment score sliders state
  const [scores, setScores] = useState({
    financial: currentBiz?.assessment?.financial || 75,
    operations_hpp: currentBiz?.assessment?.operations_hpp || 70,
    marketing: currentBiz?.assessment?.marketing || 80,
    hr_team: currentBiz?.assessment?.hr_team || 65,
    legal: currentBiz?.assessment?.legal || 70,
  });

  const [notes, setNotes] = useState(currentBiz?.assessment?.consultantNotes || "");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [consultantSubTab, setConsultantSubTab] = useState<"scoring" | "verification">("scoring");

  const pendingTasks = tasks.filter((t) => t.status === "submitted");

  const handleScoreChange = (aspect: keyof typeof scores, val: number) => {
    setScores((prev) => ({ ...prev, [aspect]: val }));
  };

  const handleSaveAssessment = (publish: boolean) => {
    updateAssessment(scores, notes, publish);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-32">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block mb-1">
            Workstation Konsultan Pendamping Resmi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Catalyst Advisory Partners
          </h1>
          <p className="text-sm text-[#617369] mt-1">
            Membimbing, mengaudit, dan mengesahkan kelayakan investasi portofolio UMKM binaan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="lime" className="px-3 py-1 text-xs sm:text-sm">
            {businesses.length} Portofolio Aktif
          </Badge>
        </div>
      </div>

      {/* 2. Anomaly Alert Banner */}
      <InlineAiAlert
        title="Anomali Biaya HPP Terdeteksi pada Sambal Bu Lurah"
        description="Lonjakan rasio HPP sebesar +14% terdeteksi akibat kenaikan harga cabai rawit merah di pasar lokal. Perlu audit segera."
        points={[
          "Rasio HPP melonjak dari 42% menjadi 56% dalam 14 hari terakhir.",
          "Rekomendasi: Arahkan pengusaha untuk membuat kontrak pasokan langsung ke kelompok tani mitra Beruang.",
        ]}
        actionLabel="Audit Sekarang"
        onAction={() => {
          setSelectedBizId("biz_3");
          setConsultantSubTab("scoring");
        }}
      />

      {/* 3. Client Portfolio Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block">
              Daftar Klien Binaan
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111E19] mt-0.5">
              Portofolio UMKM Aktif
            </h3>
          </div>
          <span className="text-xs text-[#617369]">
            Klik klien untuk membuka lembar evaluasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businesses.map((biz) => {
            const isSelected = biz.id === selectedBizId;
            const isReady = biz.status === "READY_FOR_FUNDING";

            return (
              <Card
                key={biz.id}
                onClick={() => {
                  setSelectedBizId(biz.id);
                  setScores({
                    financial: biz.assessment.financial,
                    operations_hpp: biz.assessment.operations_hpp,
                    marketing: biz.assessment.marketing,
                    hr_team: biz.assessment.hr_team,
                    legal: biz.assessment.legal,
                  });
                  setNotes(biz.assessment.consultantNotes);
                }}
                className={`p-6 cursor-pointer flex flex-col justify-between space-y-4 transition-all duration-150 ${
                  isSelected
                    ? "bg-[#173F35] text-white border-[#173F35] shadow-lg ring-2 ring-[#E8F4B8]"
                    : "bg-white text-[#111E19] border-[#E2E8E4] hover:border-[#173F35]/40 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        isSelected ? "text-[#E8F4B8]" : "text-[#617369]"
                      }`}
                    >
                      {biz.sector}
                    </span>

                    <Badge variant={isSelected ? "lime" : isReady ? "verified" : "warning"} className="text-[10px]">
                      {isReady ? "Siap Modal" : "Perbaikan"}
                    </Badge>
                  </div>

                  <h4
                    className={`text-base font-bold font-heading ${
                      isSelected ? "text-white" : "text-[#111E19]"
                    }`}
                  >
                    {biz.name}
                  </h4>
                  <p
                    className={`text-xs mt-1 ${
                      isSelected ? "text-[#D1E0D9]" : "text-[#617369]"
                    }`}
                  >
                    Merek: {biz.brand} • {biz.location}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t flex items-center justify-between text-xs ${
                    isSelected ? "border-white/15 text-[#D1E0D9]" : "border-[#E2E8E4] text-[#617369]"
                  }`}
                >
                  <span>Skor Komposit:</span>
                  <strong
                    className={`font-heading text-sm tabular-nums ${
                      isSelected ? "text-[#E8F4B8]" : "text-[#173F35]"
                    }`}
                  >
                    {biz.assessment.compositeScore} / 100
                  </strong>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 4. Assessment Sliders & Verification Workspace */}
      <Card className="bg-white space-y-6">
        <CardHeader className="pb-2 border-b border-[#E2E8E4]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-[#173F35]" />
                <span className="text-xs font-semibold text-[#173F35]">
                  Klien Terpilih: {currentBiz.name}
                </span>
              </div>
              <CardTitle>
                Lembar Penilaian & Verifikasi Fundamental
              </CardTitle>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConsultantSubTab("scoring")}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  consultantSubTab === "scoring"
                    ? "bg-[#173F35] text-white shadow-xs"
                    : "bg-white text-[#617369] border border-[#E2E8E4]"
                }`}
              >
                Penilaian 5 Dimensi
              </button>
              <button
                onClick={() => setConsultantSubTab("verification")}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer relative ${
                  consultantSubTab === "verification"
                    ? "bg-[#173F35] text-white shadow-xs"
                    : "bg-white text-[#617369] border border-[#E2E8E4]"
                }`}
              >
                <span>Verifikasi Bukti Misi</span>
                {pendingTasks.length > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#E8F4B8] text-[#173F35] font-bold text-[10px]">
                    {pendingTasks.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {consultantSubTab === "scoring" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sliders Left */}
                <div className="space-y-4">
                  <ScoreSlider
                    label="1. Finansial & Arus Kas"
                    value={scores.financial}
                    onChange={(val) => handleScoreChange("financial", val)}
                    helper="Pemisahan rekening pribadi, buku kas harian, likuiditas."
                  />

                  <ScoreSlider
                    label="2. HPP & Operasional"
                    value={scores.operations_hpp}
                    onChange={(val) => handleScoreChange("operations_hpp", val)}
                    helper="Standardisasi gramasi porsi, negosiasi harga supplier."
                  />

                  <ScoreSlider
                    label="3. Pemasaran & Distribusi"
                    value={scores.marketing}
                    onChange={(val) => handleScoreChange("marketing", val)}
                    helper="Akuisisi pembeli, diversifikasi kanal online/offline."
                  />

                  <ScoreSlider
                    label="4. Manajemen SDM & Tim"
                    value={scores.hr_team}
                    onChange={(val) => handleScoreChange("hr_team", val)}
                    helper="SOP kebersihan dapur & kasir, pembagian shift kerja."
                  />

                  <ScoreSlider
                    label="5. Legalitas & Perizinan"
                    value={scores.legal}
                    onChange={(val) => handleScoreChange("legal", val)}
                    helper="NIB OSS, Sertifikat Halal BPJPH, kelayakan legal."
                  />
                </div>

                {/* Radar Preview & Notes Right */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#173F35] block mb-1">
                      Visualisasi Radar Real-Time
                    </span>
                    <div className="h-64 w-full">
                      <BusinessRadarChart
                        assessment={{
                          ...currentBiz.assessment,
                          ...scores,
                        }}
                        showBenchmark={true}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#111E19]">
                      Catatan Resmi Konsultan (Akan tampil pada rapor pengusaha):
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tuliskan arahan taktis perbaikan pilar untuk minggu depan..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8E4] text-xs text-[#111E19] placeholder:text-[#617369]/60 focus:outline-none focus:ring-2 focus:ring-[#173F35] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E8E4]">
                <div className="text-xs text-[#617369]">
                  {saveSuccess && (
                    <span className="text-[#1F7A4D] font-semibold flex items-center gap-1.5">
                      <Check className="h-4 w-4" />
                      Penilaian berhasil disimpan dan dipublikasikan ke klien!
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => handleSaveAssessment(false)}
                  >
                    Simpan Draf
                  </Button>

                  <Button
                    variant="primary"
                    size="default"
                    onClick={() => handleSaveAssessment(true)}
                  >
                    Publikasikan Rapor ke UMKM
                  </Button>

                  <Button
                    variant="secondary"
                    size="default"
                    onClick={() => certifyFundingReadiness(currentBiz.id)}
                  >
                    <ShieldCheck className="h-4 w-4 text-[#173F35]" />
                    <span>Terbitkan Sertifikat Siap Modal</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Task Verification SubTab */
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#111E19]">
                Bukti Implementasi Misi yang Menunggu Verifikasi ({pendingTasks.length})
              </h4>

              {pendingTasks.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] text-xs text-[#617369]">
                  Semua bukti misi telah Anda verifikasi. Tidak ada antrean tertunda.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-5 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[#173F35] uppercase tracking-wider">
                            Misi Mingguan
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs text-[#617369]">Tenggat: {t.due}</span>
                        </div>
                        <h5 className="text-sm font-bold text-[#111E19]">{t.title}</h5>
                        <p className="text-xs text-[#617369]">
                          Catatan Pengusaha: "{t.umkmNotes || "Sudah diimplementasikan di kasir."}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => verifyTask(t.id, true, "Bukti diverifikasi dan disetujui konsultan.")}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Verifikasi & Lulus</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => verifyTask(t.id, false, "Bukti belum memenuhi standar, mohon perbaiki.")}
                        >
                          Minta Revisi
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
