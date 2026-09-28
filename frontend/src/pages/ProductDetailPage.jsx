import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { Star, Heart, Check } from 'lucide-react';
import { formatPrice } from '../utils/format';

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProductAndRecs = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data.data?.attributes || res.data.data || null);

        const recRes = await api.get('/list-product?limit=4');
        const list = recRes.data.data || [];
        const filtered = list.filter((item) => String(item.id) !== String(id));
        setRecommendations(filtered.slice(0, 3));
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRecs();
  }, [id]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[1240px] mx-auto px-4 py-16 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-[#EB3F36] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[1240px] mx-auto px-4 py-16 text-center text-slate-500">
          Produk tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
          <div className="border border-slate-200 rounded-lg p-8 flex items-center justify-center bg-white aspect-square max-w-[450px] mx-auto w-full">
            <img
              src={product.image_url}
              alt={product.name}
              className="max-h-[350px] max-w-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 mb-2">
              {product.name}
            </h1>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {product.brand || 'UBRUKOPI'}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400">({product.rating_count || 7} Ulasan)</span>
            </div>

            <div className="text-2xl font-bold text-[#EB3F36] mb-6">
              {formatPrice(product.price)}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-slate-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-semibold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-[#EB3F36] hover:bg-[#d8352d] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded transition flex items-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Berhasil Ditambah
                  </>
                ) : (
                  'Tambah ke Keranjang'
                )}
              </button>

              <button className="p-2.5 border border-slate-300 rounded text-slate-500 hover:text-red-500 hover:border-red-500 transition">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 space-y-1">
              <p>Stok: <span className="font-semibold text-slate-700">{product.stock || 10}</span></p>
              <p>Kategori: <span className="font-semibold text-slate-700">{product.category || 'Roasted Bean'}</span></p>
            </div>
          </div>
        </div>

        <div className="mb-16 max-w-2xl mx-auto">
          {/* Tab Header di tengah */}
          <div className="flex justify-center border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab('deskripsi')}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition cursor-pointer relative ${
                activeTab === 'deskripsi'
                  ? 'text-[#EB3F36] border-b-2 border-[#EB3F36]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              DESKRIPSI
            </button>
            <button
              onClick={() => setActiveTab('informasi')}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition cursor-pointer relative ${
                activeTab === 'informasi'
                  ? 'text-[#EB3F36] border-b-2 border-[#EB3F36]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              INFORMASI
            </button>
          </div>

          {/* Isi Konten Rata Kiri di Dalam Kotak Tengah */}
          <div className="text-xs leading-relaxed text-slate-500 space-y-4">
            {activeTab === 'deskripsi' ? (
              <>
                <p>
                  {product.description ||
                    'French Press berbahan dasar kaca berwarna abu-abu didesain dengan bentuk yang ramping dan menarik, sangat cocok untuk membuat 1-2 gelas kopi.'}
                </p>
                <div className="pt-2 space-y-1">
                  <p className="font-semibold text-slate-700">Spesifikasi:</p>
                  {product.origin && <p>Origin : {product.origin}</p>}
                  {product.species && <p>Species : {product.species}</p>}
                  {product.roast_level && <p>Roast Level : {product.roast_level}</p>}
                  {product.tasted && <p>Tasting Notes : {product.tasted}</p>}
                  {product.processing && <p>Processing : {product.processing}</p>}
                  {product.brand && <p>Brand : {product.brand}</p>}
                </div>
              </>
            ) : (
              <p>
                {product.information ||
                  'Informasi garansi resmi dan petunjuk pemakaian disertakan di dalam kemasan box.'}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 inline-block relative pb-2 border-b-2 border-[#EB3F36]">
              Rekomendasi Untuk Anda
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {recommendations.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}