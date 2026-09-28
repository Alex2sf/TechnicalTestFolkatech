import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) {
      setError('Nama Depan wajib diisi.');
      return;
    }
    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }

    setStep(2);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/register', {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password
      });

      const token = response.data.meta?.token || response.data.token;
      const userData = response.data.data?.attributes || response.data.user || null;
      if (token) {
        login(token, userData);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.detail || err.response?.data?.message || 'Gagal mendaftar';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-slate-100 p-8 sm:p-10">
        {step === 1 ? (
          <>
            <h1 className="text-2xl font-bold text-[#800000] mb-8 font-serif tracking-tight">
              Daftar Sekarang
            </h1>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nama Depan"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nama Belakang"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#EB3F36] hover:bg-[#d6332a] active:bg-[#c32820] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-red-500/20 transition duration-150 cursor-pointer"
                >
                  SELANJUTNYA
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setError('');
                setStep(1);
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#800000] hover:opacity-80 mb-8 cursor-pointer font-serif"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nomor Telepon"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-4 pr-16 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#800000] hover:underline cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi Password"
                  className="w-full pl-4 pr-16 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#800000] hover:underline cursor-pointer"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#EB3F36] hover:bg-[#d6332a] active:bg-[#c32820] disabled:bg-red-300 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-red-500/20 transition duration-150 cursor-pointer"
                >
                  {loading ? 'MENDAFTAR...' : 'SELANJUTNYA'}
                </button>
              </div>
            </form>
          </>
        )}

        <div className="my-6 border-t border-slate-100"></div>

        <div className="text-center text-xs text-slate-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-bold text-[#800000] hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}