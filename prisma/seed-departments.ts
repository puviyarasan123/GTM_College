import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { DEPARTMENT_CONTENT } from "../frontend/src/lib/department-content";

const adapter = new PrismaPg(process.env.DIRECT_URL ?? process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

/**
 * Seeds the department pages from the bundled copy.
 *
 * Existing rows are left untouched unless `--force` is passed, so re-running
 * this never overwrites edits an admin has already made in the panel.
 */
async function main() {
  const force = process.argv.includes("--force");
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const dept of DEPARTMENT_CONTENT) {
    const data = {
      slug: dept.slug,
      name: dept.name,
      code: dept.code,
      icon: dept.icon,
      summary: dept.summary,
      eyebrow: dept.eyebrow,
      heroTitle: dept.heroTitle,
      heroSubtitle: dept.heroSubtitle,
      blocks: dept.blocks,
      staffHeading: dept.staffHeading,
      staff: dept.staff,
      supervisorsHeading: dept.supervisorsHeading,
      supervisors: dept.supervisors,
      aliases: dept.aliases,
      order: dept.order,
      active: dept.active,
    };

    const existing = await prisma.department.findUnique({ where: { slug: dept.slug } });
    if (existing && !force) {
      skipped++;
      continue;
    }
    if (existing) {
      await prisma.department.update({ where: { slug: dept.slug }, data });
      updated++;
    } else {
      await prisma.department.create({ data });
      created++;
    }
  }

  console.log(`✅ Departments — created: ${created}, updated: ${updated}, left as-is: ${skipped}`);
  if (skipped > 0 && !force) console.log("   (run with --force to overwrite existing rows)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
