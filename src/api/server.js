// server.js
import express from 'express';
import prisma from './lib/prisma'; // Import Prisma Client using ES Module syntax

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for fetching all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Route for creating an order
app.post('/api/orders', async (req, res) => {
  const { items } = req.body; // Expecting items in the format [{ productId, quantity }]
  
  try {
    const order = await prisma.order.create({
      data: {
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
    