import React, { useState } from 'react';
import { Search, HelpCircle, Truck, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';

interface SupportHubProps {
  onOpenChat: () => void;
  onSendTriggerToChat: (trigger: string) => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ onOpenChat, onSendTriggerToChat }) => {
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const filteredFaqs = FAQ_LIST.filter(
    f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
    }, 4000);
  };

  return (
    <section className="bg-slate-100/70 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Customer Care Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            How Can PakBazaar Help You Today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Instant answers via automated PakBot assistant, comprehensive FAQs, or request a quick phone callback from our Lahore & Karachi support desks!
          </p>
        </div>

        {/* 3 Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Live Chat Widget Launcher */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Interactive PakBot Assistant</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Test chat responses for <code className="text-emerald-700 bg-emerald-50 px-1 rounded">delivery</code>, <code className="text-emerald-700 bg-emerald-50 px-1 rounded">order</code>, and <code className="text-emerald-700 bg-emerald-50 px-1 rounded">payment</code>.
              </p>
            </div>
            <button
              onClick={onOpenChat}
              className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" /> Launch Support Widget
            </button>
          </div>

          {/* Card 2: Payment Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Nationwide Delivery Times</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Standard delivery in 2-5 business days. Express overnight options available for Lahore, Karachi, and Islamabad.
              </p>
            </div>
            <button
              onClick={() => onSendTriggerToChat("delivery")}
              className="w-full bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold py-2.5 px-4 rounded-xl text-xs border border-teal-200 transition flex items-center justify-center gap-2"
            >
              Ask Chat About Delivery
            </button>
          </div>
          
          {/* Card 2b: Payment Details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">
              <span>💳</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Payment Account Details</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our official payment accounts for secure transactions.
              </p>
            </div>
            <div className="bg-amber-50 text-amber-800 p-3 rounded-xl border border-amber-200 text-xs space-y-1.5">
              <p><strong>Easypaisa:</strong> 0305-2612502</p>
              <p><strong>Bank Account:</strong> PK82SHUU9411628689946956</p>
            </div>
          </div>

          {/* Card 3: Direct Phone Callback */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold shadow-md">
              <Phone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Request Phone Callback</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Need phone assistance? Leave your number and an agent will call you within 15 minutes.
              </p>
            </div>
            {callbackSubmitted ? (
              <div className="bg-emerald-100 text-emerald-800 text-xs font-bold p-2.5 rounded-xl text-center">
                ✓ Callback Request Registered!
              </div>
            ) : (
              <form onSubmit={handleCallback} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-100 rounded-lg border border-slate-200 outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="0300 1234567"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="flex-1 text-xs p-2 bg-slate-100 rounded-lg border border-slate-200 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-lg transition"
                  >
                    Call Me
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* FAQ Knowledge Base Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" /> Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Quick self-service answers to common inquiries</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full text-xs bg-slate-100 pl-9 pr-3 py-2 rounded-full border border-slate-200 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 text-xs sm:text-sm font-bold text-slate-800 flex justify-between items-center hover:text-emerald-700"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 text-lg">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
