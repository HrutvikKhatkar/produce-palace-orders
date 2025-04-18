import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Order, OrderStatus, OrderItem } from "@/types";
import { mockProducts, mockOrders } from "@/data/mockData";
import { api } from "@/services/api";

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  editProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  
  // Cart functionality
  cart: OrderItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Authentication (simple)
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Product management
  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const newProduct = { ...product, id: crypto.randomUUID() };
      setProducts([...products, newProduct]);
      // Ready for backend implementation
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const editProduct = async (updatedProduct: Product) => {
    try {
      setProducts(products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      ));
      // Ready for backend implementation
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const removeProduct = async (productId: string) => {
    try {
      setProducts(products.filter(product => product.id !== productId));
      // Ready for backend implementation
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };
  
  // Order management
  const addOrder = async (orderData: Omit<Order, "id" | "createdAt" | "status">) => {
    try {
      const newOrder = await api.createOrder(orderData);
      setOrders([newOrder, ...orders]);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await api.updateOrderStatus(orderId, status);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const getOrderById = async (orderId: string) => {
    try {
      const order = await api.getOrder(orderId);
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      return orders.find(order => order.id === orderId);
    }
  };

  // Cart management
  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      updateCartItemQuantity(product.id, existingItem.quantity + quantity);
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        quantity,
        pricePerUnit: product.price,
      }]);
    }
  };
  
  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };
  
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.pricePerUnit * item.quantity), 0);
  };
  
  // Simple authentication
  const login = (email: string, password: string) => {
    // In a real app, this would validate against a database
    if (email === "admin@producepalace.com" && password === "admin123") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAdmin(false);
  };
  
  const value = {
    products,
    addProduct,
    editProduct,
    removeProduct,
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
    isAdmin,
    login,
    logout,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
