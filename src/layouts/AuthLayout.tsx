import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthLayout() {
  const user = useStore((state) => state.user);
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter flex items-baseline justify-center mb-2">
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">FIA</span>
            <span className="text-slate-800">cademy</span>
            <span className="text-red-500 font-bold ml-1">.</span>
          </h1>
          <p className="text-slate-500">
            Belajar Cerdas untuk Mahasiswa FIA UI
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 border-2 border-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
