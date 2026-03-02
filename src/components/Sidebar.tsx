import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  Target,
  CreditCard,
  LogOut,
  FolderOpen,
  LogIn,
  Trophy
} from "lucide-react";
import { useStore } from "../store/useStore";
import { cn } from "../lib/utils";
import toast from "react-hot-toast";

const MENU_ITEMS = [
  { name: "Beranda", path: "/", icon: Home, tourClass: "" },
  { name: "Materi", path: "/materi", icon: BookOpen, tourClass: "tour-materi" },
  { name: "Mentoring", path: "/mentoring", icon: Users, tourClass: "" },
  { name: "Tracker", path: "/tracker", icon: Target, tourClass: "" },
  { name: "Peringkat & Hadiah", path: "/gamification", icon: Trophy, tourClass: "tour-gamification" },
  { name: "Bank Materi", path: "/bank-materi", icon: FolderOpen, badge: "FREE", tourClass: "tour-bankmateri" },
  { name: "Subscription", path: "/subscription", icon: CreditCard, tourClass: "" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
      navigate("/login");
      toast.success("Berhasil keluar");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20 tour-sidebar">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tighter flex items-baseline">
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">FIA</span>
          <span className="text-slate-800">cademy</span>
          <span className="text-red-500 font-bold ml-0.5">.</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Belajar Cerdas Mahasiswa FIA UI
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {MENU_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all",
                item.tourClass,
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 translate-x-1"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-yellow-400" : "text-slate-400",
                  )}
                />
                {item.name}
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-black bg-green-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-blue-600 hover:bg-blue-50 transition-colors w-full"
          >
            <LogIn className="w-5 h-5" />
            Login / Register
          </Link>
        )}
      </div>
    </aside>
  );
}
