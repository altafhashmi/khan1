import React, { useState } from 'react';
import { X, Search, PackageCheck, CheckCircle2, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currency: 'PKR' | 'USD';
  onTrackInChat: (orderId: string) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
  onTrackInChat
}) => {
  const [query, setQuery] = useState('PB-9842');
  const [activeOrder, setActiveOrder] = useState<Order | null>(orders[0] || null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = orders.find(o => o.orderId.toLowerCase() === query.trim().toLowerCase());
    if (match) {
      setActiveOrder(match);
    } else {
      setActiveOrder(null);
    }
  };

  const formatPrice = (pkr: number) => {
    if (currency === 'PKR') return `₨ ${pkr.toLocaleString()}`;
    return `$ ${(pkr / 280).toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative p-6 sm:p-8 space-y-6"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
            Real-Time Logistics
          </span>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mt-2 flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-emerald-600" /> Track Your Order Status
          </h2>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. PB-9842, PB-1002)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-100 pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
          >
            Lookup
          </button>
        </form>

        {/* Quick Sample Order Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Pick Sample:</span>
          {orders.map(o => (
            <button
              key={o.orderId}
              onClick={() => {
                setQuery(o.orderId);
                setActiveOrder(o);
              }}
              className={`px-3 py-1 rounded-lg font-mono font-medium transition ${
                activeOrder?.orderId === o.orderId
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {o.orderId} ({o.status})
            </button>
          ))}
        </div>

        {/* Selected Order Display */}
        {activeOrder ? (
          <div className="space-y-5 border-t border-slate-200 pt-4">
            
            {/* Order Header Summary */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap justify-between items-center gap-3">
              <div>
                <p className="text-xs text-slate-400">Order Number</p>
                <p className="text-xl font-bold font-mono text-emerald-400">{activeOrder.orderId}</p>
                <p className="text-[11px] text-slate-400">Placed on {activeOrder.date}</p>
              </div>

              <div className="text-right">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
                  {activeOrder.status}
                </span>
                <p className="text-xs text-slate-300 mt-1">Est: {activeOrder.estimatedDelivery}</p>
              </div>
            </div>

            {/* Visual Tracking Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Logistics Journey Timeline</h4>
              
              <div className="space-y-3 relative pl-6 border-l-2 border-slate-200 ml-2">
                {activeOrder.trackingEvents.map((evt, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full flex items-center justify-center ${
                      evt.completed ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-500'
                    }`}>
                      {evt.completed ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-2.5 h-2.5" />}
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-800">
                        <span>{evt.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{evt.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Order Items ({activeOrder.items.length})</h4>
              {activeOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt="" className="w-8 h-8 object-cover rounded" />
                    <span>{item.productName} (x{item.quantity})</span>
                  </div>
                  <span className="font-bold text-slate-800">{formatPrice(item.pricePKR)}</span>
                </div>
              ))}
            </div>

            {/* Ask Chat Assistant Trigger */}
            <button
              onClick={() => {
                onClose();
                onTrackInChat(activeOrder.orderId);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> Ask PakBot Live Agent About Order #{activeOrder.orderId}
            </button>

          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            <p>No order found matching "{query}". Try searching for <strong>PB-9842</strong>, <strong>PB-1002</strong>, or <strong>PB-3051</strong>.</p>
          </div>
        )}
      </div>
    </div>
  );
};
