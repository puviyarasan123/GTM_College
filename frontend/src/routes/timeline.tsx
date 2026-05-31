import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { motion } from "framer-motion";
import { 
  Milestone, BookOpen, Building, Award, Users, 
  GraduationCap, Trophy, Shield, HeartPulse 
} from "lucide-react";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: `Historical Timeline — ${SITE.name}` },
      { name: "description", content: `Explore the historical growth and major milestones of ${SITE.name}, Gudiyattam from 1964 to present.` },
    ],
  }),
  component: TimelinePage,
});

// Icon selector based on the content category
const getTimelineIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("gold medal") || t.includes("medal") || t.includes("trophy") || t.includes("championship")) return Trophy;
  if (t.includes("started") || t.includes("introduced") || t.includes("program") || t.includes("course") || t.includes("post graduation")) return GraduationCap;
  if (t.includes("building") || t.includes("block") || t.includes("wall") || t.includes("infrastructure")) return Building;
  if (t.includes("naac") || t.includes("accredited") || t.includes("award") || t.includes("grade")) return Award;
  if (t.includes("co-educational") || t.includes("hostel") || t.includes("public")) return Users;
  if (t.includes("ncc") || t.includes("army")) return Shield;
  if (t.includes("blood")) return HeartPulse;
  return Milestone;
};

const timelineData = [
  { year: "1964", title: "Inception", desc: "Permission granted by the Government to start an Arts and Science College in Gudiyattam Taluk. Initially started at Rajagopal Polytechnic as a men's college." },
  { year: "1966", title: "Vernacular Medium", desc: "Due to popular public demand, Tamil as a medium of instruction was introduced in Degree courses." },
  { year: "1968", title: "Permanent Campus", desc: "The college acquired a defined status and started functioning in its own permanent building." },
  { year: "1969", title: "Academic Expansion & Minorities Support", desc: "Conceded the request of Urdu-speaking minorities to introduce Urdu as a Part II paper. Degree programmes in Physics and Botany were launched." },
  { year: "1972", title: "Residential Facilities", desc: "A new boy's hostel was added for the benefit of students travelling from remote rural villages." },
  { year: "1975", title: "Transition to Co-Education", desc: "To provide scope for girl students to pursue higher education, the college transitioned into a Co-Educational institution." },
  { year: "1980", title: "Chemistry Department Launch", desc: "Introduced Chemistry as a major degree programme to meet structural demands from local small-scale industrial sectors; an instant hit among students." },
  { year: "1982", title: "Postgraduate Status", desc: "Achieved postgraduate institution status with the introduction of Mathematics at the M.Sc. level." },
  { year: "1990", title: "Silver Jubilee", desc: "The institution proudly commemorated its 25th Silver Jubilee milestone celebration." },
  { year: "1999", title: "MCA Block Inauguration", desc: "A state-of-the-art MCA Block was added to the infrastructure, dedicated by the Higher Education Minister." },
  { year: "2000", title: "Fitness Infrastructure", desc: "Inaugurated a multi-gym facility to cultivate students' deep interests in the sport of power-lifting." },
  { year: "2002", title: "University Gold Medal", desc: "Miss. S. Sasi (U.G. Chemistry) secured a prestigious Gold Medal from the University of Madras." },
  { year: "2002", title: "Governor's Excellence Award", desc: "Received an official award from His Excellency, the Governor of Tamil Nadu, for donating the maximum units of blood in a single year." },
  { year: "2003", title: "NCC Milestone", desc: "NCC Cadet Mr. S. Manjunathan represented the state of Tamil Nadu in the high-profile Himalayan Trekking Event." },
  { year: "2003", title: "University Re-Affiliation", desc: "Shifted affiliation from the historic University of Madras to the newly established Thiruvalluvar University, Vellore." },
  { year: "2004", title: "Digital Sciences Transition", desc: "Launched the MCA programme as a Self-Financing course to accommodate rising student demands for technical computing fields." },
  { year: "2005", title: "Commerce Stream Addition", desc: "Introduced the Bachelor of Commerce (B.Com) program under the self-financing framework." },
  { year: "2005", title: "First NAAC Assessment", desc: "Accredited for the first time by NAAC, securing an institutional B+ Status ranking." },
  { year: "2006", title: "Course Regularization", desc: "Both MCA and B.Com self-financing streams were successfully converted into fully regular, government-aided courses." },
  { year: "2007", title: "Shift System Implementation", desc: "The institution split schedules into Shift I and Shift II to double student capacity and accommodate increased enrollment applications." },
  { year: "2008", title: "Alumni-Funded Commerce Block", desc: "A two-story Commerce Block was erected using MP-constituent funds, graciously sanctioned by distinguished alumnus and Rajya Sabha MP, Mr. D. Raja." },
  { year: "2009", title: "Thiruvalluvar University Gold Medal", desc: "Miss. G. Ranjani brought laurels to the Chemistry Department by winning the Thiruvalluvar University Gold Medal." },
  { year: "2012", title: "Massive Program Expansion", desc: "Introduced regular degree tracks in English, Tamil, and Computer Science, alongside master's programs in Chemistry, Botany, and Commerce (M.Com)." },
  { year: "2013", title: "Research Department Recognition", desc: "The Departments of Mathematics and Computer Science & Applications were officially recognized as PhD research centers by the University." },
  { year: "2013", title: "New Academic Horizons", desc: "Introduced new degree courses in Zoology, BCA, and History, plus PG options in Computer Science, Tamil, and English." },
  { year: "2014", title: "Upgraded to Grade-I College", desc: "The Higher Education Department of Tamil Nadu officially promoted the institution to a Grade-I status college based on program diversity and peak enrollment statistics." },
  { year: "2014", title: "Mathematics Block Construction", desc: "Erected a two-story Mathematics Block, funded for the second time by generous contributions from Rajya Sabha MP and alumnus, Mr. D. Raja." },
  { year: "2014", title: "Botany Gold Medal", desc: "Miss. J. Kalaimathi achieved a university-wide Gold Medal in Botany under Thiruvalluvar University." },
  { year: "2015", title: "Golden Jubilee Milestone", desc: "Commemorated 50 grand years of educational service with Golden Jubilee anniversary celebrations." },
  { year: "2017", title: "National Sports Glory", desc: "Mr. R.K. Dhaneshwaran (BCA) claimed the Bronze Medal in the grueling All India Inter-University Power Lifting Championship." },
  { year: "2017", title: "NAAC Re-Accreditation", desc: "Successfully maintained a strong B+ Grade with a calculated CGPA score of 2.55 during the peer committee review visit." },
  { year: "2018", title: "Research & PG Advancements", desc: "Introduced M.A. History along with comprehensive M.Phil. & Ph.D. research programs in Tamil, English, Commerce, Economics, Botany, Chemistry, and Physics." },
  { year: "2019", title: "M.G.R Centenary Block", desc: "Constructed a massive two-story M.G.R Centenary Block valued at ₹2 Crore, backed by RUSA infrastructure development budgets." },
  { year: "2020", title: "National Para Athletics Triumphs", desc: "Miss. S. Ramya (Commerce) won 1 Gold and 2 Silver Medals at the highly competitive National Para Athletic Championship." },
  { year: "2020", title: "Campus Boundary Security", desc: "Erected a comprehensive modern compound wall wrapper worth ₹2.0 Crores through dedicated State Government capital funds." },
  { year: "2021", title: "RUSA 2.0 Infrastructure Expansion", desc: "Constructed a new History Block with 5 lecture halls and a modern Computer Science block valued at ₹1.0 Crore under the RUSA 2.0 scheme." }
].reverse(); // Shows newest history items at the top

