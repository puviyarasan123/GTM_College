import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg(process.env.DIRECT_URL ?? process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.testimonial.createMany({
    data: [
      {
        name: "R. Kavitha",
        batch: "B.Sc. Computer Science, 2022",
        company: "Software Developer, TCS Chennai",
        quote: "GTMC gave me a rock-solid foundation in programming. The faculty were always approachable and the placement cell guided me every step of the way to land my role at TCS.",
        order: 1,
        active: true,
      },
      {
        name: "M. Arun Kumar",
        batch: "B.Com., 2021",
        company: "Junior Accountant, HDFC Bank",
        quote: "The commerce department at GTMC is excellent. Practical sessions on accounting and taxation gave me the confidence to crack the HDFC Bank recruitment exam on my first attempt.",
        order: 2,
        active: true,
      },
      {
        name: "S. Priyanka",
        batch: "BBA, 2023",
        company: "HR Executive, Infosys Vellore",
        quote: "The management programme here shaped my communication and leadership skills. The supportive environment at GTMC made me industry-ready before I even graduated.",
        order: 3,
        active: true,
      },
      {
        name: "T. Karthikeyan",
        batch: "BCA, 2022",
        company: "Software Engineer, Zoho Corporation",
        quote: "BCA at GTMC was a turning point in my life. The computer lab facilities and dedicated faculty helped me build real projects that impressed Zoho during my interview.",
        order: 4,
        active: true,
      },
      {
        name: "P. Deepa",
        batch: "B.Sc. Mathematics, 2020",
        company: "Data Analyst, Cognizant",
        quote: "Mathematics at GTMC built my analytical thinking. The professors encouraged us to go beyond textbooks and that mindset helped me transition into data analytics at Cognizant.",
        order: 5,
        active: true,
      },
      {
        name: "V. Senthil",
        batch: "B.Sc. Physics, 2019",
        company: "Lab Technician, Govt. Hospital Gudiyattam",
        quote: "Coming from a rural background, GTMC was the best decision my family made. Affordable, quality education with caring faculty — I am proud to serve my community today.",
        order: 6,
        active: true,
      },
    ],
  });
  console.log("✅ Testimonials seeded!");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
