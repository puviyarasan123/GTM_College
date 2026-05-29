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

export type JWTPayload = { id: string; email: string; role: string };

export const getAdminSession = () =>
  api<JWTPayload | null>("/api/auth/session");

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
