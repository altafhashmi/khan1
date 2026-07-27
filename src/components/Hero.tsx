import React from 'react';
import { Truck, ShieldCheck, Headphones, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onExploreProducts: () => void;
  onTrackOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onExploreProducts, onTrackOrder }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-12 md:py-16">
      {/* Decorative Glow Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>PakBazaar Online Shopping & Live Agent Assistant</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Authentic Pakistani Essentials & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">24/7 Instant Support</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Shop high-grade leathercraft, tech gadgets, organic Hunza gourmet delicacies, and artisan shawls with nationwide fast dispatch. Have questions about delivery or payments? Our <strong>PakBot Chat Widget</strong> is ready to assist you instantly!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-full text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
              >
                <span>Shop Today's Bazaar Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-full text-sm border border-white/20 transition flex items-center gap-2 active:scale-95 backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Open Support Chat</span>
              </button>

              <button
                onClick={onTrackOrder}
                className="text-xs text-emerald-300 hover:text-white underline font-medium px-2 py-1 transition"
              >
                Quick Order Lookup
              </button>
            </div>

            {/* Quick Demo Code Notice */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-700/50">
                PROMPT DEMO
              </span>
              <span>Test Chat Widget trigger words: <code className="text-emerald-300">delivery</code>, <code className="text-emerald-300">order</code>, <code className="text-emerald-300">payment</code>, <code className="text-emerald-300">hello</code></span>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Box */}
          <div className="md:col-span-5">
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow-inner">
                    PB
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">PakBazaar Concierge</h3>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Interactive Widget Active
                    </p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-full font-mono border border-emerald-700/40">
                  Response ~0.5s
                </span>
              </div>

              {/* Sample Chat Prompt Preview Card */}
              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-700/60 p-3 rounded-2xl rounded-tl-none border border-slate-600 text-slate-200">
                  👋 Welcome to PakBazaar! Type <strong>"delivery"</strong>, <strong>"order"</strong>, or <strong>"payment"</strong> in the chat to get instant details.
                </div>
                <div className="bg-emerald-600 p-3 rounded-2xl rounded-tr-none text-white font-medium ml-auto max-w-[85%] text-right">
                  How fast is delivery to Lahore or Karachi?
                </div>
                <div className="bg-slate-700/60 p-3 rounded-2xl rounded-tl-none border border-slate-600 text-slate-200">
                  🚚 Delivery takes 2-5 business days across Pakistan. Express orders arrive in 24-48 hours!
                </div>
              </div>

              {/* Quick Launch Chip Button inside Hero */}
              <button
                onClick={onOpenChat}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Try Chat Assistant Now
              </button>
            </div>
          </div>

        </div>

        {/* Feature Badges Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <Truck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Express Delivery</p>
              <p className="text-slate-400 text-[11px]">2-5 Business Days Nationwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">100% Authentic Goods</p>
              <p className="text-slate-400 text-[11px]">Verified Crafts & Electronics</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <Headphones className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">24/7 PakBot Support</p>
              <p className="text-slate-400 text-[11px]">Instant Automated Answers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <span className="text-2xl shrink-0">💵</span>
            <div>
              <p className="font-bold text-white">Cash on Delivery</p>
              <p className="text-slate-400 text-[11px]">Pay when you receive package</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
