import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Building2, DollarSign, X } from "lucide-react";
import confetti from "canvas-confetti";

interface OnboardingWizardProps {
  isOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (data?: { brand: string; sector: string; omzet: number }) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  open,
  onClose,
  onOpenChange,
  onComplete,
}) => {
  const visible = isOpen ?? open ?? false;
  const handleClose = () => {
    if (onClose) onClose();
    if (onOpenChange) onOpenChange(false);
  };
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("Pisang Goreng Madu Bu Nanik");
  const [sector, setSector] = useState("Kuliner (F&B)");
  const [omzetStr, setOmzetStr] = useState("48500000");

  if (!visible) return null;


  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onComplete) {
        onComplete({
          brand,
          sector,
          omzet: Number(omzetStr) || 48500000,
        });
      }
      handleClose();
    }
  };


  const formatRupiah = (val: string) => {
    const num = Number(val.replace(/\D/g, ""));
    if (!num) return "0";
    return num.toLocaleString("id-ID");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F6FB] flex flex-col justify-between p-5 select-none overflow-y-auto">
      {/* Top Bar: Stepper & Dismiss */}
      <div>
        <div className="flex items-center justify-between pt-2 mb-6">
          {/* Mobile Stepper Pill Indicator */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-8 bg-[#2563EB]"
                    : s < step
                    ? "w-4 bg-emerald-500"
                    : "w-4 bg-gray-200"
                }`}
              />
            ))}
            <span className="text-[11px] font-bold text-gray-400 ml-1.5 tabular-nums">
              Langkah {step} dari {totalSteps}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Wizard Question Screen - Animated with Framer Motion */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 pt-4"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold border border-blue-100">
                  <Sparkles className="size-3.5" />
                  Mulai Langkah Pertama
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                  Halo! Yuk, mulai petualangan bisnis yang lebih rapi 🚀
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Kami bantu rapikan keuangan dan operasional tokomu agar siap diajak bertumbuh bersama mentor berlisensi.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/[0.05] shadow-[0_10px_24px_rgba(0,0,0,0.03)] space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Nama Usaha / Merek Dagang
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Contoh: Pisang Goreng Madu Bu Nanik"
                    className="w-full text-sm font-bold p-3.5 rounded-xl bg-[#F5F6FB] border border-black/5 focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Sektor Bisnis
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full text-sm font-bold p-3.5 rounded-xl bg-[#F5F6FB] border border-black/5 focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  >
                    <option value="Kuliner (F&B)">Kuliner (F&B)</option>
                    <option value="Agrikultur & Peternakan">Agrikultur & Peternakan</option>
                    <option value="Kriya & Kerajinan">Kriya & Kerajinan</option>
                    <option value="Jasa & Ritel">Jasa & Ritel</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 pt-4"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                  <DollarSign className="size-3.5" />
                  Kondisi Finansial Awal
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                  Berapa rata-rata omzet bulanan usahamu saat ini?
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Tenang, angka ini aman dan terenkripsi. Tujuannya agar mentor kami bisa merancang peta jalan HPP yang akurat.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-black/[0.05] shadow-[0_10px_24px_rgba(0,0,0,0.03)] space-y-3">
                <label className="block text-xs font-bold text-gray-700">
                  Estimasi Omzet Penjualan per Bulan
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-base font-black text-gray-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formatRupiah(omzetStr)}
                    onChange={(e) => setOmzetStr(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-2xl font-black pl-12 pr-4 py-4 rounded-xl bg-[#F5F6FB] border border-black/5 focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none tabular-nums text-gray-900"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-gray-400">
                  Ketik angka nominal (keyboard angka otomatis aktif di ponselmu).
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 pt-4"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                  <Check className="size-3.5" />
                  Siap Melompat
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                  Hebat! Profil usahamu siap dihubungkan 🌟
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Konsultan pendampingmu, <span className="font-bold text-gray-900">Coach Sarah Wijaya</span>, sudah menyiapkan radar kesehatan dan misi penting minggu ini.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/[0.05] shadow-[0_10px_24px_rgba(0,0,0,0.03)] space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Merek Usaha</span>
                  <span className="font-bold text-gray-900">{brand}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Kategori</span>
                  <span className="font-bold text-gray-900">{sector}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Baseline Omzet</span>
                  <span className="font-black text-[#2563EB] tabular-nums">Rp {formatRupiah(omzetStr)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA with whileTap micro-interaction */}
      <div className="pt-6 pb-4">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleNext}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shadow-[inset_2px_0px_12px_rgba(255,255,255,0.35),0_12px_24px_rgba(37,99,235,0.28)] text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>{step === 1 ? "Lanjut ke Data Keuangan" : step === 2 ? "Lihat Hasil Analisis" : "Buka Dashboard Saya 🚀"}</span>
          <ArrowRight className="size-4" />
        </motion.button>
      </div>
    </div>
  );
};
