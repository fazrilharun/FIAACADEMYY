import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'register') {
      if (password !== confirmPassword) {
        return toast.error('Password tidak cocok!');
      }
      if (!acceptTerms) {
        return toast.error('Anda harus menyetujui Syarat & Ketentuan');
      }
      if (!major) {
        return toast.error('Pilih jurusan Anda');
      }
    }

    setIsLoading(true);

    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = type === 'login' 
        ? { email, password } 
        : { name, email, password, major };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      await checkAuth();
      toast.success(type === 'login' ? 'Berhasil masuk!' : 'Pendaftaran berhasil!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'register' && (
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
            placeholder="John Doe"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
          placeholder="mahasiswa@ui.ac.id"
        />
      </div>

      {type === 'register' && (
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Jurusan</label>
          <select
            required
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-white"
          >
            <option value="" disabled>Pilih Jurusan</option>
            <option value="niaga">Ilmu Administrasi Niaga</option>
            <option value="fiskal">Ilmu Administrasi Fiskal</option>
            <option value="negara">Ilmu Administrasi Negara</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none pr-12"
            placeholder="••••••••"
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {type === 'register' && (
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Konfirmasi Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none pr-12"
              placeholder="••••••••"
              minLength={6}
            />
          </div>
        </div>
      )}

      {type === 'login' && (
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" 
            />
            <span className="text-slate-600">Ingat Saya</span>
          </label>
          <Link to="/forgot-password" className="text-blue-600 font-bold hover:underline">
            Lupa Password?
          </Link>
        </div>
      )}

      {type === 'register' && (
        <label className="flex items-start gap-2 cursor-pointer text-sm">
          <input 
            type="checkbox" 
            required
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-600 mt-1" 
          />
          <span className="text-slate-600">
            Saya menyetujui <a href="#" className="text-blue-600 font-bold hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-blue-600 font-bold hover:underline">Kebijakan Privasi</a> FIAcademy.
          </span>
        </label>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {type === 'login' ? 'Masuk' : 'Daftar Sekarang'}
      </button>
    </form>
  );
}
