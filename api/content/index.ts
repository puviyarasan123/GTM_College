import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const section = req.query.section as string;
  if (!section) return res.status(400).json({ message: "section required" });
  res.json(await prisma.siteContent.findUnique({ where: { section } }));
}
