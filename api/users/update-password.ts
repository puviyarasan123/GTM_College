import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { prisma } from "../_prisma";
import { requireAuth } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try { await requireAuth(req); } catch { return res.status(401).json({ message: "Unauthorized" }); }
  const { id, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await prisma.adminUser.update({ where: { id }, data: { password: hashed } });
  res.json({ ok: true });
}
