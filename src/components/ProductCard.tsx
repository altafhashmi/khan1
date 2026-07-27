import React from 'react';
import { Star, ShoppingBag, Heart, MessageSquare, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'PKR' | 'USD';
  isInWishlist: boolean;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAskBot: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onAskBot
}) => {
  const formatPrice = (pkr: number) => {
    if (currency === 'PKR') {
      return `₨ ${pkr.toLocaleString()}`;
    }
    return `$ ${(pkr / 280).toFixed(2)}`;
  };

  const discountPercent = Math.round(
    ((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isPopular && (
            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full shadow">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow">
              New Arrival
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition z-10 ${
            isInWishlist
              ? 'bg-red-50 text-red-500'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-red-500'
          }`}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Overlay Button */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-full shadow-lg hover:bg-slate-100 flex items-center gap-1.5 transition transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Content Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase font-semibold tracking-wider text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-sm hover:text-emerald-600 transition cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>
        </div>

        {/* Prices & Action Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900 font-heading">
              {formatPrice(product.pricePKR)}
            </span>
            {product.originalPricePKR > product.pricePKR && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPricePKR)}
              </span>
            )}
          </div>

          {/* Buttons Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="bg-slate-900 hover:bg-emerald-700 text-white font-semibold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => onAskBot(product)}
              title="Ask PakBot about this product"
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-2 px-2 rounded-xl text-xs border border-emerald-200 transition flex items-center justify-center gap-1 active:scale-95 truncate"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Ask Bot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
