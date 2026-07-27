import { Product, Order, AgentInfo } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'PakBazaar BassPro ANC Wireless Earbuds',
    category: 'electronics',
    pricePKR: 4499,
    originalPricePKR: 6999,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-clear sound with active noise cancellation, 32-hour total battery life, fast Type-C charging, and IPX5 water resistance.',
    features: ['Active Noise Cancellation (ANC)', '32 Hours Total Playtime', 'Bluetooth 5.3 Low Latency', 'Touch Control & Voice Assistant'],
    stock: 45,
    isPopular: true,
    isNew: true,
    tags: ['earbuds', 'wireless', 'audio', 'electronics', 'bluetooth']
  },
  {
    id: 'prod-2',
    name: 'Handcrafted Peshawari Chappal (Pure Leather)',
    category: 'fashion',
    pricePKR: 3850,
    originalPricePKR: 5200,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    description: 'Authentic handmade full-grain cow leather Peshawari Chappal with lightweight double tire-sole for supreme durability and traditional elegance.',
    features: ['100% Genuine Full-Grain Leather', 'Durable Vulcanized Rubber Sole', 'Adjustable Ankle Strap', 'Traditional Hand-Stitched Finish'],
    stock: 28,
    isPopular: true,
    tags: ['footwear', 'chappal', 'leather', 'pashawari', 'traditional', 'mens fashion']
  },
  {
    id: 'prod-3',
    name: 'Pure Hunza Organic Wildflower Honey (500g)',
    category: 'gourmet',
    pricePKR: 2190,
    originalPricePKR: 2800,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    description: 'Raw, unpasteurized, non-heated natural organic honey harvested directly from the pristine alpine flora of Hunza Valley.',
    features: ['100% Raw & Unrefined', 'Rich in Natural Antioxidants', 'Lab Tested for Purity', 'Direct from Hunza Beekeeper Farms'],
    stock: 60,
    isPopular: true,
    tags: ['honey', 'organic', 'hunza', 'gourmet', 'natural', 'food']
  },
  {
    id: 'prod-4',
    name: 'Royal Chinar Kashmiri Embroidered Pashmina Shawl',
    category: 'handicrafts',
    pricePKR: 8990,
    originalPricePKR: 12500,
    rating: 5.0,
    reviewsCount: 188,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80',
    description: 'Exquisite hand-worked Kashmiri wool shawl featuring intricate needlework border and silky warm comfort.',
    features: ['Soft Wool Blend with Fine Embroidery', 'Generous 2.5 Meter Length', 'Heirloom Quality Crafts', 'Includes Gift Box'],
    stock: 14,
    isPopular: true,
    tags: ['shawl', 'pashmina', 'kashmiri', 'handicraft', 'embroidery', 'fashion']
  },
  {
    id: 'prod-5',
    name: 'PakBazaar Titan SmartWatch Ultra V2 (AMOLED)',
    category: 'electronics',
    pricePKR: 6250,
    originalPricePKR: 8500,
    rating: 4.7,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
    description: '1.96" HD AMOLED display with Bluetooth calling, heart rate/spO2 tracking, 100+ sports modes, and 10 days battery life.',
    features: ['1.96" HD Always-On Display', 'Bluetooth Direct Calling', 'SpO2 & Heart Rate Monitor', 'IP68 Waterproofing'],
    stock: 32,
    isNew: true,
    tags: ['smartwatch', 'watch', 'tech', 'gadget', 'fitness']
  },
  {
    id: 'prod-6',
    name: 'Ajrak Block-Printed Pure Cotton 3-Piece Bedset',
    category: 'home',
    pricePKR: 3450,
    originalPricePKR: 4500,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional Sindhi block-printed king-size bedsheet with 2 pillowcases made from 100% breathable pure cotton.',
    features: ['King Size (90 x 100 inches)', 'Includes 2 Matching Pillowcovers', 'Fast Colors Non-Fade Dye', 'Soft 100% Pure Cotton'],
    stock: 22,
    tags: ['ajrak', 'bedsheet', 'home', 'cotton', 'traditional']
  },
  {
    id: 'prod-7',
    name: 'Premium Leather Minimalist Slim Bifold Wallet',
    category: 'fashion',
    pricePKR: 1650,
    originalPricePKR: 2400,
    rating: 4.6,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    description: 'Sleek RFID-blocking full grain leather wallet with 8 card slots and dual cash compartments.',
    features: ['RFID Blocking Protection', 'Holds 8 Cards + Cash', 'Full-Grain Genuine Leather', 'Compact Slim Profile'],
    stock: 50,
    tags: ['wallet', 'leather', 'accessories', 'men']
  },
  {
    id: 'prod-8',
    name: 'Royal Emerald Green Tea Loose Leaf (250g)',
    category: 'gourmet',
    pricePKR: 1290,
    originalPricePKR: 1600,
    rating: 4.9,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    description: 'Aromatic high-altitude green tea infused with natural cardamom pods and mint leaves for detox & relaxation.',
    features: ['100% Whole Leaf Green Tea', 'Infused with Green Cardamom', 'Zero Preservatives', 'Aromatic & Digestible'],
    stock: 80,
    tags: ['tea', 'green tea', 'cardamom', 'gourmet', 'beverage']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    orderId: 'PB-9842',
    date: 'May 12, 2026',
    status: 'Out for Delivery',
    items: [
      {
        productName: 'PakBazaar BassPro ANC Wireless Earbuds',
        quantity: 1,
        pricePKR: 4499,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80'
      }
    ],
    totalPKR: 4499,
    shippingAddress: {
      fullName: 'Hamza Malik',
      phone: '+92 300 1234567',
      city: 'Lahore',
      address: 'House 42, Block C, Model Town'
    },
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: 'Today by 6:00 PM',
    trackingEvents: [
      { title: 'Order Confirmed', location: 'PakBazaar Lahore Hub', timestamp: 'May 12, 09:15 AM', completed: true },
      { title: 'Package Dispatched', location: 'Lahore Logistics Depot', timestamp: 'May 12, 11:30 AM', completed: true },
      { title: 'Out for Delivery', location: 'Rider Assigned (Usman)', timestamp: 'May 12, 02:45 PM', completed: true },
      { title: 'Delivered', location: 'Customer Doorstep', timestamp: 'Pending', completed: false }
    ]
  },
  {
    orderId: 'PB-1002',
    date: 'May 10, 2026',
    status: 'Delivered',
    items: [
      {
        productName: 'Handcrafted Peshawari Chappal (Pure Leather)',
        quantity: 1,
        pricePKR: 3850,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&auto=format&fit=crop&q=80'
      },
      {
        productName: 'Pure Hunza Organic Wildflower Honey (500g)',
        quantity: 1,
        pricePKR: 2190,
        image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=200&auto=format&fit=crop&q=80'
      }
    ],
    totalPKR: 6040,
    shippingAddress: {
      fullName: 'Sana Ahmed',
      phone: '+92 321 9876543',
      city: 'Karachi',
      address: 'Apartment 402, Sunset Towers, DHA Phase 5'
    },
    paymentMethod: 'Easypaisa',
    estimatedDelivery: 'May 11, 2026',
    trackingEvents: [
      { title: 'Order Confirmed', location: 'PakBazaar Karachi Hub', timestamp: 'May 10, 10:00 AM', completed: true },
      { title: 'In Transit', location: 'Clifton Courier Station', timestamp: 'May 10, 04:00 PM', completed: true },
      { title: 'Out for Delivery', location: 'Rider Assigned (Tariq)', timestamp: 'May 11, 09:30 AM', completed: true },
      { title: 'Successfully Delivered', location: 'Delivered to Sana Ahmed', timestamp: 'May 11, 01:15 PM', completed: true }
    ]
  },
  {
    orderId: 'PB-3051',
    date: 'May 13, 2026',
    status: 'Processing',
    items: [
      {
        productName: 'PakBazaar Titan SmartWatch Ultra V2',
        quantity: 1,
        pricePKR: 6250,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&auto=format&fit=crop&q=80'
      }
    ],
    totalPKR: 6250,
    shippingAddress: {
      fullName: 'Bilal Khan',
      phone: '+92 333 4445556',
      city: 'Islamabad',
      address: 'Street 15, Sector F-7/2'
    },
    paymentMethod: 'Visa / Mastercard',
    estimatedDelivery: 'Tomorrow, May 14',
    trackingEvents: [
      { title: 'Order Placed & Verified', location: 'PakBazaar Islamabad Hub', timestamp: 'May 13, 01:20 PM', completed: true },
      { title: 'Quality Check & Packing', location: 'Fulfillment Center', timestamp: 'In Progress', completed: false },
      { title: 'Handed to Courier', location: 'TCS Express Center', timestamp: 'Pending', completed: false },
      { title: 'Delivered', location: 'Customer Address', timestamp: 'Pending', completed: false }
    ]
  }
];

export const MOCK_AGENTS: AgentInfo[] = [
  {
    name: 'Ayesha Khan',
    role: 'Senior Customer Support Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    badge: 'Response time < 1 min'
  },
  {
    name: 'Zain Tariq',
    role: 'Logistics & Order Dispatcher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    badge: 'Order Tracking Specialist'
  }
];

export const FAQ_LIST = [
  {
    q: 'How long does standard delivery take?',
    a: 'Delivery takes 2-5 business days across Pakistan. Major cities like Karachi, Lahore, and Islamabad usually receive orders within 24 to 48 hours!'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery (COD), Visa, Mastercard, Easypaisa, and JazzCash.'
  },
  {
    q: 'How do I track my existing order?',
    a: 'You can type "order" or your Order ID (e.g. PB-9842) right in our chat widget or visit the Track Order section on our website!'
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We offer a hassle-free 7-day return and exchange policy for undamaged items in original packaging.'
  },
  {
    q: 'Is Cash on Delivery available nationwide?',
    a: 'Yes! Cash on Delivery is available in over 200 cities and towns across Pakistan with zero extra hidden fees.'
  }
];
