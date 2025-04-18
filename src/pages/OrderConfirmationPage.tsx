
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  const { orders } = useApp();
  const navigate = useNavigate();
  
  // Redirect if there are no orders (should not access this page directly)
  useEffect(() => {
    if (orders.length === 0) {
      navigate('/');
    }
  }, [orders, navigate]);
  
  // Get the most recent order
  const latestOrder = orders.length > 0 ? orders[0] : null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order. Your order has been received and is being processed.
          </p>
          
          {latestOrder && (
            <div className="mb-8">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Order ID:</span> {latestOrder.id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Amount:</span> ${latestOrder.totalAmount.toFixed(2)}
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
            
            <Link to="/track-order">
              <Button className="bg-produce-500 hover:bg-produce-600 text-white">
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