function TimelinePage() {
  return (
    <>
      <PageHero
        eyebrow="Milestones"
        title="The Journey of GTMC"
        subtitle="Trace the history, achievements, and structural growth of Government Thirumagal Mills College from its humble beginnings in 1964 to a Grade-I research institution."
      />

      <Section className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          
          {/* Centered Timeline Axis Line (Hidden on tiny mobile viewports) */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-border -translate-x-1/2 hidden sm:block" />
          
          {/* Side Mobile Timeline Line */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-border sm:hidden" />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const IconComponent = getTimelineIcon(item.title + " " + item.desc);
              const isEven = idx % 2 === 0;

              return (
                <div key={item.year + idx} className={`flex flex-col sm:flex-row relative items-start ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                  
                  {/* Space filler for layout mapping symmetry */}
                  <div className="w-full sm:w-1/2" />

                  {/* Central Node Tracker Pin */}
                  <div className="absolute left-6 sm:left-1/2 top-1.5 size-9 rounded-full bg-primary border-4 border-background text-gold grid place-items-center -translate-x-1/2 z-10 shadow-sm">
                    <IconComponent className="size-4" />
                  </div>

                  {/* Context Timeline Content Block */}
                  <div className="w-full sm:w-1/2 pl-16 sm:pl-0 sm:px-8">
                    <Reveal delay={0.05}>
                      <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-elegant transition-all duration-300 relative group">
                        
                        {/* Dynamic Decorative Year Tab */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold-deep text-xs font-bold tracking-wider mb-3">
                          {item.year}
                        </div>

                        <h3 className="text-xl font-bold text-primary group-hover:text-gold-deep transition-colors duration-200">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}