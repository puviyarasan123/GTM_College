import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res
    .setHeader("Set-Cookie", "admin_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict")
    .json({ ok: true });
}
