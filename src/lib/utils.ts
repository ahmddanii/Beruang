import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility untuk menggabungkan class Tailwind CSS dengan resolusi konflik yang aman.
 * Menggunakan clsx untuk penanganan kondisional dan tailwind-merge untuk deduplikasi.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
