import { useState } from 'react';
import { Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WishlistModal } from './components/WishlistModal';
import { SupportHub } from './components/SupportHub';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

export function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-2', 'prod-4']);
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Panels state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState<boolean>(false);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [chatProductContext, setChatProductContext] = useState<Product | null>(null);
  const [appliedDiscountPKR, setAppliedDiscountPKR] = useState<number>(0);

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Ask PakBot about product
  const handleAskBot = (product: Product) => {
    setChatProductContext(product);
    setIsChatOpen(true);
  };

  // Track order in chat
  const handleTrackInChat = (_orderId: string) => {
    setIsOrdersModalOpen(false);
    setIsChatOpen(true);
  };

  // Order created callback
  const handleOrderCreated = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart upon successful order creation
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        currency={currency}
        onToggleCurrency={() => setCurrency(prev => prev === 'PKR' ? 'USD' : 'PKR')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onOpenSupportChat={() => setIsChatOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenChat={() => setIsChatOpen(true)}
          onExploreProducts={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onTrackOrder={() => setIsOrdersModalOpen(true)}
        />

        {/* Filterable Products Grid */}
        <ProductGrid
          products={products}
          currency={currency}
          wishlistIds={wishlist}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAskBot={handleAskBot}
        />

        {/* Customer Care & Knowledge Base Hub */}
        <SupportHub
          onOpenChat={() => setIsChatOpen(true)}
          onSendTriggerToChat={(_trigger) => {
            setIsChatOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenChat={() => setIsChatOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onSelectCategory={setSelectedCategory}
      />

      {/* Persistent Floating Chat Widget (The core prompt component) */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        orders={orders}
        activeProductContext={chatProductContext}
        onClearProductContext={() => setChatProductContext(null)}
        onOpenOrderModal={(_orderId) => {
          setIsOrdersModalOpen(true);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAskBot={handleAskBot}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(discount) => {
          setAppliedDiscountPKR(discount);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        appliedDiscountPKR={appliedDiscountPKR}
        onOrderCreated={handleOrderCreated}
        onOpenChatWithOrder={(orderId) => {
          handleTrackInChat(orderId);
        }}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        orders={orders}
        currency={currency}
        onTrackInChat={handleTrackInChat}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onAddToCart={handleAddToCart}
        onRemoveWishlist={handleToggleWishlist}
        onAskBot={handleAskBot}
      />

    </div>
  );
}

export default App;
