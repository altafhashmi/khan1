import React from 'react';
import { X, Heart, ShoppingBag, Trash2, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: 'PKR' | 'USD';
  onAddToCart: (p: Product) => void;
  onRemoveWishlist: (p: Product) => void;
  onAskBot: (p: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onAddToCart,
  onRemoveWishlist,
  onAskBot
}) => {
  if (!isOpen) return null;

  const formatPrice = (pkr: number) => {
    if (currency === 'PKR') return `₨ ${pkr.toLocaleString()}`;
    return `$ ${(pkr / 280).toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-slate-200 relative p-6 space-y-5"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-red-600 uppercase bg-red-50 px-2.5 py-1 rounded-full">
            Saved Favorites
          </span>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mt-2 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" /> Saved Products ({wishlistProducts.length})
          </h2>
        </div>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map(product => (
              <div key={product.id} className="flex gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 items-center">
                <img src={product.image} alt="" className="w-16 h-16 object-cover rounded-xl border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{product.name}</h4>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">{formatPrice(product.pricePKR)}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-slate-900 hover:bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" /> Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onAskBot(product);
                      }}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1 border border-emerald-200"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-600" /> Ask Bot
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveWishlist(product)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-200 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p>No items in your wishlist yet. Click the heart icon on any product card!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
