/**
 * Centralized TypeScript Domain Types for Beruang B2B Platform
 */

// User & Authentication Types
export type UserRole = "umkm" | "konsultan" | "investor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  avatar?: string;
}

// Funding Readiness & Diagnostic Radar Types
export type FundingReadinessStatus =
  | "PROFILE_INCOMPLETE"
  | "PROFILE_COMPLETE"
  | "CONSULTANT_ASSIGNED"
  | "ASSESSMENT_IN_PROGRESS"
  | "ACTION_PLAN_ACTIVE"
  | "READINESS_EVALUATION"
  | "READY_FOR_FUNDING";

export interface BusinessAssessment {
  financial: number;
  operations_hpp: number;
  marketing: number;
  hr_team: number;
  legal: number;
  compositeScore: number;
  isVerified: boolean;
  consultantNotes: string;
  lastUpdated: string;
}

// Action Plan & Task Management
export interface ActionPlanTask {
  id: string;
  businessId: string;
  title: string;
  description: string;
  priority: "Mendesak" | "Tinggi" | "Sedang";
  due: string;
  status: "todo" | "submitted" | "verified" | "revision";
  umkmNotes?: string;
  evidenceName?: string;
  consultantFeedback?: string;
}

// Financial & Monthly Reporting
export interface MonthlyReport {
  id: string;
  businessId: string;
  month: string;
  omzet: number;
  hpp: number;
  hppRatio: number; // percentage e.g. 45%
  operationalCost: number;
  netCash: number;
  status: "draft" | "submitted" | "verified" | "anomaly_flagged";
  anomalyAlert?: boolean; // triggers if HPP increases > 10% vs previous
  submissionDate: string;
}

// Verified Data Room
export interface DataRoomDocument {
  id: string;
  businessId: string;
  name: string;
  category: "Finansial" | "Legalitas" | "Operasional" | "Pitch Deck";
  size: string;
  isConfidential: boolean;
  verifiedAt: string;
}

