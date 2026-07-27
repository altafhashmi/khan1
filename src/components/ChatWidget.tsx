import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, X, Send, Volume2, VolumeX, Sparkles, 
  Truck, CreditCard, User, Mic, ExternalLink, Maximize2, Minimize2
} from 'lucide-react';
import { ChatMessage, Order, Product } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';
import { soundFx } from '../utils/audio';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  orders: Order[];
  activeProductContext?: Product | null;
  onClearProductContext?: () => void;
  onOpenOrderModal?: (orderId: string) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggle,
  orders,
  activeProductContext,
  onClearProductContext,
  onOpenOrderModal
}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Hello 👋 Welcome to PakBazaar. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      richType: 'quick_prompts'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLiveAgent, setIsLiveAgent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Sync soundFx toggle
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle auto scroll whenever messages change
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Handle dynamic context when user clicks "Ask PakBot about this product"
  useEffect(() => {
    if (activeProductContext && isOpen) {
      const initialQuestion = `Hi, tell me more about ${activeProductContext.name}. Is it in stock and how fast can it be delivered?`;
      setInputText(initialQuestion);
    }
  }, [activeProductContext, isOpen]);

  // Handle minimization unread badge
  const incrementUnread = () => {
    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Core reply function reproducing prompt logic & enriched features
  const reply = (userText: string) => {
    setIsTyping(true);
    const lower = userText.toLowerCase();

    // Check if user entered an Order ID pattern (e.g., PB-9842 or 9842 or order number)
    const orderMatch = userText.match(/PB-\d+/i) || userText.match(/\d{4}/);
    const matchedOrderId = orderMatch ? (orderMatch[0].startsWith('PB-') ? orderMatch[0].toUpperCase() : `PB-${orderMatch[0]}`) : null;
    const foundOrder = matchedOrderId ? [...orders, ...INITIAL_ORDERS].find(o => o.orderId.toUpperCase() === matchedOrderId) : null;

    let responseText = "";
    let richType: ChatMessage['richType'] = undefined;
    let cardData: any = null;

    if (foundOrder) {
      responseText = `I found your Order #${foundOrder.orderId}! Current status: ${foundOrder.status}. Estimated delivery: ${foundOrder.estimatedDelivery}.`;
      richType = 'order_card';
      cardData = foundOrder;
    } else if (lower.includes("delivery")) {
      responseText = "Delivery takes 2-5 business days across Pakistan. Orders in Karachi, Lahore & Islamabad are delivered in 24-48 hours!";
      richType = 'delivery_card';
    } else if (lower.includes("order")) {
      responseText = "Please provide your Order ID (e.g. PB-9842) so I can fetch live tracking details for you.";
      richType = 'order_card';
      cardData = { promptForId: true };
    } else if (lower.includes("payment")) {
      responseText = "We accept Cash on Delivery, Visa, Mastercard and Easypaisa.";
      richType = 'payment_card';
    } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("assalam")) {
      responseText = "Hello 👋 Welcome to PakBazaar. How can I help you today?";
      richType = 'quick_prompts';
    } else if (isLiveAgent) {
      responseText = "Thank you for the message! Agent Ayesha is typing a direct response for you now...";
    } else {
      responseText = "Thanks for contacting PakBazaar. One of our agents will assist you shortly.";
      richType = 'agent_card';
    }

    // Exact 500ms delay as specified in prompt snippet
    setTimeout(() => {
      setIsTyping(false);
      const newBotMsg: ChatMessage = {
        id: 'msg-' + Date.now(),
        sender: isLiveAgent ? 'agent' : 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richType,
        data: cardData
      };

      setMessages(prev => [...prev, newBotMsg]);
      soundFx.playReceiveSound();
      incrementUnread();
    }, 500);
  };

  const sendMessage = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!text) return;

    soundFx.playSendSound();

    const newUserMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    
    if (onClearProductContext) {
      onClearProductContext();
    }

    reply(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAction = (actionText: string) => {
    sendMessage(actionText);
  };

  const handleVoiceSimulate = () => {
    setIsListening(true);
    soundFx.playClickSound();
    setTimeout(() => {
      setIsListening(false);
      setInputText("Where is my order PB-9842?");
    }, 1800);
  };

  const handleTransferToAgent = () => {
    setIsLiveAgent(true);
    soundFx.playClickSound();
    setMessages(prev => [
      ...prev,
      {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Connecting you to Senior Support Lead Ayesha Khan... 🎧',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: 'msg-agent-' + Date.now(),
          sender: 'agent',
          text: 'Assalamu Alaikum! I am Ayesha from PakBazaar Customer Care. I have reviewed your session and I am ready to help!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      soundFx.playReceiveSound();
    }, 1200);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          id="chatButton"
          onClick={() => {
            soundFx.playClickSound();
            onToggle();
          }}
          aria-label="Open Chat Support"
          className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-medium px-5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/30"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 animate-pulse-subtle" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
          </div>
          <span className="text-sm font-semibold tracking-wide">Customer Support</span>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
              {unreadCount}
            </span>
          )}
          <span className="bg-emerald-800/60 text-emerald-200 text-xs px-2 py-0.5 rounded-full border border-emerald-500/40 hidden sm:inline-block">
            Online
          </span>
        </button>
      )}

      {/* Main Chat Box Box Window */}
      {isOpen && (
        <div
          id="chat-widget"
          className={`bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded 
              ? 'w-[95vw] sm:w-[540px] h-[85vh] max-h-[720px]' 
              : 'w-[92vw] sm:w-[390px] h-[560px] max-h-[82vh]'
          }`}
          style={{ display: 'flex' }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-emerald-800/40 relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-400 overflow-hidden">
                  {isLiveAgent ? (
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                      alt="Agent" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                  )}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white font-heading">
                    {isLiveAgent ? 'Ayesha (Support Agent)' : 'PakBazaar Bot Assistant'}
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    24/7 Live
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {isLiveAgent ? 'Human Support Connected' : 'Instant AI & Order Desk'}
                </p>
              </div>
            </div>

            {/* Header Action Tools */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse" : "Expand window"}
                className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                id="closeChat"
                onClick={() => {
                  soundFx.playClickSound();
                  onToggle();
                }}
                aria-label="Close Chat"
                className="p-1.5 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition text-slate-300 ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Notice if User is Asking About a Specific Product */}
          {activeProductContext && (
            <div className="bg-emerald-50 border-b border-emerald-100 p-2.5 px-3 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2 truncate">
                <img src={activeProductContext.image} alt="" className="w-6 h-6 object-cover rounded" />
                <span className="truncate font-medium">Asking about: <strong>{activeProductContext.name}</strong></span>
              </div>
              <button 
                onClick={onClearProductContext}
                className="text-emerald-700 font-bold hover:underline ml-2 text-[11px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Chat Body Container */}
          <div
            id="chat-body"
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 custom-scrollbar"
          >
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1.5">
                {/* Sender Pill & Bubble */}
                <div className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-1 shadow-sm">
                      {msg.sender === 'agent' ? 'A' : 'PB'}
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 text-sm shadow-sm leading-relaxed transition-all ${
                      msg.sender === 'user'
                        ? 'user bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none font-medium'
                        : msg.sender === 'agent'
                        ? 'bot bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                        : 'bot bg-white text-slate-800 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Rich Cards Rendered based on prompt triggers */}
                    {msg.richType === 'quick_prompts' && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        <button
                          onClick={() => handleQuickAction("delivery")}
                          className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full font-medium transition flex items-center gap-1"
                        >
                          🚚 Delivery Info
                        </button>
                        <button
                          onClick={() => handleQuickAction("order")}
                          className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full font-medium transition flex items-center gap-1"
                        >
                          📦 Track Order
                        </button>
                        <button
                          onClick={() => handleQuickAction("payment")}
                          className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full font-medium transition flex items-center gap-1"
                        >
                          💳 Payment Methods
                        </button>
                        <button
                          onClick={handleTransferToAgent}
                          className="text-xs bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full font-medium transition flex items-center gap-1"
                        >
                          💬 Talk to Live Agent
                        </button>
                      </div>
                    )}

                    {msg.richType === 'delivery_card' && (
                      <div className="mt-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs text-slate-700 space-y-1.5">
                        <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-emerald-600" /> Nationwide Shipping Schedule
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                          <li><strong>Karachi / Lahore / Islamabad:</strong> 24 - 48 Hours</li>
                          <li><strong>Other Major Cities:</strong> 2 - 3 Business Days</li>
                          <li><strong>Remote Areas:</strong> 3 - 5 Business Days</li>
                        </ul>
                        <div className="text-[11px] text-emerald-700 pt-1 border-t border-emerald-200/60 font-medium">
                          ⚡ Free shipping on orders over ₨ 2,500!
                        </div>
                      </div>
                    )}

                    {msg.richType === 'payment_card' && (
                      <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-2">
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-emerald-600" /> Accepted Payment Methods
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="bg-white p-2 rounded border border-slate-200 font-medium text-slate-700 flex items-center gap-1">
                            <span>💵</span> Cash on Delivery
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200 font-medium text-slate-700 flex items-center gap-1">
                            <span>💳</span> Visa / Mastercard
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200 font-medium text-slate-700 flex items-center gap-1">
                            <span>📱</span> Easypaisa
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200 font-medium text-slate-700 flex items-center gap-1">
                            <span>⚡</span> JazzCash
                          </div>
                        </div>
                        <div className="bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-200 text-[11px] mt-2 space-y-1">
                          <p className="font-bold flex items-center gap-1"><span>📞</span> Payment Numbers:</p>
                          <p><strong>Easypaisa:</strong> 0305-2612502</p>
                          <p><strong>Bank:</strong> PK82SHUU9411628689946956</p>
                        </div>
                      </div>
                    )}

                    {msg.richType === 'order_card' && msg.data && !msg.data.promptForId && (
                      <div className="mt-3 bg-emerald-950 text-white rounded-xl p-3 text-xs space-y-2 border border-emerald-700">
                        <div className="flex justify-between items-center pb-1.5 border-b border-emerald-800">
                          <span className="font-bold text-emerald-300">Order #{msg.data.orderId}</span>
                          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                            {msg.data.status}
                          </span>
                        </div>
                        <div className="text-slate-300 text-[11px] space-y-1">
                          <p>📍 Destination: {msg.data.shippingAddress?.city}</p>
                          <p>📅 Estimated Delivery: {msg.data.estimatedDelivery}</p>
                        </div>
                        {onOpenOrderModal && (
                          <button
                            onClick={() => onOpenOrderModal(msg.data.orderId)}
                            className="w-full mt-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
                          >
                            View Full Tracking Details <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}

                    {msg.richType === 'order_card' && msg.data?.promptForId && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap gap-1.5">
                        <p className="w-full text-xs text-slate-500">Quick test sample orders:</p>
                        {INITIAL_ORDERS.map(o => (
                          <button
                            key={o.orderId}
                            onClick={() => sendMessage(o.orderId)}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-2.5 py-1 rounded-md font-mono font-medium transition"
                          >
                            {o.orderId}
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.richType === 'agent_card' && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <button
                          onClick={handleTransferToAgent}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-1.5 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <User className="w-3.5 h-3.5 text-emerald-400" /> Connect with Human Representative
                        </button>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-1 text-right font-normal ${
                        msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  PB
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dot-1"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dot-2"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dot-3"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Buttons Bar */}
          <div className="bg-slate-100/80 px-3 py-1.5 border-t border-slate-200 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none text-[11px]">
            <span className="text-slate-400 font-medium text-[10px] shrink-0">Quick Ask:</span>
            <button
              onClick={() => handleQuickAction("delivery")}
              className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200 font-medium transition shrink-0"
            >
              Delivery time?
            </button>
            <button
              onClick={() => handleQuickAction("order")}
              className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200 font-medium transition shrink-0"
            >
              Track Order
            </button>
            <button
              onClick={() => handleQuickAction("payment")}
              className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200 font-medium transition shrink-0"
            >
              Payment Methods
            </button>
            <button
              onClick={() => handleQuickAction("hello")}
              className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200 font-medium transition shrink-0"
            >
              Greeting
            </button>
          </div>

          {/* Message Input Box Form */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5 pl-3 border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition">
              <input
                id="message"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type delivery, order ID, payment..."
                aria-label="Message input"
                className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={handleVoiceSimulate}
                title="Dictate message"
                className={`p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition ${
                  isListening ? 'text-red-500 bg-red-100 animate-pulse' : ''
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!inputText.trim()}
                aria-label="Send message"
                className={`p-2 rounded-xl text-white font-medium transition-all ${
                  inputText.trim()
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
              <span>PakBazaar AI Support • Response delay 0.5s</span>
              <span className="font-mono text-emerald-600 font-semibold">Active Session</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
