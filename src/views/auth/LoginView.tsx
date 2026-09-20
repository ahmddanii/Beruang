import React, { useState } from "react";
import { useAuth, UserRole } from "../../context/AuthContext";
import { InputField } from "../../components/ui/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, Sparkles, Building2, UserCheck, TrendingUp, ShieldCheck } from "lucide-react";

interface LoginViewProps {
  onNavigate: (view: "login" | "register" | "forgot-password") => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState("brenda@kopinusantara.id");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<UserRole>("umkm");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
  };

  return (
    <div className="w-full max-w-md mx-auto py-10 px-4 sm:px-6 min-h-screen flex flex-col justify-between select-none">
      <div>
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-[#173F35] text-white flex items-center justify-center p-3 shadow-md mb-3.5 border border-[#173F35]">
            <img src="/logo.svg" alt="Beruang Logo" className="h-10 w-10 object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111E19] tracking-tight">
            Masuk ke Beruang
          </h1>
          <p className="text-xs sm:text-sm text-[#617369] mt-1 max-w-xs leading-relaxed">
            Platform Akselerasi & Pendanaan Terverifikasi UMKM Indonesia
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-white shadow-xs">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Email Bisnis / Akun"
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

              <div className="flex items-center justify-between text-xs font-medium pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#617369]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-[#E2E8E4] text-[#173F35] focus:ring-[#173F35]"
                  />
                  Ingat Saya
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate("forgot-password")}
                  className="text-[#173F35] font-semibold hover:underline cursor-pointer"
                >
                  Lupa Kata Sandi?
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="mt-2 cursor-pointer"
                type="submit"
              >
                Masuk Sekarang
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Demo Role Switcher */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Sparkles className="h-4 w-4 text-[#173F35]" />
            <span className="text-xs font-semibold text-[#173F35] uppercase tracking-wider">
              Akses Cepat Mode Demo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("umkm")}
              className="p-3 rounded-2xl bg-white border border-[#E2E8E4] hover:border-[#173F35] hover:bg-[#F0F2EB]/50 flex flex-col items-center text-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl bg-[#E8F4B8] text-[#173F35] flex items-center justify-center">
                <Building2 className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold font-heading text-[#111E19] group-hover:text-[#173F35]">
                UMKM
              </span>
              <Badge variant="lime" className="text-[10px] py-0 px-1.5">
                Binaan
              </Badge>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("konsultan")}
              className="p-3 rounded-2xl bg-white border border-[#E2E8E4] hover:border-[#173F35] hover:bg-[#F0F2EB]/50 flex flex-col items-center text-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl bg-[#EBF5EE] text-[#1F7A4D] flex items-center justify-center">
                <UserCheck className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold font-heading text-[#111E19] group-hover:text-[#173F35]">
                Konsultan
              </span>
              <Badge variant="verified" className="text-[10px] py-0 px-1.5">
                Mentor
              </Badge>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("investor")}
              className="p-3 rounded-2xl bg-white border border-[#E2E8E4] hover:border-[#173F35] hover:bg-[#F0F2EB]/50 flex flex-col items-center text-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl bg-[#173F35] text-[#E8F4B8] flex items-center justify-center">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold font-heading text-[#111E19] group-hover:text-[#173F35]">
                Investor
              </span>
              <Badge variant="neutral" className="text-[10px] py-0 px-1.5">
                Funder
              </Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3 pt-6 pb-2">
        <div className="text-center text-xs font-medium text-[#617369]">
          Belum memiliki akun Beruang?{" "}
          <button
            type="button"
            onClick={() => onNavigate("register")}
            className="font-bold text-[#173F35] hover:underline cursor-pointer"
          >
            Daftar Akun Baru
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
