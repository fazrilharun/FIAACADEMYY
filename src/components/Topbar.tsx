import { useStore } from "../store/useStore";
import { Bell, Search, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const user = useStore((state) => state.user);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-md relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari materi, mentor, atau kelas..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-full text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        {user?.plan !== "FREE" && (
          <div className="flex items-center gap-2 px-4 py-1.5 bg-yellow-400 text-blue-900 rounded-full text-xs font-black tracking-wide shadow-sm">
            <Crown className="w-4 h-4" />
            {user?.plan}
          </div>
        )}

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-900">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs text-slate-500">{user?.points || 0} Poin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "guest"}`}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
