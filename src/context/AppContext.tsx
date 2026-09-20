import React, { createContext, useContext, useState, useEffect } from "react";

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

export interface DataRoomDocument {
  id: string;
  businessId: string;
  name: string;
  category: "Finansial" | "Legalitas" | "Operasional" | "Pitch Deck";
  size: string;
  isConfidential: boolean;
  verifiedAt: string;
}

export interface AccessRequest {
  id: string;
  businessId: string;
  businessName?: string;
  investorId: string;
  investorName: string;
  investorFirm: string;
  proposedTicket: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  respondedAt?: string;
}


export interface BusinessProfile {
  id: string;
  name: string;
  brand: string;
  sector: string;
  location: string;
  description: string;
  fundingTarget: string;
  equityOffered: string;
  status: FundingReadinessStatus;
  consultantName: string;
  consultantFirm: string;
  nextMentoring: string;
  assessment: BusinessAssessment;
}

interface AppContextType {
  businesses: BusinessProfile[];
  activeBusiness: BusinessProfile;
  tasks: ActionPlanTask[];
  monthlyReports: MonthlyReport[];
  documents: DataRoomDocument[];
  accessRequests: AccessRequest[];
  hasAnomalyAlert: boolean;
  // Actions
  submitTaskEvidence: (taskId: string, notes: string, docName: string) => void;
  verifyTask: (taskId: string, isApproved: boolean, feedback: string) => void;
  createTask: (task: Omit<ActionPlanTask, "id" | "status">) => void;
  updateAssessment: (scores: Partial<BusinessAssessment>, notes: string, publish: boolean) => void;
  submitMonthlyReport: (data: { omzet: number; hpp: number; operationalCost: number }) => void;
  certifyFundingReadiness: (businessId: string) => void;
  requestAccess: (businessId: string, proposedTicket: string) => void;
  respondAccessRequest: (requestId: string, approve: boolean) => void;
}

const INITIAL_BUSINESSES: BusinessProfile[] = [
  {
    id: "biz_01",
    name: "Kopi Nusantara Roastery",
    brand: "Kopi Nusantara",
    sector: "F&B Manufaktur",
    location: "Bandung, Jawa Barat",
    description: "Roastery biji kopi arabika & robusta single origin dengan rantai pasok langsung dari 120 petani lokal Jawa Barat.",
    fundingTarget: "Rp 250.000.000",
    equityOffered: "12%",
    status: "ACTION_PLAN_ACTIVE",
    consultantName: "Sarah Wijaya, M.B.A.",
    consultantFirm: "Catalyst Advisory Partners",
    nextMentoring: "Kamis, 14:00 WIB",
    assessment: {
      financial: 72,
      operations_hpp: 65,
      marketing: 80,
      hr_team: 60,
      legal: 55,
      compositeScore: 68,
      isVerified: true,
      consultantNotes: "Fundamental produk sangat kuat. Perlu fokus menekan kebocoran HPP pada packaging dan standardisasi SOP gudang.",
      lastUpdated: "12 Sep 2026",
    },
  },
  {
    id: "biz_02",
    name: "Batik Sekar Wangi",
    brand: "Sekar Wangi Solo",
    sector: "Kriya & Mode",
    location: "Surakarta, Jawa Tengah",
    description: "Produsen batik tulis dan cap modern dengan pewarna alami ramah lingkungan dan pangsa ekspor ke Jepang.",
    fundingTarget: "Rp 350.000.000",
    equityOffered: "15%",
    status: "READY_FOR_FUNDING",
    consultantName: "Sarah Wijaya, M.B.A.",
    consultantFirm: "Catalyst Advisory Partners",
    nextMentoring: "Selesai Sertifikasi",
    assessment: {
      financial: 84,
      operations_hpp: 78,
      marketing: 82,
      hr_team: 72,
      legal: 80,
      compositeScore: 79,
      isVerified: true,
      consultantNotes: "Lulus audit 5 dimensi dengan performa sangat baik. Siap menerima investasi ekspansi pabrik baru.",
      lastUpdated: "15 Sep 2026",
    },
  },
  {
    id: "biz_03",
    name: "Sambal Bu Lurah Kemasan",
    brand: "Sambal Bu Lurah",
    sector: "Kuliner Kemasan",
    location: "Surabaya, Jawa Timur",
    description: "Sambal kemasan higienis dengan umur simpan 12 bulan tanpa pengawet sintetis.",
    fundingTarget: "Rp 150.000.000",
    equityOffered: "10%",
    status: "ASSESSMENT_IN_PROGRESS",
    consultantName: "Sarah Wijaya, M.B.A.",
    consultantFirm: "Catalyst Advisory Partners",
    nextMentoring: "Jumat, 10:00 WIB",
    assessment: {
      financial: 45,
      operations_hpp: 38,
      marketing: 62,
      hr_team: 50,
      legal: 48,
      compositeScore: 48,
      isVerified: true,
      consultantNotes: "Terdeteksi anomali biaya cabai rawit dan distribusi yang menyebabkan rasio HPP melonjak drastis ke 58%.",
      lastUpdated: "14 Sep 2026",
    },
  },
];

