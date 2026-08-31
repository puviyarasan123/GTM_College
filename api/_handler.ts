/**
 * Shared API route handling.
 *
 * Both entry points use this single implementation:
 *   • `server.ts`          — the local dev server (Express)
 *   • `api/[...path].ts`   — the deployed Vercel function
 *
 * Keeping the routes in one place is deliberate: the two entry points used to
 * carry their own copies of every route, and they drifted — features worked
 * locally and 404'd in production. Add routes here, never in an adapter.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

// ── Types ─────────────────────────────────────────────────────────────────────

/** A request, normalised away from Express/Vercel specifics. */
export type ApiContext = {
  /** Path after `/api/`, e.g. "departments/save". */
  route: string;
  method: string;
  query: Record<string, string | undefined>;
  /** Parsed JSON body. Untyped like Express' own `req.body`; the payload
   *  normalisers below coerce anything that reaches the database. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  cookie: (name: string) => string | null;
  authHeader: string | null;
};

export type CookieWrite = { name: string; value: string; maxAge: number };

export type ApiResult =
  | { kind: "json"; status: number; data: unknown; cookie?: CookieWrite }
  | { kind: "xml"; status: number; body: string; cookie?: CookieWrite };

// ── Prisma (one client per process / warm lambda) ─────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __gtmPrisma: PrismaClient | undefined;
}

export function getPrisma() {
  if (globalThis.__gtmPrisma) return globalThis.__gtmPrisma;
  const url = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  globalThis.__gtmPrisma = new PrismaClient({ adapter: new PrismaPg(url) });
  return globalThis.__gtmPrisma;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

async function requireAdmin(ctx: ApiContext) {
  const token = ctx.cookie("admin_token");
  if (!token) throw new Error("Unauthorized");
  const p = await verifyAdminToken(token);
  if (!p) throw new Error("Unauthorized");
  return p;
}

async function requireStudent(ctx: ApiContext) {
  const token = ctx.cookie("student_token") ?? (ctx.authHeader?.replace("Bearer ", "") ?? "");
  if (!token) throw new Error("Unauthorized");
  const p = await verifyStudentToken(token);
  if (!p) throw new Error("Unauthorized");
  return p;
}

const json = (data: unknown, status = 200, cookie?: CookieWrite): ApiResult =>
  ({ kind: "json", status, data, cookie });

/**
 * Builds a public_id for a Cloudinary `raw` upload that keeps its file
 * extension, so the delivery URL carries the right Content-Type. A timestamp
 * prefix keeps re-uploads of the same filename from overwriting each other.
 */
function rawPublicId(filename: string | undefined, mimeType: string) {
  const ext = mimeType === "application/zip" ? "zip" : "pdf";
  const base = (filename ?? `document.${ext}`)
    .replace(/\.[^.]+$/, "")
    .replace(/[^\w-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80) || "document";
  return `${Date.now()}-${base}.${ext}`;
}

// ── Payload normalisers ───────────────────────────────────────────────────────
// The admin UI posts plain form state; these keep undefined/blank values from
// wiping columns and make sure JSON columns always receive an array.

const asString = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const asArray = (v: unknown) => (Array.isArray(v) ? v : []);

function pick<T extends object>(source: Record<string, unknown>, out: T): T {
  // Drops keys the caller did not send, so partial updates stay partial.
  return Object.fromEntries(Object.entries(out).filter(([k]) => source[k] !== undefined)) as T;
}

function newsPayload(body: Record<string, unknown> = {}) {
  return pick(body, {
    date: asString(body.date),
    category: asString(body.category),
    title: asString(body.title),
    excerpt: asString(body.excerpt),
    content: asString(body.content),
    attachments: asArray(body.attachments),
    published: body.published !== false,
  });
}

function eventPayload(body: Record<string, unknown> = {}) {
  const raw = body.eventDate;
  const parsed = typeof raw === "string" && raw.trim() ? new Date(raw) : null;
  return pick(body, {
    day: asString(body.day),
    month: asString(body.month),
    title: asString(body.title),
    venue: asString(body.venue),
    time: asString(body.time),
    description: asString(body.description),
    eventDate: parsed && !Number.isNaN(parsed.getTime()) ? parsed : null,
    attachments: asArray(body.attachments),
    published: body.published !== false,
  });
}

function departmentPayload(body: Record<string, unknown> = {}) {
  return {
    slug: asString(body.slug).trim().toLowerCase(),
    name: asString(body.name).trim(),
    code: asString(body.code),
    icon: asString(body.icon, "GraduationCap") || "GraduationCap",
    summary: asString(body.summary),
    eyebrow: asString(body.eyebrow),
    heroTitle: asString(body.heroTitle),
    heroSubtitle: asString(body.heroSubtitle),
    blocks: asArray(body.blocks),
    staffHeading: asString(body.staffHeading),
    staff: asArray(body.staff),
    supervisorsHeading: asString(body.supervisorsHeading),
    supervisors: asArray(body.supervisors),
    aliases: asArray(body.aliases).map((a) => String(a).trim().toLowerCase()).filter(Boolean),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    active: body.active !== false,
  };
}

type SortableEvent = { eventDate: Date | null; createdAt: Date };

/**
 * Upcoming events first (soonest → latest), then undated ones (newest first),
 * then past events (most recent first). Admins enter a real date so the site
 * stops showing last term's programme above next week's.
 */
function sortEvents<T extends SortableEvent>(rows: T[]): T[] {
  // Dates are stored at UTC midnight, so compare UTC calendar days — an event
  // happening today must still count as upcoming, whatever the server's zone.
  const todayUtc = new Date().toISOString().slice(0, 10);
  const bucket = (e: T) => {
    if (!e.eventDate) return 1;
    return e.eventDate.toISOString().slice(0, 10) >= todayUtc ? 0 : 2;
  };
  return [...rows].sort((a, b) => {
    const ba = bucket(a), bb = bucket(b);
    if (ba !== bb) return ba - bb;
    if (ba === 0) return a.eventDate!.getTime() - b.eventDate!.getTime();
    if (ba === 2) return b.eventDate!.getTime() - a.eventDate!.getTime();
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

// ── Router ────────────────────────────────────────────────────────────────────

export async function handleApiRequest(ctx: ApiContext): Promise<ApiResult> {
  const { route } = ctx;

  try {
    // Inside the try: a missing DATABASE_URL must surface as a readable JSON 500,
    // not an unhandled rejection that Vercel reports as FUNCTION_INVOCATION_FAILED.
    const prisma = getPrisma();
    // ── Admin Auth ────────────────────────────────────────────────────────────
    if (route === "auth/session") {
      const token = ctx.cookie("admin_token");
      if (!token) return json(null);
      return json(await verifyAdminToken(token));
    }
    if (route === "auth/login") {
      const { email, password } = ctx.body;
      const user = await prisma.adminUser.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return json({ message: "Invalid credentials" }, 401);
      const token = await signAdminToken({ id: user.id, email: user.email, role: user.role });
      return json(
        { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
        200,
        { name: "admin_token", value: token, maxAge: 28800 },
      );
    }
    if (route === "auth/logout") {
      return json({ ok: true }, 200, { name: "admin_token", value: "", maxAge: 0 });
    }

    // ── Student Auth ──────────────────────────────────────────────────────────
    if (route === "student/register") {
      const { email, password, name, phone } = ctx.body;
      const exists = await prisma.student.findUnique({ where: { email } });
      if (exists) return json({ message: "Email already registered" }, 409);
      const hashed = await bcrypt.hash(password, 10);
      const student = await prisma.student.create({ data: { email, password: hashed, name, phone } });
      const token = await signStudentToken({ id: student.id, email: student.email, name: student.name });
      return json(
        { token, student: { id: student.id, email: student.email, name: student.name } },
        200,
        { name: "student_token", value: token, maxAge: 86400 },
      );
    }
    if (route === "student/login") {
      const { email, password } = ctx.body;
      const student = await prisma.student.findUnique({ where: { email } });
      if (!student || !(await bcrypt.compare(password, student.password)))
        return json({ message: "Invalid credentials" }, 401);
      const token = await signStudentToken({ id: student.id, email: student.email, name: student.name });
      return json(
        { token, student: { id: student.id, email: student.email, name: student.name } },
        200,
        { name: "student_token", value: token, maxAge: 86400 },
      );
    }
    if (route === "student/logout") {
      return json({ ok: true }, 200, { name: "student_token", value: "", maxAge: 0 });
    }
    if (route === "student/session") {
      const token = ctx.cookie("student_token");
      if (!token) return json(null);
      return json(await verifyStudentToken(token));
    }
    if (route === "student/me") {
      const s = await requireStudent(ctx);
      const student = await prisma.student.findUnique({
        where: { id: s.id },
        select: { id: true, email: true, name: true, phone: true, createdAt: true },
      });
      return json(student);
    }

    // ── Applications (Student) ────────────────────────────────────────────────
    if (route === "applications/submit") {
      const student = await requireStudent(ctx);
      const existing = await prisma.application.findFirst({ where: { studentId: student.id } });
      if (existing) return json({ message: "You already have a submitted application", application: existing }, 409);
      const app = await prisma.application.create({ data: { studentId: student.id, ...ctx.body } });
      return json(app);
    }
    if (route === "applications/my") {
      const student = await requireStudent(ctx);
      const apps = await prisma.application.findMany({
        where: { studentId: student.id },
        orderBy: { submittedAt: "desc" },
      });
      return json(apps);
    }

    // ── Applications (Admin) ──────────────────────────────────────────────────
    if (route === "applications") {
      await requireAdmin(ctx);
      const { status, search } = ctx.query as Record<string, string>;
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
      return json(apps);
    }
    if (route === "applications/stats") {
      await requireAdmin(ctx);
      const [total, pending, underReview, accepted, rejected, waitlisted] = await Promise.all([
        prisma.application.count(),
        prisma.application.count({ where: { status: "PENDING" } }),
        prisma.application.count({ where: { status: "UNDER_REVIEW" } }),
        prisma.application.count({ where: { status: "ACCEPTED" } }),
        prisma.application.count({ where: { status: "REJECTED" } }),
        prisma.application.count({ where: { status: "WAITLISTED" } }),
      ]);
      return json({ total, pending, underReview, accepted, rejected, waitlisted });
    }
    if (route === "applications/update-status") {
      await requireAdmin(ctx);
      const { id, status, adminNote } = ctx.body;
      const app = await prisma.application.update({ where: { id }, data: { status, adminNote } });
      return json(app);
    }
    if (route === "applications/detail") {
      await requireAdmin(ctx);
      const id = ctx.query.id as string;
      const app = await prisma.application.findUnique({
        where: { id },
        include: { student: { select: { id: true, name: true, email: true, phone: true } } },
      });
      return json(app);
    }

    // ── News ──────────────────────────────────────────────────────────────────
    if (route === "news") {
      const all = ctx.query.all === "1";
      const limit = Number(ctx.query.limit);
      return json(await prisma.news.findMany({
        where: all ? undefined : { published: true },
        orderBy: { createdAt: "desc" },
        ...(Number.isFinite(limit) && limit > 0 ? { take: limit } : {}),
      }));
    }
    if (route === "news/create") { await requireAdmin(ctx); return json(await prisma.news.create({ data: newsPayload(ctx.body) })); }
    if (route === "news/update") { await requireAdmin(ctx); const { id, data } = ctx.body; return json(await prisma.news.update({ where: { id }, data: newsPayload(data) })); }
    if (route === "news/delete") { await requireAdmin(ctx); await prisma.news.delete({ where: { id: ctx.body.id } }); return json({ ok: true }); }

    // ── Events ────────────────────────────────────────────────────────────────
    if (route === "events") {
      const all = ctx.query.all === "1";
      const limit = Number(ctx.query.limit);
      const rows = await prisma.event.findMany({ where: all ? undefined : { published: true } });
      const sorted = sortEvents(rows);
      return json(Number.isFinite(limit) && limit > 0 ? sorted.slice(0, limit) : sorted);
    }
    if (route === "events/create") { await requireAdmin(ctx); return json(await prisma.event.create({ data: eventPayload(ctx.body) })); }
    if (route === "events/update") { await requireAdmin(ctx); const { id, data } = ctx.body; return json(await prisma.event.update({ where: { id }, data: eventPayload(data) })); }
    if (route === "events/delete") { await requireAdmin(ctx); await prisma.event.delete({ where: { id: ctx.body.id } }); return json({ ok: true }); }

    // ── Departments ───────────────────────────────────────────────────────────
    if (route === "departments") {
      return json(await prisma.department.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { name: "asc" }] }));
    }
    if (route === "departments/all") {
      await requireAdmin(ctx);
      return json(await prisma.department.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] }));
    }
    if (route === "departments/get") {
      const slug = String(ctx.query.slug ?? "").toLowerCase();
      const direct = await prisma.department.findUnique({ where: { slug } });
      if (direct) return json(direct);
      // Fall back to the alias list so legacy URLs (/departments/maths, …) resolve.
      const all = await prisma.department.findMany();
      const byAlias = all.find((d) => (Array.isArray(d.aliases) ? (d.aliases as string[]) : []).includes(slug));
      return json(byAlias ?? null);
    }
    if (route === "departments/save") {
      await requireAdmin(ctx);
      const { id, ...body } = ctx.body ?? {};
      const data = departmentPayload(body);
      if (!data.slug) return json({ message: "Slug is required" }, 400);
      if (!data.name) return json({ message: "Name is required" }, 400);
      const clash = await prisma.department.findUnique({ where: { slug: data.slug } });
      if (clash && clash.id !== id) return json({ message: `Slug "${data.slug}" is already used by ${clash.name}` }, 409);
      if (id) return json(await prisma.department.update({ where: { id }, data }));
      return json(await prisma.department.create({ data }));
    }
    if (route === "departments/delete") {
      await requireAdmin(ctx);
      await prisma.department.delete({ where: { id: ctx.body.id } });
      return json({ ok: true });
    }
    if (route === "departments/reorder") {
      await requireAdmin(ctx);
      const ids = (ctx.body?.ids ?? []) as string[];
      await prisma.$transaction(ids.map((id, order) => prisma.department.update({ where: { id }, data: { order } })));
      return json({ ok: true });
    }

    // ── Announcements ─────────────────────────────────────────────────────────
    if (route === "announcements") {
      const all = ctx.query.all === "1";
      return json(await prisma.announcement.findMany({ where: all ? undefined : { active: true }, orderBy: { order: "asc" } }));
    }
    if (route === "announcements/create") { await requireAdmin(ctx); return json(await prisma.announcement.create({ data: ctx.body })); }
    if (route === "announcements/update") { await requireAdmin(ctx); const { id, ...data } = ctx.body; return json(await prisma.announcement.update({ where: { id }, data })); }
    if (route === "announcements/delete") { await requireAdmin(ctx); await prisma.announcement.delete({ where: { id: ctx.body.id } }); return json({ ok: true }); }

    // ── Content ───────────────────────────────────────────────────────────────
    if (route === "content") {
      const section = ctx.query.section as string;
      return json(await prisma.siteContent.findUnique({ where: { section } }));
    }
    if (route === "content/upsert") {
      await requireAdmin(ctx);
      const { section, data } = ctx.body;
      return json(await prisma.siteContent.upsert({ where: { section }, update: { data }, create: { section, data } }));
    }

    // ── Students (Admin) ──────────────────────────────────────────────────────
    if (route === "students") {
      await requireAdmin(ctx);
      const { search } = ctx.query as Record<string, string>;
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
      return json(students);
    }

    // ── Users ─────────────────────────────────────────────────────────────────
    if (route === "users") {
      await requireAdmin(ctx);
      return json(await prisma.adminUser.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true }, orderBy: { createdAt: "desc" } }));
    }
    if (route === "users/create") {
      await requireAdmin(ctx);
      const { email, password, name, role } = ctx.body;
      const hashed = await bcrypt.hash(password, 10);
      return json(await prisma.adminUser.create({ data: { email, password: hashed, name, role }, select: { id: true, email: true, name: true, role: true, createdAt: true } }));
    }
    if (route === "users/delete") { await requireAdmin(ctx); await prisma.adminUser.delete({ where: { id: ctx.body.id } }); return json({ ok: true }); }
    if (route === "users/update-password") {
      await requireAdmin(ctx);
      const { id, password } = ctx.body;
      await prisma.adminUser.update({ where: { id }, data: { password: await bcrypt.hash(password, 10) } });
      return json({ ok: true });
    }

    // ── Image Upload (Cloudinary) ─────────────────────────────────────────────
    if (route === "upload/image") {
      await requireAdmin(ctx);
      const { base64, mimeType, folder, filename } = ctx.body as { base64: string; mimeType: string; folder?: string; filename?: string };
      const isRaw = mimeType === "application/pdf" || mimeType === "application/zip";
      const result = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64}`, {
        folder: folder ?? "gtmc",
        resource_type: isRaw ? "raw" : "image",
        // Keep the extension on raw assets — Cloudinary derives Content-Type
        // from the delivery URL, and an extensionless one downloads as
        // application/octet-stream instead of opening in the browser.
        ...(isRaw ? { public_id: rawPublicId(filename, mimeType) } : {}),
      });
      return json({ url: result.secure_url });
    }

    // ── Site Images ───────────────────────────────────────────────────────────
    if (route === "site-images") {
      const row = await prisma.siteContent.findUnique({ where: { section: "site-images" } });
      return json(row ? (row.data as object) : {});
    }
    if (route === "site-images/save") {
      await requireAdmin(ctx);
      const { data } = ctx.body;
      await prisma.siteContent.upsert({
        where: { section: "site-images" },
        update: { data },
        create: { section: "site-images", data },
      });
      return json({ ok: true });
    }

    // ── Faculty ───────────────────────────────────────────────────────────────
    if (route === "faculty") {
      const row = await prisma.siteContent.findUnique({ where: { section: "faculty" } });
      return json(row ? (row.data as unknown[]) : []);
    }
    if (route === "faculty/save") {
      await requireAdmin(ctx);
      const { data } = ctx.body;
      await prisma.siteContent.upsert({
        where: { section: "faculty" },
        update: { data },
        create: { section: "faculty", data },
      });
      return json({ ok: true });
    }

    // ── Courses ───────────────────────────────────────────────────────────
    if (route === "courses") {
      const row = await prisma.siteContent.findUnique({ where: { section: "courses" } });
      return json(row ? (row.data as object) : { ug: [], pg: [], research: [] });
    }
    if (route === "courses/save") {
      await requireAdmin(ctx);
      const { data } = ctx.body;
      await prisma.siteContent.upsert({
        where: { section: "courses" },
        update: { data },
        create: { section: "courses", data },
      });
      return json({ ok: true });
    }

    // ── Alumni ───────────────────────────────────────────────────────────
    if (route === "alumni") {
      const row = await prisma.siteContent.findUnique({ where: { section: "alumni" } });
      return json(row ? (row.data as object) : null);
    }
    if (route === "alumni/save") {
      await requireAdmin(ctx);
      const { data } = ctx.body;
      await prisma.siteContent.upsert({
        where: { section: "alumni" },
        update: { data },
        create: { section: "alumni", data },
      });
      return json({ ok: true });
    }

    // ── Principal ─────────────────────────────────────────────────────────────
    if (route === "principal") {
      const row = await prisma.siteContent.findUnique({ where: { section: "principal" } });
      return json(row ? (row.data as object) : null);
    }
    if (route === "principal/save") {
      await requireAdmin(ctx);
      const { data } = ctx.body;
      await prisma.siteContent.upsert({
        where: { section: "principal" },
        update: { data },
        create: { section: "principal", data },
      });
      return json({ ok: true });
    }

    // ── Dynamic Sections (IQAC / NIRF / AQAR) ────────────────────────────────
    if (route === "dynamic-sections") {
      const { group } = ctx.query as Record<string, string>;
      const where = { ...(group ? { group } : {}), active: true };
      return json(await prisma.dynamicSection.findMany({ where, orderBy: { order: "asc" } }));
    }
    if (route === "dynamic-sections/all") {
      await requireAdmin(ctx);
      const { group } = ctx.query as Record<string, string>;
      return json(await prisma.dynamicSection.findMany({ where: group ? { group } : undefined, orderBy: [{ group: "asc" }, { order: "asc" }] }));
    }
    if (route === "dynamic-sections/get") {
      const { group, slug } = ctx.query as Record<string, string>;
      return json(await prisma.dynamicSection.findUnique({ where: { group_slug: { group, slug } } }));
    }
    if (route === "dynamic-sections/save") {
      await requireAdmin(ctx);
      const { id, group, slug, title, subtitle, content, pdfUrl, pdfs, order, active } = ctx.body;
      const data = { group, slug, title, subtitle, content, pdfUrl: pdfUrl ?? "", pdfs: pdfs ?? [], order: order ?? 0, active: active ?? true };
      if (id) {
        return json(await prisma.dynamicSection.update({ where: { id }, data }));
      }
      return json(await prisma.dynamicSection.create({ data }));
    }
    if (route === "dynamic-sections/delete") {
      await requireAdmin(ctx);
      await prisma.dynamicSection.delete({ where: { id: ctx.body.id } });
      return json({ ok: true });
    }

    // ── Enquiries ─────────────────────────────────────────────────────────────
    if (route === "enquiry/submit") {
      const { source, name, email, phone, course, message } = ctx.body;
      const enquiry = await prisma.enquiry.create({ data: { source, name, email, phone, course, message } });
      return json(enquiry);
    }
    if (route === "enquiry/list") {
      await requireAdmin(ctx);
      const { unread } = ctx.query as Record<string, string>;
      const enquiries = await prisma.enquiry.findMany({
        where: unread === "1" ? { read: false } : undefined,
        orderBy: { submittedAt: "desc" },
      });
      return json(enquiries);
    }
    if (route === "enquiry/mark-read") {
      await requireAdmin(ctx);
      await prisma.enquiry.update({ where: { id: ctx.body.id }, data: { read: true } });
      return json({ ok: true });
    }
    if (route === "enquiry/delete") {
      await requireAdmin(ctx);
      await prisma.enquiry.delete({ where: { id: ctx.body.id } });
      return json({ ok: true });
    }
    if (route === "enquiry/stats") {
      await requireAdmin(ctx);
      const [total, unread] = await Promise.all([
        prisma.enquiry.count(),
        prisma.enquiry.count({ where: { read: false } }),
      ]);
      return json({ total, unread });
    }

    // ── Testimonials ─────────────────────────────────────────────────────────────
    if (route === "testimonials") {
      const all = ctx.query.all === "1";
      return json(await prisma.testimonial.findMany({ where: all ? undefined : { active: true }, orderBy: { order: "asc" } }));
    }
    if (route === "testimonials/create") { await requireAdmin(ctx); return json(await prisma.testimonial.create({ data: ctx.body })); }
    if (route === "testimonials/update") { await requireAdmin(ctx); const { id, ...data } = ctx.body; return json(await prisma.testimonial.update({ where: { id }, data })); }
    if (route === "testimonials/delete") { await requireAdmin(ctx); await prisma.testimonial.delete({ where: { id: ctx.body.id } }); return json({ ok: true }); }

    // ── Feedback Forms (Public) ───────────────────────────────────────────────
    if (route === "feedback/forms") {
      const forms = await prisma.feedbackForm.findMany({ where: { active: true } });
      return json(forms);
    }
    if (route === "feedback/submit") {
      const { category, data } = ctx.body;
      const form = await prisma.feedbackForm.findUnique({ where: { category } });
      if (!form) return json({ message: "Form not found" }, 404);
      const response = await prisma.feedbackResponse.create({ data: { formId: form.id, category, data } });
      return json(response);
    }

    // ── Feedback Forms (Admin) ────────────────────────────────────────────────
    if (route === "feedback/admin/forms") {
      await requireAdmin(ctx);
      const forms = await prisma.feedbackForm.findMany({ include: { _count: { select: { responses: true } } } });
      return json(forms);
    }
    if (route === "feedback/admin/form/save") {
      await requireAdmin(ctx);
      const { category, fields, active } = ctx.body;
      const form = await prisma.feedbackForm.upsert({
        where: { category },
        update: { fields, active },
        create: { category, fields, active: active ?? true },
      });
      return json(form);
    }
    if (route === "feedback/admin/responses") {
      await requireAdmin(ctx);
      const { category } = ctx.query as Record<string, string>;
      const responses = await prisma.feedbackResponse.findMany({
        where: category ? { category: category as never } : undefined,
        include: { form: { select: { category: true } } },
        orderBy: { submittedAt: "desc" },
      });
      return json(responses);
    }
    if (route === "feedback/admin/response/delete") {
      await requireAdmin(ctx);
      await prisma.feedbackResponse.delete({ where: { id: ctx.body.id } });
      return json({ ok: true });
    }

    // ── Sitemap ───────────────────────────────────────────────────────────────
    if (route === "sitemap.xml") {
      const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
      const departments = await prisma.department.findMany({ where: { active: true }, select: { slug: true } });
      const paths = [
        "/", "/about", "/timeline", "/principal-message", "/vision-mission", "/calender",
        "/courses/ug", "/courses/pg", "/courses/research", "/courses/e-materials",
        "/departments", ...departments.map((d) => `/departments/${d.slug}`),
        "/faculty", "/library", "/admission", "/placement", "/infrastructure",
        "/hostel", "/transport", "/gallery", "/news", "/events", "/alumni", "/contact",
      ];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
        .map((p) => `  <url><loc>${base}${p}</loc><changefreq>weekly</changefreq></url>`)
        .join("\n")}\n</urlset>`;
      return { kind: "xml", status: 200, body: xml };
    }

    return json({ message: "Not found" }, 404);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message !== "Unauthorized") console.error(`[api] ${ctx.method} ${route} failed:`, err);
    return json({ message }, message === "Unauthorized" ? 401 : 500);
  }
}
