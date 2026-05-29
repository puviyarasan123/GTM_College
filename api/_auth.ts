import { SignJWT, jwtVerify } from "jose";
import type { VercelRequest } from "@vercel/node";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "gtm-college-secret-change-in-production"
);

export type JWTPayload = { id: string; email: string; role: string };

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: VercelRequest): string | null {
  const cookie = req.headers.cookie ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match ? match[1] : null;
}

export async function requireAuth(req: VercelRequest): Promise<JWTPayload> {
  const token = getTokenFromRequest(req);
  if (!token) throw new Error("Unauthorized");
  const payload = await verifyToken(token);
  if (!payload) throw new Error("Unauthorized");
  return payload;
}
