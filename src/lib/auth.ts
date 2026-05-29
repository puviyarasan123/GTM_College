import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "gtm-college-secret-change-in-production"
);

export type JWTPayload = {
  id: string;
  email: string;
  role: string;
};

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
