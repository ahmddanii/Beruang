import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ModalDialog({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  className,
}: ModalDialogProps) {
  // Close on escape key and prevent body scroll when open
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

  return (
    <>
      {trigger && (
        <div onClick={() => onOpenChange(true)} className="inline-block cursor-pointer">
          {trigger}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              className={cn(
                "relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#E2E8E4] z-50 max-h-[90vh] overflow-y-auto no-scrollbar",
                className
              )}
            >
              {/* Mobile handle indicator */}
              <div className="sm:hidden w-12 h-1 rounded-full bg-[#E2E8E4] mx-auto -mt-2 mb-4 shrink-0" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#111E19] tracking-tight">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-xs text-[#617369] mt-1 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Tutup dialog"
                  className="h-8 w-8 rounded-full bg-[#F0F2EB] hover:bg-[#E2E8E4] text-[#617369] hover:text-[#111E19] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
