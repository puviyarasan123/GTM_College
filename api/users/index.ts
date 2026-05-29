import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_prisma";
import { requireAuth } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try { await requireAuth(req); } catch { return res.status(401).json({ message: "Unauthorized" }); }
  res.json(await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  }));
}
