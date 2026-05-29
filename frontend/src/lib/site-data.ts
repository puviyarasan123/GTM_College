export const SITE = {
  name: "GOVT. THIRUMAGAL MILLS COLLEGE",
  short: "GTMC",
  tagline: "Empowering Minds, Shaping Futures",
  estd: 1974,
  phone: "04171-220162",
  email: "principal@gtmc.edu.in",
  address: "Gudiyattam, Vellore District, Tamil Nadu – 632 602",
};

export const NAV: { label: string; to: string; children?: { label: string; to: string; desc?: string }[] }[] = [
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About Us", to: "/about", desc: "Our story, legacy & accreditations" },
      { label: "Principal's Message", to: "/principal-message", desc: "Leadership perspective" },
      { label: "Vision & Mission", to: "/vision-mission", desc: "What drives us forward" },
    ],
  },
  {
    label: "Academics",
    to: "/courses",
    children: [
      { label: "Courses Offered", to: "/courses", desc: "UG & PG programmes" },
      { label: "Departments", to: "/departments", desc: "Science, Arts, Commerce & Management" },
      { label: "Faculty", to: "/faculty", desc: "Experienced & qualified professors" },
      { label: "Library", to: "/library", desc: "Digital + physical knowledge hub" },
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
    label: "Campus",
    to: "/infrastructure",
    children: [
      { label: "Infrastructure", to: "/infrastructure", desc: "Labs, classrooms & facilities" },
      { label: "Hostel", to: "/hostel", desc: "Residential facilities" },
      { label: "Transport", to: "/transport", desc: "Bus routes across Gudiyattam" },
      { label: "Gallery", to: "/gallery", desc: "Campus moments" },
    ],
  },
  {
    label: "News",
    to: "/news",
    children: [
      { label: "News & Announcements", to: "/news", desc: "Latest updates" },
      { label: "Events", to: "/events", desc: "Symposiums, fests & competitions" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export const TICKER = [
  "Admissions open 2025–26 — apply now for UG & PG programmes",
  "Govt. Thirumagal Mills College, Gudiyattam — Est. 1974",
  "Affiliated to Thiruvalluvar University, Vellore",
  "NAAC Accredited institution with quality education",
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
  { date: "Apr 02, 2025", category: "Awards", title: "NAAC Accreditation status maintained", excerpt: "Institution continues to maintain NAAC accreditation, reflecting commitment to quality education." },
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
