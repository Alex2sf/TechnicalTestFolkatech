import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/login', { email, password });
      const token = res.data.meta?.token || res.data.token;
      const user = res.data.data?.attributes || res.data.user || null;
      
      if (token) {
        login(token, user);
        navigate('/');
      }
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.detail || err.response?.data?.message || 'Email atau password salah';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-[420px] p-8 border border-slate-200 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-[#800000] font-serif mb-6">Masuk</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#800000]"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#800000]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-xs text-[#800000] font-medium"
            >
              {showPassword ? 'Sembunyikan' : 'Lihat'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#EB3F36] hover:bg-[#d8352d] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-[#800000] font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}