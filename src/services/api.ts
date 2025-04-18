
// Base API configuration
const API_BASE_URL = 'http://localhost:5000/api'; // You can change this to your actual API URL later

export const api = {
  // Products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return mock data for now until backend is implemented
      return mockProducts;
    }
  },

  // Orders
  createOrder: async (orderData: Omit<Order, "id" | "status" | "createdAt">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      // Use mock data handling until backend is implemented
      const newOrder = {
        ...orderData,
        id: crypto.randomUUID(),
        status: 'pending' as const,
        createdAt: new Date(),
      };
      return newOrder;
    }
  },

  getOrder: async (orderId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      // Return mock data for now
      return mockOrders.find(order => order.id === orderId);
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      // Use mock handling until backend is implemented
      return { orderId, status };
    }
  }
};

// Import mock data for fallback until backend is ready
import { mockProducts, mockOrders } from "@/data/mockData";
import { Order, OrderStatus } from "@/types";
