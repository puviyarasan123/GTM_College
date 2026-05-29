import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global { var __prisma: PrismaClient | undefined; }

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return new PrismaClient({ adapter: new PrismaPg(url) });
}

export const prisma = globalThis.__prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.__prisma = prisma;
