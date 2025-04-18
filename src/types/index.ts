
// Type definitions for the application

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  unit: string; // e.g., "kg", "lb", "bunch"
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
}

export type OrderStatus = 'pending' | 'in-progress' | 'delivered';

export interface Order {
  id: string;
  items: OrderItem[];
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  deliveryAddress: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'buyer';
}
