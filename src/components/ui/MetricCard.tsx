import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  title: string;
  amount: string;
  trendValue?: string;
  trendPeriod?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  variant?: 'light' | 'dark';
  className?: string;
  actionText?: string;
  onAction?: () => void;
}

export function MetricCard({
  title,
  amount,
  trendValue,
  trendPeriod = 'vs bulan lalu',
  isPositive = true,
  icon: Icon,
  variant = 'light',
  className,
  actionText,
  onAction,
}: MetricCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'rounded-[26px] p-6 transition-all duration-150 relative overflow-hidden',
        isDark
          ? 'bg-[#111215] text-white shadow-[0_12px_32px_rgba(17,18,21,0.15)] border border-white/5'
          : 'bg-white text-[#121316] border border-black/[0.04] shadow-[0_4px_20px_rgba(18,19,22,0.03)]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            'text-xs font-medium',
            isDark ? 'text-[#8F95B2]' : 'text-[#71768E]'
          )}
        >
          {title}
        </span>
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
            isDark ? 'bg-white/10 text-white' : 'bg-[#F5F6F8] text-[#121316]'
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3.5">
        <div className="font-heading text-2xl sm:text-3xl font-bold tracking-tight tabular-nums">
          {amount}
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
        {trendValue && (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums',
                isPositive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trendValue}
            </span>
            <span
              className={cn(
                'text-xs',
                isDark ? 'text-[#8F95B2]' : 'text-[#71768E]'
              )}
            >
              {trendPeriod}
            </span>
          </div>
        )}

        {actionText && (
          <button
            onClick={onAction}
            className={cn(
              'text-xs font-medium underline-offset-4 hover:underline transition-colors ml-auto',
              isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-blue-700'
            )}
          >
            {actionText} →
          </button>
        )}
      </div>
    </div>
  );
}
