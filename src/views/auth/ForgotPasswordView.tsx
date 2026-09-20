import React, { useState } from "react";
import { InputField } from "../../components/ui/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, ArrowLeft, CheckCircle2, KeyRound, ShieldCheck } from "lucide-react";

interface ForgotPasswordViewProps {
  onNavigate: (view: "login" | "register" | "forgot-password") => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-10 min-h-screen flex flex-col justify-between select-none">
      <div>
        {/* Back Button */}
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#617369] hover:text-[#111E19] mb-4 p-2 rounded-xl hover:bg-[#F0F2EB] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 text-[#173F35]" />
          <span>Kembali ke Halaman Masuk</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-[#E8F4B8] text-[#173F35] flex items-center justify-center mx-auto mb-3 shadow-2xs border border-[#173F35]/15">
            <KeyRound className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Pemulihan Kata Sandi
          </h1>
          <p className="text-xs sm:text-sm text-[#617369] mt-1 max-w-xs mx-auto leading-relaxed">
            {step === "email" && "Masukkan email terdaftar untuk menerima kode verifikasi pemulihan."}
            {step === "otp" && `Kode 4-digit telah dikirim ke ${email || "email Anda"}.`}
            {step === "reset" && "Buat kata sandi baru yang kuat untuk mengamankan akun."}
            {step === "success" && "Kata sandi Anda berhasil diperbarui!"}
          </p>
        </div>

        {/* Step Cards */}
        <Card className="bg-white shadow-xs">
          <CardContent className="pt-6">
            {step === "email" && (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <InputField
                  label="Email Terdaftar"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
                <Button variant="primary" size="lg" fullWidth type="submit" className="mt-2">
                  Kirim Kode Verifikasi
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <label className="text-xs font-semibold text-[#111E19] text-center block">
                  Masukkan 4-Digit Kode Verifikasi
                </label>
                <div className="flex justify-center gap-3 my-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => {
                        const next = [...otp];
                        next[idx] = e.target.value;
                        setOtp(next);
                        if (e.target.value && e.target.nextElementSibling) {
                          (e.target.nextElementSibling as HTMLInputElement).focus();
                        }
                      }}
                      className="h-12 w-12 rounded-xl border border-[#E2E8E4] text-center text-xl font-bold font-heading focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35] focus:outline-none bg-white tabular-nums text-[#111E19]"
                    />
                  ))}
                </div>
                <Button variant="primary" size="lg" fullWidth type="submit">
                  Verifikasi Kode
                </Button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-xs font-semibold text-[#173F35] hover:underline cursor-pointer"
                  >
                    Kirim Ulang Kode
                  </button>
                </div>
              </form>
            )}

            {step === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <InputField
                  label="Kata Sandi Baru"
                  isPassword
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter baru"
                  icon={<Lock className="h-4 w-4" />}
                  required
                />
                <Button variant="primary" size="lg" fullWidth type="submit" className="mt-2">
                  Simpan Kata Sandi Baru
                </Button>
              </form>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center text-center gap-3 py-4">
                <div className="h-14 w-14 rounded-full bg-[#EBF5EE] text-[#1F7A4D] flex items-center justify-center border border-[#1F7A4D]/20">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="text-sm font-semibold text-[#111E19]">
                  Akun Anda telah diamankan. Silakan masuk menggunakan kata sandi baru.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => onNavigate("login")}
                  className="mt-3"
                >
                  Masuk Sekarang
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-[#617369] py-4 flex items-center justify-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-[#1F7A4D]" />
        <span>Beruang Security Gateway • Enkripsi Standar Perbankan</span>
      </div>
    </div>
  );
};
