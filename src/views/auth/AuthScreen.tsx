import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  User,
  Building2,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
  ImageIcon,
  Activity,
  Award,
  Zap,
  ChevronRight
} from "lucide-react";

type AuthMode = "welcome" | "login" | "register" | "forgot-password";

export const AuthScreen: React.FC = () => {
  const { login, register, switchRole } = useAuth();

  const [mode, setMode] = useState<AuthMode>("welcome");
  const [selectedRole, setSelectedRole] = useState<UserRole>("umkm");

  // Form inputs
  const [email, setEmail] = useState("brenda@kopinusantara.id");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password OTP flow
  const [otpStep, setOtpStep] = useState<"email" | "otp" | "reset" | "success">("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: name || (selectedRole === "umkm" ? "Brenda Kurnia" : selectedRole === "konsultan" ? "Sarah Wijaya" : "Hendra Gunawan"),
      email: email || "user@beruang.id",
      role: selectedRole,
      businessName: selectedRole === "umkm" ? (businessName || "Kopi Nusantara Roastery") : undefined,
    });
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#F7F8F4] text-[#111E19] flex items-center justify-center p-3 sm:p-5 md:p-8 font-sans selection:bg-[#E8F4B8] selection:text-[#173F35] relative overflow-x-hidden">
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#173F35]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#E8F4B8]/40 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (MD+): Dual-Column Double-Bezel Split Card (Gambar 3 Caliber) */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full max-w-5xl relative z-10">
        {/* Outer Bezel (Machined Hardware Enclosure) */}
        <div className="p-2.5 sm:p-3 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-[#E2E8E4] shadow-[0_24px_60px_-12px_rgba(23,63,53,0.08),0_1px_3px_rgba(0,0,0,0.04)]">
          {/* Inner Split Core */}
          <div className="grid grid-cols-12 rounded-[2rem] overflow-hidden bg-white border border-[#E8ECE6] min-h-[660px] items-stretch">
            
            {/* Left Column (5 Cols): Editorial Deep Forest Hero Card */}
            <div className="col-span-5 bg-gradient-to-b from-[#173F35] via-[#1A453A] to-[#0E2822] text-white p-8 lg:p-9 flex flex-col justify-between relative overflow-hidden">
              {/* Internal Radiant Accents */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#E8F4B8]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#1F7A4D]/25 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
              {/* Subtle background grid watermark */}
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Top Header: Brand Identity */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-xs">
                    <img src="/logo.svg" alt="Beruang" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <span className="font-heading font-black text-lg tracking-tight text-white block leading-none">
                      Beruang
                    </span>
                    <span className="text-[10px] text-[#A3BFB5] font-medium tracking-tight block mt-1">
                      Capital &amp; Growth Engine
                    </span>
                  </div>
                </div>

                <Badge variant="lime" className="text-[10px] font-bold py-0.5 px-2.5 shadow-xs">
                  Verified OJK Ready
                </Badge>
              </div>

              {/* Middle Section: Manifesto & High-End Visual Placeholder */}
              <div className="relative z-10 my-6 space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F4B8]/15 border border-[#E8F4B8]/25 text-[#E8F4B8] text-[10px] font-semibold uppercase tracking-[0.2em] mb-2.5">
                    <Sparkles className="h-3 w-3" />
                    <span>Akselerasi Terpadu</span>
                  </div>
                  
                  {/* Master Copywriting replacing "PLAY COMPETE WIN" */}
                  <h2 className="font-heading font-black text-3xl lg:text-[2.65rem] text-white tracking-tight leading-[0.92] uppercase">
                    TUMBUH.<br />
                    TERUJI.<br />
                    TERDANAI.
                  </h2>

                  <p className="text-xs text-[#D1E0D9] mt-2.5 leading-relaxed">
                    Standardisasi data keuangan usaha, validasi kelayakan bersama konsultan independen, dan sambungkan langsung ke modal investor terakreditasi.
                  </p>
                </div>

                {/* Visual Image Placeholder Container (Slot Gambar Pengguna) */}
                <div
                  id="auth-image-placeholder-desktop"
                  data-slot="auth-image-placeholder"
                  className="relative w-full h-48 rounded-2xl bg-[#0E2822]/90 border border-white/15 overflow-hidden p-4 flex flex-col justify-between group transition-all shadow-inner"
                >
                  {/* Grid background texture */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E8F4B8_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Top bar inside placeholder */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#E8F4B8] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#E8F4B8] tracking-wide uppercase font-mono">
                        Telemetry Live Hub
                      </span>
                    </div>
                    <span className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-md font-mono">
                      Slot Gambar Aset
                    </span>
                  </div>

                  {/* Middle graphic simulation: Growth Wave & Metrics */}
                  <div className="relative z-10 flex items-center justify-between gap-3 my-auto">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#A3BFB5] block">Skor Kesiapan Modal</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black font-heading text-white">94</span>
                        <span className="text-xs text-[#E8F4B8] font-bold">/100</span>
                      </div>
                      <span className="text-[9px] text-[#E8F4B8] bg-[#E8F4B8]/15 px-1.5 py-0.5 rounded font-semibold inline-block">
                        Layak Investasi Grade A
                      </span>
                    </div>

                    {/* SVG mini chart preview */}
                    <div className="w-28 h-12 relative flex items-center justify-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                        <defs>
                          <linearGradient id="gradWave" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E8F4B8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#E8F4B8" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 35 Q 25 28, 50 18 T 100 5 L 100 40 L 0 40 Z"
                          fill="url(#gradWave)"
                        />
                        <path
                          d="M0 35 Q 25 28, 50 18 T 100 5"
                          fill="none"
                          stroke="#E8F4B8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="100" cy="5" r="3.5" fill="#FFFFFF" stroke="#173F35" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom info inside placeholder */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-[#A3BFB5]">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3 text-[#E8F4B8]" />
                      <span>Ganti dengan tag &lt;img&gt; aset Anda</span>
                    </span>
                    <span className="font-mono text-white/70">ID: auth-image-placeholder-desktop</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer: Trust Credentials */}
              <div className="relative z-10 pt-4 border-t border-white/15 text-xs text-[#D1E0D9] flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#E8F4B8] shrink-0" />
                <span className="text-[11px] leading-snug">
                  Enkripsi 256-bit standar kepatuhan audit institusi modal ventura.
                </span>
              </div>
            </div>

            {/* Right Column (7 Cols): Auth Form & Interactive Controls */}
            <div className="col-span-7 p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Top Mode Switcher matching User's 2 Buttons ("Mulai" & "Sudah punya akun?") */}
                <div className="flex items-center justify-between gap-3 border-b border-[#E2E8E4] pb-4 mb-6">
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F0F2EB] border border-[#E2E8E4]">
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        mode === "register" || mode === "welcome"
                          ? "bg-[#173F35] text-white shadow-xs"
                          : "text-[#617369] hover:text-[#111E19]"
                      }`}
                    >
                      Mulai (Daftar)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        mode === "login"
                          ? "bg-[#173F35] text-white shadow-xs"
                          : "text-[#617369] hover:text-[#111E19]"
                      }`}
                    >
                      Sudah punya akun?
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#173F35] bg-[#E8F4B8]/40 px-2.5 py-1 rounded-lg border border-[#E8F4B8]">
                    <Zap className="h-3 w-3 text-[#173F35]" />
                    <span>Portal Resmi</span>
                  </div>
                </div>

                {/* Content: Mode = Register / Welcome */}
                {(mode === "register" || mode === "welcome") && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-[#111E19] tracking-tight">
                        Mulai Perjalanan Akselerasi
                      </h3>
                      <p className="text-xs text-[#617369] mt-1">
                        Daftar akun baru untuk mengakses audit kesehatan usaha dan bilik data investor terakreditasi.
                      </p>
                    </div>

                    {/* Role Picker Bento Cards */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111E19]">
                        Pilih Peran Utama Anda:
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          {
                            key: "umkm" as UserRole,
                            label: "UMKM Binaan",
                            sub: "Raih Pendanaan",
                            icon: Building2,
                          },
                          {
                            key: "konsultan" as UserRole,
                            label: "Konsultan",
                            sub: "Verifikasi Mutu",
                            icon: UserCheck,
                          },
                          {
                            key: "investor" as UserRole,
                            label: "Investor",
                            sub: "Akses Bilik Data",
                            icon: TrendingUp,
                          },
                        ].map((item) => {
                          const Icon = item.icon;
                          const isSelected = selectedRole === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setSelectedRole(item.key)}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#173F35] text-white border-[#173F35] shadow-xs"
                                  : "bg-[#F7F8F4] text-[#617369] border-[#E2E8E4] hover:border-[#173F35]/30 hover:bg-[#F0F2EB]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <Icon className={`h-4 w-4 ${isSelected ? "text-[#E8F4B8]" : "text-[#173F35]"}`} />
                                {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-[#E8F4B8]" />}
                              </div>
                              <div>
                                <span className="text-xs font-bold leading-tight block">{item.label}</span>
                                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-[#A3BFB5]" : "text-[#7B8B82]"}`}>
                                  {item.sub}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#111E19]">Nama Lengkap</label>
                        <div className="relative flex items-center">
                          <User className="absolute left-3.5 h-4 w-4 text-[#617369]" />
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="cth: Brenda Kurnia"
                            className="pl-10 h-10 text-xs rounded-xl bg-[#F7F8F4]/60 border-[#E2E8E4] focus-visible:ring-[#173F35]"
                            required
                          />
                        </div>
                      </div>

                      {selectedRole === "umkm" && (
                        <div className="space-y-1">
                          <label className="block text-xs font-semibold text-[#111E19]">Nama Usaha / Brand</label>
                          <div className="relative flex items-center">
                            <Building2 className="absolute left-3.5 h-4 w-4 text-[#617369]" />
                            <Input
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                              placeholder="cth: Kopi Nusantara Roastery"
                              className="pl-10 h-10 text-xs rounded-xl bg-[#F7F8F4]/60 border-[#E2E8E4] focus-visible:ring-[#173F35]"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#111E19]">Email Akun Bisnis</label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3.5 h-4 w-4 text-[#617369]" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@perusahaan.id"
                            className="pl-10 h-10 text-xs rounded-xl bg-[#F7F8F4]/60 border-[#E2E8E4] focus-visible:ring-[#173F35]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#111E19]">Kata Sandi</label>
                        <div className="relative flex items-center">
                          <Lock className="absolute left-3.5 h-4 w-4 text-[#617369]" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 8 karakter aman"
                            className="pl-10 pr-10 h-10 text-xs rounded-xl bg-[#F7F8F4]/60 border-[#E2E8E4] focus-visible:ring-[#173F35]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-[#617369] hover:text-[#111E19] cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Tactile Button-in-Button CTA */}
                      <button
                        type="submit"
                        className="w-full mt-2 h-12 rounded-full bg-[#173F35] text-white hover:bg-[#1E4D41] shadow-[0_4px_14px_rgba(23,63,53,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between px-6 font-semibold text-sm cursor-pointer group"
                      >
                        <span>Mulai Akselerasi Sekarang</span>
                        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </button>
                    </form>
                  </div>
                )}

                {/* Content: Mode = Login */}
                {mode === "login" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-[#111E19] tracking-tight">
                        Masuk ke Akun Anda
                      </h3>
                      <p className="text-xs text-[#617369] mt-1">
                        Akses kembali metrik telemetri bisnis, laporan audit berkala, dan status penawaran modal.
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#111E19]">Email Akun Bisnis</label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3.5 h-4 w-4 text-[#617369]" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com"
                            className="pl-10 h-10 text-xs rounded-xl bg-[#F7F8F4]/60 border-[#E2E8E4] focus-visible:ring-[#173F35]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#111E19]">Kata Sandi</label>
                        <div className="relative flex items-center">
                          <Lock className="absolute left-3.5 h-4 w-4 text-[#617369]" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan kata sandi"
                            className="pl-10 pr-10 h-10 text-xs rounded-xl bg-[#F7F8F4]/60 border-[#E2E8E4] focus-visible:ring-[#173F35]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-[#617369] hover:text-[#111E19] cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-[#617369]">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-[#E2E8E4] text-[#173F35] focus:ring-[#173F35]"
                          />
                          <span>Ingat Sesi Saya</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setMode("forgot-password")}
                          className="text-[#173F35] font-bold hover:underline cursor-pointer"
                        >
                          Lupa kata sandi?
                        </button>
                      </div>

                      {/* Tactile Button-in-Button CTA */}
                      <button
                        type="submit"
                        className="w-full mt-2 h-12 rounded-full bg-[#173F35] text-white hover:bg-[#1E4D41] shadow-[0_4px_14px_rgba(23,63,53,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between px-6 font-semibold text-sm cursor-pointer group"
                      >
                        <span>Masuk ke Dasbor</span>
                        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </button>
                    </form>
                  </div>
                )}

                {/* Content: Mode = Forgot Password */}
                {mode === "forgot-password" && (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#617369] hover:text-[#111E19] cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Kembali ke Masuk</span>
                    </button>

                    <div>
                      <h3 className="text-2xl font-bold font-heading text-[#111E19] tracking-tight">
                        Pemulihan Akses Akun
                      </h3>
                      <p className="text-xs text-[#617369] mt-1">
                        {otpStep === "email" && "Masukkan email terdaftar untuk menerima kode verifikasi OTP 4-digit."}
                        {otpStep === "otp" && "Masukkan 4-digit kode verifikasi yang telah kami kirimkan ke email."}
                        {otpStep === "reset" && "Tentukan kata sandi baru untuk mengamankan akun bisnis Anda."}
                        {otpStep === "success" && "Kata sandi Anda berhasil diperbarui dan siap digunakan kembali!"}
                      </p>
                    </div>

                    {otpStep === "email" && (
                      <form onSubmit={(e) => { e.preventDefault(); setOtpStep("otp"); }} className="space-y-3">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@email.com"
                          className="h-10 rounded-xl"
                          required
                        />
                        <Button type="submit" variant="primary" fullWidth size="lg">
                          Kirim Kode OTP
                        </Button>
                      </form>
                    )}

                    {otpStep === "otp" && (
                      <form onSubmit={(e) => { e.preventDefault(); setOtpStep("reset"); }} className="space-y-3">
                        <div className="flex justify-center gap-2.5 my-2">
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
                              className="h-12 w-12 text-center font-bold text-lg rounded-xl border border-[#E2E8E4] focus:ring-2 focus:ring-[#173F35]"
                            />
                          ))}
                        </div>
                        <Button type="submit" variant="primary" fullWidth size="lg">
                          Verifikasi Kode OTP
                        </Button>
                      </form>
                    )}

                    {otpStep === "reset" && (
                      <form onSubmit={(e) => { e.preventDefault(); setOtpStep("success"); }} className="space-y-3">
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Kata Sandi Baru"
                          className="h-10 rounded-xl"
                          required
                        />
                        <Button type="submit" variant="primary" fullWidth size="lg">
                          Simpan Sandi Baru
                        </Button>
                      </form>
                    )}

                    {otpStep === "success" && (
                      <div className="text-center space-y-3 py-2">
                        <CheckCircle2 className="h-10 w-10 text-[#1F7A4D] mx-auto" />
                        <p className="text-xs text-[#111E19] font-semibold">Kata sandi berhasil diatur ulang!</p>
                        <Button variant="primary" fullWidth size="lg" onClick={() => { setMode("login"); setOtpStep("email"); }}>
                          Masuk Sekarang
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Quick Demo Exploration Area */}
              <div className="pt-5 border-t border-[#E2E8E4] mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#617369] uppercase tracking-wider">
                    Eksplorasi Cepat Mode Demo:
                  </span>
                  <span className="text-[11px] text-[#173F35] font-semibold bg-[#E8F4B8]/40 px-2 py-0.5 rounded-full">
                    1-Klik Akses
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { role: "umkm" as UserRole, label: "UMKM", sub: "Kopi Nusantara", icon: Building2 },
                    { role: "konsultan" as UserRole, label: "Konsultan", sub: "Sarah Wijaya", icon: UserCheck },
                    { role: "investor" as UserRole, label: "Investor", sub: "Nusantara Impact", icon: TrendingUp },
                  ].map((demo) => {
                    const DemoIcon = demo.icon;
                    return (
                      <button
                        key={demo.role}
                        type="button"
                        onClick={() => handleQuickDemo(demo.role)}
                        className="p-2 rounded-xl bg-[#F0F2EB] hover:bg-[#E8F4B8] border border-[#E2E8E4] flex items-center gap-2 transition-all cursor-pointer group text-left"
                      >
                        <div className="h-7 w-7 rounded-lg bg-white flex items-center justify-center shrink-0 border border-[#E2E8E4]">
                          <DemoIcon className="h-3.5 w-3.5 text-[#173F35]" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-[#111E19] block leading-tight group-hover:text-[#173F35]">
                            {demo.label}
                          </span>
                          <span className="text-[10px] text-[#7B8B82] block truncate">
                            {demo.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEW (< MD): Hero Card + 2 Primary Buttons (Gambar 1 & 2 Caliber)  */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full max-w-sm flex flex-col justify-between min-h-[94vh] py-2 space-y-3.5 relative z-10">
        
        {/* Top Section: Hero Graphic Card (Gambar 1) */}
        <div className="rounded-[2rem] bg-gradient-to-b from-[#173F35] via-[#1A453A] to-[#0E2822] text-white p-5 shadow-lg border border-[#173F35] relative overflow-hidden flex flex-col justify-between">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#E8F4B8]/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          {/* Top Brand & Badge */}
          <div className="flex items-center justify-between mb-3.5 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1.5 flex items-center justify-center">
                <img src="/logo.svg" alt="Beruang" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="font-heading font-black text-sm tracking-tight text-white block leading-none">
                  Beruang
                </span>
                <span className="text-[9px] text-[#A3BFB5] font-medium block mt-0.5">
                  Capital Ecosystem
                </span>
              </div>
            </div>

            <Badge variant="lime" className="text-[9px] py-0 px-2 font-bold shadow-xs">
              Verified
            </Badge>
          </div>

          {/* Bold Manifesto replacing "PLAY COMPETE WIN" */}
          <div className="space-y-1 mb-3 relative z-10">
            <span className="text-[9px] font-bold tracking-[0.2em] text-[#E8F4B8] uppercase block">
              Manifesto Ekosistem
            </span>
            <h1 className="font-heading font-black text-3xl text-white tracking-tight leading-[0.92] uppercase">
              TUMBUH.<br />
              TERUJI.<br />
              TERDANAI.
            </h1>
            <p className="text-xs text-[#D1E0D9] leading-relaxed pt-1">
              Standardisasi data fundamental usaha, validasi kelayakan bersama konsultan, dan akses investor terakreditasi.
            </p>
          </div>

          {/* Visual Image Placeholder Box (Mobile) */}
          <div
            id="auth-image-placeholder-mobile"
            data-slot="auth-image-placeholder"
            className="w-full h-36 rounded-2xl bg-[#0E2822]/90 border border-white/15 overflow-hidden p-3 relative flex flex-col justify-between group shadow-inner"
          >
            {/* Subtle dot pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E8F4B8_1px,transparent_1px)] [background-size:10px_10px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#E8F4B8] animate-pulse" />
                <span className="text-[9px] font-bold text-[#E8F4B8] font-mono uppercase">
                  Telemetry Active
                </span>
              </div>
              <span className="text-[9px] text-white/60 bg-white/10 px-2 py-0.5 rounded font-mono">
                Slot Gambar Aset
              </span>
            </div>

            {/* Mini visual telemetry showcase */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] text-[#A3BFB5] block">Kesiapan Modal</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black font-heading text-white">94%</span>
                  <span className="text-[10px] text-[#E8F4B8] font-bold">Grade A</span>
                </div>
              </div>

              <div className="w-24 h-8">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 80 30">
                  <path
                    d="M0 25 Q 20 20, 40 12 T 80 4"
                    fill="none"
                    stroke="#E8F4B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="80" cy="4" r="3" fill="#FFFFFF" />
                </svg>
              </div>
            </div>

            <div className="relative z-10 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-[#A3BFB5]">
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3 text-[#E8F4B8]" />
                <span>ID: auth-image-placeholder-mobile</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: The 2 Main Buttons ("Mulai" & "Sudah punya akun?") OR Form */}
        <div className="bg-white rounded-[2rem] p-5 border border-[#E2E8E4] shadow-md flex-1 flex flex-col justify-between space-y-3.5">
          {mode === "welcome" ? (
            <div className="space-y-4 my-auto">
              <div className="space-y-1 text-center">
                <h2 className="text-lg font-bold font-heading text-[#111E19]">
                  Selamat Datang di Beruang
                </h2>
                <p className="text-xs text-[#617369]">
                  Pilih opsi di bawah untuk memulai atau masuk ke akun Anda.
                </p>
              </div>

              {/* THE 2 MAIN BUTTONS REQUESTED BY USER */}
              <div className="space-y-2.5 pt-1">
                {/* Button 1: "Mulai" with button-in-button nested trailing icon */}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="w-full h-12 rounded-full bg-[#173F35] text-white hover:bg-[#1E4D41] shadow-[0_4px_14px_rgba(23,63,53,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between px-6 font-semibold text-sm cursor-pointer group"
                >
                  <span className="font-bold">Mulai</span>
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </button>

                {/* Button 2: "Sudah punya akun?" */}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="w-full h-12 rounded-full border border-[#D5DDD7] bg-[#F7F8F4] text-[#111E19] hover:bg-white hover:border-[#173F35] active:scale-[0.98] transition-all duration-300 flex items-center justify-center font-bold text-sm cursor-pointer shadow-2xs"
                >
                  Sudah punya akun?
                </button>
              </div>

              {/* 1-Click Quick Demo Profiles */}
              <div className="pt-3 border-t border-[#E2E8E4] text-center">
                <span className="text-[11px] font-bold text-[#617369] block mb-2 uppercase tracking-wider">
                  Atau Akses Cepat Mode Demo:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("umkm")}
                    className="p-2 rounded-xl bg-[#F0F2EB] hover:bg-[#E8F4B8] border border-[#E2E8E4] text-xs font-bold text-[#111E19] flex items-center justify-center gap-1 transition-all"
                  >
                    <Building2 className="h-3.5 w-3.5 text-[#173F35]" />
                    <span>UMKM</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("konsultan")}
                    className="p-2 rounded-xl bg-[#F0F2EB] hover:bg-[#E8F4B8] border border-[#E2E8E4] text-xs font-bold text-[#111E19] flex items-center justify-center gap-1 transition-all"
                  >
                    <UserCheck className="h-3.5 w-3.5 text-[#173F35]" />
                    <span>Konsultan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("investor")}
                    className="p-2 rounded-xl bg-[#F0F2EB] hover:bg-[#E8F4B8] border border-[#E2E8E4] text-xs font-bold text-[#111E19] flex items-center justify-center gap-1 transition-all"
                  >
                    <TrendingUp className="h-3.5 w-3.5 text-[#173F35]" />
                    <span>Investor</span>
                  </button>
                </div>
              </div>
            </div>
          ) : mode === "login" ? (
            <div className="space-y-3.5 my-auto">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode("welcome")}
                  className="text-xs font-bold text-[#617369] hover:text-[#111E19] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Kembali</span>
                </button>
                <Badge variant="lime" className="text-[10px]">Masuk Akun</Badge>
              </div>

              <div>
                <h2 className="text-xl font-bold font-heading text-[#111E19]">
                  Masuk ke Beruang
                </h2>
                <p className="text-xs text-[#617369] mt-0.5">
                  Akses telemetri keuangan dan data usaha Anda.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#111E19]">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="h-10 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#111E19]">Kata Sandi</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Kata Sandi"
                    className="h-10 rounded-xl"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setMode("forgot-password")}
                    className="text-[#173F35] font-bold hover:underline cursor-pointer ml-auto"
                  >
                    Lupa sandi?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-[#173F35] text-white hover:bg-[#1E4D41] shadow-[0_4px_14px_rgba(23,63,53,0.2)] active:scale-[0.98] transition-all flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  Masuk Sekarang
                </button>
              </form>

              <div className="text-center pt-2 text-xs text-[#617369]">
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-bold text-[#173F35] hover:underline cursor-pointer"
                >
                  Mulai Daftar
                </button>
              </div>
            </div>
          ) : mode === "register" ? (
            <div className="space-y-3 my-auto">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode("welcome")}
                  className="text-xs font-bold text-[#617369] hover:text-[#111E19] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Kembali</span>
                </button>
                <Badge variant="lime" className="text-[10px]">Daftar Baru</Badge>
              </div>

              <div>
                <h2 className="text-xl font-bold font-heading text-[#111E19]">
                  Buat Akun Beruang
                </h2>
                <p className="text-xs text-[#617369] mt-0.5">
                  Pilih peran dan isi detail profil usaha Anda.
                </p>
              </div>

              {/* Role Toggle */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#F0F2EB] border border-[#E2E8E4]">
                {(["umkm", "konsultan", "investor"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      selectedRole === r ? "bg-[#173F35] text-white shadow-xs" : "text-[#617369]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="h-10 rounded-xl"
                  required
                />
                {selectedRole === "umkm" && (
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Nama Usaha / Brand"
                    className="h-10 rounded-xl"
                    required
                  />
                )}
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Aktif"
                  className="h-10 rounded-xl"
                  required
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata Sandi Baru"
                  className="h-10 rounded-xl"
                  required
                />

                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-[#173F35] text-white hover:bg-[#1E4D41] shadow-[0_4px_14px_rgba(23,63,53,0.2)] active:scale-[0.98] transition-all flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  Daftar Sekarang
                </button>
              </form>

              <div className="text-center pt-1 text-xs text-[#617369]">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-[#173F35] hover:underline cursor-pointer"
                >
                  Masuk di Sini
                </button>
              </div>
            </div>
          ) : null}

          {/* Security Assurance */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#617369] pt-2 border-t border-[#E2E8E4]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1F7A4D]" />
            <span>Enkripsi Standar OJK Sandbox</span>
          </div>
        </div>
      </div>
    </div>
  );
};
