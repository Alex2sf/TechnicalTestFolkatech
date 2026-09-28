import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onSearch, currentSearch }) {
  const [searchInput, setSearchInput] = useState(currentSearch || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
    } else {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-wider text-slate-800 flex items-center gap-2">
              <span className="text-[#800000] font-serif font-extrabold text-2xl tracking-tight">
                UBRUKOPI
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari produk"
                  className="w-full pl-4 pr-12 py-2.5 bg-white border border-slate-200 rounded-l-md text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-400"
                />
              </div>
              <button
                type="submit"
                className="bg-[#EB3F36] hover:bg-[#d6332a] text-white px-5 py-2.5 rounded-r-md flex items-center justify-center transition cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-5 text-slate-600">
            <button className="hover:text-red-500 transition cursor-pointer" title="Wishlist">
              <Heart className="w-5 h-5" />
            </button>

            <button className="hover:text-red-500 transition cursor-pointer" title="Keranjang Belanja">
              <ShoppingBag className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 text-sm">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-400">Akun Anda</p>
                        <p className="font-semibold text-slate-800 truncate">{user?.name || user?.email || 'Sedang Masuk'}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar (Logout)
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">
                        Masuk
                      </Link>
                      <Link to="/register" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">
                        Daftar
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f9fafb] border-t border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button className="bg-[#EB3F36] text-white px-8 py-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-sm hover:bg-[#d6332a] transition">
              <span>BELANJA</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}