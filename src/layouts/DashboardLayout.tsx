import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useStore } from "../store/useStore";
import { Mascot } from "../components/mascot/Mascot";
import { XPAnimation } from "../components/gamification/XPAnimation";
import { useGamification } from "../hooks/useGamification";
import { OnboardingFlow } from "../components/onboarding/OnboardingFlow";
import { TutorialGuide } from "../components/onboarding/TutorialGuide";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const PUBLIC_ROUTES = ["/", "/bank-materi"];

export default function DashboardLayout() {
  const user = useStore((state) => state.user);
  const location = useLocation();
  const { xpAnimation } = useGamification();
  const { isLoading } = useAuth();

  const isPublicRoute = location.pathname === "/" || location.pathname.startsWith("/bank-materi");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Mascot />
      {xpAnimation && <XPAnimation amount={xpAnimation.amount} id={xpAnimation.id} />}
      
      {user && !user.isOnboarded && <OnboardingFlow />}
      {user && user.isOnboarded && !user.hasSeenTutorial && <TutorialGuide />}
    </div>
  );
}
