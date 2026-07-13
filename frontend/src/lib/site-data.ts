export const SITE = {
  name: "GOVT. THIRUMAGAL MILLS COLLEGE",
  short: "GTMC",
  tagline: "Empowering Minds, Shaping Futures",
  estd: 1964,
  phone: "04171-220162",
  email: "principal@gtmc.edu.in",
  address: "Gudiyattam, Vellore District, Tamil Nadu – 632 602",
};

export const NAV: { label: string; to: string; children?: { label: string; to: string; desc?: string; isExternal?: boolean }[] }[] = [
  {
    label: "Home",
    to: "/",
    children: [
      { label: "About Us", to: "/about", desc: "Our story, legacy & accreditations" },
      { label: "College Timeline", to: "/timeline", desc: "Year-by-year historical growth" },
      { label: "Principal's Message", to: "/principal-message", desc: "Leadership perspective" },
      { label: "Vision & Mission", to: "/vision-mission", desc: "What drives us forward" },
    ],
  },
  {
    label: "Academics",
    to: "/calender",
    children: [
      { label: "Academic Calendar", to: "/calender", desc: "Official session timelines" },
      { label: "Departments", to: "/departments", desc: "Science, Arts, Commerce & Management" },
      { label: "Faculty", to: "/faculty", desc: "Experienced & qualified professors" },
      { label: "Library", to: "/library", desc: "Digital + physical knowledge hub" },
    ],
  },
  {
    label: "Courses",
    to: "/courses/ug",
    children: [
      { label: "UG Courses", to: "/courses/ug", desc: "Undergraduate degree programmes" },
      { label: "PG Courses", to: "/courses/pg", desc: "Postgraduate degree tracks" },
      { label: "Research Courses", to: "/courses/research", desc: "Ph.D. & M.Phil. specializations" },
      { 
        label: "Syllabus", 
        to: "https://www.tvu.edu.in/academic/syllabus/", 
        desc: "University regulations & curriculum",
        isExternal: true 
      },
      { label: "E-Materials", to: "/courses/e-materials", desc: "Digital study notes & online resources" },
    ],
  },
  {
    label: "Administration",
    to: "/governing-council",
    children: [
      { label: "Governing Council", to: "/governing-council", desc: "Core decision-making & developmental body" },
      { label: "Heads of Departments", to: "/hod", desc: "Academic leaders managing department directives" },
      { label: "College Office", to: "/office", desc: "Administrative, non-teaching, and financial desk" },
      // You can easily drop hidden routes like /principal-message here later!
    ],
  },
  {
    label: "Admissions",
    to: "/admission",
    children: [
      { label: "Admission Process", to: "/admission", desc: "Apply for 2025–26 session" },
      { label: "Placement", to: "/placement", desc: "Placement cell & career support" },
    ],
  },
  {
    label: "Departments",
    to: "/departments/tamil", // Defaults to dynamic home entry link
    children: [
      { label: "Tamil", to: "/departments/tamil", desc: "Department of Tamil" },
      { label: "English", to: "/departments/english", desc: "Department of English" },
      { label: "Economics", to: "/departments/economics", desc: "Department of Economics" },
      { label: "History", to: "/departments/history", desc: "Department of History" },
      { label: "Commerce", to: "/departments/commerce", desc: "Department of Commerce" },
      { label: "Business Administration", to: "/departments/business-administration", desc: "Department of Business Administration" },
      { label: "Mathematics", to: "/departments/mathematics", desc: "Department of Mathematics" },
      { label: "Computer Applications", to: "/departments/computer-applications", desc: "Department of Computer Applications (BCA)" },
      { label: "Computer Science", to: "/departments/computer-science", desc: "Department of Computer Science" },
      { label: "Physics", to: "/departments/physics", desc: "Department of Physics" },
      { label: "Chemistry", to: "/departments/chemistry", desc: "Department of Chemistry" },
      { label: "Botany", to: "/departments/botany", desc: "Department of Botany" },
      { label: "Zoology", to: "/departments/zoology", desc: "Department of Zoology" },
    ],
  },
  {
    label: "Campus",
    to: "/infrastructure",
    children: [
      { label: "Infrastructure", to: "/infrastructure", desc: "Labs, classrooms & facilities" },
      { label: "Hostel", to: "/hostel", desc: "Residential facilities" },
      { label: "Transport", to: "/transport", desc: "Bus routes across Gudiyattam" },
      { label: "Rules & Regulations", to: "/rules", desc: "Attendance frameworks and campus code of conduct" },
      { label: "Scholarships", to: "/scholarships", desc: "Government financial aid and welfare schemes" },
      { label: "Gallery", to: "/gallery", desc: "Campus moments" },
    ],
  },

  {
    label: "IQAC",
    to: "/iqac/team",
    children: [
      { 
        label: "IQAC Team", 
        to: "/iqac/team", 
        desc: "Committee members, external experts, and structure" 
      },
      { 
        label: "IQAC Activities", 
        to: "/iqac/activities", // Formatted to match your dynamic router param
        desc: "Quality initiatives, seminars, and event reports"
      },
      { 
        label: "Best practices", 
        to: "/iqac/best-practices", 
        desc: "Institutional benchmarks and core core-value models"
      },
      { 
        label: "Institutional Distinctiveness", 
        to: "/iqac/institutional-distinctiveness", 
        desc: "Our unique educational vision and priority areas"
      },
      { 
        label: "Program Outcomes", 
        to: "/iqac/program-outcomes", 
        desc: "Expected graduate attributes and course objectives"
      },
      { 
        label: "SSS Report 2021-22", 
        to: "/iqac/sss-report", 
        desc: "Student Satisfaction Survey analysis metrics"
      },
      { 
        label: "NIRF Information 2022", 
        to: "/iqac/nirf-2022", 
        desc: "National Institutional Ranking Framework data analytics" 
      },
      { 
        label: "AICTE EOA 2021-22", 
        to: "/iqac/aicte-eoa", 
        desc: "Extension of Approval status documentation"
      },
      { 
        label: "Minutes of meetings", 
        to: "/iqac/minutes", 
        desc: "Statutory cell reviews and resolution summaries"
      },
      { 
        label: "Future plan", 
        to: "/iqac/future-plan", 
        desc: "Strategic developmental pathways and milestones"
      },
      { 
        label: "RTI PDF", 
        to: "/iqac/rti-pdf", 
        desc: "Right to Information basic framework logs"
      },
      { 
        label: "RTI Act-2005_new", 
        to: "/iqac/rti-act-new", 
        desc: "Statutory governance and transparency declarations"
      },
    ],
  },
  {
  label: "NIRF",
  to: "/nirf/nirf-college-2025", // Updated default landing parameter to the first active child
  children: [
    { 
      label: "NIRF - COLLEGE 2025", 
      to: "/nirf/nirf-college-2025", 
      desc: "NIRF Data Submission for College 2025" 
    },
    { 
      label: "NIRF - OVERALL 2024", 
      to: "/nirf/nirf-overall-2024", 
      desc: "NIRF Overall Category Ranking 2024" 
    },
    { 
      label: "NIRF - COLLEGE 2024", 
      to: "/nirf/nirf-college-2024", 
      desc: "NIRF Data Submission for College 2024" 
    },
    { 
      label: "NIRF - COLLEGE 2023", 
      to: "/nirf/nirf-college-2023", 
      desc: "NIRF Data Submission for College 2023" 
    },
    { 
      label: "NIRF - OVERALL 2023", 
      to: "/nirf/nirf-overall-2023", 
      desc: "NIRF Overall Category Ranking 2023" 
    },
  ],
},

{
  label: "AQAR",
  to: "/aqar/aqar-2020-21", // Default landing parameter pointing to the most recent report
  children: [
    { 
      label: "AQAR 2017-18", 
      to: "/aqar/aqar-2017-18", 
      desc: "Annual Quality Assurance Report for Academic Year 2017-18" 
    },
    { 
      label: "AQAR 2018-19", 
      to: "/aqar/aqar-2018-19", 
      desc: "Annual Quality Assurance Report for Academic Year 2018-19" 
    },
    { 
      label: "AQAR 2019-20", 
      to: "/aqar/aqar-2019-20", 
      desc: "Annual Quality Assurance Report for Academic Year 2019-20" 
    },
    { 
      label: "AQAR 2020-21", 
      to: "/aqar/aqar-2020-21", 
      desc: "Annual Quality Assurance Report for Academic Year 2020-21" 
    },
  ],
},
{
  label: "Activities",
  to: "/activities/clp", // Default landing page
  children: [
    { label: "CLP", to: "/activities/clp", desc: "Computer Literacy Programme initiatives" },
    { label: "NCC", to: "/activities/ncc", desc: "National Cadet Corps updates and honors" },
    { label: "NSS", to: "/activities/nss", desc: "National Service Scheme community camps" },
    { label: "YRC", to: "/activities/yrc", desc: "Youth Red Cross humanitarian programs" },
    { label: "SPORTS", to: "/activities/sports", desc: "Athletic achievements and tournament grids" },
    { label: "Extension Activities", to: "/activities/extension", desc: "Institutional outreach frameworks" },
    { label: "SC/ST-Welfare Cell", to: "/activities/sc-st-welfare", desc: "Welfare community support tracking" },
    { 
      label: "College Committees", 
      to: "/activities/college-committees", 
      desc: "Statutory governance board and committee PDFs" // This will catch the placeholder card
    },
    { label: "WOMEN'S Cell", to: "/activities/womens-cell", desc: "Empowerment and gender parity logs" },
    { label: "Placement Cell", to: "/activities/placement", desc: "Campus recruitment records and statistics" },
    { label: "Anti-Ragging & Eveteasing", to: "/activities/anti-ragging", desc: "Campus safety statutory policies" },
    { label: "Student Grievance Cell", to: "/activities/grievance", desc: "Redressal mechanism protocols" },
    { label: "Students Counseling Cell", to: "/activities/counseling", desc: "Mental health and academic mentorship" },
  ],
},
{
  label: "Compliance",
  to: "/compliance/nirf",
  children: [
    { 
      label: "12B & 2F", 
      to: "/compliance/12b-2f", 
      desc: "UGC statutory recognition certificates under sections 2(f) and 12(B)"
    },
    { 
      label: "NAAC B+ Certificate", 
      to: "/compliance/naac-certificate", 
      desc: "Official institutional accreditation certificate and peer team metric scores"
    },
    { 
      label: "NIRF", 
      to: "/compliance/nirf", 
      desc: "National Institutional Ranking Framework data sheets and parameter data tables" 
    },
    { 
      label: "AICTE", 
      to: "/compliance/aicte", 
      desc: "All India Council for Technical Education regulatory extension of approval letters"
    },
    { 
      label: "Files required for SSR", 
      to: "/compliance/ssr-files", 
      desc: "Core quantitative and qualitative descriptive assets compiled for Self-Study Report submission" 
    },
    { 
      label: "Certificates of Recognition", 
      to: "/compliance/recognition-certificates", 
      desc: "University affiliation notifications and state board statutory recognition documents"
    },
  ],
},

{
  label: "Reports",
  to: "/reports/ncc-report-1", // Default landing item
  children: [
    { label: "NCC Report-1", to: "/reports/ncc-report-1", desc: "National Cadet Corps annual workflow and parade reports (Part 1)" },
    { label: "NCC Report-2", to: "/reports/ncc-report-2", desc: "National Cadet Corps annual workflow and parade reports (Part 2)" },
    { label: "NCC Report-3", to: "/reports/ncc-report-3", desc: "National Cadet Corps honors, institutional camps, and cadet metrics" },
    { label: "NCC Report-4", to: "/reports/ncc-report-4", desc: "National Cadet Corps community extension drives and achievements" },
    { label: "NSS Report", to: "/reports/nss-report", desc: "National Service Scheme community service and special camp logs" },
    { label: "IQAC Report-1", to: "/reports/iqac-report-1", desc: "Internal Quality Assurance Cell audit portfolios (Cycle 1)" },
    { label: "IQAC Report-2", to: "/reports/iqac-report-2", desc: "Internal Quality Assurance Cell audit portfolios (Cycle 2)" },
    { label: "IQAC Report-3", to: "/reports/iqac-report-3", desc: "Internal Quality Assurance Cell parameter reviews and action summaries" },
    { label: "IQAC Report-4", to: "/reports/iqac-report-4", desc: "Internal Quality Assurance Cell stakeholder feedback evaluation" },
    { label: "placement Report1", to: "/reports/placement-report-1", desc: "Campus recruitment statistics, corporate ties, and placement shares" },
    { label: "placement Report2", to: "/reports/placement-report-2", desc: "Departmental breakdown of student corporate onboarding records" },
    { label: "placement Report3", to: "/reports/placement-report-3", desc: "Skill enhancement training schedules and career counseling metrics" },
    { label: "RRC reports", to: "/reports/rrc-reports", desc: "Red Ribbon Club awareness camps and blood donation drive registries" },
    { label: "Sports Report1", to: "/reports/sports-report-1", desc: "Athletic achievements, tournament grids, and inter-collegiate logs" },
    { label: "Sports Report2", to: "/reports/sports-report-2", desc: "Intramural sports meets, event schedules, and medal tallies" },
    { label: "Sports Report3", to: "/reports/sports-report-3", desc: "Zonal tournament hosting records and institutional accolades" },
    { label: "Sports Report4", to: "/reports/sports-report-4", desc: "Infrastructural allocations and physical education updates" },
    { label: "Sports Report5", to: "/reports/sports-report-5", desc: "Annual sports day consolidated ledger and outstanding athlete tracking" },
    { label: "YRC report", to: "/reports/yrc-report", desc: "Youth Red Cross humanitarian programs, medical camps, and first-aid drills" },
  ],
},
  { label: "News", to: "/news", children: [
      { label: "News & Announcements", to: "/news", desc: "Latest updates" },
      { label: "Events", to: "/events", desc: "Symposiums, fests & competitions" },
    ],
  },
  { label: "Alumni", to: "/alumni" },
  { label: "Contact", to: "/contact" },
];

