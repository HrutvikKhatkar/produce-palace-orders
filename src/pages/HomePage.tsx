
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useApp } from "@/contexts/AppContext";

export default function HomePage() {
  const { products } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-b from-produce-100 to-white py-14 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-produce-800">Fresh Produce in Bulk</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Quality vegetables and fruits for restaurants, cafeterias, and families.
              Place your bulk order today!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Available Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
