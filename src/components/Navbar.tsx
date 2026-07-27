import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Heart, Headphones, 
  Truck, Menu, X, PackageCheck
} from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenSupportChat: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency,
  onToggleCurrency,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenSupportChat,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'electronics', label: 'Electronics & Tech' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'handicrafts', label: 'Crafts & Shawls' },
    { id: 'home', label: 'Home & Living' },
    { id: 'gourmet', label: 'Organic & Food' }
  ];

  const searchResults = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner Announcement Ticker */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-emerald-500 text-emerald-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
              PAKBAZAAR OFFERS
            </span>
            <span className="truncate text-slate-200">
              ⚡ Free Express Delivery nationwide on orders above ₨ 2,500! Use code <strong className="text-emerald-300">PAKBAZAAR10</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300 shrink-0 text-[11px]">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Fast Delivery 2-5 Days
            </span>
            <span className="text-slate-600">|</span>
            <button onClick={onOpenOrders} className="hover:text-white transition flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" /> Track My Order
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={onToggleCurrency} 
              className="font-bold text-white bg-emerald-800/80 hover:bg-emerald-700 px-2 py-0.5 rounded transition text-[11px]"
            >
              Currency: {currency} ({currency === 'PKR' ? '₨' : '$'})
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => onSelectCategory('all')} 
              className="cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition duration-300 border border-emerald-400/30">
                PB
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
                  Pak<span className="text-emerald-600">Bazaar</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                  Shop & Support Portal
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar with Auto Suggestions */}
          <div className="hidden md:block flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products, Peshawari chappal, earbuds, shawls..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchDropdown(false);
                      }}
                      className="p-3 hover:bg-emerald-50 flex items-center gap-3 cursor-pointer transition border-b border-slate-100 last:border-0"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
                        <p className="text-xs text-emerald-600 font-bold">
                          {currency === 'PKR' ? `₨ ${product.pricePKR.toLocaleString()}` : `$ ${(product.pricePKR / 280).toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-500 text-xs">
                    No matching products found. Try searching for "earbuds", "shawl", or "honey".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Customer Support Toggle */}
            <button
              onClick={onOpenSupportChat}
              className="relative hidden sm:flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold px-3.5 py-2 rounded-full border border-emerald-200 transition"
            >
              <div className="relative">
                <Headphones className="w-4 h-4 text-emerald-600" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              </div>
              <span>Live Support</span>
            </button>

            {/* Order Tracking Modal Trigger */}
            <button
              onClick={onOpenOrders}
              title="Track Order Status"
              className="p-2.5 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-full transition flex items-center gap-1.5 text-xs font-medium"
            >
              <PackageCheck className="w-5 h-5 text-slate-600" />
              <span className="hidden lg:inline">Orders</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              title="Wishlist"
              className="relative p-2.5 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-full transition"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full text-xs font-semibold transition shadow-md hover:shadow-emerald-900/20 active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-emerald-500 text-slate-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search PakBazaar items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
