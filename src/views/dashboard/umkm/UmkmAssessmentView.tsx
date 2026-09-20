import React, { useState } from "react";
import {
  ShieldCheck,
  Calendar,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { BusinessRadarChart } from "@/components/charts/BusinessRadarChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export const UmkmAssessmentView: React.FC = () => {
  const { activeBusiness } = useApp();
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      name: "Finansial & Arus Kas",
      score: activeBusiness.assessment.financial,
      benchmark: 70,
      description: "Pemisahan rekening pribadi & usaha, pencatatan kas harian, dan rasio likuiditas kas operasional.",
      consultantNote: "Bagus! Rekening operasional sudah dipisahkan dari tabungan pribadi. Pembukuan kas harian sudah konsisten selama 45 hari terakhir.",
      status: "Lulus Ambang Batas",
      isReady: activeBusiness.assessment.financial >= 70,
    },
    {
      name: "HPP & Efisiensi Operasional",
      score: activeBusiness.assessment.operations_hpp,
      benchmark: 75,
      description: "Standardisasi takaran gramasi porsi, negosiasi harga pasokan bahan baku, dan kontrol waste dapur.",
      consultantNote: "Rasio HPP berhasil ditekan ke 44.2%. Sedikit lagi menuju target 40% jika efisiensi minyak goreng grosir diterapkan.",
      status: "Perlu Optimasi Minor",
      isReady: activeBusiness.assessment.operations_hpp >= 75,
    },
    {
      name: "Pemasaran & Saluran Distribusi",
      score: activeBusiness.assessment.marketing,
      benchmark: 65,
      description: "Retensi pelanggan tetap, diversifikasi kanal pemesanan online/offline, dan efektivitas promosi.",
      consultantNote: "Kanal online menyumbang 58% omzet. Rekomendasi: perkuat loyalitas pelanggan offline dengan kartu stamp.",
      status: "Lulus Ambang Batas",
      isReady: activeBusiness.assessment.marketing >= 65,
    },
    {
      name: "Manajemen SDM & Tim Kerja",
      score: activeBusiness.assessment.hr_team,
      benchmark: 60,
      description: "Pembagian tugas (job description), SOP kerja tim kasir & dapur, serta sistem bonus berbasis target.",
      consultantNote: "SOP kebersihan dapur dan pembagian shift kasir sudah tertulis jelas. Karyawan memahami standar kerja.",
      status: "Lulus Ambang Batas",
      isReady: activeBusiness.assessment.hr_team >= 60,
    },
    {
      name: "Legalitas & Kepatuhan Usaha",
      score: activeBusiness.assessment.legal,
      benchmark: 80,
      description: "Kelengkapan NIB berbasis risiko OSS, sertifikat halal resmi BPJPH, dan kepemilikan izin edar P-IRT.",
      consultantNote: "NIB OSS sudah tuntas. Saat ini sertifikasi halal sedang proses verifikasi auditor fatwa.",
      status: "Dalam Proses",
      isReady: activeBusiness.assessment.legal >= 80,
    },
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block mb-1">
            Instrumen Evaluasi Independen
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Audit Kesehatan Fundamental 5 Dimensi
          </h1>
          <p className="text-sm text-[#617369] mt-1">
            Penilaian berkala yang dilakukan secara objektif oleh Konsultan Bisnis Tersertifikasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="lime" className="px-3 py-1 text-xs sm:text-sm">
            Skor Komposit: {activeBusiness.assessment.compositeScore} / 100
          </Badge>
        </div>
      </div>

      {/* 2. Top Summary Bento: Radar Visual + Composite Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (7 cols) */}
        <Card className="lg:col-span-7 bg-white flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Pemetaan Radar 5 Pilar</CardTitle>
              <span className="text-xs text-[#617369] flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5 text-[#173F35]" />
                Audit Terakhir: 15 Sep 2026
              </span>
            </div>
            <CardDescription>
              Area hijau tua menandai performa aktual usaha Anda, sedangkan garis putus-putus menunjukkan ambang batas kelayakan investor.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="h-72 sm:h-80 w-full my-1">
              <BusinessRadarChart assessment={activeBusiness.assessment} showBenchmark={true} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8E4] text-xs text-[#617369]">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#173F35]" />
                <strong className="text-[#111E19]">Skor Aktual Usaha</strong>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D97706]" />
                <strong className="text-[#111E19]">Target Minimal Investor</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Readiness Card & Status (5 cols) - Deep Botanical Forest Green */}
        <Card className="lg:col-span-5 bg-[#173F35] text-white border-[#173F35] shadow-lg flex flex-col justify-between relative overflow-hidden">
          <CardHeader>
            <span className="text-[11px] font-semibold tracking-wider text-[#E8F4B8] uppercase block">
              Sertifikasi Kelayakan Investasi
            </span>

            <div className="pt-2 space-y-1">
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tabular-nums tracking-tight">
                {activeBusiness.assessment.compositeScore}
                <span className="text-xl text-[#A3BFB5] font-normal ml-1">/100</span>
              </div>
              <div className="inline-flex items-center gap-1.5 pt-1">
                <Badge variant="lime" className="text-xs">
                  Investor Ready Grade B+
                </Badge>
              </div>
            </div>

            <CardDescription className="text-xs sm:text-sm text-[#D1E0D9] leading-relaxed pt-2">
              Berdasarkan hasil verifikasi fundamental oleh <strong className="text-white">Coach Sarah Wijaya</strong>, bisnis Anda memiliki tata kelola finansial yang sehat dan memenuhi syarat due diligence investor.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#A3BFB5]">Pilar Memenuhi Syarat:</span>
                <span className="font-semibold text-white tabular-nums">4 dari 5 Aspek</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3BFB5]">Konsultan Penanggung Jawab:</span>
                <span className="font-semibold text-white">Sarah Wijaya, SE, M.M.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3BFB5]">Nomor Sertifikasi Audit:</span>
                <span className="font-semibold text-white font-mono">BRU-2026-09-082</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-3 text-xs text-white">
              <ShieldCheck className="h-5 w-5 text-[#E8F4B8] shrink-0" />
              <span>Profil bisnis Anda telah ditampilkan di Bilik Investor Terverifikasi.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Detailed 5 Pillars Evaluation Breakdown */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider block">
            Analisis Mendalam Per Dimensi
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111E19] mt-0.5">
            Rincian Evaluasi & Rekomendasi Konsultan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <Card
              key={idx}
              className="bg-white flex flex-col justify-between space-y-4 hover:border-[#173F35]/30 transition-all"
            >
              <CardHeader className="pb-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold text-[#617369] uppercase tracking-wider block">
                      Dimensi {idx + 1}
                    </span>
                    <CardTitle className="mt-0.5">
                      {pillar.name}
                    </CardTitle>
                  </div>

                  <Badge
                    variant={pillar.isReady ? "verified" : "warning"}
                    className="shrink-0"
                  >
                    {pillar.status}
                  </Badge>
                </div>

                {/* Score Progress Bar */}
                <div className="space-y-1.5 my-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#617369]">Skor Aktual vs Target</span>
                    <span className="font-bold text-[#111E19] tabular-nums">
                      {pillar.score} <span className="text-[#617369] font-normal">/ target {pillar.benchmark}</span>
                    </span>
                  </div>
                  <Progress value={pillar.score} className="h-2" />
                </div>

                <CardDescription className="text-xs leading-relaxed">
                  {pillar.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                {/* Consultant Feedback Note */}
                <div className="p-4 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#111E19] flex items-center gap-1.5">
                    <FileCheck2 className="h-3.5 w-3.5 text-[#173F35]" />
                    Catatan Evaluasi Konsultan:
                  </span>
                  <p className="text-xs text-[#617369] leading-relaxed italic">
                    "{pillar.consultantNote}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
