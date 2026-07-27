import React from 'react';
import { MessageCircle, Heart, ShieldCheck, Headphones } from 'lucide-react';

interface FooterProps {
  onOpenChat: () => void;
  onOpenOrders: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat, onOpenOrders, onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                PB
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                Pak<span className="text-emerald-500">Bazaar</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pakistan's premier destination for authentic artisanal goods, quality fashion, and cutting-edge electronics with instant AI & Live Agent support.
            </p>
            <div className="flex items-center gap-2 pt-1 text-emerald-400 font-semibold">
              <Headphones className="w-4 h-4" /> 24/7 Support Hotline Available
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2">
            <h4 className="font-bold text-white font-heading text-sm">Shop Categories</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onSelectCategory('electronics')} className="hover:text-emerald-400 transition">Electronics & Gadgets</button></li>
              <li><button onClick={() => onSelectCategory('fashion')} className="hover:text-emerald-400 transition">Traditional & Modern Fashion</button></li>
              <li><button onClick={() => onSelectCategory('handicrafts')} className="hover:text-emerald-400 transition">Kashmiri Shawls & Crafts</button></li>
              <li><button onClick={() => onSelectCategory('gourmet')} className="hover:text-emerald-400 transition">Organic Hunza Delicacies</button></li>
              <li><button onClick={() => onSelectCategory('home')} className="hover:text-emerald-400 transition">Home & Living Bedsets</button></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-2">
            <h4 className="font-bold text-white font-heading text-sm">Customer Services</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={onOpenChat} className="hover:text-emerald-400 transition flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> Open Chat Support Widget</button></li>
              <li><button onClick={onOpenOrders} className="hover:text-emerald-400 transition">Track Your Order Status</button></li>
              <li><a href="#products-section" className="hover:text-emerald-400 transition">Shipping & Delivery Policy</a></li>
              <li><a href="#products-section" className="hover:text-emerald-400 transition">7-Day Easy Returns</a></li>
              <li><a href="#products-section" className="hover:text-emerald-400 transition">Payment Methods Guide</a></li>
            </ul>
          </div>

          {/* Accepted Payments & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-heading text-sm">Accepted Payment Options</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex items-center gap-1.5">
                <span>💵</span> Cash on Delivery
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex items-center gap-1.5">
                <span>💳</span> Visa / Mastercard
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex items-center gap-1.5">
                <span>📱</span> Easypaisa
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex items-center gap-1.5">
                <span>⚡</span> JazzCash
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Encrypted Checkout
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 PakBazaar E-Commerce & Customer Service Portal. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with care for</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>PakBazaar Shoppers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