export const TICKER = [
  "Admissions open 2025–26 — apply now for UG & PG programmes",
  "Govt. Thirumagal Mills College, Gudiyattam — Est. 1964",
  "Affiliated to Thiruvalluvar University, Vellore",
  "Affiliated to Thiruvalluvar University — UGC Recognised institution",
  "Contact us: 04171-220162 | principal@gtmc.edu.in",
];

export const STATS = [
  { value: 50, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "+", label: "Qualified Faculty" },
  { value: 3000, suffix: "+", label: "Active Students" },
  { value: 20, suffix: "+", label: "Programmes Offered" },
];

export const DEPARTMENTS = [
  { code: "B.Sc", name: "Mathematics", desc: "Pure & applied mathematics, statistics and computational methods.", icon: "Calculator" },
  { code: "B.Sc", name: "Physics", desc: "Classical mechanics, optics, electronics & applied physics.", icon: "Atom" },
  { code: "B.Sc", name: "Chemistry", desc: "Organic, inorganic, analytical & industrial chemistry.", icon: "FlaskConical" },
  { code: "B.Sc", name: "Computer Science", desc: "Programming, data structures, software development & algorithms.", icon: "Cpu" },
  { code: "B.Sc", name: "Information Technology", desc: "Networking, web technologies, database management & IT systems.", icon: "Monitor" },
  { code: "B.Sc", name: "Zoology", desc: "Animal biology, ecology, genetics & environmental science.", icon: "Dna" },
  { code: "B.Sc", name: "Botany", desc: "Plant biology, ecology, plant physiology & biotechnology.", icon: "Leaf" },
  { code: "B.A", name: "Tamil", desc: "Classical & modern Tamil literature, linguistics and culture.", icon: "Languages" },
  { code: "B.A", name: "English", desc: "English literature, linguistics & communication skills.", icon: "BookOpen" },
  { code: "B.Com", name: "Commerce", desc: "Accounting, finance, taxation, auditing & business law.", icon: "TrendingUp" },
  { code: "BBA", name: "Business Administration", desc: "Management, marketing, HR, entrepreneurship & business strategy.", icon: "Briefcase" },
  { code: "BCA", name: "Computer Applications", desc: "Software development, web design, programming & IT applications.", icon: "Laptop" },
];

