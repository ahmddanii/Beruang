import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "umkm" | "konsultan" | "investor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => void;
  register: (data: { name: string; email: string; role: UserRole; businessName?: string }) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  umkm: {
    id: "usr_umkm_01",
    name: "Brenda K.",
    email: "brenda@kopinusantara.id",
    role: "umkm",
    businessName: "Kopi Nusantara Roastery",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  konsultan: {
    id: "usr_kon_01",
    name: "Sarah Wijaya, M.B.A.",
    email: "sarah@bizconsult.id",
    role: "konsultan",
    businessName: "Catalyst Advisory Partners",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  investor: {
    id: "usr_inv_01",
    name: "Hendra Gunawan",
    email: "hendra@nusantaracapital.id",
    role: "investor",
    businessName: "Nusantara Impact Angels",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  admin: {
    id: "usr_adm_01",
    name: "Admin Beruang",
    email: "admin@beruang.id",
    role: "admin",
    businessName: "Beruang Central Ops",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("beruang_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("beruang_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("beruang_user");
    }
  }, [user]);

  const login = (email: string, role: UserRole = "umkm") => {
    const matching = Object.values(DEMO_USERS).find((u) => u.email === email) || {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      businessName: role === "umkm" ? "Usaha Mandiri" : undefined,
    };
    setUser(matching);
  };

  const register = (data: { name: string; email: string; role: UserRole; businessName?: string }) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      businessName: data.businessName || (data.role === "umkm" ? "Bisnis Baru" : undefined),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(DEMO_USERS[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
