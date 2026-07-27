import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, ArrowRight, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'PKR' | 'USD';
  appliedDiscountPKR: number;
  onOrderCreated: (newOrder: Order) => void;
  onOpenChatWithOrder: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  appliedDiscountPKR,
  onOrderCreated,
  onOpenChatWithOrder
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const [fullName, setFullName] = useState('Ahmed Raza');
  const [phone, setPhone] = useState('+92 300 8765432');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('House 18, Block G, Johar Town');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Visa / Mastercard' | 'Easypaisa' | 'JazzCash'>('Cash on Delivery');

  if (!isOpen) return null;

  const subtotalPKR = items.reduce((acc, item) => acc + item.product.pricePKR * item.quantity, 0);
  const shippingFeePKR = subtotalPKR >= 2500 ? 0 : 200;
  const totalPKR = Math.max(0, subtotalPKR - appliedDiscountPKR + shippingFeePKR);

  const formatPrice = (pkr: number) => {
    if (currency === 'PKR') return `₨ ${pkr.toLocaleString()}`;
    return `$ ${(pkr / 280).toFixed(2)}`;
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    // Generate random Order ID like PB-2026-881
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PB-${randomNum}`;

    const newOrder: Order = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      items: items.map(i => ({
        productName: i.product.name,
        quantity: i.quantity,
        pricePKR: i.product.pricePKR,
        image: i.product.image
      })),
      totalPKR,
      shippingAddress: {
        fullName,
        phone,
        city,
        address
      },
      paymentMethod,
      estimatedDelivery: '2 - 4 Business Days',
      trackingEvents: [
        { title: 'Order Confirmed & Received', location: 'PakBazaar Fulfillment System', timestamp: 'Just Now', completed: true },
        { title: 'Packing & Quality Verification', location: `Hub - ${city}`, timestamp: 'In Progress', completed: false },
        { title: 'Dispatched to Express Courier', location: 'Dispatch Depot', timestamp: 'Pending', completed: false },
        { title: 'Delivered', location: address, timestamp: 'Pending', completed: false }
      ]
    };

    onOrderCreated(newOrder);
    setCreatedOrder(newOrder);
    setStep('success');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative p-6 sm:p-8 space-y-6"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <form onSubmit={handleCompleteOrder} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
                Secure Express Checkout
              </span>
              <h2 className="text-2xl font-bold font-heading text-slate-900 mt-2">Delivery & Payment Info</h2>
            </div>

            {/* Shipping Inputs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" /> Dispatch Destination
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-emerald-500 font-semibold"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Multan">Multan</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" /> Select Payment Method
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Cash on Delivery', label: '💵 Cash on Delivery' },
                  { id: 'Visa / Mastercard', label: '💳 Visa / Mastercard' },
                  { id: 'Easypaisa', label: '📱 Easypaisa' },
                  { id: 'JazzCash', label: '⚡ JazzCash' }
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                      paymentMethod === m.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id as any)}
                      className="accent-emerald-600"
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
              <div className="bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-200 text-[11px] space-y-1">
                <p className="font-bold flex items-center gap-1"><span>📞</span> Payment Account Details:</p>
                <p><strong>Easypaisa:</strong> 0305-2612502</p>
                <p><strong>Bank Account:</strong> PK82SHUU9411628689946956</p>
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Payable Amount</p>
                <p className="text-2xl font-extrabold text-emerald-400 font-heading">{formatPrice(totalPKR)}</p>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <p>Includes {items.length} items</p>
                <p className="text-emerald-300">Free Insurance Included</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <span>Confirm Order & Generate Order ID</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Order Placed Successfully!
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-slate-900 mt-2">
                Order ID: <span className="text-emerald-600 font-mono">{createdOrder?.orderId}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Thank you, {createdOrder?.shippingAddress.fullName}! Your order has been registered and is being processed at our {createdOrder?.shippingAddress.city} fulfillment center.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-bold text-slate-800">{createdOrder?.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">{createdOrder?.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Charged:</span>
                <span className="font-bold text-slate-900">{formatPrice(createdOrder?.totalPKR || 0)}</span>
              </div>
            </div>

            {/* Test in Chat Action */}
            <div className="bg-emerald-950 text-white p-4 rounded-2xl space-y-2 border border-emerald-800">
              <p className="text-xs font-semibold text-emerald-300">
                💡 Want to track this order using PakBot?
              </p>
              <p className="text-[11px] text-slate-300">
                Click below to open our interactive Chat Widget and type <code className="text-emerald-300 font-mono">{createdOrder?.orderId}</code>!
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (createdOrder) {
                    onOpenChatWithOrder(createdOrder.orderId);
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Open Chat & Track Order
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Back to Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
