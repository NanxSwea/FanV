// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'vendor';
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  vendorId: number;
}

// Cart types
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// Order types
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: number;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
  userId: number;
}

// Vendor types
export interface VendorProfile {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logo: string;
  userId: number;
}