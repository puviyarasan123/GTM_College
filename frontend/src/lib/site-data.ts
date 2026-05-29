export const SITE = {
  name: "GTM COLLEGE OF ARTS & SCIENCE",
  short: "GTM",
  tagline: "Empowering Minds, Shaping Futures",
  estd: 1994,
  phone: "+91 422 2539 500",
  email: "admissions@gtmc.edu.in",
  address: "Saravanampatti, Coimbatore, Tamil Nadu 641035",
};

export const NAV: { label: string; to: string; children?: { label: string; to: string; desc?: string }[] }[] = [
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About Us", to: "/about", desc: "Our story, legacy & accreditations" },
      { label: "Chairman's Message", to: "/chairman-message", desc: "From the chairman's desk" },
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
      { label: "Placement", to: "/placement", desc: "92% placement record" },
    ],
  },
  {
    label: "Campus",
    to: "/infrastructure",
    children: [
      { label: "Infrastructure", to: "/infrastructure", desc: "Modern labs & smart classrooms" },
      { label: "Hostel", to: "/hostel", desc: "Comfortable residential facilities" },
      { label: "Transport", to: "/transport", desc: "Bus routes across Coimbatore" },
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
  "Admissions open 2025–26 — applications close Aug 30",
  "NAAC 'A' Grade accreditation with 3.2 CGPA",
  "₹50 Lakh in merit scholarships for deserving students",
  "Annual Science Symposium — Sept 14 to 16, register now",
  "Placements 2024: 92% placement rate, highest package ₹12 LPA",
];

export const STATS = [
  { value: 8000, suffix: "+", label: "Active Students" },
  { value: 180, suffix: "+", label: "Qualified Faculty" },
  { value: 92, suffix: "%", label: "Placement Rate" },
  { value: 180, suffix: "+", label: "Recruiting Partners" },
];

export const DEPARTMENTS = [
  { code: "PHY", name: "Physics", desc: "Quantum mechanics, astrophysics & applied physics.", icon: "Atom" },
  { code: "CHEM", name: "Chemistry", desc: "Organic, inorganic, analytical & pharmaceutical chemistry.", icon: "FlaskConical" },
  { code: "MATH", name: "Mathematics", desc: "Pure mathematics, statistics & computational methods.", icon: "Calculator" },
  { code: "CS", name: "Computer Science", desc: "Programming, AI, data science & software development.", icon: "Cpu" },
  { code: "BIO", name: "Biotechnology", desc: "Genetic engineering, microbiology & bioinformatics.", icon: "Dna" },
  { code: "ENG", name: "English", desc: "Literature, linguistics & communication skills.", icon: "BookOpen" },
  { code: "TAM", name: "Tamil", desc: "Classical & modern Tamil literature and culture.", icon: "Languages" },
  { code: "COM", name: "Commerce", desc: "Accounting, finance, taxation & business management.", icon: "TrendingUp" },
  { code: "BBA", name: "Business Administration", desc: "Management, marketing, HR & entrepreneurship.", icon: "Briefcase" },
  { code: "BCA", name: "Computer Applications", desc: "Software development, web technologies & IT.", icon: "Monitor" },
];

export const COURSES = [
  { level: "Undergraduate", title: "B.Sc. (3 Years)", branches: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biotechnology", "Microbiology", "Biochemistry", "Statistics"], duration: "3 Years", seats: "960" },
  { level: "Undergraduate", title: "B.A. (3 Years)", branches: ["English", "Tamil", "History", "Economics", "Political Science", "Psychology", "Sociology"], duration: "3 Years", seats: "720" },
  { level: "Undergraduate", title: "B.Com. (3 Years)", branches: ["General", "Computer Applications", "Professional Accounting", "Banking & Insurance"], duration: "3 Years", seats: "480" },
  { level: "Undergraduate", title: "BBA (3 Years)", branches: ["General Management", "Finance", "Marketing", "HR"], duration: "3 Years", seats: "240" },
  { level: "Undergraduate", title: "BCA (3 Years)", branches: ["General", "Data Science", "Cloud Computing"], duration: "3 Years", seats: "180" },
  { level: "Postgraduate", title: "M.Sc. (2 Years)", branches: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biotechnology", "Data Science"], duration: "2 Years", seats: "240" },
  { level: "Postgraduate", title: "M.A. (2 Years)", branches: ["English", "Tamil", "History", "Economics", "Psychology"], duration: "2 Years", seats: "180" },
  { level: "Postgraduate", title: "M.Com. (2 Years)", branches: ["General", "Finance", "International Business"], duration: "2 Years", seats: "120" },
];

export const RECRUITERS = [
  "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Capgemini", "HCL",
  "Tech Mahindra", "L&T Infotech", "Mphasis", "Mindtree", "Zoho", "Freshworks",
  "ICICI Bank", "HDFC Bank", "Axis Bank", "Kotak Mahindra", "Deloitte",
];

export const PLACEMENT_HIGHLIGHTS = [
  { value: "₹12 LPA", label: "Highest Package 2024" },
  { value: "₹4.2 LPA", label: "Average Package" },
  { value: "92%", label: "Placement Rate" },
  { value: "180+", label: "Companies Visited" },
];

export const FACULTY = [
  { name: "Dr. R. Krishnan", role: "Dean, Science", qual: "Ph.D., Bharathiar University", focus: "Quantum Physics & Nanotechnology" },
  { name: "Dr. Meera Iyer", role: "Professor, Biotechnology", qual: "Ph.D., Anna University", focus: "Microbial Genetics" },
  { name: "Dr. Anand Subramaniam", role: "HoD, Computer Science", qual: "Ph.D., Bharathiar University", focus: "Machine Learning & AI" },
  { name: "Dr. Priya Raghavan", role: "Professor, English", qual: "Ph.D., University of Madras", focus: "Contemporary Literature" },
  { name: "Dr. S. Balasubramanian", role: "Dean of Research", qual: "Ph.D., IIT Madras", focus: "Applied Mathematics" },
  { name: "Dr. Lakshmi Narayanan", role: "Professor, Commerce", qual: "Ph.D., Bharathiar University", focus: "Financial Management" },
];

export const NEWS = [
  { date: "May 18, 2025", category: "Admissions", title: "UG & PG 2025–26 application window opens for all programmes", excerpt: "Online applications are now live; merit scholarships available based on board exam scores and entrance tests." },
  { date: "May 10, 2025", category: "Research", title: "GTM COLLEGE faculty publishes research in international journals", excerpt: "Three research papers on biotechnology and data science accepted in peer-reviewed international publications." },
  { date: "Apr 28, 2025", category: "Placements", title: "TCS recruits 85 students from Computer Science & BCA departments", excerpt: "Annual campus recruitment drive concludes with excellent results across all departments." },
  { date: "Apr 14, 2025", category: "Events", title: "ScienceFest 2025 — Inter-collegiate Science Exhibition", excerpt: "Two-day event hosted 800+ students from 40 colleges with innovative project displays and competitions." },
  { date: "Apr 02, 2025", category: "Awards", title: "NAAC 'A' Grade accreditation renewed", excerpt: "Institution scores 3.2/4.00 on NAAC quality criteria, maintaining high academic standards." },
];

export const EVENTS = [
  { date: { d: "14", m: "SEP" }, title: "Annual Science Symposium 2025", venue: "Main Auditorium", time: "09:00 – 18:00" },
  { date: { d: "22", m: "SEP" }, title: "Career Guidance Workshop", venue: "Seminar Hall, Block A", time: "14:00 – 17:00" },
  { date: { d: "05", m: "OCT" }, title: "Inter-Collegiate Quiz Competition", venue: "Computer Lab", time: "All Day" },
  { date: { d: "18", m: "OCT" }, title: "Cultural Fest — Kalanjali 2025", venue: "Open Air Theatre", time: "17:00 onwards" },
];

export const TESTIMONIALS = [
  { name: "Aditi Sharma", batch: "B.Sc. Computer Science, 2022", company: "Software Developer, TCS", quote: "GTM COLLEGE provided excellent education and placement support. The faculty guided me throughout my journey." },
  { name: "Rahul Verma", batch: "B.Com., 2021", company: "Accountant, ICICI Bank", quote: "The commerce department prepared me well for the corporate world with practical knowledge and internships." },
  { name: "Sneha Iyer", batch: "BBA, 2023", company: "HR Executive, Infosys", quote: "The management programme gave me confidence and skills to excel in my career from day one." },
  { name: "Karthik Subramanian", batch: "M.Sc. Biotechnology, 2020", company: "Research Associate, Biocon", quote: "The research facilities and faculty mentorship helped me build a strong foundation in biotechnology." },
];

export const FACILITIES = [
  { title: "Central Library", desc: "Extensive collection of books, journals, digital resources and reading halls.", icon: "BookOpen" },
  { title: "Science Labs", desc: "Well-equipped laboratories for Physics, Chemistry, Biology and Computer Science.", icon: "FlaskConical" },
  { title: "Hostel Facilities", desc: "Separate hostels for boys and girls with mess, recreation and 24/7 security.", icon: "Hotel" },
  { title: "Sports Complex", desc: "Indoor & outdoor courts, gym, athletic track and sports equipment.", icon: "Dumbbell" },
  { title: "Auditorium", desc: "Spacious auditorium with modern AV systems for events and seminars.", icon: "Theater" },
  { title: "Health Centre", desc: "On-campus medical facility with qualified doctors and first-aid services.", icon: "HeartPulse" },
];