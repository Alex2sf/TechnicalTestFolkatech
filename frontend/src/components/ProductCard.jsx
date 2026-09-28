import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formatPrice } from '../utils/format';

export default function ProductCard({ item }) {
  const p = item.attributes || item;
  const id = item.id;

  return (
    <Link
      to={`/product/${id}`}
      className="group border border-slate-200 hover:border-[#EB3F36] rounded-sm p-4 flex flex-col text-center transition-all bg-white relative cursor-pointer"
    >
      <div className="aspect-square w-full mb-4 flex items-center justify-center overflow-hidden relative">
        <img
          src={p.image_url}
          alt={p.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 line-clamp-1 mb-1">
        {p.name}
      </h3>

      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
        {p.brand || 'UBRUKOPI'}
      </p>

      <div className="flex items-center justify-center gap-0.5 text-amber-400 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
        ))}
        <span className="text-[10px] text-slate-400 ml-1">({p.rating_count || 7})</span>
      </div>

      <div className="text-sm font-bold text-[#EB3F36] mt-auto">
        {formatPrice(p.price)}
      </div>
    </Link>
  );
}
