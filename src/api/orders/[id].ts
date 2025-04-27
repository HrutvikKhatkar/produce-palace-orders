// import prisma from "@/lib/prisma";
import prisma from "../lib/prisma"; 


export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return res.json(order);
  }

  if (req.method === "PUT") {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return res.json(order);
  }

  res.status(405).end();
}
