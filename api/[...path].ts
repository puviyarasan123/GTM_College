import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

// ── Prisma ────────────────────────────────────────────────────────────────────
declare global { var __prisma: PrismaClient | undefined; }
function getPrisma() {
  if (globalThis.__prisma) return globalThis.__prisma;
  const url = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  globalThis.__prisma = new PrismaClient({ adapter: new PrismaPg(url) });
  return globalThis.__prisma;
}

// ── JWT ───────────────────────────────────────────────────────────────────────
const adminSecret = new TextEncoder().encode(process.env.JWT_SECRET ?? "gtm-admin-secret");
const studentSecret = new TextEncoder().encode((process.env.JWT_SECRET ?? "gtm-student-secret") + "-student");

async function signAdminToken(payload: { id: string; email: string; role: string }) {
  return new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("8h").setIssuedAt().sign(adminSecret);
}
async function verifyAdminToken(token: string) {
  try { const { payload } = await jwtVerify(token, adminSecret); return payload as { id: string; email: string; role: string }; }
  catch { return null; }
}
async function signStudentToken(payload: { id: string; email: string; name: string }) {
  return new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").setIssuedAt().sign(studentSecret);
}
async function verifyStudentToken(token: string) {
  try { const { payload } = await jwtVerify(token, studentSecret); return payload as { id: string; email: string; name: string }; }
  catch { return null; }
}

function getCookie(req: VercelRequest, name: string) {
  const match = (req.headers.cookie ?? "").match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}

