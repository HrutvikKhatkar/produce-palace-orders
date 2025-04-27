// import prisma from "@/lib/prisma";
import prisma from "../lib/prisma"; 

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { buyerName, buyerEmail, buyerPhone, deliveryAddress, items } = req.body;

    const totalAmount = items.reduce((total, item) => total + item.pricePerUnit * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        buyerName,
        buyerEmail,
        buyerPhone,
        deliveryAddress,
        totalAmount,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            pricePerUnit: item.pricePerUnit,
          })),
        },
      },
      include: { items: true },
    });
    
    return res.status(201).json(order);
  }

  res.status(405).end();
}
