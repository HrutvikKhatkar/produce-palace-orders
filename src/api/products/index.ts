// import prisma from "@/lib/prisma";
import prisma from "../lib/prisma"; 

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany();
    return res.json(products);
  }
  if (req.method === "POST") {
    const { name, price, description, imageUrl, unit } = req.body;
    const product = await prisma.product.create({
      data: { name, price, description, imageUrl, unit },
    });
    return res.status(201).json(product);
  }
  res.status(405).end();
}
