// import { createFileRoute } from "@tanstack/react-router";
// import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
// import { SITE, STATS } from "@/lib/site-data";
// import { Award, BookOpen, Globe2, Sparkles } from "lucide-react";

// export const Route = createFileRoute("/about")({
//   head: () => ({
//     meta: [
//       { title: `About — ${SITE.name}` },
//       { name: "description", content: `Learn about ${SITE.name}, Gudiyattam — affiliated to Thiruvalluvar University, offering quality UG programmes since ${SITE.estd}.` },
//       { property: "og:url", content: "/about" },
//     ],
//     links: [{ rel: "canonical", href: "/about" }],
//   }),
//   component: AboutPage,
// });

// const pillars = [
//   { icon: Award, title: "NAAC Accredited", desc: "Recognised for academic quality, infrastructure and student outcomes." },
//   { icon: BookOpen, title: "Thiruvalluvar University Affiliated", desc: "All programmes affiliated to Thiruvalluvar University, Vellore." },
//   { icon: Globe2, title: "Holistic Development", desc: "Sports, cultural activities, NSS and NCC programmes for all-round growth." },
//   { icon: Sparkles, title: "Government College", desc: "A government-aided institution serving students of Gudiyattam and Vellore District since 1974." },
// ];

// function AboutPage() {
//   return (
//     <>
//       <PageHero
//         eyebrow="About the Institution"
//         title="Five decades of empowering minds at GTMC."
//         subtitle={`Established in ${SITE.estd}, Govt. Thirumagal Mills College, Gudiyattam has grown into a trusted institution in Vellore District, offering quality education in Science, Arts, Commerce and Management, affiliated to Thiruvalluvar University.`}
//       />
//       <Section>
//         <div className="grid lg:grid-cols-2 gap-16 items-start">
//           <Reveal>
//             <SectionHeader
//               eyebrow="Our Story"
//               title="A legacy built on knowledge, values and service."
//               desc={`Founded in ${SITE.estd} under the Government of Tamil Nadu, GTMC has been serving students from Gudiyattam and surrounding areas of Vellore District for over 50 years. The college is named after the Thirumagal Mills, reflecting its deep roots in the local community. Every classroom, lab and library is designed to nurture curiosity and build careers.`}
//             />
//             <p className="text-muted-foreground leading-relaxed mt-4">
//               Our teaching approach blends strong academic foundations with practical learning. Students graduate with skills, confidence and values that make them successful in their careers and life. As a government college, we are committed to making quality higher education accessible to all sections of society.
//             </p>
//           </Reveal>
//           <div className="grid sm:grid-cols-2 gap-5">
//             {pillars.map((p, i) => (
//               <Reveal key={p.title} delay={i * 0.05}>
//                 <div className="rounded-2xl border border-border bg-card p-6 h-full hover:shadow-elegant transition-shadow">
//                   <div className="size-11 rounded-xl bg-gold/15 text-gold-deep grid place-items-center mb-4">
//                     <p.icon className="size-5" />
//                   </div>
//                   <div className="font-bold text-primary">{p.title}</div>
//                   <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </Section>
//       <section className="bg-primary text-primary-foreground">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {STATS.map((s) => (
//             <div key={s.label}>
//               <div className="text-4xl md:text-5xl font-extrabold text-gold">{s.value.toLocaleString()}{s.suffix}</div>
//               <div className="text-sm text-white/70 mt-2 uppercase tracking-wider">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }


import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE, STATS } from "@/lib/site-data";
import { Award, BookOpen, Globe2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us — ${SITE.name}` },
      { name: "description", content: `Learn about the rich history, legacy, and academic growth of ${SITE.name}, Gudiyattam — established in 1964.` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  { 
    icon: Award, 
    title: "NAAC Accredited (B+ Grade)", 
    desc: "Accredited by the NAAC Executive Committee with a CGPA of 2.55 on September 12, 2017." 
  },
  { 
    icon: BookOpen, 
    title: "Thiruvalluvar University Affiliated", 
    desc: "Offering comprehensive UG, PG, M.Phil., and Ph.D. research programmes under state university guidelines." 
  },
  { 
    icon: ShieldCheck, 
    title: "National Defence Contribution", 
    desc: "Proudly educating children of defence personnel, with many alumni serving in the Army, CRPF, BSF, and TBSF." 
  },
  { 
    icon: Globe2, 
    title: "Tri-State Convergence", 
    desc: "Geographically situated where Tamil Nadu, Andhra Pradesh, and Karnataka meet, fostering tri-lingual harmony." 
  },
];

function AboutPage() {
  return (
    <>
      {/* Hero Section with Corrected Legacy Date (1964) */}
      <PageHero
        eyebrow="A Brief History"
        title="Six Decades of Academic Excellence."
        subtitle={`Established in 1964, Government Thirumagal Mills College (GTMC), Gudiyattam stands as the first higher education institution started in the post-independence era within the united North Arcot District.`}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionHeader
              eyebrow="Our Origins"
              title="A long-cherished dream born from philanthropy."
              desc="To cater to the educational needs of learners from the most socio-economically backward sections of society, Mr. A. Shanmuga Mudaliar donated Rs. 5,00,000 as seed capital to establish a Government Arts and Science College in Gudiyattam. Accompanied by the indomitable spirit of local philanthropists, the college temporarily functioned on the Rajagopal Polytechnic campus from 1964 to 1968."
            />
            
            <p className="text-muted-foreground leading-relaxed mt-4">
              By the end of 1969, the donor allotted 47 acres of land, and the college moved to its permanent campus where it now stands in full grandeur. Located near the borders of Tamil Nadu, Andhra Pradesh, and Karnataka, it serves as a safe haven of interstate unity for students from diverse vernacular backgrounds.
            </p>
          </Reveal>

          {/* Institutional Pillars Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full hover:shadow-elegant transition-shadow">
                  <div className="size-11 rounded-xl bg-gold/15 text-gold-deep grid place-items-center mb-4">
                    <p.icon className="size-5" />
                  </div>
                  <div className="font-bold text-primary">{p.title}</div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Historical Milestones & Expansion Section */}
      <Section className="border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary mb-6">Evolution and Academic Expansion</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                The institution initially launched with the foundational departments of <strong>Economics</strong> and <strong>Mathematics</strong>. Growth quickly accelerated as Physics and Botany were introduced in 1969, followed steadily by Chemistry, Commerce, Computer Science, English, Tamil, History, BBA, and Zoology. To make education fully accessible, a shift system was officially implemented starting in the 2012–2013 academic term.
              </p>
              <p>
                The college reached a landmark pinnacle when it was upgraded to a <strong>Grade I College</strong> in the 2013–2014 academic year, followed closely by its celebrated <strong>Golden Jubilee Anniversary</strong> in 2014–15.
              </p>
              <p>
                In 2012–2013, Mathematics and Computer Science were elevated to postgraduate and research departments. Academic scope expanded dramatically in 2018 with the addition of Post-Graduate courses in History alongside comprehensive M.Phil. and Ph.D. research capabilities spanning Tamil, English, Commerce, Economics, Botany, Chemistry, and Physics.
              </p>
              <p>
                GTMC is also widely recognized for its exemplary faculty caliber. Multiple professors have been historically chosen and promoted to prestigious leadership roles throughout Tamil Nadu, serving as Regional Joint Directors and being appointed as conferred <strong>I.A.S. officers</strong>.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Core Counters & Statistics */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-extrabold text-gold">
                {s.value.toLocaleString()}
                {s.suffix}
              </div>
              <div className="text-sm text-white/70 mt-2 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
