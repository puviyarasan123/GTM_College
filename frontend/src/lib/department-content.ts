/**
 * Department content — the seed/fallback copy for every department page.
 *
 * The live site reads departments from the database (admin → Departments), so
 * this file is what gets seeded into it (`npm run db:seed:departments`) and what
 * the page falls back to if the API is unreachable. Editing content here is only
 * for bootstrapping; day-to-day edits happen in the admin panel.
 */

export type DeptStaff = {
  sno: number;
  name: string;
  qualification: string;
  designation: string;
  shift: string;
  email?: string;
};

export type DeptSupervisor = {
  sno: number;
  name: string;
  qualification: string;
  designation: string;
  mphil: string;
  phd: string;
};

/**
 * A page section. `text` renders prose (paragraphs split on blank lines),
 * `list` renders a bulleted panel, `cards` renders titled mini-cards.
 * `half` puts the block in a two-column grid with its neighbour.
 * Body copy supports **bold** and *italic*.
 */
export type DeptBlock =
  | { kind: "text"; heading: string; icon?: string; quote?: string; body: string; half?: boolean }
  | { kind: "list"; heading: string; icon?: string; intro?: string; items: string[]; half?: boolean; twoCol?: boolean }
  | { kind: "cards"; heading: string; icon?: string; intro?: string; items: { title: string; text: string }[]; half?: boolean };

export type DepartmentContent = {
  slug: string;
  name: string;
  code: string;
  icon: string;
  summary: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  blocks: DeptBlock[];
  staffHeading: string;
  staff: DeptStaff[];
  supervisorsHeading: string;
  supervisors: DeptSupervisor[];
  aliases: string[];
  order: number;
  active: boolean;
};

// ── Staff registries (verbatim from the original department pages) ────────────

const tamilFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. G. RUDRAMOORTHY", qualification: "M.A., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 2, name: "Mrs. T. SANGEETHA", qualification: "M.A., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Dr. K.THANGADURAI", qualification: "M.A., M.Phil., Ph.D., (NET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mrs. M.VIDYAMATHI", qualification: "M.A., M.Phil. ,B.Ed., (NET & SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Dr. G. ESWARI", qualification: "M.A., M.Phil., B.Ed., Ph.D.,(NET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mrs. S.THAHIRA BEGUM", qualification: "M.A., M.Phil.", designation: "GUEST LECTURER (URDU)", shift: "Shift I" },
  { sno: 7, name: "Dr. S.THAMIZHARASI", qualification: "M.A., M.Phil., Ph.D.,(NET)", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 8, name: "Dr. P.SAMPATHKUMAR", qualification: "M.A., M.Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 9, name: "Dr. G.SURESH", qualification: "M.A., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
];

const englishFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. P.VASUKI", qualification: "M.A., M.Phil., B.Ed., PGDTE., Ph.D.", designation: "HEAD & ASSOCIATE PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Prof. M.GOMATHI (Deputation)", qualification: "M.A., M. Phil., M.Ed.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Prof. S.BHARATHI", qualification: "M.A., M. Phil., B.Ed.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 4, name: "Prof. A.RAMESH", qualification: "M.A., M. Phil.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 5, name: "Mrs. C.SIVASANKARI", qualification: "M.A., M.Ed., M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mrs. C.SARASWATHI", qualification: "M.A.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Mr. K.VASUDEVAN", qualification: "M.A., M.Com., M.Phil., B.Ed., BCIS., PGDCA", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 8, name: "Mr. B. JAYARAJAN", qualification: "M.A., M. Phil., (SET)", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 9, name: "Mr. M.KUMARESN", qualification: "M.A., M. Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 10, name: "Mr. S.SANTHOSH KUMAR", qualification: "M.A.,M. Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 11, name: "Dr. I.ILAIYA KUMAR", qualification: "M.A., M. Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 12, name: "Dr. E.DHARNISH PRAVEEN RAJ", qualification: "M.A., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 13, name: "Dr. R.RAMANAN", qualification: "M.A., Ph.D., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
];

const englishSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. P.VASUKI", qualification: "M.A., M.Phil., B.Ed., PGDTE., Ph.D.", designation: "HEAD & ASSOCIATE PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 2, name: "Prof. M.GOMATHI (Deputation)", qualification: "M.A., M. Phil., M.Ed.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 3, name: "Prof. S.BHARATHI", qualification: "M.A., M. Phil., B.Ed.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
];

const economicsFaculty: DeptStaff[] = [
  { sno: 1, name: "Prof. A.S.KARPAGAM", qualification: "M.A., M.Phil., B.Ed.,(ECO)., (SET), M.A., M.Phil.(HIS)", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Mrs. D.VARALAKSHMI", qualification: "M.A., M.Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Mrs. G.USHA", qualification: "M.A., M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mr. S.PERUMAL", qualification: "M.A., M.Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mr. P.SENTHILKUMARAN", qualification: "M.A., M.Phil., Ph.D., (SLET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Dr. S. KRISHNAN", qualification: "M.A., M.Phil. Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Dr. M. AMARAJOTHI", qualification: "M.A., M.Phil. Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 8, name: "Mis. M.KALAIVANI", qualification: "M.A., M.Phil., (SET)", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 9, name: "Mr. R.VIJAYAKUMAR", qualification: "M.A., M.Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 10, name: "Mr. K.EAZHUMALAI", qualification: "M.A., M.Phil.", designation: "GUEST LECTURER", shift: "Shift II" },
];

const historyFaculty: DeptStaff[] = [
  { sno: 1, name: "DR. K. VIJAYARANGAM", qualification: "M.A., M.Phil., B.Ed., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "DR. S. NEHRU", qualification: "M.A., M. Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 3, name: "DR. K. VELMANGAI", qualification: "M.A., M. Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "DR. K. UDAYASANKAR", qualification: "M.A., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "MR. R. SELVAKUMAR", qualification: "M.A., M. Phil., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "DR. J. SAMPATH", qualification: "M.A., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "DR. K. KANNADASAN", qualification: "M.A., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 8, name: "DR. D. ASHOKAN", qualification: "M.A., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 9, name: "DR. S. JAYAVELU", qualification: "M.A., M. Phil., B.Ed., Ph.D., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
];

const commerceFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. S. SAGAYARAJ", qualification: "M.Com., M.Phil., Ph.D., (SET)", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. B. KARTHIKEYAN", qualification: "M.Com., M.Phil., Ph.D.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Ms. G. JEEVA", qualification: "M.Com., M.Phil., B.Ed., DCA.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mr. G. YUVARAJA", qualification: "M.Com., M.Ed., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Ms. M. JANANI", qualification: "M.Com., MBA., M.Phil.,(SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mr .S. SARAVANAN", qualification: "M.Com., M.Phil., PGDCA,", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 7, name: "Mr. J. MURUGAN", qualification: "M.Com., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 8, name: "Mr. S. SRINIVASAN", qualification: "M.Com., M.Phil., M.Ed.,", designation: "GUEST LECTURER", shift: "Shift II" },
];

const commerceSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. B. KARTHIKEYAN", qualification: "M.Com., M.Phil., Ph.D. (Annamalai University)", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];

const bbaFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. M. G.LOGANATHAN", qualification: "MBA., M.Phil., Ph.D., LLB., M. Sc (Phyc),", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. M. MURASOLI", qualification: "B. Sc (Agri)., MBA., M.Phil., Ph.D.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Dr. G. JOTHI", qualification: "B.E., MBA., M.Phil., Ph.D.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 4, name: "Dr. A. JOTHISELVAMUTHUKUMAR", qualification: "B.E., MBA., M.Phil., Ph.D, PGDPR.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
];

const bbaSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. M. G.LOGANATHAN", qualification: "MBA., M.Phil., Ph.D., LLB., M. Sc (Phyc) [Annamalai University]", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 2, name: "Dr. M. MURASOLI", qualification: "B. Sc (Agri)., MBA., M.Phil., Ph.D. [Annamalai University]", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Dr. G. JOTHI", qualification: "B.E., MBA., M.Phil., Ph.D. [Annamalai University]", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 4, name: "Dr. A. JOTHISELVAMUTHUKUMAR", qualification: "B.E., MBA., M.Phil., Ph.D, PGDPR. [Annamalai University]", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];

const mathsFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. S. KARUNANITHI", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. A. SRIDHAR", qualification: "M.Sc., M. Phil., Ph.D., PGDCS,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Prof. N. GAJALAKSHMI", qualification: "M.Sc., M. Phil., DCE,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 4, name: "Prof. S. SENTHILKUMAR", qualification: "M.Sc., M. Phil.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 5, name: "Prof. L. VIKRAMAN", qualification: "M.Sc., M.Phil.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 6, name: "Prof. M. MALARVIZHI", qualification: "M.Sc., M. Phil.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 7, name: "Dr. M. SATHIYAMOORTHY", qualification: "M.Sc., M.Tech., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 8, name: "Dr. P. PUVIARASU", qualification: "M.SC., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 9, name: "Prof. V. GOPI (Deputation)", qualification: "M.Sc., M.Phil., (SET),", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 10, name: "Mrs. A.HEMALATHA", qualification: "M.Sc., M.Ed., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 11, name: "Mrs. D.MEENAKSHI", qualification: "M.Sc., B.Ed., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 12, name: "Mr. T.R.THIRUMAVALAVAN", qualification: "M.Sc., B.Ed., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 13, name: "Mr. S.SATHISH", qualification: "M.Sc., M.Phil.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 14, name: "Mr. C.SENTHILNATHAN", qualification: "M.Sc., B.Ed., PGDCA., D.T.Ed., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift II" },
];

const mathsSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. S. KARUNANITHI", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 2, name: "Dr. A. SRIDHAR", qualification: "M.Sc., M. Phil., Ph.D., PGDCS", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Prof. N. GAJALAKSHMI", qualification: "M.Sc., M. Phil., DCE,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 4, name: "Prof. S. SENTHILKUMAR", qualification: "M.Sc., M. Phil.,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 5, name: "Prof. L. VIKRAMAN", qualification: "M.Sc., M.Phil.,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 6, name: "Prof. M. MALARVIZHI", qualification: "M.Sc., M. Phil.,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 7, name: "Dr. M. SATHIYAMOORTHY", qualification: "M.Sc., M.Tech., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 8, name: "Dr. P. PUVIARASU", qualification: "M.SC., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
];

const computerAppFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I", email: "arulanandam@gtmc.edu.in" },
  { sno: 2, name: "Mr. B. MANIVANNAN", qualification: "MCA., M. Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Mrs. B. REVATHI", qualification: "MCA., M. Phil., B.Ed.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mrs. G. MYTHILI", qualification: "MCA., M. Phil., B.Ed.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mrs. K. LOGANAYAKI", qualification: "MCA., M. Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mrs. K. SATHIS KUMAR", qualification: "MCA., M. Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
];

const computerAppSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];


const computerSciFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD (i/c) & ASSISTANT PROFESSOR", shift: "Shift I", email: "arulanandam@gtmc.edu.in" },
  { sno: 2, name: "Dr. N. SURESH", qualification: "MCA, Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Mr. M. SIVABALAN", qualification: "MCA, M.Phil, (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mrs. M. GAJALAKSHMI", qualification: "MCA, M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mr. T. VENKATASUBRAMANIYAN", qualification: "M.Sc, M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
];

const computerSciSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD (i/c) & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];

const physicsFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. A. THAMARAI", qualification: "M.Sc., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. P.G. ARAVINDAN", qualification: "M.Sc., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Dr. B. DEVIPRIYA", qualification: "M.Sc., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 4, name: "Dr. P. RAMESH", qualification: "M.Sc., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mrs. C.P. DEVIPRIYA", qualification: "M.Sc., M. Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mr. A. SARAVANAN", qualification: "M.Sc.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Mrs. B. SHANTHALAKSHMI", qualification: "M.Sc., B.Ed.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 8, name: "Mrs. B SUMATHI", qualification: "M.Sc., B.Ed.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 9, name: "Dr. M. RAJA", qualification: "M.Sc., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 10, name: "Mrs. V. UMA", qualification: "M.Sc., M. Phil., B.Ed., SET", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 11, name: "Dr. J. UDAYASEELAN", qualification: "M.Sc., M. Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
];

const physicsSupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. A. THAMARAI", qualification: "M.Sc., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 2, name: "Dr. P.G. ARAVINDAN", qualification: "M.Sc., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Dr. B. DEVIPRIYA", qualification: "M.Sc., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
];


const chemistryFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. P. CHAKKARAVARTHY", qualification: "M.Sc., M.Phil., PGDCS, Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. D. RAMASAMY", qualification: "M.Sc., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Dr. G. RAMASAMY", qualification: "M.Sc., M.Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 4, name: "Mrs. V. SABITHRA", qualification: "M.Sc., M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mr. V. PALANI", qualification: "M.Sc., M.Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mis. K. SHARMILA", qualification: "M.Sc., M.Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Dr. K. LOGAIYA", qualification: "M.Sc., B.Ed., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 8, name: "Mr. R. MANIMARAN", qualification: "M.Sc., M.Phil., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 9, name: "Dr. J. DEEPA", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 10, name: "Dr. N. PRABU", qualification: "M.Sc., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 11, name: "Dr. M. SATHIYA", qualification: "M.Sc., M.Phil., Ph.D., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 12, name: "Dr. K. THIAGARAJAN", qualification: "M.Sc., B.Ed., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 13, name: "Dr. S. JAYAPRAKASH", qualification: "M.Sc., M.Phil., Ph.D., (SET)", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 14, name: "Dr. A. SANGEETHA", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 15, name: "Mrs. Y. PARIMALA", qualification: "M.Sc., M.Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 16, name: "Mr. S. KUMARAGURU", qualification: "M.Sc., M.Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 17, name: "Mr. M. SURESH", qualification: "M.Sc., M.Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift II" },
];

const chemistrySupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. P. CHAKKARAVARTHY", qualification: "M.Sc., M.Phil., PGDCS, Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 2, name: "Dr. D. RAMASAMY", qualification: "M.Sc., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Dr. G. RAMASAMY", qualification: "M.Sc., M.Phil., Ph.D. (Approved at Annamalai University)", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];


const botanyFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. R. THANGADURAI", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 2, name: "Mr. S. SARAVANAN", qualification: "M.Sc., M.Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Dr. S. KRISHNAMOORTHY", qualification: "M.Sc., B.Ed., Ph.D., (SET),", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Dr. A. THALAVAIPANDIAN", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Dr. K. THIRUGNANAMOORTHY", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Dr. M. JAYARAMAN", qualification: "M.Sc., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Dr. S. VADIVEL", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 8, name: "Mrs. V. SANGEETHA", qualification: "M.Sc., M.Phil., B.Ed.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 9, name: "Dr. B. KALPANA", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 10, name: "Dr. S. SAMUNDEESWARI", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 11, name: "Mr. M. MOHANASEENIVASAN", qualification: "M.Sc., M.Phil.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 12, name: "Dr. V. NATARAJAN", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 13, name: "Mrs. S. SARASWATHI", qualification: "M.Sc., M.Phil., B.Ed., (SET),", designation: "GUEST LECTURER", shift: "Shift II" },
];


