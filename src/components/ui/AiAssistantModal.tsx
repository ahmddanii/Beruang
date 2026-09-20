import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Mic,
  Send,
  Bot,
  CheckCircle2,
  TrendingUp,
  Calculator,
  ShieldCheck,
  X,
} from "lucide-react";

export interface AiAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName?: string;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  open,
  onOpenChange,
  businessName = "Pisang Goreng Wijen",
}) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  const topics = [
    { label: "Hitung HPP", icon: Calculator, query: "Bagaimana cara menghitung HPP per porsi gorengan dengan tepat?" },
    { label: "Tips Omzet", icon: TrendingUp, query: "Berikan 3 strategi menaikkan omzet harian tanpa menambah modal besar." },
    { label: "Pitch Investor", icon: ShieldCheck, query: "Apa syarat utama agar usahaku lolos kurasi investor di Beruang?" },
    { label: "SOP Dapur", icon: CheckCircle2, query: "Buatkan draft SOP takaran minyak dan higienitas kasir." },
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputText;
    if (!q.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Untuk ${businessName}, langkah terbaik adalah memastikan pencatatan kas harian konsisten selama minimal 30 hari. Berdasarkan simulasi margin 42.1%, struktur biaya usahamu sudah berada di zona aman untuk pendanaan!`;
      if (q.includes("HPP")) {
        reply = `Formula HPP Beruang: (Bahan Baku + Minyak & Gas + Kemasan) ÷ Jumlah Porsi Terjual. Dengan HPP saat ini Rp23jt dari omzet Rp52jt, rasio HPP-mu 44.2% — sangat menarik bagi angel investor kuliner!`;
      } else if (q.includes("investor") || q.includes("Investor")) {
        reply = `Kriteria investor Beruang: Skor audit minimal 70/100 (Skor kamu sekarang: 88/100 ✨). Portofoliomu sudah memenuhi syarat verifikasi untuk diterbitkan ke marketplace pendanaan!`;
      } else if (q.includes("SOP")) {
        reply = `Draft SOP Dapur Kilat: 1) Timbang minyak goreng tiap pagi (maks. 3x pakai), 2) Suhu penggorengan stabil di 170°C, 3) Pisahkan kasir dengan staf penggorengan untuk sanitasi optimal.`;
      }

      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[460px] h-[88vh] max-h-[720px] bg-[#F7F8F4] rounded-2xl shadow-2xl border border-[#E2E8E4] flex flex-col overflow-hidden z-50 select-none"
          >
            {/* Top Bar */}
            <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0 bg-white border-b border-[#E2E8E4]">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-full bg-[#F0F2EB] border border-[#E2E8E4] flex items-center justify-center text-[#111E19] cursor-pointer hover:bg-[#E2E8E4] transition-colors"
                aria-label="Kembali"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#E8F4B8] border border-[#173F35]/10 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#173F35]" />
                <span className="text-xs font-bold text-[#173F35] tracking-tight">
                  Beruang AI Telemetry
                </span>
              </div>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-full bg-[#F0F2EB] border border-[#E2E8E4] flex items-center justify-center text-[#111E19] cursor-pointer hover:bg-[#E2E8E4] transition-colors"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Main Body */}
            <div className="flex-1 px-5 overflow-y-auto flex flex-col justify-center items-center text-center no-scrollbar">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center py-4">
                  <div className="relative mb-5">
                    <div className="h-20 w-20 rounded-full bg-[#173F35]/10 animate-pulse absolute inset-0 -m-1" />
                    <div className="h-16 w-16 rounded-full bg-[#173F35] p-1 flex items-center justify-center shadow-lg relative z-10 text-white">
                      <Bot className="h-8 w-8 text-[#E8F4B8]" />
                    </div>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-[#111E19] tracking-tight leading-tight mb-2 max-w-[280px]">
                    Ada yang bisa dibantu untuk {businessName}?
                  </h2>
                  <p className="text-xs text-[#617369] max-w-[280px] leading-relaxed">
                    AI Copilot untuk diagnosis HPP, proyeksi omzet, dan persiapan kurasi investor pendanaan.
                  </p>
                </div>
              ) : (
                <div className="w-full space-y-3 py-4 text-left">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          m.sender === "user"
                            ? "bg-[#173F35] text-white rounded-br-xs"
                            : "bg-white text-[#111E19] border border-[#E2E8E4] shadow-xs rounded-bl-xs"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#E2E8E4] rounded-2xl rounded-bl-xs px-4 py-2 text-xs text-[#617369] flex items-center gap-1.5 shadow-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#173F35] animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#173F35] animate-bounce [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#173F35] animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            {messages.length === 0 && (
              <div className="px-5 pb-3 shrink-0">
                <p className="text-[11px] font-semibold text-[#617369] mb-2 text-left uppercase tracking-wider">
                  Topik Populer
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(t.query)}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E2E8E4] hover:border-[#173F35] text-left transition-colors cursor-pointer group shadow-2xs"
                      >
                        <div className="p-1.5 rounded-lg bg-[#E8F4B8] text-[#173F35] group-hover:bg-[#173F35] group-hover:text-[#E8F4B8] transition-colors">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-medium text-[#111E19] group-hover:text-[#173F35]">
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-[#E2E8E4] shrink-0">
              <div className="flex items-center gap-2 bg-[#F7F8F4] border border-[#E2E8E4] rounded-full px-3 py-1.5 focus-within:border-[#173F35] transition-colors">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tanya analisis keuangan & HPP..."
                  className="flex-1 bg-transparent text-xs text-[#111E19] placeholder:text-[#617369]/60 outline-none min-w-0"
                />

                <button
                  type="button"
                  className="h-7 w-7 rounded-full hover:bg-white flex items-center justify-center text-[#617369] cursor-pointer shrink-0 transition-colors"
                  aria-label="Input suara"
                >
                  <Mic className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSend()}
                  aria-label="Kirim"
                  className="h-8 w-8 rounded-full bg-[#173F35] hover:bg-[#204F43] text-white flex items-center justify-center shadow-xs cursor-pointer shrink-0 transition-colors"
                >
                  <Send className="h-3.5 w-3.5 ml-0.5 text-[#E8F4B8]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
