
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, Truck } from "lucide-react";
import { Order } from "@/types";

export function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  
  const { getOrderById } = useApp();
  
  const handleTrackOrder = () => {
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }
    
    const foundOrder = getOrderById(orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setError("");
    } else {
      setOrder(null);
      setError("Order not found. Please check the ID and try again.");
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Track Your Order</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleTrackOrder}
          className="bg-produce-500 hover:bg-produce-600 text-white"
        >
          Track Order
        </Button>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {order && (
        <div className="space-y-8">
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">Order Status</h3>
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "pending" || order.status === "in-progress" || order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                  <Clock size={20} />
                </div>
                <span className="text-sm mt-2">Pending</span>
              </div>
              
              <div className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "in-progress" || order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                  <Truck size={20} />
                </div>
                <span className="text-sm mt-2">In Progress</span>
              </div>
              
              <div className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm mt-2">Delivered</span>
              </div>
              
              {/* Progress bar */}
              <div className="absolute top-5 h-0.5 w-full bg-gray-200 z-0">
                <div 
                  className="h-full bg-green-600 transition-all duration-300"
                  style={{ 
                    width: order.status === "pending" ? "0%" : 
                           order.status === "in-progress" ? "50%" : "100%" 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">Order Details</h3>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Order ID:</span> {order.id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Date Placed:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Amount:</span> ${order.totalAmount.toFixed(2)}
            </p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p className="text-sm">
                    {item.quantity}x {item.productName}
                  </p>
                  <p className="text-sm font-medium">${(item.quantity * item.pricePerUnit).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Delivery Information</h3>
            <p className="text-sm text-gray-600 mb-2">{order.buyerName}</p>
            <p className="text-sm text-gray-600 mb-2">{order.buyerEmail}</p>
            <p className="text-sm text-gray-600 mb-2">{order.buyerPhone}</p>
            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
}