const zoologyFaculty: DeptStaff[] = [
  { sno: 1, name: "Dr. V. K. SIVAKUMAR", qualification: "M.Sc., M.Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. S. RAVICHANDRAN", qualification: "M.Sc., M.Phil., Ph.D., B.Ed.", designation: "ASSOCIATE PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Dr. B. PALANI", qualification: "M.Sc., M.Tech., Ph.D., TNSET", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Dr. A. SIVARAJ", qualification: "M.Sc., M.Phil., Ph.D., TNSET", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Dr. G. ELANGO", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 6, name: "Dr. K. DHANASEKAR", qualification: "M.Sc., Ph.D., B.Ed., TNSET", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Dr. R. KRISHNAMOORTHI", qualification: "M.Sc., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
];

const zoologySupervisors: DeptSupervisor[] = [
  { sno: 1, name: "Dr. S. RAVICHANDRAN (Approved at Annamalai University)", qualification: "M.Sc., M.Phil., Ph.D., B.Ed.", designation: "ASSOCIATE PROFESSOR", mphil: "Yes", phd: "Yes" },
];

// ── Department pages ──────────────────────────────────────────────────────────

export const DEPARTMENT_CONTENT: DepartmentContent[] = [
  {
    slug: "tamil",
    name: "Tamil",
    code: "B.A",
    icon: "Languages",
    summary: "Classical & modern Tamil literature, linguistics and culture.",
    eyebrow: "இலக்கியத் துறை",
    heroTitle: "தமிழ்த்துறை",
    heroSubtitle: "கற்க கசடறக் கற்பவை கற்றப்பின் நிற்க அதற்குத் தக",
    blocks: [
      {
        kind: "text",
        heading: "தமிழ்த்துறை அறிமுகம்",
        icon: "BookOpen",
        body: "கோட்டை மாநகரம் என்று போற்றப்படும் வேலூர் மாவட்டத்தின் கோவில்கள் நிறைந்த குடியேற்ற வட்டத்தில் முப்பெரும் தேவியருள் திருமகள் என்னும் பெயரை தன்னுள்அடக்கி அரசினர் திருமகள் ஆலைக்கல்லூரி என்னும் பெயரில் 04.06.1964 ஆம் ஆண்டு துவக்கப்பெற்றது இக்கல்லூரி.\n\nஉலகமொழிகளுக்கெல்லாம் தாய்மொழி தமிழ் மொழி என்பது உலகறிந்த ஒன்று. அவ்வகையில் மொழிப்பாடமாக தாய்மொழி, ஏறக்குறைய 48 ஆண்டுகள் தமிழை கற்பித்து வந்தனர். காலத்திற்கேற்ப பலதுறைகள் வரவேற்கப்பெற்றது. அவ்வகையில் 2012-2013 கல்வியாண்டில் தமிழை முதன்மை பாடமாக்கொண்டு இளங்கலைத் தமிழ் எனும் தனித்துறை தொடங்கப்பெற்றது. மேலும் 2014 ஆம் ஆணடு “முதுகலைத்தமிழ்” பாடப்பிரிவும், 2018 ஆம் ஆண்டு இளம் முனைவர் பாடப்பிரிவும் அறிமுகப்படுத்தப்பட்டு தற்பொழுது 223 மாணவ, மாணவியர் பயின்று வருகின்றனர்.\n\n“கற்றோருக்கு சென்ற இடமெல்லாம் சிறப்பு” என்ற முதுமொழியை மெய்ப்பிக்கும் வகையில் இக்கல்லூரியும் தமிழ்த்துறையும் இருகண்களாய் நின்று மாணவர்களை வழி நடத்தி வருகின்றன என்பதில் பெருமை கொள்கிறது தமிழ்த்துறை.",
      },
      {
        kind: "text",
        heading: "தமிழ்த்துறையின் நோக்கம்",
        icon: "Target",
        quote: "“கற்கை நன்றே கற்கை நன்றே பிச்சைப் புகினும் கற்கை நன்றே”",
        body: "எனும் முதுமொழிதனை எங்கள் சிரத்தின் மேல் ஏற்றி ஏழை எளிய மாணவர்களை உயரச்செய்யும் நோக்கில், உயர்த்தி பிடிக்கும் ஏணிகளாய் நின்று உழைப்பதே இத்துறையின் முதன்மை நோக்கமாகும்.\n\nதமிழ்ச்சார்ந்த அறிவுமட்டுமில்லாமல் பிறகலைசார்ந்த அறிவும் தமிழ்த்துறை மாணவர்களுக்கு பயிற்றுவிக்கும் நோக்கோடு இத்துறை செயல்படுகிறது. தமிழ் பயிலும் மாணவர்களுக்கு கவிதை, கட்டுரை, சிறுகதை, புதினம் போன்றவற்றை படைக்கும் ஆற்றலை உருவாக்கும் வகையில் இத்துறையால் மாணவர்கள் வழிநடத்தப்படுகின்றனர்.\n\nதமிழிலக்கியத்தில் பொதிந்து கிடக்கும் வாழ்வியற் செய்திகளும் குறிப்புகளும் உலக மக்களுக்கு உயர்வை ஏற்படுத்தும் என்பதை மையமாகக்கொண்ட பன்னாட்டு கருத்தரங்குகள், பயிலரங்குகள், வினாடிவினா, தேசியகருத்தரங்குகள், மாணவர்களுக்கு படைப்பாற்றலை வெளிப்படுத்தும் களமாக சிறுகதை, புதுக்கவிதை, மரப்புக்கவிதை, ஒவியங்களைவரைதல், பேச்சுப்போட்டி, நாடகம் இயற்றுதல், நாடக நடிப்புகலை போன்ற நிகழ்வுகளை ஒருங்கிணைத்து தமிழரின் பல்வேறு பரிமாணங்களை வளர்த்தெடுப்பதே இக்கல்லூரி தமிழ்துறையின் முதன்மை நோக்கமாக அமைந்துள்ளது. இந்நோக்கத்தை செவ்வனே நிறைவேற்றி வருவதில் பெருமைகொள்கிறது தமிழ்த்துறை.",
      },
      {
        kind: "list",
        heading: "துறையின் சிறப்பு அம்சங்கள்",
        icon: "Sparkles",
        items: [
          "தமிழ்த்துறையில் பயிலத்தொடங்கும் அத்துனை மாணவர்களின் தனித்திறமைகளை கண்டறிந்து அவ்வாற்றலை உலகறியச்செய்து வெற்றி கண்டுள்ளோம் என்பதில் மகிழ்ச்சி.",
          "தமிழ்த்துறையில் ஆண்டுதோறும் தமிழவை விழாநடத்தி மாணவர்களுக்கு பேச்சுக்கலை, எழுத்துக்கலை, கிராமியக்கலை, நாட்டுப்புறக்கலை போன்றகலை ஆர்வம் தூண்டப்பட்டுவருகிறது.",
          "தமிழ்த்துறையில் ஒவ்வொரு ஆண்டும் பொங்கல்விழா சிறப்பிக்கும் போது மாணவர்களின் தனித்திறனை வெளிப்படுத்தும் விதமாக கலைநிகழ்ச்சிகள் மற்றும் விளையாட்டுபோட்டிகளும் நடத்தப்படுகிறது.",
          "மாணவர்கள் NCC/NSS போன்ற இயக்கங்களிலும் பங்கேற்று தன்னையும் தன் நாட்டையும் பாதுகாக்கும் அளப்பறிய பணியை திறம்பட செய்து வருகின்றனர்.",
          "முதுகலைமாணவர்கள் ஒவ்வொரு ஆண்டும் சிறந்த முறையில் ஆராய்ச்சி மேற்கொண்டு சிறந்த கட்டுரையை சமர்ப்பிக்கின்றனர். தன்னுடைய இறுதிபருவத்தில் ஏதேனும் ஒரு பாடப்பகுதியை ஆராய்ந்து அதனை ஆய்வேடாக சமர்ப்பித்து பல்கலைக்கழகம் நடத்தும் வாய்மொழித் தேர்விலும் சிறந்த முறையில் பங்குகொள்கின்றனர்.",
          "பொற்குடத்திற்குபொட்டு வைத்தார் போல் மேலும் ஓர் சிறப்பு அம்சமாக தமிழ்த்துறையில் அனைத்து கௌரவவிரிவுரையாளர்களும் பல்கலைக்கழக மானியக்குழு (UGC) விதித்துள்ள தகுதியை பெற்றுள்ளனர்.",
        ],
      },
    ],
    staffHeading: "Staff Details for Tamil (துறைப் பேராசிரியர்கள்)",
    staff: tamilFaculty,
    supervisorsHeading: "",
    supervisors: [],
    aliases: [],
    order: 0,
    active: true,
  },
  {
    slug: "english",
    name: "English",
    code: "B.A",
    icon: "BookOpen",
    summary: "English literature, linguistics & communication skills.",
    eyebrow: "Department of Languages",
    heroTitle: "Department of English",
    heroSubtitle: "Empowering voices and advancing scholarly literacy through language, critical literature inquiry, and research benchmarks.",
    blocks: [
      {
        kind: "text",
        heading: "Department Profile & Timeline",
        icon: "Milestone",
        body: "The Department of English was established in the year 2012. Initially, it played an important role in improving the language skills of learners who come from socio-economically weaker sections of the society. The academic year 2012 was quite a remarkable year as the department started offering B.A. English literature course.\n\nGradually, the department attained the status of a PG department in 2013 with just one student getting enrolled for MA in 2013, the number has steadily increased and currently there are 25 students in PG and 68 in UG degree courses. With five regular faculty members and ten guest lecturers, the Department of English has elevated itself to the status of a Research department offering both M.Phil. and Ph.D. degree courses.\n\nThe Department organizes conferences, seminars and workshops. Experts in the field of literature and language are invited to deliver lectures on topics of current interest. Interactions with experts provide valuable opportunities for both faculty members and students to update their academic knowledge. One of the milestones of the department is the conduct of an International Virtual Conference in the year 2020 in collaboration with Thiruvalluvar University (Vellore), Loyola College (Chennai), and Sacred Heart’s College (Thirupattur). More than 1000 participants from different parts of the country and abroad participated in the conference and presented research papers.",
      },
      {
        kind: "text",
        heading: "Vision Statement",
        icon: "Eye",
        half: true,
        body: "To achieve excellence in higher education, empowerment through knowledge, inclusive growth for socio-economic change and sustainable development.",
      },
      {
        kind: "list",
        heading: "Mission Objectives",
        icon: "Compass",
        half: true,
        items: [
          "To improve the quality of teaching and learning process to reach the standards of leading institutions at the national level.",
          "To provide more effective and efficient remedial measures to enhance the quality of teaching and learning.",
          "To achieve more than 75% result in all the programmes in the university examination.",
          "To provide and promote research activities in the college.",
          "To provide cost-effective but quality higher education to more number of students at the earliest time-horizon.",
        ],
      },
      {
        kind: "text",
        heading: "Department Objectives",
        icon: "Target",
        body: "One of the major objectives of the department is to promote research activities by encouraging PG and M.Phil students to participate in conferences and workshops organized by universities and colleges. This initiative identifies individual potential for higher research degrees. Another core objective is to improve communication skills to face the challenges of the competitive world.",
      },
      {
        kind: "text",
        heading: "Features & Facilities",
        icon: "Library",
        body: "The department hosts a specialized **Language Laboratory** that caters to the explicit needs of students who require training in enriching their communication skills. A dedicated department library with a good collection of books perfectly meets the reference requirements of both scholars and faculty.",
      },
      {
        kind: "text",
        heading: "Literary Association (PHOENIX) & Scholar Culture",
        icon: "Sparkles",
        body: "The literary association (**PHOENIX**) was started in the year 2012. Various competitions are conducted to encourage and motivate students. Both UG and PG students are encouraged to attend Intra/Inter level cultural competitions, seminars, and conferences. They are encouraged to participate in sports activities too. Under the guidance of project guides, PG students regularly publish research papers in journals, motivating them to pursue M.Phil. and Ph.D. research pathways.",
      },
    ],
    staffHeading: "List of Faculty Members",
    staff: englishFaculty,
    supervisorsHeading: "List of M.Phil. and Ph.D. Approved Supervisors",
    supervisors: englishSupervisors,
    aliases: [],
    order: 1,
    active: true,
  },
  {
    slug: "economics",
    name: "Economics",
    code: "B.A",
    icon: "TrendingUp",
    summary: "Macro-analytic studies, policy frameworks and welfare economics.",
    eyebrow: "Department of Social Sciences",
    heroTitle: "Department of Economics",
    heroSubtitle: "Exploring macro-analytic studies, strategic framework dynamics, and policy implementation paradigms to improve standard benchmarks of societal welfare.",
    blocks: [
      {
        kind: "text",
        heading: "About the Department",
        icon: "Milestone",
        body: "The Department of Economics was started in the year 1964 at UG level and in the year 2013 at PG level. This course of study is organized on a semester programme and each semester provides for a minimum of 90 instructional days. The medium of instructions are Tamil and English. The students are evaluated on a continuous basis throughout the semester.\n\nDepartment of Economics offers a broad range of course options covering International Trade, Labour Economics, Mathematical Economics, Research Methodology, and Agricultural Economics. While the Department has a national and international reputation in its scholarship, the faculties are equally committed to teaching and advising the students.\n\nOur undergraduates go on to varied interesting careers in banking and business, law and government, and international relations and teaching. Graduates of the M.A. programme pursue careers not only in the traditional areas of research and teaching but also in fields as diverse as library and Government service.\n\nOur Department is gifted with more efficient and devoted 1 Permanent Staff and 11 Guest Lecturers who are ready to adhere to the needs of the students at any time. Under the able guidance and counselling of staff members, students bring laurels to the department and college by securing many prizes in various competitions that are held at regional and state level. By their active participation in various competitions and sports meets, they add fame to the college. Our Department Library has many books like Economics and competitive exam books.\n\nThe department of economics consists of exploring economic study and analysis, policy framing, and implementation issues faced by the Indian economy along with the analysis of other economies in the world. The department thrives to reach standards of excellence in teaching, research, and consultancy. Economics is important for many areas of society. It can help improve living standards and make society a better place. It partly depends on the priorities of society and what we consider most important.",
      },
      {
        kind: "list",
        heading: "Objectives of the Department",
        icon: "Target",
        twoCol: true,
        items: [
          "To provide better education for the students of our department within Government Thirumagal Mills College.",
          "To fabricate the students of our department to face the challenges in these competitive global sceneries.",
          "To impact moral code of conduct among the students of the department.",
          "To create and develop self confidence among the students and achieve goals in a realistic manner.",
          "To advise students to develop communication skills so as to face career interviews successfully.",
          "To develop both rural and urban students' academic literacy, tailoring to the dreams of rural students like entering the Indian Army or clearing national/state competitive examinations.",
          "To enable students to understand various causes of poverty, unemployment, price rises, inflation, and their respective remedial measures.",
          "To make students understand the economic explosion of consumers and the core rights of consumers in modern society.",
          "To ensure students acquire clear knowledge of critical economic operations like definitions of economy types (Capitalistic, Socialistic, and Mixed networks) alongside developed vs developing matrices.",
        ],
      },
      {
        kind: "cards",
        heading: "Features & Core Milestones Available",
        icon: "Sparkles",
        items: [
          { title: "Massive Academic Scaling", text: "Steady incremental growth since launching UG structures, recently reinforced with enhanced PG Economics modules and increasing student intake cycles year over year." },
          { title: "Seminars & Research Footprint", text: "Actively conducting National Seminars and Conferences centered on “Foreign Direct Investment: Challenges and Opportunities” alongside contributing to state-level research journal publications." },
          { title: "Extra-Curricular Domain Triumphs", text: "Excellent track record of student performance in sports, quiz programmes, and competitive assemblies with verified prizes secured across Thiruvalluvar University NCC playgrounds." },
          { title: "Vast Career Placements", text: "Graduates regularly secure direct deployment vectors inside critical public and private sector networks including the Indian Armed Forces, state police forces, and banking conglomerates." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Economics",
    staff: economicsFaculty,
    supervisorsHeading: "",
    supervisors: [],
    aliases: [],
    order: 2,
    active: true,
  },
  {
    slug: "history",
    name: "History",
    code: "B.A",
    icon: "Landmark",
    summary: "Indian and world history, cultural preservation and research skills.",
    eyebrow: "Department of Social Sciences",
    heroTitle: "Department of History",
    heroSubtitle: "Understanding the past and its legacies through critical historical inquiry, cultural preservation, and professional scholarship.",
    blocks: [
      {
        kind: "text",
        heading: "Profile of the Department",
        icon: "Milestone",
        body: "The Department of History was started in the year 2013 at UG level and in the year 2018 at PG level. The medium of Instructions are Tamil and English. Currently, there are 96 male students and 44 female students studying in the Department.\n\nThe Department offers a broad range of course options covering American, European, Asian, and China & Japan History. While the Department maintains a strong reputation in its scholarship, the faculties are equally committed to teaching and advising. Studying the past not only prepares students for understanding the present but also arms them with important research and professional skills.\n\nOur Department is gifted with 1 Permanent Staff and 8 devoted Guest Lecturers who are ready to adhere to the needs of the students at any time. Under their able guidance and counselling, students bring laurels to the department and college by securing many prizes in regional and state level competitions and sports meets. The Department Library houses an excellent collection of history volumes and competitive examination reference books.",
      },
      {
        kind: "text",
        heading: "Vision Statement",
        icon: "Eye",
        half: true,
        body: "The History Department aims to make the students aware of the past and its legacies through teaching, research, and extension activities in Indian History in the context of world history. We believe that only a critical understanding of the past will enable students to understand the present and look confidently towards the future.",
      },
      {
        kind: "text",
        heading: "Mission Objectives",
        icon: "Compass",
        half: true,
        body: "To transform students into citizens who are critically informed about the past and its consequences for the present. We actively promote studies in the history, society, and culture of Tamil Nadu and India. We empower students to cope with the challenges of globalisation by instilling a life-long passion for learning about regional, national, and global interconnections.",
      },
      {
        kind: "cards",
        heading: "Key Academic Milestones & Extensions",
        icon: "Award",
        items: [
          { title: "Archaeological Field Survey", text: "Organized an immersive field survey program on March 05, 2021, to analyze and document historical archaeological materials discovered at Modikuppam near Gudiyattam." },
          { title: "National Digital Quiz Initiatives", text: "Successfully conducted a National Online Quiz on the *History of India* (30.06.2020) and a National Online Quiz on the *History of Modern India* (30.07.2020) to maintain academic engagement." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for History",
    staff: historyFaculty,
    supervisorsHeading: "",
    supervisors: [],
    aliases: [],
    order: 3,
    active: true,
  },
  {
    slug: "commerce",
    name: "Commerce",
    code: "B.Com",
    icon: "TrendingUp",
    summary: "Accounting, finance, taxation, auditing & business law.",
    eyebrow: "Department of Professional Studies",
    heroTitle: "Department of Commerce",
    heroSubtitle: "Fostering fiscal capability, business analytics, and strategic operations to shape the next generation of professional leaders.",
    blocks: [
      {
        kind: "text",
        heading: "Introduction & Academic Progress",
        icon: "Milestone",
        body: "Commerce is the blood stream of a nation and a fundamental requirement for holistic economic development. To cater to the massive demands of rural and underprivileged student communities, the B.Com undergraduate course was introduced in 2005-06, followed by the M.Com post-graduate course in 2012-13 as a co-educational system built on government quota standards.\n\nThe department delivers a comprehensive composite study including accounting metrics, management strategies, corporate law, taxation systems, business statistics, and entrepreneurial principles. The faculty members emphasize theoretical clarity paired with intense practical execution vectors to challenge classroom spaces. To support academic fluency, a dedicated Question Bank framework operates in both English and regional vernacular (Tamil) options to effectively dismantle examination phobias.",
      },
      {
        kind: "text",
        heading: "Vision",
        icon: "Eye",
        half: true,
        body: "Provide value-based Commerce education to youngsters to serve the country, industry, and society with the right knowledge, good skills, and a positive attitude.",
      },
      {
        kind: "text",
        heading: "Mission",
        icon: "Compass",
        half: true,
        body: "Educate and train Commerce students effectively with deep subject knowledge, practical industrial skills, and critical life competencies on strong ethical bases.",
      },
      {
        kind: "text",
        heading: "Facilities",
        icon: "Library",
        body: "Hosts an extensive Department Library with 1,013 volumes, reference literature, soft-skills resources, and specialized competitive examination materials.",
      },
      {
        kind: "text",
        heading: "Practical Lab & Field Exposure",
        icon: "Layers",
        body: "Students are routinely taken to Post Offices, Commercial Banks, and Co-operative institutions to acquire real-world exposure in handling transaction slips, withdrawal forms, checks, demand drafts, and active digital systems like RTGS, NEFT, and mobile applications. Additionally, students visit local mandis, agricultural markets, and chartered accountant offices to understand field logistics, GST configurations, and Income-Tax filings.",
      },
      {
        kind: "text",
        heading: "Professional Role Models",
        icon: "Users",
        body: "Faculty members keep themselves at the edge of domain changes via the monthly “Staff Resource Inner Circle” interface to dissect and debate recent economic developments. Faculty actively generate research entries inside peer-reviewed journals, participate in FDP frameworks, and coordinate welfare initiatives such as funding tuition costs for underprivileged students.",
      },
      {
        kind: "cards",
        heading: "Specialized Internal Clubs System",
        icon: "Sparkles",
        items: [
          { title: "1. Skills and Talents Club", text: "Hosts debates, essay events, elocution meets, and intellectual strategy tracking like chess matrices to boost professional student personalities." },
          { title: "2. Rural Resources & Agri Business", text: "Interfaces directly with regional farming layouts and wholesale processing links to promote practical agro-based enterprise concepts." },
          { title: "3. Business Person – Students Link", text: "Invites industrial specialists and business figures from Gudiyattam taluk to lecture on active demands like modern ERP and Tally frameworks." },
          { title: "4. Life Skills & Development Hub", text: "Trains student profiles in navigating stress management, critical resolution, drafting professional resumes, and refining communications." },
          { title: "5. Institutional Linkage & Social Responsibility Assemblies", text: "Coordinates outreach across match stick, weaving, and leather cottage setups, while leading public campaigns centered on eco-friendly transitions, voting percentages, and flood safety protocols." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Commerce",
    staff: commerceFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: commerceSupervisors,
    aliases: [],
    order: 4,
    active: true,
  },
  {
    slug: "business-administration",
    name: "Business Administration",
    code: "BBA",
    icon: "Briefcase",
    summary: "Management, marketing, HR, entrepreneurship & business strategy.",
    eyebrow: "Department of Management Studies",
    heroTitle: "Department of Business Administration",
    heroSubtitle: "Nurturing corporate insight, leadership frameworks, and entrepreneurial strategy to build professional global administrators.",
    blocks: [
      {
        kind: "text",
        heading: "Profile of the Department",
        icon: "Milestone",
        body: "The Department of Business Administration was established in the year 2013 to impart management education and motivate young budding managers. The department focuses heavily on developing student-centric course curriculum and industry-based learning methodologies to match evolving business demands.\n\nThe BBA degree provides a sturdy alternative to traditional avenues, acting as an exceptional baseline for high-profile executive entries directly after graduation or as a robust foundation for pursuing complex postgraduate studies in management. With India’s scaling economy, corporate structures increasingly seek energetic, specialized BBA graduates who demonstrate management competencies comparable to traditional MBA modules.",
      },
      {
        kind: "list",
        heading: "Department Objectives",
        icon: "Target",
        items: [
          "To provide knowledge regarding the basic concepts, core principles, and functional models of professional organizational management.",
          "To instill essential technical expertise across diverse functional sectors like Human Resources, Financial Planning, Operations, and Target Marketing for an integrated systemic vision.",
          "To develop modern digital and computational literacy including systemic information search, word processing, office management dashboards, and high-impact presentation setups.",
        ],
      },
      {
        kind: "cards",
        heading: "Global Market Perspectives & Scope",
        icon: "Globe",
        intro: "Thanks to seamless logistics, immediate travel channels, and advanced telecommunication infrastructure, global operations have shrunk corporate barriers. The BBA framework equips students to take direct advantage of globalized markets through:",
        items: [
          { title: "Overseas Placement", text: "Opens extensive placement pipelines across international markets without mandatory external processing mandates or initial foreign degree requirements." },
          { title: "Curriculum Benchmarking", text: "Constant exposure to international business criteria updates the local training modules, keeping them strictly on par with international standards." },
          { title: "MNC Footprints", text: "The emergence of dominant global enterprises within Indian industrial sectors expands high-paying leadership opportunities for local graduates." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Business Administration",
    staff: bbaFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: bbaSupervisors,
    aliases: ["bba"],
    order: 5,
    active: true,
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    code: "B.Sc",
    icon: "Calculator",
    summary: "Pure & applied mathematics, statistics and computational methods.",
    eyebrow: "Department of Basic Sciences",
    heroTitle: "Department of Mathematics",
    heroSubtitle: "Cultivating abstract reasoning, analytical clarity, and foundational scientific inquiry since 1964.",
    blocks: [
      {
        kind: "text",
        heading: "Historical Legacy & Structure",
        icon: "Milestone",
        body: "Established in 1964, the Department of Mathematics stands as one of the cornerstone divisions of the institution. Offering courses in both Tamil and English mediums, the department has consistently expanded its horizons—introducing Postgraduate (M.Sc.) courses in 1982, implementing a dual-shift framework in 2007-08, and gaining elevation to a full Research Department in 2012-13.\n\nCurrently, the department shapes the academic paths of 452 undergraduate (B.Sc.) and 68 postgraduate (M.Sc.) students. Beyond core tracks, it delivers intensive subsidiary mathematical modules essential for neighboring disciplines including Physics, Chemistry, Computer Applications, and Computer Science.",
      },
      {
        kind: "list",
        heading: "Vision Foundations",
        icon: "Eye",
        half: true,
        items: [
          "Sustaining over 39 years of high-tier postgraduate and research programs alongside robust shift models.",
          "Maintaining a stellar team of 9 regular professors and 6 expert lecturers, with 50% holding Ph.D. status and active research portfolios.",
          "Providing separate, dedicated library infrastructure for both UG and PG scholars alongside computing and internet provisions for modern mathematical modeling.",
          "Ensuring academic equity by conducting structured remedial sessions for slow learners.",
        ],
      },
      {
        kind: "list",
        heading: "Mission Directions",
        icon: "Compass",
        half: true,
        items: [
          "To bridge technology and pure mathematics, allowing students to explore complex configurations through activities and physical experimentation.",
          "To prepare postgraduate scholars with intense foundational skills to excel in rigorous research systems or industrial sectors.",
          "To instill computational models capable of formulating solutions for complex, real-world analytical problems.",
          "To transform students into motivated professionals capable of ethical social and economic leadership.",
        ],
      },
      {
        kind: "cards",
        heading: "Learning Assets & Operational Layouts",
        icon: "Library",
        intro: "The department drives teaching efficiency through modern media resources like LCD systems, specialized audio-visual tools, and custom labs. To ensure continuous growth, academic books are systematically added to the separate UG and PG libraries every cycle.",
        items: [
          { title: "Student Exploration Expansion", text: "Scholars are regularly guided to attend national seminars, external symposia, and practical workshops to align with contemporary advancements." },
          { title: "Research Output Framework", text: "Faculty members frequently undergo refresher programs while consistently publishing breakthroughs in highly rated national and international research journals." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Mathematics",
    staff: mathsFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: mathsSupervisors,
    aliases: ["maths"],
    order: 6,
    active: true,
  },
  {
    slug: "computer-applications",
    name: "Computer Applications",
    code: "BCA",
    icon: "Laptop",
    summary: "Software development, web design, programming & IT applications.",
    eyebrow: "Department of Technical & Vocational Studies",
    heroTitle: "Department of Computer Applications",
    heroSubtitle: "Empowering technological innovators, software architects, and systems researchers since 2004.",
    blocks: [
      {
        kind: "text",
        heading: "Introduction & Academic Scope",
        icon: "Milestone",
        body: "The Department of Computer Applications established its Post Graduate division (MCA) in 2004, followed by the launch of the Under Graduate wing (BCA) in 2013. Affiliated with Thiruvalluvar University, the department conducts a rigorous two-year MCA curriculum (annual intake of 15 slots) and a three-year BCA track (annual intake of 50 slots) designed to blend theoretical depth with exhaustive practical experimentation.\n\nOperating with a core mandate to equip young computing profiles for the intense demands of the Information Age, the department fosters capabilities in constructing high-scale information systems, visual application architectures, and advanced database engineering designs.",
      },
      {
        kind: "text",
        heading: "Vision",
        icon: "Eye",
        half: true,
        body: "To be the front runner in Computer Applications education and to foster the students into globally competent professionals with expertise in software development and aptitude for research and ethical values.",
      },
      {
        kind: "list",
        heading: "Mission Milestones",
        icon: "Compass",
        half: true,
        items: [
          "Provide the ambience to become industry-ready Professionals, Researchers, and Entrepreneurs via advanced lab platforms.",
          "Establish Centres of Excellence to train students in progressive and convergent research themes.",
          "Impart high-quality experiential learning to master modern software development toolsets.",
          "Inculcate deep problem-solving, team-building matrices, and lifelong ethical responsibilities.",
        ],
      },
      {
        kind: "cards",
        heading: "Structural Features & Technology Focus",
        icon: "Layers",
        items: [
          { title: "Advanced System Methodologies", text: "Covers theories required to build, refine, and deploy large-scale integrated software architectures and optimized human-computer interfaces." },
          { title: "Targeted Knowledge Buffers", text: "Regularly integrates technical seminars, FDPs, workshops, and Short Term Training Programmes (STTP) supported by prime funding groups." },
          { title: "Interactive Hardware Labs", text: "The infrastructure is embedded with an industry-grade IT environment utilizing high-definition projection systems and hardware integration desks." },
          { title: "Dynamic Reference Library", text: "Maintains dedicated Circulation, Reference, and Periodical zones. Operating with an active user-driven recommendation pipeline for expanding resources." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Computer Applications",
    staff: computerAppFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: computerAppSupervisors,
    aliases: ["computerapp", "bca"],
    order: 7,
    active: true,
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    code: "B.Sc",
    icon: "Cpu",
    summary: "Programming, data structures, software development & algorithms.",
    eyebrow: "Department of Advanced Computing",
    heroTitle: "Department of Computer Science",
    heroSubtitle: "Driving computational excellence, analytical depth, and industry-aligned research frameworks since 2013.",
    blocks: [
      {
        kind: "text",
        heading: "Introduction & Academic Scope",
        icon: "Milestone",
        body: "The Department of Computer Science initiated its core academic programs in the 2013-2014 cycle, offering comprehensive Under Graduate (B.Sc.) and Post Graduate (M.Sc.) streams. Affiliated with Thiruvalluvar University, the division balances an annual intake of 50 students in its three-year B.Sc. course alongside 26 designated seats within its specialized M.Sc. curriculum.\n\nOperating with a high focus on providing robust theoretical models and rigorous hands-on laboratory experiences, the department prepares scholars to fulfill the intense, knowledge-based requirements of modern Information Technology sectors. The research branch (M.Phil. & Ph.D.) actively fosters advanced problem-solving methodologies under a dedicated team of doctorate holders with rich publication profiles.",
      },
      {
        kind: "text",
        heading: "Vision",
        icon: "Eye",
        half: true,
        body: "To be in the frontier of Computer Science to produce globally competent graduates with moral values committed to build a vibrant nation.",
      },
      {
        kind: "list",
        heading: "Mission Statements",
        icon: "Compass",
        half: true,
        items: [
          "To strengthen core competence in Computer Science through structured, analytical learning setups.",
          "To produce successful graduates equipped with high personal, social, and professional ethical frameworks for lifelong learning.",
          "To uplift innovative, breakthrough research in software metrics to serve the evolving needs of Industry, Government, and Society.",
        ],
      },
      {
        kind: "cards",
        heading: "Structural Features & Technology Frameworks",
        icon: "Layers",
        items: [
          { title: "Software Design & Lifecycle Theories", text: "Imparts advanced concepts and frameworks required for designing, optimizing, and deploying large-scale software systems and human-computer interfaces." },
          { title: "Intellectual Potential Development", text: "Cultivates global competence through specialized problem-solving modules, comprehensive hardware exposure, and up-to-date tracks on emerging technology shifts." },
          { title: "Dedicated Library Ecosystem", text: "Maintains its own structural archive containing Circulation, Reference, and Periodical wings, complete with an open recommendation pathway for immediate collection enrichment." },
          { title: "Co-Curricular Mobilization", text: "Organizes technical symposiums, research codeathons, and co-curricular projects annually to encourage students to highlight their computational engineering talents." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Computer Science",
    staff: computerSciFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: computerSciSupervisors,
    aliases: [],
    order: 8,
    active: true,
  },
  {
    slug: "physics",
    name: "Physics",
    code: "B.Sc",
    icon: "Atom",
    summary: "Classical mechanics, optics, electronics & applied physics.",
    eyebrow: "Department of Material & Physical Sciences",
    heroTitle: "Department of Physics",
    heroSubtitle: "Probing the fundamental laws of the cosmos, structural crystallization, and nanomaterial mechanics since 1969.",
    blocks: [
      {
        kind: "text",
        heading: "Historical Legacy & Research Domain",
        icon: "Milestone",
        body: "The Department of Physics was initialized in 1969 with the launch of its Bachelor of Science (Physics) program under the initial affiliation of the University of Madras, transitioning smoothly to Thiruvalluvar University affiliation in 2005. To open up higher education paths for rural students, the department introduced its Postgraduate (M.Sc.) curriculum in the 2012–13 academic cycle.\n\nElevated to a full PG and Research Department of Physics in 2018, the division has successfully driven specialized investigations across highly transformative scientific domains. The faculty and scholars are actively engaged in exploratory tracks including Spectroscopy, Crystallography, Quantum Chemical Calculation frameworks, Ultrasonic diagnostics, and Nanotechnology.",
      },
      {
        kind: "text",
        heading: "Departmental Objectives",
        icon: "Target",
        half: true,
        body: "To instill strict academic discipline, professional sincerity, and social accountability in student pursuits. The department targets equipping majors with an expansive grasp of the physical principles governing the universe, strengthening analytical reasoning, and cultivating the creative thinking matrices vital for prospective research and administrative careers.",
      },
      {
        kind: "list",
        heading: "Future Operational Blueprints",
        icon: "Compass",
        half: true,
        items: [
          "Constructing isolated, high-spec labs for electronics, core general practicals, and deep research schemes.",
          "Integrating digitized smart classrooms to leverage web-based learning tools.",
          "Deploying targeted certificate coaching courses and managing an institutional alumni database.",
          "Sustaining an annual cycle of national or international technical conferences.",
          "Committing each faculty member to publish at least two investigative articles annually in reputable international journals.",
        ],
      },
      {
        kind: "cards",
        heading: "Infrastructure Assets & Active Engagement",
        icon: "FlaskConical",
        intro: "The department features full laboratory frameworks optimized to conduct general and electronic physics experiments for both core majors and allied program candidates, supplemented by tailored optics labs. Postgraduate modules operate fluidly across the Main Wing and the modern Dr. MGR Centenary Building.",
        items: [
          { title: "Academic Adjustments & Milestone Events", text: "To empower student commitment across Sports, NCC, and NSS camps, laboratory sessions are dynamically allocated during afternoon blocks. The department hosts annual National Science Day functions and association assemblies." },
          { title: "Applied Field Visits & Projects", text: "Second-year M.Sc. scholars systematically execute original project theses for university evaluation. Curricular boundaries are further expanded through industrial instrumentation exposures, such as advanced lab analyses at VIT Vellore." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Physics",
    staff: physicsFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: physicsSupervisors,
    aliases: [],
    order: 9,
    active: true,
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    code: "B.Sc",
    icon: "FlaskConical",
    summary: "Organic, inorganic, analytical & industrial chemistry.",
    eyebrow: "Department of Chemical & Molecular Sciences",
    heroTitle: "Department of Chemistry",
    heroSubtitle: "Nurturing scientific inquiry, innovative molecular synthesis, and groundbreaking research in chemical sciences since 1980.",
    blocks: [
      {
        kind: "text",
        heading: "Historical Profile & Academic Layout",
        icon: "Milestone",
        body: "Established in the academic year 1980–1981, the Department of Chemistry has evolved into a premier hub for molecular education. The department systematically broadened its foundational curriculum by initiating dual-shift structures for its B.Sc. tracks in 2007–2008 and launching Postgraduate (M.Sc.) courses in 2012–2013. Acknowledging its active research contribution, the division was elevated to a full Research Department in the 2018–2019 cycle.\n\nCurrently, the department guides the academic trajectories of 312 Undergraduate (B.Sc.) and 58 Postgraduate (M.Sc.) scholars. In addition to its core majors, it delivers vital subsidiary chemistry modules tailored for students specializing in Physics, Botany, or Zoology.",
      },
      {
        kind: "text",
        heading: "Vision",
        icon: "Eye",
        half: true,
        body: "To establish a model centre of excellence in education across the frontier areas of chemistry. The primary focus rests on preparing highly competent graduates and post-graduates equipped with the dynamic skills necessary to navigate and excel within the rapidly shifting global scenarios of chemical science throughout their careers.",
      },
      {
        kind: "list",
        heading: "Mission & Objectives",
        icon: "Compass",
        half: true,
        items: [
          "To impart exceptional value-driven education through cutting-edge, updated datasets across theoretical and applied chemistry fields.",
          "To train scholars in solving intricate chemical problems by utilizing logical workflows grounded in well-established scientific principles.",
          "To align student training with deep core frameworks like Organic, Polymer, Applied, and Medicinal chemistry, maintaining contact with ongoing global breakthroughs.",
          "To produce industry-ready and academia-ready professionals capable of heading development initiatives across the country.",
        ],
      },
      {
        kind: "cards",
        heading: "Laboratory Ecosystem & Active Research Thrusts",
        icon: "FlaskConical",
        intro: "The department features a spacious, meticulously managed five-laboratory array specifically segmented to match rigorous experimental demands up to the PG and doctoral levels. This layout includes two dedicated Under Graduate laboratories, one specialized Post Graduate laboratory, an Allied Chemistry station, and an isolated Research laboratory.",
        items: [
          { title: "Precision Instrumentation & Safety", text: "Each ventilated lab module hosts a comfortable seating matrix for about 30 scholars simultaneously. The setups are completely provisioned with high-accuracy digital measuring instruments, molecular kits, experimental gadgets, structural charts, and modern safety apparatus." },
          { title: "Active Structural Investigations", text: "Research teams and Ph.D. scholars drive structured, high-impact investigations into prominent scientific fields, including Drug Discovery and Development (Natural Products), Polymer Chemistry, Organic Synthesis, Advanced Materials Science, and Computational Chemistry." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Chemistry",
    staff: chemistryFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: chemistrySupervisors,
    aliases: [],
    order: 10,
    active: true,
  },
  {
    slug: "botany",
    name: "Botany",
    code: "B.Sc",
    icon: "Leaf",
    summary: "Plant biology, ecology, plant physiology & biotechnology.",
    eyebrow: "Department of Plant & Ecological Sciences",
    heroTitle: "Department of Botany",
    heroSubtitle: "Exploring plant diversity, conservative ecology, and modern bio-technological research since 1969.",
    blocks: [
      {
        kind: "text",
        heading: "Historical Legacy & Student Matrix",
        icon: "Milestone",
        body: "The Department of Botany initiated its academic footprint in 1969 with the introduction of the Bachelor of Science (B.Sc.) in Botany. Adapting to modern institutional frameworks, the department implemented a dual-shift architecture in July 2007, running parallel streams in both English and Tamil mediums. To accommodate higher academic exploration, the Postgraduate (M.Sc.) course was established in the 2012–2013 cycle.\n\nCurrently, the department fosters the educational growth of 302 Undergraduate (UG) and 36 Postgraduate (PG) scholars. Admissions strictly adhere to regional Higher Secondary metrics and communal roster frameworks. Additionally, the department handles allied botany requirements for scholars majoring in neighboring branches like Chemistry and Zoology.",
      },
      {
        kind: "text",
        heading: "Vision Foundation",
        icon: "Eye",
        half: true,
        body: "To deliver affordable, high-quality botanical education while equipping students with practical taxonomic and ecological skills. The department identifies hidden potentials, shapes critical thinking, and prepares scholars to evolve into self-reliant leaders, green entrepreneurs, and ethical citizens.",
      },
      {
        kind: "list",
        heading: "Objective Anchors",
        icon: "Target",
        half: true,
        items: [
          "Train scholars in clear macroscopic/microscopic identification and scientific plant labeling.",
          "Nurture an active aptitude towards ecological preservation and conservation of natural biomes.",
          "Deliver holistic, value-based pedagogy combining traditional field studies with innovative modern laboratory assays.",
          "Ensure educational equity by providing robust remedial support pathways for slow learners.",
        ],
      },
      {
        kind: "cards",
        heading: "Botanical Treasures & Instrumentation Arrays",
        icon: "Sprout",
        intro: "Since its inception, the department has maintained a historic Botanical Garden—a vast conservatory of regional plant wealth containing rare, endangered species, mature trees, and shrubs that serve as a living laboratory for young botanists.",
        items: [
          { title: "Analytical Hardware Inventory", text: "The department laboratories are provisioned with accurate scientific equipment to conduct biochemical and plant physiological experiments, featuring high-spec Hot Air Ovens, Centrifuges, high-pressure Autoclaves, Shaking Incubators, digital projection assemblies, and horizontal Laminar Airflow Chambers." },
          { title: "Holistic & Co-Curricular Trajectories", text: "Focuses on comprehensive development via national/state symposia, environmental campaigns, and competitive exam training. It cultivates values like social responsibility, interreligious harmony, and gender equity alongside targeted skill development to match dynamic global employment markets." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Botany",
    staff: botanyFaculty,
    supervisorsHeading: "",
    supervisors: [],
    aliases: [],
    order: 11,
    active: true,
  },
  {
    slug: "zoology",
    name: "Zoology",
    code: "B.Sc",
    icon: "Dna",
    summary: "Animal biology, ecology, genetics & environmental science.",
    eyebrow: "Department of Animal & Biosphere Sciences",
    heroTitle: "Department of Zoology",
    heroSubtitle: "Advancing faunal biology, ecological aquaculture, and bio-resource management applications since 1968.",
    blocks: [
      {
        kind: "text",
        heading: "Historical Legacy & Staff Distribution",
        icon: "Milestone",
        body: "The Department of Zoology commenced its academic trajectory in 1968, operating initially as an allied division providing subsidiary biological training for B.Sc. Botany and Chemistry students. Recognizing its expanding scope, the department was upgraded to a major division in 2013, launching its full Undergraduate (B.Sc.) major degree stream. Today, the program runs dual tracks in both Tamil and English mediums, admitting 24 students annually per medium, supporting a collaborative student community of approximately 144 scholars.\n\nThe academic team is built upon a sanctioned strength of seven regular teaching posts and a dedicated laboratory technician. At present, the department features an Assistant Professor and an Associate Professor, with one faculty member explicitly deputed from Annamalai University. The remaining positions are maintained by five highly experienced Guest Lecturers. Notably, 100% of the active faculty board hold Ph.D. degrees, combining rich classrooms skills with deep research profiles.",
      },
      {
        kind: "text",
        heading: "Primary Objectives",
        icon: "Target",
        half: true,
        body: "The department prioritizes high-tier academic values paired with deliberate personality and moral character building. Beyond delivering syllabus metrics, it is structured to cultivate technical competence, professional communication skillsets, and enduring social commitment among its undergraduate scholars.",
      },
      {
        kind: "list",
        heading: "Curriculum Execution",
        icon: "Compass",
        half: true,
        items: [
          "**Granular Instruction:** Syllabi are detailed point-by-point via comprehensive unit-wise modular breakdowns.",
          "**Individual Focus:** Practical laboratory sessions are managed by giving undivided personal attention to every student.",
          "**Continuous Auditing:** Academic benchmarks are verified using routine class evaluations, model examinations, and student/alumni feedback loops.",
        ],
      },
      {
        kind: "cards",
        heading: "Skill Electives & Practical Infrastructure",
        icon: "FlaskConical",
        intro: "To open up modern vocational paths, the curriculum integrates specialized, entrepreneurially-focused elective papers, including Vermiculture, Pisciculture, and Industrial Fishery Management modules.",
        items: [
          { title: "Laboratory Assets & Reference Library", text: "The department administers two fully-furnished, spacious science laboratories equipped with customized worktables, modern microscopes, and high-capacity refrigeration setups. Glassware and required bio-reagents are continuously updated through state funding. Furthermore, the in-house library stores over 2,000 subject volumes to aid student and researcher studies." },
          { title: "Advanced Pedagogy & Research", text: "Faculties enrich learning using LCD setups, Over Head Projectors, Bio-Visual Charts, and 3D illustrative models. Scholars participate in regional symposia and soft-skill ICT camps, while teachers routinely publish innovative findings in national and international peer-reviewed journals." },
        ],
      },
    ],
    staffHeading: "Faculty Registry for Zoology",
    staff: zoologyFaculty,
    supervisorsHeading: "Approved Research Supervisors (M.Phil. / Ph.D.)",
    supervisors: zoologySupervisors,
    aliases: [],
    order: 12,
    active: true,
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    code: "B.Sc",
    icon: "Monitor",
    summary: "Networking, web technologies, database management & IT systems.",
    eyebrow: "Department of Advanced Computing",
    heroTitle: "Department of Information Technology",
    heroSubtitle: "Networking, web technologies, database management and applied IT systems.",
    blocks: [],
    staffHeading: "",
    staff: [],
    supervisorsHeading: "",
    supervisors: [],
    aliases: ["it"],
    order: 13,
    active: true,
  },
];

/** Slug (or alias) → department, used by the page and the seed script. */
export function findDepartmentContent(slug: string): DepartmentContent | undefined {
  const key = slug.trim().toLowerCase();
  return (
    DEPARTMENT_CONTENT.find((d) => d.slug === key) ??
    DEPARTMENT_CONTENT.find((d) => d.aliases.includes(key))
  );
}
