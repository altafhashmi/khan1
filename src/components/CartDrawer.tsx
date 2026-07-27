import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'PKR' | 'USD';
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscountPKR: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotalPKR = items.reduce((acc, item) => acc + item.product.pricePKR * item.quantity, 0);
  const discountPKR = Math.round(subtotalPKR * (discountPercent / 100));
  const shippingFeePKR = subtotalPKR >= 2500 || subtotalPKR === 0 ? 0 : 200;
  const totalPKR = Math.max(0, subtotalPKR - discountPKR + shippingFeePKR);

  const freeShippingThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((subtotalPKR / freeShippingThreshold) * 100));

  const formatPrice = (pkr: number) => {
    if (currency === 'PKR') return `₨ ${pkr.toLocaleString()}`;
    return `$ ${(pkr / 280).toFixed(2)}`;
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'PAKBAZAAR10') {
      setDiscountPercent(10);
      setPromoMsg({ text: 'PAKBAZAAR10 applied! 10% discount unlocked.', isError: false });
    } else if (code === 'WELCOME500') {
      setDiscountPercent(15);
      setPromoMsg({ text: 'WELCOME500 applied! 15% discount unlocked.', isError: false });
    } else {
      setPromoMsg({ text: 'Invalid promo code. Try PAKBAZAAR10', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Cart Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base font-heading">Your Shopping Bag ({items.length})</h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="bg-emerald-50 p-3 border-b border-emerald-100 text-xs">
            <div className="flex items-center justify-between text-emerald-900 font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" /> Free Shipping Threshold
              </span>
              <span>{progressPercent >= 100 ? 'Free Delivery Unlocked!' : `Add ${formatPrice(freeShippingThreshold - subtotalPKR)} more`}</span>
            </div>
            <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full transition-all duration-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {items.length > 0 ? (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl border border-slate-200" />
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 truncate">{product.name}</h4>
                      <p className="text-xs font-extrabold text-emerald-700 mt-0.5">
                        {formatPrice(product.pricePKR)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Buttons */}
                      <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Your bag is empty</p>
                <p className="text-xs text-slate-400">Explore products from our catalog to add items here!</p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              
              {/* Promo Input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Promo code (PAKBAZAAR10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 uppercase"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
                  >
                    Apply
                  </button>
                </div>
                {promoMsg && (
                  <p className={`text-[11px] ${promoMsg.isError ? 'text-red-500' : 'text-emerald-600 font-semibold'}`}>
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* Summary Calculation */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{formatPrice(subtotalPKR)}</span>
                </div>
                {discountPKR > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFeePKR === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingFeePKR)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-emerald-700 font-heading text-base">{formatPrice(totalPKR)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(discountPKR);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
