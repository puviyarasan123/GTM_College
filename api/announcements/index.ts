import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const all = req.query.all === "1";
  res.json(await prisma.announcement.findMany({
    where: all ? undefined : { active: true },
    orderBy: { order: "asc" },
  }));
}
