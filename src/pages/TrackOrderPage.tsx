
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { OrderTracker } from "@/components/orders/OrderTracker";

export default function TrackOrderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>
        
        <div className="max-w-2xl mx-auto">
          <OrderTracker />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
