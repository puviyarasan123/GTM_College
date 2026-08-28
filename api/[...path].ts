/**
 * Vercel serverless API entry point.
 *
 * This is only an adapter — every route lives in `api/_handler.ts`, shared with
 * the local dev server (`server.ts`), so the two can never drift apart.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleApiRequest } from "./_handler";
import type { ApiContext } from "./_handler";

function readCookie(req: VercelRequest, name: string) {
  const match = (req.headers.cookie ?? "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rawPath = req.query.path;
  const route = rawPath
    ? (Array.isArray(rawPath) ? rawPath.join("/") : rawPath)
    // Fallback for direct hits: /api/auth/login → auth/login
    : (req.url ?? "").replace(/^\/?api\//, "").split("?")[0];

  const ctx: ApiContext = {
    route,
    method: req.method ?? "GET",
    query: req.query as Record<string, string | undefined>,
    body: (req.body ?? {}) as ApiContext["body"],
    cookie: (name) => readCookie(req, name),
    authHeader: req.headers.authorization ?? null,
  };

  if (route === "health") return res.json({ ok: true });

  const result = await handleApiRequest(ctx);

  if (result.cookie) {
    const { name, value, maxAge } = result.cookie;
    res.setHeader("Set-Cookie", `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax; Secure`);
  }

  if (result.kind === "xml") {
    res.setHeader("Content-Type", "application/xml");
    return res.status(result.status).send(result.body);
  }
  res.setHeader("Content-Type", "application/json");
  return res.status(result.status).json(result.data);
}
