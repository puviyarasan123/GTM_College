import type { DeptBlock, DeptStaff, DeptSupervisor } from "./department-content";

async function api<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, body !== undefined ? {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  } : undefined);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? res.statusText);
  }
  return res.json();
}

export type Attachment = { name: string; url: string; type: string };
export type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  attachments: Attachment[];
  published: boolean;
  createdAt: string;
};
export type EventItem = {
  id: string;
  day: string;
  month: string;
  title: string;
  venue: string;
  time: string;
  description: string;
  eventDate: string | null;
  attachments: Attachment[];
  published: boolean;
  createdAt: string;
};
export type Announcement = { id: string; text: string; active: boolean; order: number };
export type SiteContent = { section: string; data: unknown } | null;

export const getNews = (limit?: number) => api<NewsItem[]>(`/api/news${limit ? `?limit=${limit}` : ""}`);
export const getAllNews = () => api<NewsItem[]>("/api/news?all=1");
export const createNews = ({ data }: { data: Omit<NewsItem, "id" | "createdAt"> }) => api("/api/news/create", data);
export const updateNews = ({ data }: { data: { id: string; data: Partial<NewsItem> } }) => api("/api/news/update", data);
export const deleteNews = ({ data }: { data: { id: string } }) => api("/api/news/delete", data);

export const getEvents = (limit?: number) => api<EventItem[]>(`/api/events${limit ? `?limit=${limit}` : ""}`);
export const getAllEvents = () => api<EventItem[]>("/api/events?all=1");
export const createEvent = ({ data }: { data: Omit<EventItem, "id" | "createdAt"> }) => api("/api/events/create", data);
export const updateEvent = ({ data }: { data: { id: string; data: Partial<EventItem> } }) => api("/api/events/update", data);
export const deleteEvent = ({ data }: { data: { id: string } }) => api("/api/events/delete", data);

export const getAnnouncements = () => api<Announcement[]>("/api/announcements");
export const getAllAnnouncements = () => api<Announcement[]>("/api/announcements?all=1");
export const createAnnouncement = ({ data }: { data: { text: string; active: boolean; order: number } }) => api("/api/announcements/create", data);
export const updateAnnouncement = ({ data }: { data: { id: string; text?: string; active?: boolean; order?: number } }) => api("/api/announcements/update", data);
export const deleteAnnouncement = ({ data }: { data: { id: string } }) => api("/api/announcements/delete", data);

export const getSiteContent = ({ data }: { data: { section: string } }) =>
  api<SiteContent>(`/api/content?section=${encodeURIComponent(data.section)}`);
export const upsertSiteContent = ({ data }: { data: { section: string; data: Record<string, unknown> } }) =>
  api("/api/content/upsert", data);

// ── Site Images ─────────────────────────────────────────────────────────────────
export type SiteImages = {
  hero1?: string; hero1Caption?: string;
  hero2?: string; hero2Caption?: string;
  hero3?: string; hero3Caption?: string;
  aboutCampus?: string;
  welcomeImage?: string;
  gallery?: { url: string; caption: string }[];
};
export const getSiteImages = () => api<SiteImages>("/api/site-images");
export const saveSiteImages = ({ data }: { data: SiteImages }) =>
  api("/api/site-images/save", { data });

// ── Uploads (Cloudinary) ──────────────────────────────────────────────────────

/**
 * Uploads any supported file (JPG/PNG/WEBP or PDF) and returns the hosted URL.
 * The original filename is forwarded so PDFs keep a readable, extensioned URL.
 */
export async function uploadFile(file: File, folder = "gtmc"): Promise<Attachment> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
  const [meta, base64] = dataUrl.split(",");
  const mimeType = meta.replace("data:", "").replace(";base64", "");
  const result = await api<{ url: string }>("/api/upload/image", {
    base64,
    mimeType,
    folder,
    filename: file.name,
  });
  return { name: file.name, url: result.url, type: mimeType };
}

export async function uploadImage(file: File, folder = "gtmc"): Promise<string> {
  const { url } = await uploadFile(file, folder);
  return url;
}

// ── Faculty ───────────────────────────────────────────────────────────────────
export type FacultyMember = {
  id: string;
  name: string;
  role: string;
  dept: string;
  qual: string;
  focus: string;
  image: string | null;
};
export const getFaculty = () => api<FacultyMember[]>("/api/faculty");
export const saveFaculty = ({ data }: { data: FacultyMember[] }) =>
  api("/api/faculty/save", { data });

