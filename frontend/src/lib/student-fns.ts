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

export type StudentSession = { id: string; email: string; name: string };

export type Application = {
  id: string;
  studentId: string;
  programme: string;
  branch: string;
  entranceExam: string;
  entranceScore: string;
  boardPercent: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  guardianName: string;
  guardianPhone: string;
  status: "PENDING" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED" | "WAITLISTED";
  adminNote: string | null;
  submittedAt: string;
  student?: { id: string; name: string; email: string; phone: string };
};

export type AppStats = {
  total: number; pending: number; underReview: number;
  accepted: number; rejected: number; waitlisted: number;
};

export const getStudentSession = () => safeApi<StudentSession>("/api/student/session");
export const studentRegister = (data: { email: string; password: string; name: string; phone: string }) =>
  api<{ token: string; student: StudentSession }>("/api/student/register", data);
export const studentLogin = (data: { email: string; password: string }) =>
  api<{ token: string; student: StudentSession }>("/api/student/login", data);
export const studentLogout = () => api<{ ok: boolean }>("/api/student/logout", {});

export const submitApplication = (data: Omit<Application, "id" | "studentId" | "status" | "adminNote" | "submittedAt" | "student">) =>
  api<Application>("/api/applications/submit", data);
export const getMyApplications = () => api<Application[]>("/api/applications/my");

export const getApplications = (params?: { status?: string; search?: string }) => {
  const q = new URLSearchParams();
  if (params?.status) q.set("status", params.status);
  if (params?.search) q.set("search", params.search);
  return api<Application[]>(`/api/applications?${q}`);
};
export const getApplicationStats = () => api<AppStats>("/api/applications/stats");
export const updateApplicationStatus = (data: { id: string; status: string; adminNote?: string }) =>
  api<Application>("/api/applications/update-status", data);
export const getApplicationDetail = (id: string) =>
  api<Application>(`/api/applications/detail?id=${id}`);
