import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

// ── Prisma ────────────────────────────────────────────────────────────────────

declare global { var __prisma: PrismaClient | undefined; }

function getPrisma() {
  if (globalThis.__prisma) return globalThis.__prisma;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  globalThis.__prisma = new PrismaClient({ adapter: new PrismaPg(url) });
  return globalThis.__prisma;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "gtm-college-secret-change-in-production"
);

async function signToken(payload: { id: string; email: string; role: string }) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .setIssuedAt()
    .sign(secret);
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string; role: string };
  } catch {
    return null;
  }
}

function getToken(req: VercelRequest) {
  const cookie = req.headers.cookie ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match ? match[1] : null;
}

async function requireAuth(req: VercelRequest) {
  const token = getToken(req);
  if (!token) throw new Error("Unauthorized");
  const payload = await verifyToken(token);
  if (!payload) throw new Error("Unauthorized");
  return payload;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string[] | undefined) ?? [];
  const route = path.join("/");
  const prisma = getPrisma();

  res.setHeader("Content-Type", "application/json");

  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    if (route === "auth/session") {
      const token = getToken(req);
      if (!token) return res.json(null);
      return res.json(await verifyToken(token));
    }

    if (route === "auth/login") {
      const { email, password } = req.body;
      const user = await prisma.adminUser.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" });
      const token = await signToken({ id: user.id, email: user.email, role: user.role });
      return res
        .setHeader("Set-Cookie", `admin_token=${token}; Path=/; Max-Age=28800; HttpOnly; SameSite=Strict`)
        .json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }

    if (route === "auth/logout") {
      return res
        .setHeader("Set-Cookie", "admin_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict")
        .json({ ok: true });
    }

    // ── News ──────────────────────────────────────────────────────────────────
    if (route === "news") {
      const all = req.query.all === "1";
      return res.json(await prisma.news.findMany({
        where: all ? undefined : { published: true },
        orderBy: { createdAt: "desc" },
      }));
    }

    if (route === "news/create") {
      await requireAuth(req);
      return res.json(await prisma.news.create({ data: req.body }));
    }

    if (route === "news/update") {
      await requireAuth(req);
      const { id, data } = req.body;
      return res.json(await prisma.news.update({ where: { id }, data }));
    }

    if (route === "news/delete") {
      await requireAuth(req);
      await prisma.news.delete({ where: { id: req.body.id } });
      return res.json({ ok: true });
    }

    // ── Events ────────────────────────────────────────────────────────────────
    if (route === "events") {
      const all = req.query.all === "1";
      return res.json(await prisma.event.findMany({
        where: all ? undefined : { published: true },
        orderBy: { createdAt: "desc" },
      }));
    }

    if (route === "events/create") {
      await requireAuth(req);
      return res.json(await prisma.event.create({ data: req.body }));
    }

    if (route === "events/update") {
      await requireAuth(req);
      const { id, data } = req.body;
      return res.json(await prisma.event.update({ where: { id }, data }));
    }

    if (route === "events/delete") {
      await requireAuth(req);
      await prisma.event.delete({ where: { id: req.body.id } });
      return res.json({ ok: true });
    }

    // ── Announcements ─────────────────────────────────────────────────────────
    if (route === "announcements") {
      const all = req.query.all === "1";
      return res.json(await prisma.announcement.findMany({
        where: all ? undefined : { active: true },
        orderBy: { order: "asc" },
      }));
    }

    if (route === "announcements/create") {
      await requireAuth(req);
      return res.json(await prisma.announcement.create({ data: req.body }));
    }

    if (route === "announcements/update") {
      await requireAuth(req);
      const { id, ...data } = req.body;
      return res.json(await prisma.announcement.update({ where: { id }, data }));
    }

    if (route === "announcements/delete") {
      await requireAuth(req);
      await prisma.announcement.delete({ where: { id: req.body.id } });
      return res.json({ ok: true });
    }

    // ── Content ───────────────────────────────────────────────────────────────
    if (route === "content") {
      const section = req.query.section as string;
      return res.json(await prisma.siteContent.findUnique({ where: { section } }));
    }

    if (route === "content/upsert") {
      await requireAuth(req);
      const { section, data } = req.body;
      return res.json(await prisma.siteContent.upsert({
        where: { section },
        update: { data },
        create: { section, data },
      }));
    }

    // ── Users ─────────────────────────────────────────────────────────────────
    if (route === "users") {
      await requireAuth(req);
      return res.json(await prisma.adminUser.findMany({
        select: { id: true, email: true, name: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      }));
    }

    if (route === "users/create") {
      await requireAuth(req);
      const { email, password, name, role } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      return res.json(await prisma.adminUser.create({
        data: { email, password: hashed, name, role },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
      }));
    }

    if (route === "users/delete") {
      await requireAuth(req);
      await prisma.adminUser.delete({ where: { id: req.body.id } });
      return res.json({ ok: true });
    }

    if (route === "users/update-password") {
      await requireAuth(req);
      const { id, password } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      await prisma.adminUser.update({ where: { id }, data: { password: hashed } });
      return res.json({ ok: true });
    }

    // ── Sitemap ───────────────────────────────────────────────────────────────
    if (route === "sitemap.xml") {
      const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
      const PATHS = [
        "/", "/about", "/chairman-message", "/principal-message", "/vision-mission",
        "/courses", "/departments", "/faculty", "/library",
        "/admission", "/placement",
        "/infrastructure", "/hostel", "/transport", "/gallery",
        "/news", "/events", "/contact",
      ];
      const urls = PATHS.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.send(xml);
    }

    return res.status(404).json({ message: "Not found" });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    const status = message === "Unauthorized" ? 401 : 500;
    return res.status(status).json({ message });
  }
}
