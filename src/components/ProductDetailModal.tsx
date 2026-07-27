import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageSquare, Truck, ShieldCheck, Check, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  currency: 'PKR' | 'USD';
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  onAskBot: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onAskBot
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const formatPrice = (pkr: number) => {
    if (currency === 'PKR') return `₨ ${pkr.toLocaleString()}`;
    return `$ ${(pkr / 280).toFixed(2)}`;
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative p-6 sm:p-8 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Image */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ships nationwide in 2-5 business days</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 text-xs mt-2">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1">{product.rating}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{product.reviewsCount} customer reviews</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-600 font-semibold">{product.stock} items in stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-slate-900 font-heading">
                {formatPrice(product.pricePKR)}
              </span>
              {product.originalPricePKR > product.pricePKR && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPricePKR)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Product Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-white rounded-lg transition text-slate-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1.5 hover:bg-white rounded-lg transition text-slate-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`w-full font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md ${
                    addedNotice
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onAskBot(product);
                  }}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-3 px-4 rounded-xl text-xs border border-emerald-200 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Ask Bot About Item</span>
                </button>
              </div>
            </div>

            {/* Buyer Trust Footer */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>7-Day Return Guarantee • Cash on Delivery Available</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