const INITIAL_TASKS: ActionPlanTask[] = [
  {
    id: "tsk_01",
    businessId: "biz_01",
    title: "Pemisahan Rekening Pribadi & Rekening Operasional Bisnis",
    description: "Buka rekening giro khusus PT/CV untuk seluruh transaksi arus kas masuk dan keluar.",
    priority: "Tinggi",
    due: "10 Sep 2026",
    status: "verified",
    umkmNotes: "Rekening BCA Giro bisnis sudah aktif sejak 8 September.",
    evidenceName: "BCA_Giro_Rekening_Bisnis.pdf",
    consultantFeedback: "Sudah diverifikasi sesuai rekening koran awal.",
  },
  {
    id: "tsk_02",
    businessId: "biz_01",
    title: "Hitung Ulang Rincian HPP per Batch Roast Bean",
    description: "Masukkan biaya susut green bean (roast weight loss 15%) dan packaging foil ke kalkulasi satuan.",
    priority: "Mendesak",
    due: "20 Sep 2026",
    status: "todo",
  },
  {
    id: "tsk_03",
    businessId: "biz_01",
    title: "Standardisasi SOP Pergudangan Bahan Baku",
    description: "Terapkan metode FIFO (First In First Out) untuk biji kopi mentah guna mencegah jamur.",
    priority: "Sedang",
    due: "25 Sep 2026",
    status: "submitted",
    umkmNotes: "Dokumen SOP FIFO telah dibuat dan disosialisasikan ke tim gudang.",
    evidenceName: "SOP_Gudang_FIFO_v1.pdf",
  },
  {
    id: "tsk_04",
    businessId: "biz_01",
    title: "Perpanjangan NIB & Pendaftaran Sertifikasi Halal BPJPH",
    description: "Lengkapi berkas pendaftaran melalui portal SiHalal Kemenag.",
    priority: "Tinggi",
    due: "28 Sep 2026",
    status: "todo",
  },
];

const INITIAL_REPORTS: MonthlyReport[] = [
  {
    id: "rep_01",
    businessId: "biz_01",
    month: "Juli 2026",
    omzet: 42000000,
    hpp: 19740000,
    hppRatio: 47,
    operationalCost: 11000000,
    netCash: 11260000,
    status: "verified",
    submissionDate: "30 Jul 2026",
  },
  {
    id: "rep_02",
    businessId: "biz_01",
    month: "Agustus 2026",
    omzet: 48500000,
    hpp: 21340000,
    hppRatio: 44,
    operationalCost: 12200000,
    netCash: 14960000,
    status: "verified",
    submissionDate: "31 Agu 2026",
  },
];

const INITIAL_DOCS: DataRoomDocument[] = [
  { id: "doc_01", businessId: "biz_01", name: "Laporan Keuangan Q2 2026 (Audited Konsultan)", category: "Finansial", size: "2.4 MB", isConfidential: true, verifiedAt: "10 Agu 2026" },
  { id: "doc_02", businessId: "biz_01", name: "Akta Notaris, NIB & NPWP Badan Usaha", category: "Legalitas", size: "4.8 MB", isConfidential: true, verifiedAt: "15 Jul 2026" },
  { id: "doc_03", businessId: "biz_01", name: "Kalkulasi Satuan HPP Batch Roast 2026", category: "Operasional", size: "1.1 MB", isConfidential: true, verifiedAt: "22 Agu 2026" },
  { id: "doc_04", businessId: "biz_01", name: "Pitch Deck Profil Bisnis Beruang Ready", category: "Pitch Deck", size: "6.2 MB", isConfidential: false, verifiedAt: "1 Sep 2026" },
];

