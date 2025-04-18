
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-produce-600">Produce Palace</h3>
            <p className="text-gray-600">
              Your trusted source for quality, fresh produce delivered in bulk.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-produce-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-produce-600">Home</a>
              </li>
              <li>
                <a href="/track-order" className="text-gray-600 hover:text-produce-600">Track Order</a>
              </li>
              <li>
                <a href="/login" className="text-gray-600 hover:text-produce-600">Admin Login</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-produce-600">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>123 Harvest Lane</p>
              <p>Freshville, CA 94123</p>
              <p className="mt-2">Email: info@producepalace.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Produce Palace. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for sustainable agriculture
          </p>
        </div>
      </div>
    </footer>
  );
}
