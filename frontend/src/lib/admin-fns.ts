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

async function safeApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export type JWTPayload = { id: string; email: string; role: string };

export const getAdminSession = () => safeApi<JWTPayload>("/api/auth/session");

export const adminLogin = ({ data }: { data: { email: string; password: string } }) =>
  api<{ token: string; user: { id: string; email: string; name: string; role: string } }>("/api/auth/login", data);

export const adminLogout = () =>
  api<{ ok: boolean }>("/api/auth/logout", {});

export const listUsers = () =>
  api<{ id: string; email: string; name: string; role: string; createdAt: string }[]>("/api/users");

export const createUser = ({ data }: { data: { email: string; password: string; name: string; role: string } }) =>
  api("/api/users/create", data);

export const deleteUser = ({ data }: { data: { id: string } }) =>
  api("/api/users/delete", data);

export const updateUserPassword = ({ data }: { data: { id: string; password: string } }) =>
  api("/api/users/update-password", data);

export const listStudents = (search?: string) => {
  const q = search ? `?search=${encodeURIComponent(search)}` : "";
  return api<{ id: string; name: string; email: string; phone: string; createdAt: string; _count: { applications: number } }[]>(`/api/students${q}`);
};

export type FeedbackCategory = "STUDENT" | "PARENT" | "ALUMNI" | "TEACHER_PUBLIC";

export type FeedbackField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio" | "rating";
  required: boolean;
  options?: string[];
};

export type FeedbackForm = {
  id: string;
  category: FeedbackCategory;
  fields: FeedbackField[];
  active: boolean;
  updatedAt: string;
  _count?: { responses: number };
};

export type FeedbackResponse = {
  id: string;
  formId: string;
  category: FeedbackCategory;
  data: Record<string, string>;
  submittedAt: string;
};

export const getFeedbackAdminForms = () => api<FeedbackForm[]>("/api/feedback/admin/forms");
export const saveFeedbackForm = ({ data }: { data: { category: FeedbackCategory; fields: FeedbackField[]; active: boolean } }) =>
  api<FeedbackForm>("/api/feedback/admin/form/save", data);
export const getFeedbackResponses = (category?: FeedbackCategory) => {
  const q = category ? `?category=${category}` : "";
  return api<FeedbackResponse[]>(`/api/feedback/admin/responses${q}`);
};
export const deleteFeedbackResponse = ({ data }: { data: { id: string } }) =>
  api<{ ok: boolean }>("/api/feedback/admin/response/delete", data);

export type EnquiryItem = {
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
export const listEnquiries = (unread?: boolean) =>
  api<EnquiryItem[]>(`/api/enquiry/list${unread ? "?unread=1" : ""}`);
export const markEnquiryRead = ({ data }: { data: { id: string } }) =>
  api<{ ok: boolean }>("/api/enquiry/mark-read", data);
export const deleteEnquiry = ({ data }: { data: { id: string } }) =>
  api<{ ok: boolean }>("/api/enquiry/delete", data);
export const getEnquiryStats = () =>
  api<{ total: number; unread: number }>("/api/enquiry/stats");
