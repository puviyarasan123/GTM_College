/**
 * Local development API server.
 *
 * This is only an adapter — every route lives in `api/_handler.ts`, which the
 * deployed Vercel function uses as well, so dev and production can never drift.
 */
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { handleApiRequest } from "./api/_handler.js";
import type { ApiContext } from "./api/_handler.js";

const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.all("/api/*splat", async (req, res) => {
  const rawSplat = (req.params as { splat?: string | string[] }).splat;
  const route = Array.isArray(rawSplat) ? rawSplat.join("/") : (rawSplat ?? "");

  const ctx: ApiContext = {
    route,
    method: req.method,
    query: req.query as Record<string, string | undefined>,
    body: (req.body ?? {}) as ApiContext["body"],
    cookie: (name) => req.cookies?.[name] ?? null,
    authHeader: req.headers.authorization ?? null,
  };

  const result = await handleApiRequest(ctx);

  if (result.cookie) {
    const { name, value, maxAge } = result.cookie;
    // No `Secure` locally — the dev server is plain HTTP.
    res.setHeader("Set-Cookie", `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax`);
  }

  if (result.kind === "xml") {
    res.setHeader("Content-Type", "application/xml");
    return res.status(result.status).send(result.body);
  }
  res.setHeader("Content-Type", "application/json");
  return res.status(result.status).json(result.data);
});

const PORT = Number(process.env.API_PORT ?? process.env.PORT ?? 3001);
const server = app.listen(PORT, () => console.log(`✅ API server running on http://localhost:${PORT}`));
server.keepAliveTimeout = 65000;
process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
