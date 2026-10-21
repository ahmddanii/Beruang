/**
 * Beruang Platform - Database Types
 * Sesuai dengan skema database PostgreSQL (Laravel Sanctum Backend).
 */

export type UserRole = 'UMKM' | 'CONSULTANT' | 'INVESTOR' | 'ADMIN'
export type UserStatus = 'active' | 'inactive' | 'suspended'

/**
 * Table: public.users
 */
export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string | null
  password?: string
  role: UserRole
  avatar?: string | null
  phone?: string | null
  org_name?: string | null
  otp_code?: string | null
  otp_expires_at?: string | null
  status: UserStatus
  remember_token?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.business_profiles
 * Relasi 1-to-1 dengan users (user_id)
 */
export type BusinessProfileStatus = 'PROFILE_INCOMPLETE' | 'READY_FOR_FUNDING' | 'IN_REVIEW' | 'VERIFIED'

export interface BusinessProfile {
  id: string
  user_id: number
  brand: string
  owner_name: string
  owner_avatar_url?: string | null
  sector: string
  city: string
  established_year?: number | null
  outlets_count: number
  employees_count: number
  description?: string | null
  pitch_summary?: string | null
  logo_url?: string | null
  banner_url?: string | null
  nib?: string | null
  npwp?: string | null
  funding_target: number
  equity_offered?: string | null
  status: BusinessProfileStatus
  consultant_id?: string | null
  next_mentoring?: string | null
  certified_at?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.consultant_profiles
 * Relasi 1-to-1 dengan users (user_id)
 */
export interface ConsultantProfile {
  id: string
  user_id: number
  firm_name: string
  specialization?: string | null
  is_certified: boolean
  active_clients_count: number
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.investor_profiles
 * Relasi 1-to-1 dengan users (user_id)
 */
export interface InvestorProfile {
  id: string
  user_id: number
  firm_name: string
  commitment_capital: string
  is_verified: boolean
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.assessments
 */
export interface Assessment {
  id: string
  business_id: string
  financial: number
  operations_hpp: number
  marketing: number
  hr_team: number
  legal: number
  composite_score: number
  is_verified: boolean
  consultant_notes?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.action_plan_tasks
 */
export interface ActionPlanTask {
  id: string
  business_id: string
  milestone_id?: string | null
  title: string
  description?: string | null
  category: string
  priority: 'Rendah' | 'Sedang' | 'Tinggi'
  due_date: string
  status: 'todo' | 'in_progress' | 'done' | 'submitted'
  completed: boolean
  umkm_notes?: string | null
  evidence_name?: string | null
  evidence_url?: string | null
  consultant_feedback?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.milestones
 */
export interface Milestone {
  id: string
  business_id: string
  title: string
  description?: string | null
  order: number
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.monthly_reports
 */
export interface MonthlyReport {
  id: string
  business_id: string
  month_year: string
  month: string
  year: number
  omzet: number
  hpp: number
  hpp_ratio?: number | null
  operational_cost: number
  net_profit?: number | null
  net_cash?: number | null
  cash_balance?: number | null
  proof_document_url?: string | null
  status: 'submitted' | 'verified' | 'rejected'
  anomaly_flagged: boolean
  anomaly_note?: string | null
  submitted_at: string
  verified_at?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Table: public.access_requests
 */
export interface AccessRequest {
  id: string
  business_id: string
  investor_id: number
  proposed_ticket: string
  intro_message?: string | null
  status: 'pending' | 'approved' | 'rejected'
  requested_at: string
  responded_at?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Payload Pendaftaran (Register DTO)
 */
export interface RegisterPayload {
  name: string
  email: string
  phone: string
  role: UserRole
  org_name: string
  // Field khusus UMKM
  sector?: string
  city?: string
  // Field khusus Konsultan
  specialization?: string
  bnsp_license?: string
  // Field khusus Investor
  commitment_capital?: string
  investor_type?: string
  // OTP
  otp_code?: string
}
