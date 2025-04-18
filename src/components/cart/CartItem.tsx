
import { Plus, Minus, Trash2 } from "lucide-react";
import { OrderItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

interface CartItemProps {
  item: OrderItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateCartItemQuantity, removeFromCart } = useApp();

  const incrementQuantity = () => updateCartItemQuantity(item.productId, item.quantity + 1);
  const decrementQuantity = () => updateCartItemQuantity(item.productId, item.quantity - 1);

  return (
    <div className="py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="font-medium text-lg">{item.productName}</h3>
        <div className="flex items-center justify-between sm:justify-start sm:gap-8 mt-1">
          <span className="text-gray-600">${item.pricePerUnit.toFixed(2)} each</span>
          <span className="text-gray-900 font-medium">
            ${(item.pricePerUnit * item.quantity).toFixed(2)} total
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={decrementQuantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={incrementQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-500 hover:text-red-500"
          onClick={() => removeFromCart(item.productId)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