// ── Courses (dynamic) ───────────────────────────────────────────────────────
export type UgCourse = { sno: number; department: string; course: string; medium: string; shift: string; established: string; stream: string };
export type PgCourse = { sno: number; department: string; course: string; medium: string; shift: string; established: string; stream: string };
export type ResearchProgram = { degree: string; type: string; established: string };
export type ResearchDept = { department: string; category: string; programs: ResearchProgram[] };
export type CoursesData = { ug: UgCourse[]; pg: PgCourse[]; research: ResearchDept[] };
export const getCourses = () => api<CoursesData>("/api/courses");
export const saveCourses = ({ data }: { data: CoursesData }) => api("/api/courses/save", { data });

// ── Alumni ───────────────────────────────────────────────────────────────────
export type AlumniData = {
  heading: string;
  intro: string;
  sections: { title: string; body: string }[];
  objectives: string[];
  images: { url: string; caption: string }[];
};
export const getAlumni = () => api<AlumniData | null>("/api/alumni");
export const saveAlumni = ({ data }: { data: AlumniData }) => api("/api/alumni/save", { data });

// ── Testimonials ─────────────────────────────────────────────────────────────
export type Testimonial = {
  id: string;
  name: string;
  batch: string;
  company: string;
  quote: string;
  order: number;
  active: boolean;
};
export const getTestimonials = () => api<Testimonial[]>("/api/testimonials");
export const getAllTestimonials = () => api<Testimonial[]>("/api/testimonials?all=1");
export const createTestimonial = ({ data }: { data: Omit<Testimonial, "id"> }) => api("/api/testimonials/create", data);
export const updateTestimonial = ({ data }: { data: { id: string } & Partial<Omit<Testimonial, "id">> }) => api("/api/testimonials/update", data);
export const deleteTestimonial = ({ data }: { data: { id: string } }) => api("/api/testimonials/delete", data);

// ── Principal ─────────────────────────────────────────────────────────────────
export type PrincipalData = {
  name: string;
  title: string;
  qual: string;
  image: string | null;
  message: string[];
};
export const getPrincipal = () => api<PrincipalData | null>("/api/principal");
export const savePrincipal = ({ data }: { data: PrincipalData }) =>
  api("/api/principal/save", { data });

// ── Enquiries ─────────────────────────────────────────────────────────────────
export type Enquiry = {
  id: string;
  source: string;
  name: string;
  email: string;
  phone?: string | null;
  course?: string | null;
  message: string;
  read: boolean;
  submittedAt: string;
};
export const submitEnquiry = (data: Omit<Enquiry, "id" | "read" | "submittedAt">) =>
  api<Enquiry>("/api/enquiry/submit", data);

// ── Dynamic Sections (IQAC / NIRF / AQAR) ────────────────────────────────────
export type PdfEntry = { title: string; url: string };
export type DynamicSection = {
  id: string;
  group: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  pdfUrl: string;
  pdfs: PdfEntry[];
  order: number;
  active: boolean;
};
export const getDynamicSections = (group?: string) => {
  const q = group ? `?group=${encodeURIComponent(group)}` : "";
  return api<DynamicSection[]>(`/api/dynamic-sections${q}`);
};
export const getDynamicSection = (group: string, slug: string) =>
  api<DynamicSection | null>(`/api/dynamic-sections/get?group=${encodeURIComponent(group)}&slug=${encodeURIComponent(slug)}`);
export const getAllDynamicSections = (group?: string) => {
  const q = group ? `?group=${encodeURIComponent(group)}` : "";
  return api<DynamicSection[]>(`/api/dynamic-sections/all${q}`);
};
export const saveDynamicSection = ({ data }: { data: Partial<DynamicSection> }) =>
  api<DynamicSection>("/api/dynamic-sections/save", data);
export const deleteDynamicSection = ({ data }: { data: { id: string } }) =>
  api<{ ok: boolean }>("/api/dynamic-sections/delete", data);

// ── Departments ───────────────────────────────────────────────────────────────
export type Department = {
  id: string;
  slug: string;
  name: string;
  code: string;
  icon: string;
  summary: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  blocks: DeptBlock[];
  staffHeading: string;
  staff: DeptStaff[];
  supervisorsHeading: string;
  supervisors: DeptSupervisor[];
  aliases: string[];
  order: number;
  active: boolean;
};

export const getDepartments = () => api<Department[]>("/api/departments");
export const getAllDepartments = () => api<Department[]>("/api/departments/all");
export const getDepartment = (slug: string) =>
  api<Department | null>(`/api/departments/get?slug=${encodeURIComponent(slug)}`);
export const saveDepartment = ({ data }: { data: Partial<Department> }) =>
  api<Department>("/api/departments/save", data);
export const deleteDepartment = ({ data }: { data: { id: string } }) =>
  api<{ ok: boolean }>("/api/departments/delete", data);
export const reorderDepartments = ({ data }: { data: { ids: string[] } }) =>
  api<{ ok: boolean }>("/api/departments/reorder", data);
