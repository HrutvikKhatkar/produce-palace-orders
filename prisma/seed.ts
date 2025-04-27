import { PrismaClient } from '@prisma/client';
import { mockProducts, mockOrders, adminCredentials } from '../src/data/mockData.ts';


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Insert Products
  for (const product of mockProducts) {
    await prisma.product.create({
      data: {
        id: product.id, // Since you're using uuid
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        unit: product.unit,
      },
    });
  }

  // 2. Insert Orders
  for (const order of mockOrders) {
    await prisma.order.create({
      data: {
        id: order.id,
        buyerName: order.buyerName,
        buyerEmail: order.buyerEmail,
        buyerPhone: order.buyerPhone,
        deliveryAddress: order.deliveryAddress,
        status: order.status.pending, // cast if your OrderStatus enum exists
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            pricePerUnit: item.pricePerUnit,
          })),
        },
      },
    });
  }

  // 3. Insert Admin
  await prisma.admin.create({
    data: {
      email: adminCredentials.email,
      password: adminCredentials.password, // ❗ Ideally hash this
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
