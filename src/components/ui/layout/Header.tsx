
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { cart, isAdmin, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-produce-600 font-bold text-2xl">Produce Palace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-produce-600 font-medium">
            Products
          </Link>
          <Link to="/track-order" className="text-gray-700 hover:text-produce-600 font-medium">
            Track Order
          </Link>
          {isAdmin ? (
            <>
              <Link to="/admin" className="text-gray-700 hover:text-produce-600 font-medium">
                Admin Dashboard
              </Link>
              <Button 
                onClick={logout} 
                variant="ghost" 
                className="text-gray-700 hover:text-produce-600 font-medium"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-produce-600 font-medium">
              Admin Login
            </Link>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-gray-700 hover:text-produce-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative mr-4">
            <ShoppingCart className="text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-produce-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/track-order" 
              className="text-gray-700 hover:text-produce-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Order
            </Link>
            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className="text-gray-700 hover:text-produce-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <Button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  variant="ghost" 
                  className="text-gray-700 hover:text-produce-600 font-medium text-left px-0"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-produce-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