function setCookie(res: VercelResponse, name: string, value: string, maxAge: number) {
  res.setHeader("Set-Cookie", `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax; Secure`);
}
function clearCookie(res: VercelResponse, name: string) {
  res.setHeader("Set-Cookie", `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
}
async function requireAdmin(req: VercelRequest) {
  const token = getCookie(req, "admin_token");
  if (!token) throw new Error("Unauthorized");
  const p = await verifyAdminToken(token);
  if (!p) throw new Error("Unauthorized");
  return p;
}
async function requireStudent(req: VercelRequest) {
  const token = getCookie(req, "student_token") ?? (req.headers.authorization?.replace("Bearer ", "") ?? "");
  if (!token) throw new Error("Unauthorized");
  const p = await verifyStudentToken(token);
  if (!p) throw new Error("Unauthorized");
  return p;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rawPath = req.query.path;
  let route: string;
  if (rawPath) {
    route = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
  } else {
    // fallback: derive from URL (e.g. /api/auth/login -> auth/login)
    route = (req.url ?? "").replace(/^\/?api\//, "").split("?")[0];
  }
  const prisma = getPrisma();
  res.setHeader("Content-Type", "application/json");

  try {
    // ── Admin Auth ────────────────────────────────────────────────────────────
    if (route === "auth/session") {
      const token = getCookie(req, "admin_token");
      if (!token) return res.json(null);
      return res.json(await verifyAdminToken(token));
    }
    if (route === "auth/login") {
      const { email, password } = req.body;
      const user = await prisma.adminUser.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" });
      const token = await signAdminToken({ id: user.id, email: user.email, role: user.role });
      setCookie(res, "admin_token", token, 28800);
      return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    if (route === "auth/logout") {
      clearCookie(res, "admin_token");
      return res.json({ ok: true });
    }

    // ── Student Auth ──────────────────────────────────────────────────────────
    if (route === "student/register") {
      const { email, password, name, phone } = req.body;
      const exists = await prisma.student.findUnique({ where: { email } });
      if (exists) return res.status(409).json({ message: "Email already registered" });
      const hashed = await bcrypt.hash(password, 10);
      const student = await prisma.student.create({ data: { email, password: hashed, name, phone } });
      const token = await signStudentToken({ id: student.id, email: student.email, name: student.name });
      setCookie(res, "student_token", token, 86400);
      return res.json({ token, student: { id: student.id, email: student.email, name: student.name } });
    }
    if (route === "student/login") {
      const { email, password } = req.body;
      const student = await prisma.student.findUnique({ where: { email } });
      if (!student || !(await bcrypt.compare(password, student.password)))
        return res.status(401).json({ message: "Invalid credentials" });
      const token = await signStudentToken({ id: student.id, email: student.email, name: student.name });
      setCookie(res, "student_token", token, 86400);
      return res.json({ token, student: { id: student.id, email: student.email, name: student.name } });
    }
    if (route === "student/logout") {
      clearCookie(res, "student_token");
      return res.json({ ok: true });
    }
    if (route === "student/me") {
      const s = await requireStudent(req);
      const student = await prisma.student.findUnique({
        where: { id: s.id },
        select: { id: true, email: true, name: true, phone: true, createdAt: true },
      });
      return res.json(student);
    }
    if (route === "student/session") {
      const token = getCookie(req, "student_token");
      if (!token) return res.json(null);
      return res.json(await verifyStudentToken(token));
    }

    // ── Applications (Student) ────────────────────────────────────────────────
    if (route === "applications/submit") {
      const student = await requireStudent(req);
      const existing = await prisma.application.findFirst({ where: { studentId: student.id } });
      if (existing) return res.status(409).json({ message: "You already have a submitted application", application: existing });
      const app = await prisma.application.create({ data: { studentId: student.id, ...req.body } });
      return res.json(app);
    }
    if (route === "applications/my") {
      const student = await requireStudent(req);
      const apps = await prisma.application.findMany({
        where: { studentId: student.id },
        orderBy: { submittedAt: "desc" },
      });
      return res.json(apps);
    }

    // ── Applications (Admin) ──────────────────────────────────────────────────
    if (route === "applications") {
      await requireAdmin(req);
      const { status, search } = req.query as Record<string, string>;
      const apps = await prisma.application.findMany({
        where: {
          ...(status && status !== "ALL" ? { status: status as never } : {}),
          ...(search ? {
            OR: [
              { student: { name: { contains: search, mode: "insensitive" } } },
              { student: { email: { contains: search, mode: "insensitive" } } },
              { programme: { contains: search, mode: "insensitive" } },
              { branch: { contains: search, mode: "insensitive" } },
            ],
          } : {}),
        },
        include: { student: { select: { id: true, name: true, email: true, phone: true } } },
        orderBy: { submittedAt: "desc" },
      });
      return res.json(apps);
    }
    if (route === "applications/stats") {
      await requireAdmin(req);
      const [total, pending, underReview, accepted, rejected, waitlisted] = await Promise.all([
        prisma.application.count(),
        prisma.application.count({ where: { status: "PENDING" } }),
        prisma.application.count({ where: { status: "UNDER_REVIEW" } }),
        prisma.application.count({ where: { status: "ACCEPTED" } }),
        prisma.application.count({ where: { status: "REJECTED" } }),
        prisma.application.count({ where: { status: "WAITLISTED" } }),
      ]);
      return res.json({ total, pending, underReview, accepted, rejected, waitlisted });
    }
    if (route === "applications/update-status") {
      await requireAdmin(req);
      const { id, status, adminNote } = req.body;
      const app = await prisma.application.update({ where: { id }, data: { status, adminNote } });
      return res.json(app);
    }
    if (route === "applications/detail") {
      await requireAdmin(req);
      const id = req.query.id as string;
      const app = await prisma.application.findUnique({
        where: { id },
        include: { student: { select: { id: true, name: true, email: true, phone: true } } },
      });
      return res.json(app);
    }

    // ── News ──────────────────────────────────────────────────────────────────
    if (route === "news") {
      const all = req.query.all === "1";
      return res.json(await prisma.news.findMany({ where: all ? undefined : { published: true }, orderBy: { createdAt: "desc" } }));
    }
    if (route === "news/create") { await requireAdmin(req); return res.json(await prisma.news.create({ data: req.body })); }
    if (route === "news/update") { await requireAdmin(req); const { id, data } = req.body; return res.json(await prisma.news.update({ where: { id }, data })); }
    if (route === "news/delete") { await requireAdmin(req); await prisma.news.delete({ where: { id: req.body.id } }); return res.json({ ok: true }); }

    // ── Events ────────────────────────────────────────────────────────────────
    if (route === "events") {
      const all = req.query.all === "1";
      return res.json(await prisma.event.findMany({ where: all ? undefined : { published: true }, orderBy: { createdAt: "desc" } }));
    }
    if (route === "events/create") { await requireAdmin(req); return res.json(await prisma.event.create({ data: req.body })); }
    if (route === "events/update") { await requireAdmin(req); const { id, data } = req.body; return res.json(await prisma.event.update({ where: { id }, data })); }
    if (route === "events/delete") { await requireAdmin(req); await prisma.event.delete({ where: { id: req.body.id } }); return res.json({ ok: true }); }

    // ── Announcements ─────────────────────────────────────────────────────────
    if (route === "announcements") {
      const all = req.query.all === "1";
      return res.json(await prisma.announcement.findMany({ where: all ? undefined : { active: true }, orderBy: { order: "asc" } }));
    }
    if (route === "announcements/create") { await requireAdmin(req); return res.json(await prisma.announcement.create({ data: req.body })); }
    if (route === "announcements/update") { await requireAdmin(req); const { id, ...data } = req.body; return res.json(await prisma.announcement.update({ where: { id }, data })); }
    if (route === "announcements/delete") { await requireAdmin(req); await prisma.announcement.delete({ where: { id: req.body.id } }); return res.json({ ok: true }); }

    // ── Content ───────────────────────────────────────────────────────────────
    if (route === "content") { const section = req.query.section as string; return res.json(await prisma.siteContent.findUnique({ where: { section } })); }
    if (route === "content/upsert") {
      await requireAdmin(req);
      const { section, data } = req.body;
      return res.json(await prisma.siteContent.upsert({ where: { section }, update: { data }, create: { section, data } }));
    }

    // ── Students (Admin) ──────────────────────────────────────────────────────
    if (route === "students") {
      await requireAdmin(req);
      const { search } = req.query as Record<string, string>;
      const students = await prisma.student.findMany({
        where: search ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        } : undefined,
        select: { id: true, name: true, email: true, phone: true, createdAt: true, _count: { select: { applications: true } } },
        orderBy: { createdAt: "desc" },
      });
      return res.json(students);
    }

    // ── Users ─────────────────────────────────────────────────────────────────
    if (route === "users") {
      await requireAdmin(req);
      return res.json(await prisma.adminUser.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true }, orderBy: { createdAt: "desc" } }));
    }
    if (route === "users/create") {
      await requireAdmin(req);
      const { email, password, name, role } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      return res.json(await prisma.adminUser.create({ data: { email, password: hashed, name, role }, select: { id: true, email: true, name: true, role: true, createdAt: true } }));
    }
    if (route === "users/delete") { await requireAdmin(req); await prisma.adminUser.delete({ where: { id: req.body.id } }); return res.json({ ok: true }); }
    if (route === "users/update-password") {
      await requireAdmin(req);
      const { id, password } = req.body;
      await prisma.adminUser.update({ where: { id }, data: { password: await bcrypt.hash(password, 10) } });
      return res.json({ ok: true });
    }

    // ── Sitemap ───────────────────────────────────────────────────────────────
    if (route === "sitemap.xml") {
      const BASE = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
      const PATHS = ["/","/about","/chairman-message","/principal-message","/vision-mission","/courses","/departments","/faculty","/library","/admission","/placement","/infrastructure","/hostel","/transport","/gallery","/news","/events","/contact"];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PATHS.map((p) => `  <url><loc>${BASE}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}\n</urlset>`;
      res.setHeader("Content-Type", "application/xml");
      return res.send(xml);
    }

    return res.status(404).json({ message: "Not found" });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return res.status(message === "Unauthorized" ? 401 : 500).json({ message });
  }
}
