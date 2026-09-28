import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedRoast, setSelectedRoast] = useState('');
  const [selectedTasted, setSelectedTasted] = useState('');
  const [selectedProcessing, setSelectedProcessing] = useState('');
  const [priceMax, setPriceMax] = useState(2250000);

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, totalPages: 1 });

  const [openSections, setOpenSections] = useState({
    harga: true,
    origin: true,
    species: true,
    roast: true,
    tasted: true,
    processing: true
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      let params = new URLSearchParams({
        page: page,
        limit: pagination.limit,
        max_price: priceMax,
        sort: sortBy,
        order: sortOrder
      });

      if (search) params.append('search', search);
      if (selectedOrigin) params.append('origin', selectedOrigin);
      if (selectedSpecies) params.append('species', selectedSpecies);
      if (selectedRoast) params.append('roast_level', selectedRoast);
      if (selectedTasted) params.append('tasted', selectedTasted);
      if (selectedProcessing) params.append('processing', selectedProcessing);

      const response = await api.get(`/list-product?${params.toString()}`);
      setProducts(response.data.data || []);
      const meta = response.data.meta || {};
      setPagination(prev => ({
        ...prev,
        page: meta.page || page,
        total: meta.total || (response.data.data ? response.data.data.length : 0),
        totalPages: meta.totalPages || 1
      }));
    } catch (err) {
      console.error('Gagal mengambil daftar produk:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [selectedOrigin, selectedSpecies, selectedRoast, selectedTasted, selectedProcessing, priceMax, sortBy, sortOrder, search, pagination.limit]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp ');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={(val) => setSearch(val)} currentSearch={search} />

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-xs text-slate-400 mb-6 flex items-center gap-1.5 font-medium">
          <Link to="/" className="hover:text-slate-600">Home</Link>
          <span>»</span>
          <span className="text-slate-500">Produk</span>
          <span>»</span>
          <span className="text-[#EB3F36] font-semibold">Roasted Bean</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="space-y-6 lg:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              URUTKAN BERDASARKAN
            </h2>

            <div className="border-b border-slate-100 pb-5">
              <button
                onClick={() => toggleSection('harga')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 py-1"
              >
                <span>Harga</span>
                {openSections.harga ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openSections.harga && (
                <div className="mt-4 space-y-3">
                  <input
                    type="range"
                    min="50000"
                    max="2250000"
                    step="50000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#EB3F36] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded">Rp 50.000</span>
                    <span className="text-slate-400">-</span>
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded">{formatPrice(priceMax)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-5">
              <button
                onClick={() => toggleSection('origin')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 py-1"
              >
                <span>Origin</span>
                {openSections.origin ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openSections.origin && (
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    { label: 'Aceh', count: 8 },
                    { label: 'Semarang', count: 2 },
                    { label: 'Bandung', count: 7 },
                    { label: 'Jawa', count: 5 },
                    { label: 'Amerika Selatan', count: 6 },
                    { label: 'Lain - Lain', count: 8 },
                  ].map((item) => (
                    <label key={item.label} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedOrigin === item.label}
                          onChange={() => setSelectedOrigin(selectedOrigin === item.label ? '' : item.label)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#EB3F36] focus:ring-0"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">({item.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-5">
              <button
                onClick={() => toggleSection('species')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 py-1"
              >
                <span>Species</span>
                {openSections.species ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openSections.species && (
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    { label: 'Arabika', count: 128 },
                    { label: 'Robusta', count: 23 },
                    { label: 'Blend', count: 9 },
                  ].map((item) => (
                    <label key={item.label} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSpecies === item.label}
                          onChange={() => setSelectedSpecies(selectedSpecies === item.label ? '' : item.label)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#EB3F36] focus:ring-0"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">({item.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-5">
              <button
                onClick={() => toggleSection('roast')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 py-1"
              >
                <span>Roast Level</span>
                {openSections.roast ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openSections.roast && (
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    { label: 'Light Roast', count: 8 },
                    { label: 'Medium Roast', count: 2 },
                    { label: 'Dark Roast', count: 7 },
                    { label: 'Light to Medium Roast', count: 5 },
                  ].map((item) => (
                    <label key={item.label} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRoast === item.label}
                          onChange={() => setSelectedRoast(selectedRoast === item.label ? '' : item.label)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#EB3F36] focus:ring-0"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">({item.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-5">
              <button
                onClick={() => toggleSection('tasted')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 py-1"
              >
                <span>Tasted</span>
                {openSections.tasted ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openSections.tasted && (
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    { label: 'Sweet', count: 18 },
                    { label: 'Floral', count: 21 },
                    { label: 'Fruity', count: 7 },
                    { label: 'Nutty', count: 5 },
                    { label: 'Cocoa', count: 21 },
                    { label: 'Spices', count: 18 },
                  ].map((item) => (
                    <label key={item.label} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTasted === item.label}
                          onChange={() => setSelectedTasted(selectedTasted === item.label ? '' : item.label)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#EB3F36] focus:ring-0"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">({item.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-5">
              <button
                onClick={() => toggleSection('processing')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 py-1"
              >
                <span>Processing</span>
                {openSections.processing ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openSections.processing && (
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    { label: 'Honey White', count: 8 },
                    { label: 'Natural', count: 2 },
                    { label: 'Honey Gold', count: 7 },
                    { label: 'Honey Yellow', count: 5 },
                  ].map((item) => (
                    <label key={item.label} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedProcessing === item.label}
                          onChange={() => setSelectedProcessing(selectedProcessing === item.label ? '' : item.label)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#EB3F36] focus:ring-0"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">({item.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span>Menampilkan</span>
                <select
                  value={pagination.limit}
                  onChange={(e) => setPagination(prev => ({ ...prev, limit: Number(e.target.value) }))}
                  className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-white text-slate-700"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
                <span>dari {pagination.total}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Urutkan</span>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="border border-slate-200 rounded px-2 py-1 text-xs bg-white text-slate-700 font-medium"
                >
                  <option value="name-ASC">Nama Produk</option>
                  <option value="price-ASC">Harga Terendah</option>
                  <option value="price-DESC">Harga Tertinggi</option>
                  <option value="rating-DESC">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 animate-pulse">
                    <div className="aspect-square bg-slate-100 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-slate-500 border border-slate-200 rounded-lg">
                Tidak ada produk kopi yang sesuai kriteria filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-10">
              <button
                onClick={() => fetchProducts(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(pagination.totalPages || 1)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchProducts(pageNum)}
                    className={`w-8 h-8 rounded text-xs font-medium cursor-pointer ${
                      pagination.page === pageNum
                        ? 'border border-slate-400 text-slate-800 font-bold'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => fetchProducts(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}