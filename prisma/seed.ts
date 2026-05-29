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
        { text: "NAAC 'A' Grade accreditation with 3.2 CGPA", active: true, order: 1 },
        { text: "₹50 Lakh in merit scholarships for deserving students", active: true, order: 2 },
        { text: "Annual Science Symposium — Sept 14 to 16, register now", active: true, order: 3 },
        { text: "Placements 2024: 92% placement rate, highest package ₹12 LPA", active: true, order: 4 },
      ],
    });
    console.log("✅ Announcements seeded");
  }

  // Seed news
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        { date: "May 18, 2025", category: "Admissions", title: "UG & PG 2025–26 application window opens for all programmes", excerpt: "Online applications are now live; merit scholarships available based on board exam scores.", published: true },
        { date: "May 10, 2025", category: "Research", title: "GTM College faculty publishes research in international journals", excerpt: "Three research papers on biotechnology and data science accepted in peer-reviewed publications.", published: true },
        { date: "Apr 28, 2025", category: "Placements", title: "TCS recruits 85 students from Computer Science & BCA departments", excerpt: "Annual campus recruitment drive concludes with excellent results across all departments.", published: true },
        { date: "Apr 14, 2025", category: "Events", title: "ScienceFest 2025 — Inter-collegiate Science Exhibition", excerpt: "Two-day event hosted 800+ students from 40 colleges with innovative project displays.", published: true },
        { date: "Apr 02, 2025", category: "Awards", title: "NAAC 'A' Grade accreditation renewed", excerpt: "Institution scores 3.2/4.00 on NAAC quality criteria, maintaining high academic standards.", published: true },
      ],
    });
    console.log("✅ News seeded");
  }

  // Seed events
  const eventsCount = await prisma.event.count();
  if (eventsCount === 0) {
    await prisma.event.createMany({
      data: [
        { day: "14", month: "SEP", title: "Annual Science Symposium 2025", venue: "Main Auditorium", time: "09:00 – 18:00", published: true },
        { day: "22", month: "SEP", title: "Career Guidance Workshop", venue: "Seminar Hall, Block A", time: "14:00 – 17:00", published: true },
        { day: "05", month: "OCT", title: "Inter-Collegiate Quiz Competition", venue: "Computer Lab", time: "All Day", published: true },
        { day: "18", month: "OCT", title: "Cultural Fest — Kalanjali 2025", venue: "Open Air Theatre", time: "17:00 onwards", published: true },
      ],
    });
    console.log("✅ Events seeded");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
