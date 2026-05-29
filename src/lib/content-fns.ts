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

export type NewsItem = { id: string; date: string; category: string; title: string; excerpt: string; published: boolean; createdAt: string };
export type EventItem = { id: string; day: string; month: string; title: string; venue: string; time: string; published: boolean; createdAt: string };
export type Announcement = { id: string; text: string; active: boolean; order: number };
export type SiteContent = { section: string; data: unknown } | null;

export const getNews = () => api<NewsItem[]>("/api/news");
export const getAllNews = () => api<NewsItem[]>("/api/news?all=1");
export const createNews = ({ data }: { data: Omit<NewsItem, "id" | "createdAt"> }) => api("/api/news/create", data);
export const updateNews = ({ data }: { data: { id: string; data: Partial<NewsItem> } }) => api("/api/news/update", data);
export const deleteNews = ({ data }: { data: { id: string } }) => api("/api/news/delete", data);

export const getEvents = () => api<EventItem[]>("/api/events");
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
