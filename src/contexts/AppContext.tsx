import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Order, OrderStatus, OrderItem } from "@/types";
import { mockProducts, mockOrders, adminCredentials } from "@/data/mockData";
import { api } from "@/services/api";

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  editProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (orderId: string) => Promise<Order | undefined>;

  // Cart
  cart: OrderItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Authentication
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

  // Products
  const addProduct = async (product: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, id: crypto.randomUUID() };
    setProducts(prev => [...prev, newProduct]);
    // Later: await api.addProduct(newProduct);
  };

  const editProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    // Later: await api.updateProduct(updatedProduct);
  };

  const removeProduct = async (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    // Later: await api.deleteProduct(productId);
  };

  // Orders
  const addOrder = async (orderData: Omit<Order, "id" | "createdAt" | "status">) => {
    try {
      const newOrder = await api.createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      clearCart();
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await api.updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
      const order = await api.getOrder(orderId);
      return order;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      return orders.find(o => o.id === orderId);
    }
  };

  // Cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        productName: product.name,
        quantity,
        pricePerUnit: product.price,
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  };

  // Authentication
  const login = (email: string, password: string) => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
