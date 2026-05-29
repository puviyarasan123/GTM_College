import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_prisma";
import { requireAuth } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try { await requireAuth(req); } catch { return res.status(401).json({ message: "Unauthorized" }); }
  res.json(await prisma.event.create({ data: req.body }));
}
