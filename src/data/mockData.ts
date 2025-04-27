
import { Product, Order, OrderStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: "Organic Carrots",
    price: 2.99,
    description: "Freshly harvested organic carrots, perfect for salads and cooking.",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww",
    unit: "kg"
  },
  {
    id: uuidv4(),
    name: "Red Apples",
    price: 3.49,
    description: "Sweet and crunchy red apples, ideal for snacks or pies.",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
    unit: "kg"
  },
  {
    id: uuidv4(),
    name: "Broccoli",
    price: 1.99,
    description: "Fresh green broccoli florets, rich in vitamins and minerals.",
    imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D",
    unit: "head"
  },
  {
    id: uuidv4(),
    name: "Bananas",
    price: 1.79,
    description: "Ripe yellow bananas, ready to eat or use in smoothies.",
    imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww",
    unit: "bunch"
  },
  {
    id: uuidv4(),
    name: "Spinach",
    price: 2.29,
    description: "Organic spinach leaves, perfect for salads or cooking.",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D",
    unit: "bunch"
  },
  {
    id: uuidv4(),
    name: "Tomatoes",
    price: 2.99,
    description: "Vine-ripened tomatoes, juicy and flavorful.",
    imageUrl: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
    unit: "kg"
  },
  {
    id: uuidv4(),
    name: "Potatoes",
    price: 1.49,
    description: "Fresh potatoes, great for roasting, mashing, or frying.",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvZXN8ZW58MHx8MHx8fDA%3D",
    unit: "kg"
  },
  {
    id: uuidv4(),
    name: "Bell Peppers",
    price: 3.99,
    description: "Colorful bell peppers, perfect for salads, stir-fries, or stuffing.",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVsbCUyMHBlcHBlcnN8ZW58MHx8MHx8fDA%3D",
    unit: "kg"
  }
];

export const mockOrders: Order[] = [
  {
    id: uuidv4(),
    items: [
      {
        productId: mockProducts[0].id,
        productName: mockProducts[0].name,
        quantity: 5,
        pricePerUnit: mockProducts[0].price
      },
      {
        productId: mockProducts[2].id,
        productName: mockProducts[2].name,
        quantity: 2,
        pricePerUnit: mockProducts[2].price
      }
    ],
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    buyerPhone: "555-123-4567",
    deliveryAddress: "123 Main St, Anytown, ST 12345",
    status: "pending",
    totalAmount: 5 * mockProducts[0].price + 2 * mockProducts[2].price,
    createdAt: new Date("2023-11-15T10:30:00")
  },
  {
    id: uuidv4(),
    items: [
      {
        productId: mockProducts[1].id,
        productName: mockProducts[1].name,
        quantity: 3,
        pricePerUnit: mockProducts[1].price
      },
      {
        productId: mockProducts[3].id,
        productName: mockProducts[3].name,
        quantity: 2,
        pricePerUnit: mockProducts[3].price
      }
    ],
    buyerName: "Jane Smith",
    buyerEmail: "jane@example.com",
    buyerPhone: "555-987-6543",
    deliveryAddress: "456 Oak Ave, Somewhere, ST 67890",
    status: "in-progress",
    totalAmount: 3 * mockProducts[1].price + 2 * mockProducts[3].price,
    createdAt: new Date("2023-11-14T15:45:00")
  },
  {
    id: uuidv4(),
    items: [
      {
        productId: mockProducts[4].id,
        productName: mockProducts[4].name,
        quantity: 2,
        pricePerUnit: mockProducts[4].price
      }
    ],
    buyerName: "Mike Johnson",
    buyerEmail: "mike@example.com",
    buyerPhone: "555-555-5555",
    deliveryAddress: "789 Pine Rd, Nowhere, ST 54321",
    status: "delivered",
    totalAmount: 2 * mockProducts[4].price,
    createdAt: new Date("2023-11-10T09:15:00")
  }
];

// Admin credentials
export const adminCredentials = {
  email: "adminn@producepalace.com",
  password: "admin123"
};


// import { Product, Order, OrderStatus } from "@/types";
// import { v4 as uuidv4 } from "uuid";

// // Declare variables to hold the fetched data
// let mockProducts: Product[] = [];
// let mockOrders: Order[] = [];
// let adminCredentials = { email: "", password: "" };

// // Fetch data from the backend (assuming your API endpoints are '/api/products', '/api/orders', and '/api/admin')
// const fetchData = async () => {
//   console.log("casdnckjnadsvksdfvmn")
//   console.log("casdnckjnadsvksdfvmn")
//   console.log("casdnckjnadsvksdfvmn")
//   console.log("casdnckjnadsvksdfvmn")
//   try {
//     // Fetching products
//     const productsResponse = await fetch("/api/products");
//     if (!productsResponse.ok) throw new Error("Failed to fetch products");
//     mockProducts = await productsResponse.json();
    
//     // Fetching orders
//     const ordersResponse = await fetch("/api/orders");
//     if (!ordersResponse.ok) throw new Error("Failed to fetch orders");
//     mockOrders = await ordersResponse.json();

//     // Fetching admin credentials
//     const adminResponse = await fetch("/api/admin");
//     if (!adminResponse.ok) throw new Error("Failed to fetch admin credentials");
//     adminCredentials = await adminResponse.json();

//     console.log("Products:", mockProducts);
//     console.log("Orders:", mockOrders);
//     console.log("Admin Credentials:", adminCredentials);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Call the function to fetch data
// fetchData();

// export {mockOrders, mockProducts, adminCredentials}
