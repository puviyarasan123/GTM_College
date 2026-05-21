export const SITE = {
  name: "Vidyutha Institute of Technology",
  short: "VIT — Vidyutha",
  tagline: "Architects of the Future",
  estd: 1994,
  phone: "+91 44 2837 4500",
  email: "admissions@vidyutha.edu.in",
  address: "University Road, Academic District, Chennai, Tamil Nadu 600119",
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
      { label: "Courses Offered", to: "/courses", desc: "UG, PG & doctoral programmes" },
      { label: "Departments", to: "/departments", desc: "8 engineering & science wings" },
      { label: "Faculty", to: "/faculty", desc: "250+ PhD scholars & industry experts" },
      { label: "Library", to: "/library", desc: "Digital + physical knowledge hub" },
    ],
  },
  {
    label: "Admissions",
    to: "/admission",
    children: [
      { label: "Admission Process", to: "/admission", desc: "Apply for 2025–26 session" },
      { label: "Placement", to: "/placement", desc: "98% placement record" },
    ],
  },
  {
    label: "Campus",
    to: "/infrastructure",
    children: [
      { label: "Infrastructure", to: "/infrastructure", desc: "World-class labs & smart classrooms" },
      { label: "Hostel", to: "/hostel", desc: "Premium residential life" },
      { label: "Transport", to: "/transport", desc: "60+ bus routes city-wide" },
      { label: "Gallery", to: "/gallery", desc: "Campus moments" },
    ],
  },
  {
    label: "News",
    to: "/news",
    children: [
      { label: "News & Announcements", to: "/news", desc: "Latest updates" },
      { label: "Events", to: "/events", desc: "Symposiums, fests & conferences" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export const TICKER = [
  "Admissions open 2025–26 — applications close Aug 30",
  "NAAC A++ re-accreditation conferred for 5 years",
  "₹4.5Cr in merit scholarships announced for incoming batch",
  "Global Research Summit — Sept 14 to 16, register now",
  "Placements 2024 : 98.4% recorded, highest package ₹54 LPA",
];

export const STATS = [
  { value: 15000, suffix: "+", label: "Active Students" },
  { value: 250, suffix: "+", label: "PhD Faculty" },
  { value: 98, suffix: "%", label: "Placement Rate" },
  { value: 450, suffix: "+", label: "Recruiting Partners" },
];

export const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering", desc: "AI, ML, Cybersecurity & full-stack systems.", icon: "Cpu" },
  { code: "ECE", name: "Electronics & Communication", desc: "VLSI, embedded systems, 5G & IoT.", icon: "CircuitBoard" },
  { code: "EEE", name: "Electrical & Electronics", desc: "Smart grids, renewables, power systems.", icon: "Zap" },
  { code: "MECH", name: "Mechanical Engineering", desc: "Robotics, CAD/CAM, thermal sciences.", icon: "Cog" },
  { code: "CIVIL", name: "Civil Engineering", desc: "Structural design, smart cities, sustainability.", icon: "Building2" },
  { code: "IT", name: "Information Technology", desc: "Cloud, DevOps, data engineering.", icon: "Server" },
  { code: "BIO", name: "Biotechnology", desc: "Genomics, bioinformatics, therapeutics.", icon: "Dna" },
  { code: "AIDS", name: "AI & Data Science", desc: "MLOps, deep learning, applied research.", icon: "BrainCircuit" },
];

export const COURSES = [
  { level: "Undergraduate", title: "B.Tech (4 Years)", branches: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "BIO", "AI & DS"], duration: "4 Years", seats: "1,440" },
  { level: "Undergraduate", title: "B.Arch (5 Years)", branches: ["Architecture"], duration: "5 Years", seats: "60" },
  { level: "Postgraduate", title: "M.Tech (2 Years)", branches: ["VLSI", "AI/ML", "Structural", "Power Systems", "Embedded"], duration: "2 Years", seats: "240" },
  { level: "Postgraduate", title: "MBA", branches: ["Finance", "Marketing", "HR", "Analytics", "Operations"], duration: "2 Years", seats: "120" },
  { level: "Postgraduate", title: "MCA", branches: ["Software Systems"], duration: "2 Years", seats: "60" },
  { level: "Doctoral", title: "Ph.D. Programmes", branches: ["All Engineering & Science disciplines"], duration: "3–5 Years", seats: "Rolling" },
];

export const RECRUITERS = [
  "Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Accenture",
  "Cognizant", "Capgemini", "Intel", "IBM", "Oracle", "Adobe", "Deloitte",
  "JP Morgan", "Goldman Sachs", "Morgan Stanley", "Cisco",
];

export const PLACEMENT_HIGHLIGHTS = [
  { value: "₹54 LPA", label: "Highest Package 2024" },
  { value: "₹9.8 LPA", label: "Average Package" },
  { value: "98.4%", label: "Placement Rate" },
  { value: "450+", label: "Companies Visited" },
];

export const FACULTY = [
  { name: "Dr. R. Krishnan", role: "Dean, Computer Science", qual: "Ph.D., IIT Madras", focus: "AI & Distributed Systems" },
  { name: "Dr. Meera Iyer", role: "Professor, Biotechnology", qual: "Ph.D., Stanford", focus: "Genomic Engineering" },
  { name: "Dr. Anand Subramaniam", role: "HoD, ECE", qual: "Ph.D., IISc Bangalore", focus: "VLSI & 5G Systems" },
  { name: "Dr. Priya Raghavan", role: "Professor, Mechanical", qual: "Ph.D., MIT", focus: "Robotics & Automation" },
  { name: "Dr. S. Balasubramanian", role: "Dean of Research", qual: "Ph.D., IIT Bombay", focus: "Renewable Energy" },
  { name: "Dr. Lakshmi Narayanan", role: "Professor, Civil", qual: "Ph.D., Cambridge", focus: "Smart Infrastructure" },
];

export const NEWS = [
  { date: "May 18, 2026", category: "Admissions", title: "B.Tech 2025–26 application window opens for all branches", excerpt: "Online applications are now live; merit scholarships up to 100% available based on board and entrance exam scores." },
  { date: "May 10, 2026", category: "Research", title: "Vidyutha bags 3 patents in autonomous-systems research", excerpt: "Faculty-led team at the AI lab patents three novel approaches in perception and SLAM for indoor robotics." },
  { date: "Apr 28, 2026", category: "Placements", title: "Microsoft picks 42 students from CSE & IT departments", excerpt: "Annual on-campus recruitment drive concludes with the highest single-recruiter intake in five years." },
  { date: "Apr 14, 2026", category: "Events", title: "TechVision 2026 — National Symposium on Industry 4.0", excerpt: "Two-day symposium hosted 1,200+ delegates across 60 institutions, headlined by industry leaders." },
  { date: "Apr 02, 2026", category: "Awards", title: "NAAC A++ re-accreditation conferred", excerpt: "Institution scores 3.78/4.00 on the seven NAAC quality criteria, retaining A++ for a third consecutive cycle." },
];

export const EVENTS = [
  { date: { d: "14", m: "SEP" }, title: "Global Research Summit 2026", venue: "Convocation Auditorium", time: "09:00 – 18:00" },
  { date: { d: "22", m: "SEP" }, title: "Industry Connect — Tech Talks", venue: "Innovation Hall, Block C", time: "14:00 – 17:00" },
  { date: { d: "05", m: "OCT" }, title: "Hackathon : Code4Bharat", venue: "CSE Department Labs", time: "All Day" },
  { date: { d: "18", m: "OCT" }, title: "Cultural Fest — Saaranya 2026", venue: "Open Air Theatre", time: "17:00 onwards" },
];

export const TESTIMONIALS = [
  { name: "Aditi Sharma", batch: "B.Tech CSE, 2022", company: "Software Engineer, Google", quote: "Vidyutha gave me the technical depth and the network that shaped my career. The faculty pushed me to think beyond the syllabus." },
  { name: "Rahul Verma", batch: "B.Tech ECE, 2021", company: "Hardware Engineer, Intel", quote: "The labs and the mentorship here are world-class. I built my first real chip prototype in my third year." },
  { name: "Sneha Iyer", batch: "MBA, 2023", company: "Consultant, Deloitte", quote: "The placement cell didn't just find me a job — they prepared me to walk into a boardroom on day one." },
  { name: "Karthik Subramanian", batch: "B.Tech Mech, 2020", company: "Founder, RoboMakers", quote: "I left Vidyutha with a co-founder, a product, and the confidence to raise my first round." },
];

export const FACILITIES = [
  { title: "Smart Library", desc: "Half a million digital journals, 24/7 study halls, AI-powered research assistant.", icon: "BookOpen" },
  { title: "Innovation Labs", desc: "VR/AR, 3D printing, NVIDIA-grade compute and dedicated startup incubation space.", icon: "FlaskConical" },
  { title: "Residential Halls", desc: "12 hostels, single & shared rooms, 24/7 mess, recreation, healthcare on site.", icon: "Hotel" },
  { title: "Sports Complex", desc: "Olympic pool, indoor & outdoor courts, gym, athletic track, yoga centre.", icon: "Dumbbell" },
  { title: "Auditorium", desc: "Convocation hall seating 2,500 with state-of-the-art AV systems.", icon: "Theater" },
  { title: "Health Centre", desc: "On-campus clinic with 24/7 doctors, ambulance and tie-ups with leading hospitals.", icon: "HeartPulse" },
];