/**
 * Uploads the legacy gtmc.edu.in documents to Cloudinary and attaches them to
 * the matching DynamicSection rows (IQAC / NIRF / AQAR).
 *
 * Source files live in docs/gtmc-legacy/ (mirrored from the old site).
 * Re-running is safe: uploads are keyed by a stable public_id, so an existing
 * file is overwritten rather than duplicated, and each section's `pdfs` array
 * is rebuilt from the mapping below.
 *
 *   npx tsx prisma/seed-dynamic-pdfs.ts
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import "dotenv/config";

const adapter = new PrismaPg(process.env.DIRECT_URL ?? process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DOCS_DIR = resolve(process.cwd(), "docs/gtmc-legacy");

type Doc = { file: string; title: string };
type Entry = { group: string; slug: string; docs: Doc[] };

const ENTRIES: Entry[] = [
  // ── IQAC ──────────────────────────────────────────────────────────────────
  { group: "iqac", slug: "activities", docs: [
    { file: "iqac-activities.pdf", title: "IQAC Activities Report (6.5.1)" },
  ]},
  { group: "iqac", slug: "best-practices", docs: [
    { file: "iqac-best-practices.pdf", title: "Best Practices (7.2.1)" },
  ]},
  { group: "iqac", slug: "institutional-distinctiveness", docs: [
    { file: "iqac-institutional-distinctiveness.pdf", title: "Institutional Distinctiveness" },
  ]},
  { group: "iqac", slug: "program-outcomes", docs: [
    { file: "iqac-program-outcomes.pdf", title: "Program Outcomes" },
  ]},
  { group: "iqac", slug: "sss-report", docs: [
    { file: "iqac-sss-2021-22.pdf", title: "Student Satisfaction Survey Report 2021-22" },
  ]},
  { group: "iqac", slug: "aicte-eoa", docs: [
    { file: "aicte-eoa-2021-22.pdf", title: "AICTE Extension of Approval 2021-22" },
  ]},
  { group: "iqac", slug: "minutes", docs: [
    { file: "minutes.zip", title: "Minutes of Meetings (ZIP archive)" },
  ]},
  { group: "iqac", slug: "future-plan", docs: [
    { file: "iqac-future-plan.pdf", title: "Future Plan" },
  ]},
  { group: "iqac", slug: "rti-pdf", docs: [
    { file: "rti.pdf", title: "RTI Information" },
  ]},
  { group: "iqac", slug: "rti-act-new", docs: [
    { file: "rti-act-2005-new.pdf", title: "RTI Act 2005 (Updated)" },
  ]},

  // ── NIRF ──────────────────────────────────────────────────────────────────
  { group: "nirf", slug: "nirf-college-2025", docs: [
    { file: "nirf-college-2025.pdf", title: "NIRF College 2025 — Data Submission" },
  ]},
  { group: "nirf", slug: "nirf-overall-2024", docs: [
    { file: "nirf-overall-2024.pdf", title: "NIRF Overall 2024 — Data Submission" },
  ]},
  { group: "nirf", slug: "nirf-college-2024", docs: [
    { file: "nirf-college-2024.pdf", title: "NIRF College 2024 — Data Submission" },
  ]},
  { group: "nirf", slug: "nirf-college-2023", docs: [
    { file: "nirf-college-2023.pdf", title: "NIRF College 2023 — Data Submission" },
  ]},
  { group: "nirf", slug: "nirf-overall-2023", docs: [
    { file: "nirf-overall-2023.pdf", title: "NIRF Overall 2023 — Data Submission" },
  ]},

  // ── AQAR ──────────────────────────────────────────────────────────────────
  { group: "aqar", slug: "aqar-2017-18", docs: [
    { file: "aqar-2017-18.pdf", title: "AQAR Report 2017-18" },
  ]},
  { group: "aqar", slug: "aqar-2018-19", docs: [
    { file: "aqar-2018-19.pdf", title: "AQAR Report 2018-19" },
  ]},
  { group: "aqar", slug: "aqar-2019-20", docs: [
    { file: "aqar-2019-20.pdf", title: "AQAR Report 2019-20" },
  ]},
  { group: "aqar", slug: "aqar-2020-21", docs: [
    { file: "aqar-2020-21.pdf", title: "AQAR Report 2020-21" },
  ]},
  { group: "aqar", slug: "ssr-2022", docs: [
    { file: "ssr-2022.pdf", title: "Self Study Report (SSR) 2022" },
  ]},
];

// The SSR page has no counterpart in the original seed, so define it here.
const NEW_SECTIONS = [
  {
    group: "aqar",
    slug: "ssr-2022",
    title: "SSR 2022",
    subtitle: "Self Study Report submitted to NAAC for the 2022 accreditation cycle",
    content:
      "Self Study Report (SSR) — 2022\n\n" +
      "The Self Study Report is the comprehensive document submitted to the National Assessment and Accreditation Council (NAAC) covering all seven criteria of institutional quality:\n\n" +
      "Criterion I — Curricular Aspects\n" +
      "Criterion II — Teaching-Learning and Evaluation\n" +
      "Criterion III — Research, Innovations and Extension\n" +
      "Criterion IV — Infrastructure and Learning Resources\n" +
      "Criterion V — Student Support and Progression\n" +
      "Criterion VI — Governance, Leadership and Management\n" +
      "Criterion VII — Institutional Values and Best Practices\n\n" +
      "The full report is available for download below.",
    order: 5,
  },
];

/** Strip the "Please upload the official ... PDF" placeholder now that files are attached. */
function stripPlaceholder(content: string): string {
  return content
    .split("\n")
    .filter((line) => !/^please upload the official.*\.$/i.test(line.trim()))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function uploadDoc(doc: Doc): Promise<string> {
  const path = resolve(DOCS_DIR, doc.file);
  if (!existsSync(path)) throw new Error(`Missing source file: ${path}`);

  const isPdf = doc.file.endsWith(".pdf");
  const mimeType = isPdf ? "application/pdf" : "application/zip";
  const base64 = readFileSync(path).toString("base64");

  const result = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64}`, {
    folder: "gtmc/docs",
    resource_type: "raw",
    // Keep the extension in the public_id: for `raw` assets Cloudinary derives
    // Content-Type from the delivery URL, so an extensionless URL is served as
    // application/octet-stream and browsers download it instead of opening it.
    public_id: doc.file,
    overwrite: true,
    invalidate: true,
  });
  return result.secure_url;
}

async function main() {
  console.log(`Uploading legacy documents from ${DOCS_DIR}\n`);

  // Create sections that did not exist in the original seed.
  for (const s of NEW_SECTIONS) {
    await prisma.dynamicSection.upsert({
      where: { group_slug: { group: s.group, slug: s.slug } },
      update: { title: s.title, subtitle: s.subtitle, content: s.content, order: s.order },
      create: { ...s, pdfUrl: "", pdfs: [], active: true },
    });
  }

  let uploaded = 0;
  let skipped = 0;

  for (const entry of ENTRIES) {
    const section = await prisma.dynamicSection.findUnique({
      where: { group_slug: { group: entry.group, slug: entry.slug } },
    });

    if (!section) {
      console.warn(`  ⚠ no such section: ${entry.group}/${entry.slug} — skipped`);
      skipped++;
      continue;
    }

    const pdfs = [];
    for (const doc of entry.docs) {
      const url = await uploadDoc(doc);
      pdfs.push({ title: doc.title, url });
      uploaded++;
      console.log(`  ✔ ${entry.group}/${entry.slug}  ←  ${doc.file}`);
    }

    await prisma.dynamicSection.update({
      where: { id: section.id },
      data: {
        pdfs,
        pdfUrl: pdfs[0]?.url ?? "",
        content: stripPlaceholder(section.content),
      },
    });
  }

  console.log(`\n✅ ${uploaded} document(s) uploaded and attached, ${skipped} skipped`);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
