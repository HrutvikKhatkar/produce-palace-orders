
import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product, Order, OrderStatus, OrderItem } from "@/types";
import { mockProducts, mockOrders } from "@/data/mockData";

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
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: uuidv4() };
    setProducts([...products, newProduct]);
  };
  
  const editProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };
  
  const removeProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };
  
  // Order management
  const addOrder = (order: Omit<Order, "id" | "createdAt" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: uuidv4(),
      status: "pending",
      createdAt: new Date(),
    };
    setOrders([newOrder, ...orders]);
    clearCart(); // Clear cart after order is placed
  };
  
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };
  
  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
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
