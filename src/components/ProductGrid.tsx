import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  currency: 'PKR' | 'USD';
  wishlistIds: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAskBot: (p: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  wishlistIds,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onAskBot
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(15000);

  // Filter products by category & price
  let filtered = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchPrice = p.pricePKR <= maxPrice;
    return matchCategory && matchPrice;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.pricePKR - b.pricePKR);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.pricePKR - a.pricePKR);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <span>Bazaar Product Catalog</span>
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {filtered.length} Items Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Express nationwide delivery • Cash on Delivery accepted
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Price Range Slider */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-medium">Max Price:</span>
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-emerald-600 cursor-pointer"
            />
            <span className="font-bold text-slate-800">
              {currency === 'PKR' ? `₨ ${maxPrice.toLocaleString()}` : `$ ${(maxPrice / 280).toFixed(0)}`}
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 font-semibold outline-none cursor-pointer"
            >
              <option value="featured">Featured Deals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isInWishlist={wishlistIds.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAskBot={onAskBot}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No products match your current filters</h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            Try adjusting your maximum price slider or changing the category filter.
          </p>
          <button
            onClick={() => {
              setMaxPrice(15000);
              onSelectCategory('all');
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
