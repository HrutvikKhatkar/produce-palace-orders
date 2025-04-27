// import prisma from "@/lib/prisma";
import prisma from "../lib/prisma"; 

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, price, description, imageUrl, unit } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description, imageUrl, unit },
    });
    return res.json(product);
  }

  if (req.method === "DELETE") {
    await prisma.product.delete({
      where: { id },
    });
    return res.status(204).end();
  }

  res.status(405).end();
}
