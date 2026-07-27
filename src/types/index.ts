export interface Product {
  id: string;
  name: string;
  category: 'fashion' | 'electronics' | 'handicrafts' | 'home' | 'gourmet';
  pricePKR: number;
  originalPricePKR: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  stock: number;
  isPopular?: boolean;
  isNew?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface TrackingEvent {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  orderId: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: {
    productName: string;
    quantity: number;
    pricePKR: number;
    image: string;
  }[];
  totalPKR: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Visa / Mastercard' | 'Easypaisa' | 'JazzCash';
  estimatedDelivery: string;
  trackingEvents: TrackingEvent[];
}

export type MessageSender = 'user' | 'bot' | 'agent';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  richType?: 'order_card' | 'product_card' | 'payment_card' | 'delivery_card' | 'agent_card' | 'quick_prompts';
  data?: any;
}

export interface AgentInfo {
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  badge: string;
}
