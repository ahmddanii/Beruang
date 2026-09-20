import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { AuthScreen } from "./views/auth/AuthScreen";
import { RoleDashboard } from "./views/dashboard/RoleDashboard";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <RoleDashboard />;
  }

  return <AuthScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen w-full bg-[#F7F8F4] text-[#111E19] antialiased selection:bg-[#E8F4B8] selection:text-[#173F35]">
          <AppContent />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

