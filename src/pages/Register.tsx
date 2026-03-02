import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { GoogleButton } from "../components/auth/GoogleButton";
import { useMascotStore } from "../store/useMascotStore";

export default function Register() {
  const { setState } = useMascotStore();

  useEffect(() => {
    setState('excited', 'Wah, ada calon mahasiswa sukses nih! Yuk daftar sekarang!');
  }, [setState]);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Buat Akun Baru</h2>
        <p className="text-slate-500 mt-2">
          Mulai perjalanan belajarmu di FIAcademy.
        </p>
      </div>

      <div className="space-y-6">
        <GoogleButton action="register" />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Atau daftar dengan email</span>
          </div>
        </div>

        <AuthForm type="register" />
      </div>

      <p className="text-center text-slate-500 mt-8 text-sm">
        Sudah punya akun?{" "}
        <Link to="/login" className="font-bold text-red-600 hover:text-red-500">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
