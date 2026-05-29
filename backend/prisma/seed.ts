import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Super admin
  const existing = await prisma.adminUser.findUnique({ where: { email: "admin@gtmc.edu.in" } });
  if (!existing) {
    await prisma.adminUser.create({
      data: {
        email: "admin@gtmc.edu.in",
        password: await bcrypt.hash("Admin@1234", 10),
        name: "Super Admin",
        role: "SUPER_ADMIN",
      },
    });
    console.log("✅ Super admin created: admin@gtmc.edu.in / Admin@1234");
  } else {
    console.log("ℹ️  Super admin already exists");
  }

  // Seed announcements
  const annCount = await prisma.announcement.count();
  if (annCount === 0) {
    await prisma.announcement.createMany({
      data: [
        { text: "Admissions open 2025–26 — applications close Aug 30", active: true, order: 0 },
        { text: "NAAC A++ re-accreditation conferred for 5 years", active: true, order: 1 },
        { text: "₹4.5Cr in merit scholarships announced for incoming batch", active: true, order: 2 },
        { text: "Global Research Summit — Sept 14 to 16, register now", active: true, order: 3 },
        { text: "Placements 2024 : 98.4% recorded, highest package ₹54 LPA", active: true, order: 4 },
      ],
    });
    console.log("✅ Announcements seeded");
  }

  // Seed news
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        { date: "May 18, 2026", category: "Admissions", title: "B.Tech 2025–26 application window opens for all branches", excerpt: "Online applications are now live; merit scholarships up to 100% available.", published: true },
        { date: "May 10, 2026", category: "Research", title: "GTM COLLEGE bags 3 patents in autonomous-systems research", excerpt: "Faculty-led team at the AI lab patents three novel approaches in perception and SLAM.", published: true },
        { date: "Apr 28, 2026", category: "Placements", title: "Microsoft picks 42 students from CSE & IT departments", excerpt: "Annual on-campus recruitment drive concludes with the highest single-recruiter intake.", published: true },
        { date: "Apr 14, 2026", category: "Events", title: "TechVision 2026 — National Symposium on Industry 4.0", excerpt: "Two-day symposium hosted 1,200+ delegates across 60 institutions.", published: true },
        { date: "Apr 02, 2026", category: "Awards", title: "NAAC A++ re-accreditation conferred", excerpt: "Institution scores 3.78/4.00 on the seven NAAC quality criteria.", published: true },
      ],
    });
    console.log("✅ News seeded");
  }

  // Seed events
  const eventsCount = await prisma.event.count();
  if (eventsCount === 0) {
    await prisma.event.createMany({
      data: [
        { day: "14", month: "SEP", title: "Global Research Summit 2026", venue: "Convocation Auditorium", time: "09:00 – 18:00", published: true },
        { day: "22", month: "SEP", title: "Industry Connect — Tech Talks", venue: "Innovation Hall, Block C", time: "14:00 – 17:00", published: true },
        { day: "05", month: "OCT", title: "Hackathon : Code4Bharat", venue: "CSE Department Labs", time: "All Day", published: true },
        { day: "18", month: "OCT", title: "Cultural Fest — Saaranya 2026", venue: "Open Air Theatre", time: "17:00 onwards", published: true },
      ],
    });
    console.log("✅ Events seeded");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
