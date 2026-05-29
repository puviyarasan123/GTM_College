import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getTokenFromRequest, verifyToken } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = getTokenFromRequest(req);
  if (!token) return res.json(null);
  const payload = await verifyToken(token);
  res.json(payload);
}
