
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const orderFormSchema = z.object({
  buyerName: z.string().min(2, "Name is required"),
  buyerEmail: z.string().email("Valid email is required"),
  buyerPhone: z.string().min(10, "Valid phone number is required"),
  deliveryAddress: z.string().min(5, "Complete address is required"),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export function OrderForm() {
  const { cart, addOrder, getCartTotal } = useApp();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
  });

  const onSubmit = (data: OrderFormData) => {
    // Make sure all required fields are present
    const order = {
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      buyerPhone: data.buyerPhone,
      deliveryAddress: data.deliveryAddress,
      items: [...cart],
      totalAmount: getCartTotal(),
    };

    addOrder(order);
    navigate("/order-confirmation");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="buyerName"
              {...register("buyerName")}
              className={errors.buyerName ? "border-red-500" : ""}
            />
            {errors.buyerName && (
              <p className="mt-1 text-sm text-red-500">{errors.buyerName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="buyerEmail"
              type="email"
              {...register("buyerEmail")}
              className={errors.buyerEmail ? "border-red-500" : ""}
            />
            {errors.buyerEmail && (
              <p className="mt-1 text-sm text-red-500">{errors.buyerEmail.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="buyerPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="buyerPhone"
              type="tel"
              {...register("buyerPhone")}
              className={errors.buyerPhone ? "border-red-500" : ""}
            />
            {errors.buyerPhone && (
              <p className="mt-1 text-sm text-red-500">{errors.buyerPhone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <Textarea
              id="deliveryAddress"
              {...register("deliveryAddress")}
              className={errors.deliveryAddress ? "border-red-500" : ""}
              rows={3}
            />
            {errors.deliveryAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.deliveryAddress.message}</p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-produce-500 hover:bg-produce-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </form>
    </div>
  );
}
