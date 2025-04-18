
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default function AdminPage() {
  const { isAdmin } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);
  
  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="orders">
          <TabsList className="mb-8">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <OrdersTable />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductsTable />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