export const COURSES = [
  {
    level: "Undergraduate",
    title: "B.Sc. Mathematics",
    branches: ["Pure Mathematics", "Statistics", "Computer Applications"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Sc. Physics",
    branches: ["Core Physics", "Electronics", "Computer Applications"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Sc. Chemistry",
    branches: ["Core Chemistry", "Industrial Chemistry"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Sc. Computer Science",
    branches: ["Core CS", "Data Science", "Cyber Security"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Sc. Information Technology",
    branches: ["Core IT", "Networking", "Cloud Computing"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Sc. Zoology",
    branches: ["Core Zoology", "Environmental Science"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Sc. Botany",
    branches: ["Core Botany", "Plant Biotechnology"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.A. Tamil",
    branches: ["Tamil Literature", "Tamil Linguistics"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.A. English",
    branches: ["English Literature", "English Communication"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "B.Com.",
    branches: ["General", "Computer Applications", "Professional Accounting"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "BBA",
    branches: ["General Management", "Finance", "Marketing", "Human Resources"],
    duration: "3 Years",
    seats: "60",
  },
  {
    level: "Undergraduate",
    title: "BCA",
    branches: ["General", "Data Science", "Cloud Computing"],
    duration: "3 Years",
    seats: "60",
  },
];

export const RECRUITERS = [
  "TCS", "Infosys", "Wipro", "Cognizant", "HCL",
  "Tech Mahindra", "Zoho", "Freshworks", "Capgemini",
  "ICICI Bank", "HDFC Bank", "Axis Bank", "Deloitte", "IBM",
];

export const PLACEMENT_HIGHLIGHTS = [
  { value: "₹8 LPA", label: "Highest Package" },
  { value: "₹3.5 LPA", label: "Average Package" },
  { value: "85%", label: "Placement Rate" },
  { value: "100+", label: "Companies Visited" },
];

export const FACULTY = [
  { name: "Dr. J. Ebanasar", role: "Principal", qual: "M.Sc., Ph.D.", focus: "Academic Leadership & Administration", dept: "Administration" },
  { name: "Dr. R. Senthilkumar", role: "HoD, Computer Science", qual: "Ph.D., Thiruvalluvar University", focus: "Data Structures & Software Engineering", dept: "Computer Science" },
  { name: "Dr. P. Kavitha", role: "HoD, Mathematics", qual: "Ph.D., Thiruvalluvar University", focus: "Applied Mathematics & Statistics", dept: "Mathematics" },
  { name: "Dr. S. Murugan", role: "HoD, Physics", qual: "Ph.D., Thiruvalluvar University", focus: "Electronics & Applied Physics", dept: "Physics" },
  { name: "Dr. M. Selvi", role: "HoD, Chemistry", qual: "Ph.D., Thiruvalluvar University", focus: "Organic & Industrial Chemistry", dept: "Chemistry" },
  { name: "Dr. T. Rajkumar", role: "HoD, Commerce", qual: "Ph.D., Thiruvalluvar University", focus: "Financial Accounting & Taxation", dept: "Commerce" },
  { name: "Dr. N. Anitha", role: "HoD, Tamil", qual: "Ph.D., Thiruvalluvar University", focus: "Classical Tamil Literature", dept: "Tamil" },
  { name: "Dr. S. Priya", role: "HoD, English", qual: "Ph.D., Thiruvalluvar University", focus: "English Literature & Communication", dept: "English" },
];

export const NEWS = [
  { date: "May 18, 2025", category: "Admissions", title: "UG 2025–26 application window opens for all programmes", excerpt: "Online applications are now live for all UG programmes. Merit scholarships available for eligible students." },
  { date: "May 10, 2025", category: "Research", title: "GTMC faculty publishes research in national journals", excerpt: "Faculty members from Science departments publish research papers in peer-reviewed national publications." },
  { date: "Apr 28, 2025", category: "Placements", title: "TCS & Infosys recruit students from CS & IT departments", excerpt: "Annual campus recruitment drive concludes with excellent results across Computer Science and IT departments." },
  { date: "Apr 14, 2025", category: "Events", title: "Annual Science Symposium 2025 — Inter-collegiate event", excerpt: "Two-day event hosted students from 30+ colleges with project displays, paper presentations and competitions." },
  { date: "Apr 02, 2025", category: "Awards", title: "UGC Recognition status maintained", excerpt: "Institution continues to maintain UGC recognition, reflecting commitment to quality education." },
];

export const EVENTS = [
  { date: { d: "14", m: "SEP" }, title: "Annual Science Symposium 2025", venue: "Main Auditorium", time: "09:00 – 17:00" },
  { date: { d: "22", m: "SEP" }, title: "Career Guidance Workshop", venue: "Seminar Hall", time: "10:00 – 13:00" },
  { date: { d: "05", m: "OCT" }, title: "Inter-Collegiate Quiz Competition", venue: "Computer Lab", time: "All Day" },
  { date: { d: "18", m: "OCT" }, title: "Cultural Fest — Thirumagal 2025", venue: "Open Air Theatre", time: "17:00 onwards" },
];

export const TESTIMONIALS = [
  { name: "Priya S.", batch: "B.Sc. Computer Science, 2023", company: "Software Developer, TCS", quote: "GTMC gave me a strong foundation in programming and the placement cell helped me land my first job at TCS." },
  { name: "Arun K.", batch: "B.Com., 2022", company: "Accountant, HDFC Bank", quote: "The commerce department's practical approach to accounting and finance prepared me well for the banking sector." },
  { name: "Divya R.", batch: "BBA, 2023", company: "HR Executive, Infosys", quote: "The management programme and the supportive faculty helped me build confidence and communication skills." },
  { name: "Karthik M.", batch: "BCA, 2021", company: "Software Engineer, Zoho", quote: "The BCA programme at GTMC gave me solid technical knowledge and the campus placements were excellent." },
];

export const FACILITIES = [
  { title: "Central Library", desc: "Extensive collection of books, journals, digital resources and spacious reading halls.", icon: "BookOpen" },
  { title: "Computer Labs", desc: "Well-equipped computer laboratories with high-speed internet and latest software.", icon: "Monitor" },
  { title: "Science Labs", desc: "Modern laboratories for Physics, Chemistry, Zoology and Botany practicals.", icon: "FlaskConical" },
  { title: "Hostel Facilities", desc: "Separate hostels for boys and girls with mess, recreation and 24/7 security.", icon: "Hotel" },
  { title: "Sports Complex", desc: "Indoor & outdoor courts, gym, athletic track and sports equipment.", icon: "Dumbbell" },
  { title: "Auditorium", desc: "Spacious auditorium with modern AV systems for events, seminars and cultural programmes.", icon: "Theater" },
];

export const PRINCIPAL = {
  name: "Dr. J. Ebanasar",
  title: "Principal",
  qual: "M.Sc., Ph.D.",
  image: "/principal.jpeg" as string | null,
};
