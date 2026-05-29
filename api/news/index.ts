import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const all = req.query.all === "1";
  const news = await prisma.news.findMany({
    where: all ? undefined : { published: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(news);
}