const INITIAL_REQUESTS: AccessRequest[] = [
  {
    id: "req_01",
    businessId: "biz_01",
    investorId: "usr_inv_01",
    investorName: "Hendra Gunawan",
    investorFirm: "Nusantara Impact Angels",
    proposedTicket: "Rp 150.000.000",
    status: "pending",
    requestedAt: "Hari ini, 09:30 WIB",
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>(() => {
    const s = localStorage.getItem("beruang_businesses");
    return s ? JSON.parse(s) : INITIAL_BUSINESSES;
  });

  const [tasks, setTasks] = useState<ActionPlanTask[]>(() => {
    const s = localStorage.getItem("beruang_tasks");
    return s ? JSON.parse(s) : INITIAL_TASKS;
  });

  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>(() => {
    const s = localStorage.getItem("beruang_reports");
    return s ? JSON.parse(s) : INITIAL_REPORTS;
  });

  const [documents] = useState<DataRoomDocument[]>(INITIAL_DOCS);

  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(() => {
    const s = localStorage.getItem("beruang_requests");
    return s ? JSON.parse(s) : INITIAL_REQUESTS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("beruang_businesses", JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem("beruang_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("beruang_reports", JSON.stringify(monthlyReports));
  }, [monthlyReports]);

  useEffect(() => {
    localStorage.setItem("beruang_requests", JSON.stringify(accessRequests));
  }, [accessRequests]);

  const activeBusiness = businesses[0]; // Kopi Nusantara Roastery for UMKM view

  // Detect AI Anomaly: Check if Sambal Bu Lurah has anomaly or any report has HPP jump > 10%
  const hasAnomalyAlert = true;

  const submitTaskEvidence = (taskId: string, notes: string, docName: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: "submitted",
              umkmNotes: notes,
              evidenceName: docName,
            }
          : t
      )
    );
  };

  const verifyTask = (taskId: string, isApproved: boolean, feedback: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: isApproved ? "verified" : "revision",
              consultantFeedback: feedback,
            }
          : t
      )
    );
  };

  const createTask = (newTaskData: Omit<ActionPlanTask, "id" | "status">) => {
    const newTask: ActionPlanTask = {
      ...newTaskData,
      id: `tsk_${Date.now()}`,
      status: "todo",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateAssessment = (scores: Partial<BusinessAssessment>, notes: string, publish: boolean) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === activeBusiness.id) {
          const updated = { ...b.assessment, ...scores };
          const comp = Math.round(
            (updated.financial +
              updated.operations_hpp +
              updated.marketing +
              updated.hr_team +
              updated.legal) /
              5
          );
          return {
            ...b,
            assessment: {
              ...updated,
              compositeScore: comp,
              consultantNotes: notes || b.assessment.consultantNotes,
              isVerified: publish,
              lastUpdated: "Hari ini",
            },
            status: comp >= 75 && publish ? "READY_FOR_FUNDING" : b.status,
          };
        }
        return b;
      })
    );
  };

  const submitMonthlyReport = (data: { omzet: number; hpp: number; operationalCost: number }) => {
    const prevReport = monthlyReports[monthlyReports.length - 1];
    const hppRatio = Math.round((data.hpp / data.omzet) * 100);
    const netCash = data.omzet - data.hpp - data.operationalCost;

    // AI Anomaly Trigger: HPP increase > 10% vs previous
    const isAnomaly = prevReport ? hppRatio - prevReport.hppRatio >= 10 : false;

    const newReport: MonthlyReport = {
      id: `rep_${Date.now()}`,
      businessId: activeBusiness.id,
      month: "September 2026",
      omzet: data.omzet,
      hpp: data.hpp,
      hppRatio,
      operationalCost: data.operationalCost,
      netCash,
      status: isAnomaly ? "anomaly_flagged" : "submitted",
      anomalyAlert: isAnomaly,
      submissionDate: "Hari ini",
    };

    setMonthlyReports((prev) => [...prev, newReport]);
  };

  const certifyFundingReadiness = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === businessId
          ? {
              ...b,
              status: "READY_FOR_FUNDING",
              assessment: {
                ...b.assessment,
                isVerified: true,
              },
            }
          : b
      )
    );
  };

  const requestAccess = (businessId: string, proposedTicket: string) => {
    const target = businesses.find((b) => b.id === businessId);
    const newReq: AccessRequest = {
      id: `req_${Date.now()}`,
      businessId,
      businessName: target?.name || "Kopi Nusantara Roastery",
      investorId: "usr_inv_01",
      investorName: "Hendra Gunawan",
      investorFirm: "Nusantara Impact Angels",
      proposedTicket: proposedTicket || "Rp 200.000.000",
      status: "pending",
      requestedAt: "Baru saja",
    };
    setAccessRequests((prev) => [newReq, ...prev]);
  };


  const respondAccessRequest = (requestId: string, approve: boolean) => {
    setAccessRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: approve ? "approved" : "rejected",
              respondedAt: "Hari ini",
            }
          : r
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        businesses,
        activeBusiness,
        tasks,
        monthlyReports,
        documents,
        accessRequests,
        hasAnomalyAlert,
        submitTaskEvidence,
        verifyTask,
        createTask,
        updateAssessment,
        submitMonthlyReport,
        certifyFundingReadiness,
        requestAccess,
        respondAccessRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
