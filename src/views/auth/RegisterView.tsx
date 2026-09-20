import React, { useState } from "react";
import { useAuth, UserRole } from "../../context/AuthContext";
import { InputField } from "../../components/ui/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building2, Mail, Lock, ShieldCheck } from "lucide-react";

interface RegisterViewProps {
  onNavigate: (view: "login" | "register" | "forgot-password") => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>("umkm");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: name || "Pengguna Baru",
      email: email || "user@beruang.id",
      role,
      businessName: role === "umkm" ? (businessName || "Bisnis Saya") : undefined,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-10 min-h-screen flex flex-col justify-between select-none">
      <div>
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-[#173F35] text-white flex items-center justify-center p-3 shadow-md mb-3.5 border border-[#173F35]">
            <img src="/logo.svg" alt="Beruang Logo" className="h-10 w-10 object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Daftar Akun Beruang
          </h1>
          <p className="text-xs sm:text-sm text-[#617369] mt-1 max-w-xs leading-relaxed">
            Pilih peran Anda dan mulai akselerasi ekosistem modal terverifikasi
          </p>
        </div>

        {/* Role Selector Pill */}
        <div className="bg-white border border-[#E2E8E4] p-1 rounded-2xl flex items-center gap-1 mb-5 shadow-2xs">
          <button
            type="button"
            onClick={() => setRole("umkm")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              role === "umkm"
                ? "bg-[#173F35] text-white shadow-xs"
                : "text-[#617369] hover:text-[#111E19] hover:bg-[#F0F2EB]"
            }`}
          >
            UMKM
          </button>
          <button
            type="button"
            onClick={() => setRole("konsultan")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              role === "konsultan"
                ? "bg-[#173F35] text-white shadow-xs"
                : "text-[#617369] hover:text-[#111E19] hover:bg-[#F0F2EB]"
            }`}
          >
            Konsultan
          </button>
          <button
            type="button"
            onClick={() => setRole("investor")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              role === "investor"
                ? "bg-[#173F35] text-white shadow-xs"
                : "text-[#617369] hover:text-[#111E19] hover:bg-[#F0F2EB]"
            }`}
          >
            Investor
          </button>
        </div>

        {/* Register Form Card */}
        <Card className="bg-white shadow-xs">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                icon={<User className="h-4 w-4" />}
                required
              />

              {role === "umkm" && (
                <InputField
                  label="Nama Usaha / Brand UMKM"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Contoh: Kopi Nusantara Roastery"
                  icon={<Building2 className="h-4 w-4" />}
                  required
                />
              )}

              {role === "konsultan" && (
                <InputField
                  label="Firma / Asosiasi Konsultan"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Contoh: Catalyst Advisory Partners"
                  icon={<Building2 className="h-4 w-4" />}
                />
              )}

              {role === "investor" && (
                <InputField
                  label="Entitas Investasi / Sindikasi (Opsional)"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Contoh: Nusantara Impact Angels"
                  icon={<Building2 className="h-4 w-4" />}
                />
              )}

              <InputField
                label="Alamat Email Aktif"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                icon={<Mail className="h-4 w-4" />}
                required
              />

              <InputField
                label="Kata Sandi"
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                icon={<Lock className="h-4 w-4" />}
                required
              />

              <div className="flex items-start gap-2 text-xs text-[#617369] pt-1">
                <ShieldCheck className="h-4 w-4 text-[#1F7A4D] shrink-0 mt-0.5" />
                <span>Data dilindungi enkripsi SSL dan verifikasi audit independen.</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="mt-2 cursor-pointer"
                type="submit"
              >
                Daftar Sekarang
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer link to Login */}
      <div className="space-y-3 pt-6 pb-2">
        <div className="text-center text-xs font-medium text-[#617369]">
          Sudah memiliki akun?{" "}
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="font-bold text-[#173F35] hover:underline cursor-pointer"
          >
            Masuk di Sini
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#617369]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#1F7A4D]" />
          <span>Beruang Security Gateway • Enkripsi Standar Perbankan</span>
        </div>
      </div>
    </div>
  );
};
