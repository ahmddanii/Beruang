import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      icon,
      isPassword,
      type = "text",
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const effectiveLeftIcon = leftIcon || icon;
    const effectiveType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#1A1A1A]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {effectiveLeftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#5C6180]">
              {effectiveLeftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={effectiveType}
            className={cn(
              "w-full h-11 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8E4] text-sm text-[#111E19] placeholder:text-[#617369]/60 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[#173F35] focus:border-[#173F35]",
              "disabled:bg-[#F0F2EB] disabled:text-[#617369] disabled:cursor-not-allowed",
              effectiveLeftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-11",
              error && "border-[#DC2626] focus:ring-[#DC2626]",
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
              className="absolute right-3.5 flex items-center justify-center p-1 text-[#5C6180] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-3.5 flex items-center text-[#5C6180]">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#5C6180]">{helperText}</p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

