import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { prisma } from "../_prisma";
import { signToken } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });
  const token = await signToken({ id: user.id, email: user.email, role: user.role });
  res
    .setHeader("Set-Cookie", `admin_token=${token}; Path=/; Max-Age=28800; HttpOnly; SameSite=Strict`)
    .json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}
