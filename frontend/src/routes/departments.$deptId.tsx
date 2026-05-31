import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { 
  BookOpen, Target, Sparkles, Users, Award, Shield, Library, 
  Milestone, Eye, Compass, GraduationCap, TrendingUp, Briefcase, Landmark, CheckCircle, Globe, Layers, FlaskConical, Sprout 
} from "lucide-react";

export const Route = createFileRoute("/departments/$deptId")({
  head: ({ params }) => {
    const formatTitle = params.deptId.charAt(0).toUpperCase() + params.deptId.slice(1);
    return {
      meta: [
        { title: `Department of ${formatTitle} — ${SITE.name}` },
        { name: "description", content: `Explore faculty profiles, research areas, and programs under the Department of ${formatTitle} at Govt. Thirumagal Mills College.` },
      ],
    };
  },
  component: DepartmentDynamicPage,
});

// ==========================================
// DATA REGISTRIES (TAMIL, ENGLISH & ECONOMICS)
// ==========================================

const tamilFaculty = [
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

const englishFaculty = [
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

const englishSupervisors = [
  { sno: 1, name: "Dr. P.VASUKI", qualification: "M.A., M.Phil., B.Ed., PGDTE., Ph.D.", designation: "HEAD & ASSOCIATE PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 2, name: "Prof. M.GOMATHI (Deputation)", qualification: "M.A., M. Phil., M.Ed.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 3, name: "Prof. S.BHARATHI", qualification: "M.A., M. Phil., B.Ed.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
];

const economicsFaculty = [
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

const historyFaculty = [
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

const commerceFaculty = [
  { sno: 1, name: "Dr. S. SAGAYARAJ", qualification: "M.Com., M.Phil., Ph.D., (SET)", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. B. KARTHIKEYAN", qualification: "M.Com., M.Phil., Ph.D.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Ms. G. JEEVA", qualification: "M.Com., M.Phil., B.Ed., DCA.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mr. G. YUVARAJA", qualification: "M.Com., M.Ed., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Ms. M. JANANI", qualification: "M.Com., MBA., M.Phil.,(SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mr .S. SARAVANAN", qualification: "M.Com., M.Phil., PGDCA,", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 7, name: "Mr. J. MURUGAN", qualification: "M.Com., M.Phil.,", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 8, name: "Mr. S. SRINIVASAN", qualification: "M.Com., M.Phil., M.Ed.,", designation: "GUEST LECTURER", shift: "Shift II" },
];

const commerceSupervisors = [
  { sno: 1, name: "Dr. B. KARTHIKEYAN", qualification: "M.Com., M.Phil., Ph.D. (Annamalai University)", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];

const bbaFaculty = [
  { sno: 1, name: "Dr. M. G.LOGANATHAN", qualification: "MBA., M.Phil., Ph.D., LLB., M. Sc (Phyc),", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. M. MURASOLI", qualification: "B. Sc (Agri)., MBA., M.Phil., Ph.D.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Dr. G. JOTHI", qualification: "B.E., MBA., M.Phil., Ph.D.,", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 4, name: "Dr. A. JOTHISELVAMUTHUKUMAR", qualification: "B.E., MBA., M.Phil., Ph.D, PGDPR.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
];

const bbaSupervisors = [
  { sno: 1, name: "Dr. M. G.LOGANATHAN", qualification: "MBA., M.Phil., Ph.D., LLB., M. Sc (Phyc) [Annamalai University]", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 2, name: "Dr. M. MURASOLI", qualification: "B. Sc (Agri)., MBA., M.Phil., Ph.D. [Annamalai University]", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Dr. G. JOTHI", qualification: "B.E., MBA., M.Phil., Ph.D. [Annamalai University]", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 4, name: "Dr. A. JOTHISELVAMUTHUKUMAR", qualification: "B.E., MBA., M.Phil., Ph.D, PGDPR. [Annamalai University]", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];

const mathsFaculty = [
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

const mathsSupervisors = [
  { sno: 1, name: "Dr. S. KARUNANITHI", qualification: "M.Sc., M.Phil., B.Ed., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 2, name: "Dr. A. SRIDHAR", qualification: "M.Sc., M. Phil., Ph.D., PGDCS", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Prof. N. GAJALAKSHMI", qualification: "M.Sc., M. Phil., DCE,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 4, name: "Prof. S. SENTHILKUMAR", qualification: "M.Sc., M. Phil.,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 5, name: "Prof. L. VIKRAMAN", qualification: "M.Sc., M.Phil.,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 6, name: "Prof. M. MALARVIZHI", qualification: "M.Sc., M. Phil.,", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 7, name: "Dr. M. SATHIYAMOORTHY", qualification: "M.Sc., M.Tech., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 8, name: "Dr. P. PUVIARASU", qualification: "M.SC., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
];

const computerAppFaculty = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", shift: "Shift I", email: "arulanandam@gtmc.edu.in" },
  { sno: 2, name: "Mr. B. MANIVANNAN", qualification: "MCA., M. Phil., B.Ed., (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Mrs. B. REVATHI", qualification: "MCA., M. Phil., B.Ed.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mrs. G. MYTHILI", qualification: "MCA., M. Phil., B.Ed.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mrs. K. LOGANAYAKI", qualification: "MCA., M. Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 6, name: "Mrs. K. SATHIS KUMAR", qualification: "MCA., M. Phil.,", designation: "GUEST LECTURER", shift: "Shift I" },
];

const computerAppSupervisors = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];


const computerSciFaculty = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD (i/c) & ASSISTANT PROFESSOR", shift: "Shift I", email: "arulanandam@gtmc.edu.in" },
  { sno: 2, name: "Dr. N. SURESH", qualification: "MCA, Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 3, name: "Mr. M. SIVABALAN", qualification: "MCA, M.Phil, (SET)", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Mrs. M. GAJALAKSHMI", qualification: "MCA, M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Mr. T. VENKATASUBRAMANIYAN", qualification: "M.Sc, M.Phil.", designation: "GUEST LECTURER", shift: "Shift I" },
];

const computerSciSupervisors = [
  { sno: 1, name: "Dr. K. ARULANANDAM", qualification: "MCA., M. Phil., Ph.D.", designation: "HEAD (i/c) & ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];

const physicsFaculty = [
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

const physicsSupervisors = [
  { sno: 1, name: "Dr. A. THAMARAI", qualification: "M.Sc., M. Phil., Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 2, name: "Dr. P.G. ARAVINDAN", qualification: "M.Sc., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Dr. B. DEVIPRIYA", qualification: "M.Sc., M. Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
];


const chemistryFaculty = [
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

const chemistrySupervisors = [
  { sno: 1, name: "Dr. P. CHAKKARAVARTHY", qualification: "M.Sc., M.Phil., PGDCS, Ph.D.", designation: "HEAD & ASSISTANT PROFESSOR", mphil: "Yes", phd: "--" },
  { sno: 2, name: "Dr. D. RAMASAMY", qualification: "M.Sc., Ph.D.", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
  { sno: 3, name: "Dr. G. RAMASAMY", qualification: "M.Sc., M.Phil., Ph.D. (Approved at Annamalai University)", designation: "ASSISTANT PROFESSOR", mphil: "Yes", phd: "Yes" },
];


const botanyFaculty = [
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


const zoologyFaculty = [
  { sno: 1, name: "Dr. V. K. SIVAKUMAR", qualification: "M.Sc., M.Phil., Ph.D.", designation: "ASSISTANT PROFESSOR", shift: "Shift I" },
  { sno: 2, name: "Dr. S. RAVICHANDRAN", qualification: "M.Sc., M.Phil., Ph.D., B.Ed.", designation: "ASSOCIATE PROFESSOR", shift: "Shift I" },
  { sno: 3, name: "Dr. B. PALANI", qualification: "M.Sc., M.Tech., Ph.D., TNSET", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 4, name: "Dr. A. SIVARAJ", qualification: "M.Sc., M.Phil., Ph.D., TNSET", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 5, name: "Dr. G. ELANGO", qualification: "M.Sc., M.Phil., Ph.D.", designation: "GUEST LECTURER", shift: "Shift II" },
  { sno: 6, name: "Dr. K. DHANASEKAR", qualification: "M.Sc., Ph.D., B.Ed., TNSET", designation: "GUEST LECTURER", shift: "Shift I" },
  { sno: 7, name: "Dr. R. KRISHNAMOORTHI", qualification: "M.Sc., Ph.D.", designation: "GUEST LECTURER", shift: "Shift I" },
];

const zoologySupervisors = [
  { sno: 1, name: "Dr. S. RAVICHANDRAN (Approved at Annamalai University)", qualification: "M.Sc., M.Phil., Ph.D., B.Ed.", designation: "ASSOCIATE PROFESSOR", mphil: "Yes", phd: "Yes" },
];


// ==========================================
// CENTRAL CONTROLLER
// ==========================================

function DepartmentDynamicPage() {
  const { deptId } = Route.useParams();
  const lowerDeptId = deptId ? deptId.toLowerCase() : "";

  // ------------------------------------------
  // VIEW FORK 1: TAMIL
  // ------------------------------------------
  if (lowerDeptId === "tamil") {
    return (
      <>
        <PageHero
          eyebrow="இலக்கியத் துறை"
          title="தமிழ்த்துறை"
          subtitle="கற்க கசடறக் கற்பவை கற்றப்பின் நிற்க அதற்குத் தக"
        />

        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <BookOpen className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">தமிழ்த்துறை அறிமுகம்</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  கோட்டை மாநகரம் என்று போற்றப்படும் வேலூர் மாவட்டத்தின் கோவில்கள் நிறைந்த குடியேற்ற வட்டத்தில் முப்பெரும் தேவியருள் திருமகள் என்னும் பெயரை தன்னுள்அடக்கி அரசினர் திருமகள் ஆலைக்கல்லூரி என்னும் பெயரில் 04.06.1964 ஆம் ஆண்டு துவக்கப்பெற்றது இக்கல்லூரி.
                  {"\n\n"}
                  உலகமொழிகளுக்கெல்லாம் தாய்மொழி தமிழ் மொழி என்பது உலகறிந்த ஒன்று. அவ்வகையில் மொழிப்பாடமாக தாய்மொழி, ஏறக்குறைய 48 ஆண்டுகள் தமிழை கற்பித்து வந்தனர். காலத்திற்கேற்ப பலதுறைகள் வரவேற்கப்பெற்றது. அவ்வகையில் 2012-2013 கல்வியாண்டில் தமிழை முதன்மை பாடமாக்கொண்டு இளங்கலைத் தமிழ் எனும் தனித்துறை தொடங்கப்பெற்றது. மேலும் 2014 ஆம் ஆணடு “முதுகலைத்தமிழ்” பாடப்பிரிவும், 2018 ஆம் ஆண்டு இளம் முனைவர் பாடப்பிரிவும் அறிமுகப்படுத்தப்பட்டு தற்பொழுது 223 மாணவ, மாணவியர் பயின்று வருகின்றனர்.
                  {"\n\n"}
                  “கற்றோருக்கு சென்ற இடமெல்லாம் சிறப்பு” என்ற முதுமொழியை மெய்ப்பிக்கும் வகையில் இக்கல்லூரியும் தமிழ்த்துறையும் இருகண்களாய் நின்று மாணவர்களை வழி நடத்தி வருகின்றன என்பதில் பெருமை கொள்கிறது தமிழ்த்துறை.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Target className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">தமிழ்த்துறையின் நோக்கம்</h2>
                </div>
                <p className="text-sm italic text-muted-foreground font-medium bg-muted/40 p-3 rounded-xl border border-dashed text-center">
                  &ldquo;கற்கை நன்றே கற்கை நன்றே பிச்சைப் புகினும் கற்கை நன்றே&rdquo;
                </p>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  எனும் முதுமொழிதனை எங்கள் சிரத்தின் மேல் ஏற்றி ஏழை எளிய மாணவர்களை உயரச்செய்யும் நோக்கில், உயர்த்தி பிடிக்கும் ஏணிகளாய் நின்று உழைப்பதே இத்துறையின் முதன்மை நோக்கமாகும்.
                  {"\n\n"}
                  தமிழ்ச்சார்ந்த அறிவுமட்டுமில்லாமல் பிறகலைசார்ந்த அறிவும் தமிழ்த்துறை மாணவர்களுக்கு பயிற்றுவிக்கும் நோக்கோடு இத்துறை செயல்படுகிறது. தமிழ் பயிலும் மாணவர்களுக்கு கவிதை, கட்டுரை, சிறுகதை, புதினம் போன்றவற்றை படைக்கும் ஆற்றலை உருவாக்கும் வகையில் இத்துறையால் மாணவர்கள் வழிநடத்தப்படுகின்றனர்.
                  {"\n\n"}
                  தமிழிலக்கியத்தில் பொதிந்து கிடக்கும் வாழ்வியற் செய்திகளும் குறிப்புகளும் உலக மக்களுக்கு உயர்வை ஏற்படுத்தும் என்பதை மையமாகக்கொண்ட பன்னாட்டு கருத்தரங்குகள், பயிலரங்குகள், வினாடிவினா, தேசியகருத்தரங்குகள், மாணவர்களுக்கு படைப்பாற்றலை வெளிப்படுத்தும் களமாக சிறுகதை, புதுக்கவிதை, மரப்புக்கவிதை, ஒவியங்களைவரைதல், பேச்சுப்போட்டி, நாடகம் இயற்றுதல், நாடக நடிப்புகலை போன்ற நிகழ்வுகளை ஒருங்கிணைத்து தமிழரின் பல்வேறு பரிமாணங்களை வளர்த்தெடுப்பதே இக்கல்லூரி தமிழ்துறையின் முதன்மை நோக்கமாக அமைந்துள்ளது. இந்நோக்கத்தை செவ்வனே நிறைவேற்றி வருவதில் பெருமைகொள்கிறது தமிழ்த்துறை.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Sparkles className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">துறையின் சிறப்பு அம்சங்கள்</h2>
                </div>
                <ul className="grid gap-3.5 text-sm text-foreground/90">
                  <li className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Award className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>தமிழ்த்துறையில் பயிலத்தொடங்கும் அத்துனை மாணவர்களின் தனித்திறமைகளை கண்டறிந்து அவ்வாற்றலை உலகறியச்செய்து வெற்றி கண்டுள்ளோம் என்பதில் மகிழ்ச்சி.</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Library className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>தமிழ்த்துறையில் ஆண்டுதோறும் தமிழவை விழாநடத்தி மாணவர்களுக்கு பேச்சுக்கலை, எழுத்துக்கலை, கிராமியக்கலை, நாட்டுப்புறக்கலை போன்றகலை ஆர்வம் தூண்டப்பட்டுவருகிறது.</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Sparkles className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>தமிழ்த்துறையில் ஒவ்வொரு ஆண்டும் பொங்கல்விழா சிறப்பிக்கும் போது மாணவர்களின் தனித்திறனை வெளிப்படுத்தும் விதமாக கலைநிகழ்ச்சிகள் மற்றும் விளையாட்டுபோட்டிகளும் நடத்தப்படுகிறது.</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Shield className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>மாணவர்கள் NCC/NSS போன்ற இயக்கங்களிலும் பங்கேற்று தன்னையும் தன் நாட்டையும் பாதுகாக்கும் அளப்பறிய பணியை திறம்பட செய்து வருகின்றனர்.</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <BookOpen className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>முதுகலைமாணவர்கள் ஒவ்வொரு ஆண்டும் சிறந்த முறையில் ஆராய்ச்சி மேற்கொண்டு சிறந்த கட்டுரையை சமர்ப்பிக்கின்றனர். தன்னுடைய இறுதிபருவத்தில் ஏதேனும் ஒரு பாடப்பகுதியை ஆராய்ந்து அதனை ஆய்வேடாக சமர்ப்பித்து பல்கலைக்கழகம் நடத்தும் வாய்மொழித் தேர்விலும் சிறந்த முறையில் பங்குகொள்கின்றனர்.</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Users className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>பொற்குடத்திற்குபொட்டு வைத்தார் போல் மேலும் ஓர் சிறப்பு அம்சமாக தமிழ்த்துறையில் அனைத்து கௌரவவிரிவுரையாளர்களும் பல்கலைக்கழக மானியக்குழு (UGC) விதித்துள்ள தகுதியை பெற்றுள்ளனர்.</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Staff Details for Tamil (துறைப் பேராசிரியர்கள்)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {tamilFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground"><span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span></td>
                          <td className="p-4 text-center"><span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

  // ------------------------------------------
  // VIEW FORK 2: ENGLISH
  // ------------------------------------------
  if (lowerDeptId === "english") {
    return (
      <>
        <PageHero
          eyebrow="Department of Languages"
          title="Department of English"
          subtitle="Empowering voices and advancing scholarly literacy through language, critical literature inquiry, and research benchmarks."
        />

        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Department Profile & Timeline</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of English was established in the year 2012. Initially, it played an important role in improving the language skills of learners who come from socio-economically weaker sections of the society. The academic year 2012 was quite a remarkable year as the department started offering B.A. English literature course.
                  {"\n\n"}
                  Gradually, the department attained the status of a PG department in 2013 with just one student getting enrolled for MA in 2013, the number has steadily increased and currently there are 25 students in PG and 68 in UG degree courses. With five regular faculty members and ten guest lecturers, the Department of English has elevated itself to the status of a Research department offering both M.Phil. and Ph.D. degree courses.
                  {"\n\n"}
                  The Department organizes conferences, seminars and workshops. Experts in the field of literature and language are invited to deliver lectures on topics of current interest. Interactions with experts provide valuable opportunities for both faculty members and students to update their academic knowledge. One of the milestones of the department is the conduct of an International Virtual Conference in the year 2020 in collaboration with Thiruvalluvar University (Vellore), Loyola College (Chennai), and Sacred Heart’s College (Thirupattur). More than 1000 participants from different parts of the country and abroad participated in the conference and presented research papers.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Vision Statement</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To achieve excellence in higher education, empowerment through knowledge, inclusive growth for socio-economic change and sustainable development.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Mission Objectives</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
                    <li>To improve the quality of teaching and learning process to reach the standards of leading institutions at the national level.</li>
                    <li>To provide more effective and efficient remedial measures to enhance the quality of teaching and learning.</li>
                    <li>To achieve more than 75% result in all the programmes in the university examination.</li>
                    <li>To provide and promote research activities in the college.</li>
                    <li>To provide cost-effective but quality higher education to more number of students at the earliest time-horizon.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Target className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Department Objectives</h3>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed text-justify">
                    One of the major objectives of the department is to promote research activities by encouraging PG and M.Phil students to participate in conferences and workshops organized by universities and colleges. This initiative identifies individual potential for higher research degrees. Another core objective is to improve communication skills to face the challenges of the competitive world.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Sparkles className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Features & Facilities</h3>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed text-justify">
                    The department hosts a specialized **Language Laboratory** that caters to the explicit needs of students who require training in enriching their communication skills. A dedicated department library with a good collection of books perfectly meets the reference requirements of both scholars and faculty.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                  <Award className="size-4 text-gold-deep" />
                  <h3 className="font-bold text-sm">Literary Association (PHOENIX) & Scholar Culture</h3>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed text-justify">
                  The literary association (**PHOENIX**) was started in the year 2012. Various competitions are conducted to encourage and motivate students. Both UG and PG students are encouraged to attend Intra/Inter level cultural competitions, seminars, and conferences. They are encouraged to participate in sports activities too. Under the guidance of project guides, PG students regularly publish research papers in journals, motivating them to pursue M.Phil. and Ph.D. research pathways.
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">List of Faculty Members</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {englishFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">List of M.Phil. and Ph.D. Approved Supervisors</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {englishSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

  // ------------------------------------------
  // VIEW FORK 3: ECONOMICS
  // ------------------------------------------
  if (lowerDeptId === "economics") {
    return (
      <>
        <PageHero
          eyebrow="Department of Social Sciences"
          title="Department of Economics"
          subtitle="Exploring macro-analytic studies, strategic framework dynamics, and policy implementation paradigms to improve standard benchmarks of societal welfare."
        />

        {/* History and Context */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">About the Department</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Economics was started in the year 1964 at UG level and in the year 2013 at PG level. This course of study is organized on a semester programme and each semester provides for a minimum of 90 instructional days. The medium of instructions are Tamil and English. The students are evaluated on a continuous basis throughout the semester.
                  {"\n\n"}
                  Department of Economics offers a broad range of course options covering International Trade, Labour Economics, Mathematical Economics, Research Methodology, and Agricultural Economics. While the Department has a national and international reputation in its scholarship, the faculties are equally committed to teaching and advising the students.
                  {"\n\n"}
                  Our undergraduates go on to varied interesting careers in banking and business, law and government, and international relations and teaching. Graduates of the M.A. programme pursue careers not only in the traditional areas of research and teaching but also in fields as diverse as library and Government service.
                  {"\n\n"}
                  Our Department is gifted with more efficient and devoted 1 Permanent Staff and 11 Guest Lecturers who are ready to adhere to the needs of the students at any time. Under the able guidance and counselling of staff members, students bring laurels to the department and college by securing many prizes in various competitions that are held at regional and state level. By their active participation in various competitions and sports meets, they add fame to the college. Our Department Library has many books like Economics and competitive exam books.
                  {"\n\n"}
                  The department of economics consists of exploring economic study and analysis, policy framing, and implementation issues faced by the Indian economy along with the analysis of other economies in the world. The department thrives to reach standards of excellence in teaching, research, and consultancy. Economics is important for many areas of society. It can help improve living standards and make society a better place. It partly depends on the priorities of society and what we consider most important.
                </p>
              </div>
            </Reveal>

            {/* Objectives Registry Blocks */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Target className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Objectives of the Department</h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-3 text-xs text-foreground/90">
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To provide better education for the students of our department within Government Thirumagal Mills College.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To fabricate the students of our department to face the challenges in these competitive global sceneries.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To impact moral code of conduct among the students of the department.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To create and develop self confidence among the students and achieve goals in a realistic manner.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To advise students to develop communication skills so as to face career interviews successfully.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To develop both rural and urban students' academic literacy, tailoring to the dreams of rural students like entering the Indian Army or clearing national/state competitive examinations.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To enable students to understand various causes of poverty, unemployment, price rises, inflation, and their respective remedial measures.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To make students understand the economic explosion of consumers and the core rights of consumers in modern society.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40 relative md:col-span-2">
                    <span className="text-gold-deep font-bold mt-0.5">•</span>
                    <span>To ensure students acquire clear knowledge of critical economic operations like definitions of economy types (Capitalistic, Socialistic, and Mixed networks) alongside developed vs developing matrices.</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Key Structural Features */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Sparkles className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Features & Core Milestones Available</h2>
                </div>
                <div className="grid gap-3 text-xs text-foreground/90">
                  <div className="flex gap-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                    <TrendingUp className="size-4 text-gold-deep shrink-0 mt-0.5" />
                    <p><strong>Massive Academic Scaling:</strong> Steady incremental growth since launching UG structures, recently reinforced with enhanced PG Economics modules and increasing student intake cycles year over year.</p>
                  </div>
                  <div className="flex gap-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                    <Landmark className="size-4 text-gold-deep shrink-0 mt-0.5" />
                    <p><strong>Seminars & Research Footprint:</strong> Actively conducting National Seminars and Conferences centered on <em>&ldquo;Foreign Direct Investment: Challenges and Opportunities&rdquo;</em> alongside contributing to state-level research journal publications.</p>
                  </div>
                  <div className="flex gap-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                    <Award className="size-4 text-gold-deep shrink-0 mt-0.5" />
                    <p><strong>Extra-Curricular Domain Triumphs:</strong> Excellent track record of student performance in sports, quiz programmes, and competitive assemblies with verified prizes secured across Thiruvalluvar University NCC playgrounds.</p>
                  </div>
                  <div className="flex gap-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                    <Briefcase className="size-4 text-gold-deep shrink-0 mt-0.5" />
                    <p><strong>Vast Career Placements:</strong> Graduates regularly secure direct deployment vectors inside critical public and private sector networks including the Indian Armed Forces, state police forces, and banking conglomerates.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Economics Faculty Board */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Economics</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {economicsFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }


  // ------------------------------------------
  // VIEW FORK 4: HISTORY
  // ------------------------------------------
  if (lowerDeptId === "history") {
    return (
      <>
        <PageHero
          eyebrow="Department of Social Sciences"
          title="Department of History"
          subtitle="Understanding the past and its legacies through critical historical inquiry, cultural preservation, and professional scholarship."
        />

        {/* Profile, Vision & Mission */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Profile of the Department</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of History was started in the year 2013 at UG level and in the year 2018 at PG level. The medium of Instructions are Tamil and English. Currently, there are 96 male students and 44 female students studying in the Department.
                  {"\n\n"}
                  The Department offers a broad range of course options covering American, European, Asian, and China & Japan History. While the Department maintains a strong reputation in its scholarship, the faculties are equally committed to teaching and advising. Studying the past not only prepares students for understanding the present but also arms them with important research and professional skills.
                  {"\n\n"}
                  Our Department is gifted with 1 Permanent Staff and 8 devoted Guest Lecturers who are ready to adhere to the needs of the students at any time. Under their able guidance and counselling, students bring laurels to the department and college by securing many prizes in regional and state level competitions and sports meets. The Department Library houses an excellent collection of history volumes and competitive examination reference books.
                </p>
              </div>
            </Reveal>

            {/* Vision & Mission Modules */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Vision Statement</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    The History Department aims to make the students aware of the past and its legacies through teaching, research, and extension activities in Indian History in the context of world history. We believe that only a critical understanding of the past will enable students to understand the present and look confidently towards the future.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Mission Objectives</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To transform students into citizens who are critically informed about the past and its consequences for the present. We actively promote studies in the history, society, and culture of Tamil Nadu and India. We empower students to cope with the challenges of globalisation by instilling a life-long passion for learning about regional, national, and global interconnections.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Field Surveys & Milestone Achievements */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Sparkles className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Key Academic Milestones & Extensions</h2>
                </div>
                <div className="grid gap-3.5 text-sm text-foreground/90">
                  <div className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Award className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span className="text-xs"><strong>Archaeological Field Survey:</strong> Organized an immersive field survey program on March 05, 2021, to analyze and document historical archaeological materials discovered at Modikuppam near Gudiyattam.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <Library className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span className="text-xs"><strong>National Digital Quiz Initiatives:</strong> Successfully conducted a National Online Quiz on the *History of India* (30.06.2020) and a National Online Quiz on the *History of Modern India* (30.07.2020) to maintain academic engagement.</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* History Faculty Datatable */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {historyFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }


  // ------------------------------------------
  // VIEW FORK 5: COMMERCE
  // ------------------------------------------
  if (lowerDeptId === "commerce") {
    return (
      <>
        <PageHero
          eyebrow="Department of Professional Studies"
          title="Department of Commerce"
          subtitle="Fostering fiscal capability, business analytics, and strategic operations to shape the next generation of professional leaders."
        />

        {/* Profile Overview */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Introduction & Academic Progress</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  Commerce is the blood stream of a nation and a fundamental requirement for holistic economic development. To cater to the massive demands of rural and underprivileged student communities, the B.Com undergraduate course was introduced in 2005-06, followed by the M.Com post-graduate course in 2012-13 as a co-educational system built on government quota standards.
                  {"\n\n"}
                  The department delivers a comprehensive composite study including accounting metrics, management strategies, corporate law, taxation systems, business statistics, and entrepreneurial principles. The faculty members emphasize theoretical clarity paired with intense practical execution vectors to challenge classroom spaces. To support academic fluency, a dedicated Question Bank framework operates in both English and regional vernacular (Tamil) options to effectively dismantle examination phobias.
                </p>
              </div>
            </Reveal>

            {/* Vision, Mission & Pedagogy */}
            <div className="grid md:grid-cols-3 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-2.5 h-full">
                  <div className="flex items-center gap-2 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Vision</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    Provide value-based Commerce education to youngsters to serve the country, industry, and society with the right knowledge, good skills, and a positive attitude.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-2.5 h-full">
                  <div className="flex items-center gap-2 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Mission</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    Educate and train Commerce students effectively with deep subject knowledge, practical industrial skills, and critical life competencies on strong ethical bases.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-2.5 h-full">
                  <div className="flex items-center gap-2 text-primary border-b pb-2">
                    <Library className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Facilities</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    Hosts an extensive Department Library with 1,013 volumes, reference literature, soft-skills resources, and specialized competitive examination materials.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Immersive Labs & Extensions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Landmark className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Practical Lab & Field Exposure</h3>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed text-justify">
                    Students are routinely taken to Post Offices, Commercial Banks, and Co-operative institutions to acquire real-world exposure in handling transaction slips, withdrawal forms, checks, demand drafts, and active digital systems like RTGS, NEFT, and mobile applications. Additionally, students visit local mandis, agricultural markets, and chartered accountant offices to understand field logistics, GST configurations, and Income-Tax filings.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <TrendingUp className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Professional Role Models</h3>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed text-justify">
                    Faculty members keep themselves at the edge of domain changes via the monthly <em>"Staff Resource Inner Circle"</em> interface to dissect and debate recent economic developments. Faculty actively generate research entries inside peer-reviewed journals, participate in FDP frameworks, and coordinate welfare initiatives such as funding tuition costs for underprivileged students.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Department Hub System */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Sparkles className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Specialized Internal Clubs System</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-muted/20 p-3 rounded-xl border border-border/40 space-y-1">
                    <h4 className="font-bold text-primary">1. Skills and Talents Club</h4>
                    <p className="text-muted-foreground">Hosts debates, essay events, elocution meets, and intellectual strategy tracking like chess matrices to boost professional student personalities.</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-xl border border-border/40 space-y-1">
                    <h4 className="font-bold text-primary">2. Rural Resources & Agri Business</h4>
                    <p className="text-muted-foreground">Interfaces directly with regional farming layouts and wholesale processing links to promote practical agro-based enterprise concepts.</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-xl border border-border/40 space-y-1">
                    <h4 className="font-bold text-primary">3. Business Person – Students Link</h4>
                    <p className="text-muted-foreground">Invites industrial specialists and business figures from Gudiyattam taluk to lecture on active demands like modern ERP and Tally frameworks.</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-xl border border-border/40 space-y-1">
                    <h4 className="font-bold text-primary">4. Life Skills & Development Hub</h4>
                    <p className="text-muted-foreground">Trains student profiles in navigating stress management, critical resolution, drafting professional resumes, and refining communications.</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-xl border border-border/40 space-y-1 md:col-span-2">
                    <h4 className="font-bold text-primary">5. Institutional Linkage & Social Responsibility Assemblies</h4>
                    <p className="text-muted-foreground">Coordinates outreach across match stick, weaving, and leather cottage setups, while leading public campaigns centered on eco-friendly transitions, voting percentages, and flood safety protocols.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Commerce Faculty Grid */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Commerce</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {commerceFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Approved Research Supervisors Board */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {commerceSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }


  // ------------------------------------------
  // VIEW FORK 6: BBA
  // ------------------------------------------
  if (lowerDeptId === "bba" || lowerDeptId === "business-administration") {
    return (
      <>
        <PageHero
          eyebrow="Department of Management Studies"
          title="Department of Business Administration"
          subtitle="Nurturing corporate insight, leadership frameworks, and entrepreneurial strategy to build professional global administrators."
        />

        {/* Profile Overview */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Profile of the Department</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Business Administration was established in the year 2013 to impart management education and motivate young budding managers. The department focuses heavily on developing student-centric course curriculum and industry-based learning methodologies to match evolving business demands.
                  {"\n\n"}
                  The BBA degree provides a sturdy alternative to traditional avenues, acting as an exceptional baseline for high-profile executive entries directly after graduation or as a robust foundation for pursuing complex postgraduate studies in management. With India’s scaling economy, corporate structures increasingly seek energetic, specialized BBA graduates who demonstrate management competencies comparable to traditional MBA modules.
                </p>
              </div>
            </Reveal>

            {/* Objectives System */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Compass className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Department Objectives</h2>
                </div>
                <div className="grid gap-3.5 text-sm text-foreground/90">
                  <div className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <CheckCircle className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span className="text-xs">To provide knowledge regarding the basic concepts, core principles, and functional models of professional organizational management.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <CheckCircle className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span className="text-xs">To instill essential technical expertise across diverse functional sectors like Human Resources, Financial Planning, Operations, and Target Marketing for an integrated systemic vision.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-muted/10 p-3 rounded-xl border border-border/40">
                    <CheckCircle className="size-4 text-gold-deep mt-0.5 shrink-0" />
                    <span className="text-xs">To develop modern digital and computational literacy including systemic information search, word processing, office management dashboards, and high-impact presentation setups.</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Globalisation & Career Parameters */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Globe className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Global Market Perspectives & Scope</h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  Thanks to seamless logistics, immediate travel channels, and advanced telecommunication infrastructure, global operations have shrunk corporate barriers. The BBA framework equips students to take direct advantage of globalized markets through:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1.5">
                    <h4 className="font-bold text-primary">Overseas Placement</h4>
                    <p className="text-muted-foreground leading-normal">Opens extensive placement pipelines across international markets without mandatory external processing mandates or initial foreign degree requirements.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1.5">
                    <h4 className="font-bold text-primary">Curriculum Benchmarking</h4>
                    <p className="text-muted-foreground leading-normal">Constant exposure to international business criteria updates the local training modules, keeping them strictly on par with international standards.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1.5">
                    <h4 className="font-bold text-primary">MNC Footprints</h4>
                    <p className="text-muted-foreground leading-normal">The emergence of dominant global enterprises within Indian industrial sectors expands high-paying leadership opportunities for local graduates.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* BBA Faculty Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Board */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Business Administration</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {bbaFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Research Supervisors Layout */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {bbaSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

// ------------------------------------------
  // VIEW FORK 7: MATHEMATICS
  // ------------------------------------------
  if (lowerDeptId === "maths" || lowerDeptId === "mathematics") {
    return (
      <>
        <PageHero
          eyebrow="Department of Basic Sciences"
          title="Department of Mathematics"
          subtitle="Cultivating abstract reasoning, analytical clarity, and foundational scientific inquiry since 1964."
        />

        {/* Historical Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Historical Legacy & Structure</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  Established in 1964, the Department of Mathematics stands as one of the cornerstone divisions of the institution. Offering courses in both Tamil and English mediums, the department has consistently expanded its horizons—introducing Postgraduate (M.Sc.) courses in 1982, implementing a dual-shift framework in 2007-08, and gaining elevation to a full Research Department in 2012-13.
                  {"\n\n"}
                  Currently, the department shapes the academic paths of 452 undergraduate (B.Sc.) and 68 postgraduate (M.Sc.) students. Beyond core tracks, it delivers intensive subsidiary mathematical modules essential for neighboring disciplines including Physics, Chemistry, Computer Applications, and Computer Science.
                </p>
              </div>
            </Reveal>

            {/* Vision & Mission Split */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Vision Foundations</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 text-justify leading-relaxed">
                    <li>Sustaining over 39 years of high-tier postgraduate and research programs alongside robust shift models.</li>
                    <li>Maintaining a stellar team of 9 regular professors and 6 expert lecturers, with 50% holding Ph.D. status and active research portfolios.</li>
                    <li>Providing separate, dedicated library infrastructure for both UG and PG scholars alongside computing and internet provisions for modern mathematical modeling.</li>
                    <li>Ensuring academic equity by conducting structured remedial sessions for slow learners.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-sm">Mission Directions</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 text-justify leading-relaxed">
                    <li>To bridge technology and pure mathematics, allowing students to explore complex configurations through activities and physical experimentation.</li>
                    <li>To prepare postgraduate scholars with intense foundational skills to excel in rigorous research systems or industrial sectors.</li>
                    <li>To instill computational models capable of formulating solutions for complex, real-world analytical problems.</li>
                    <li>To transform students into motivated professionals capable of ethical social and economic leadership.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Infrastructure & Learning Resources */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Library className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Learning Assets & Operational Layouts</h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  The department drives teaching efficiency through modern media resources like LCD systems, specialized audio-visual tools, and custom labs. To ensure continuous growth, academic books are systematically added to the separate UG and PG libraries every cycle. 
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Student Exploration Expansion</h4>
                    <p className="text-muted-foreground leading-normal">Scholars are regularly guided to attend national seminars, external symposia, and practical workshops to align with contemporary advancements.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Research Output Framework</h4>
                    <p className="text-muted-foreground leading-normal">Faculty members frequently undergo refresher programs while consistently publishing breakthroughs in highly rated national and international research journals.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Mathematics Faculty Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Board */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Mathematics</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {mathsFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Research Supervisors Layout */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {mathsSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd === "--" ? "--" : sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

  // ------------------------------------------
  // VIEW FORK 8: COMPUTER APPLICATIONS
  // ------------------------------------------
  if (lowerDeptId === "computerapp" || lowerDeptId === "bca" || lowerDeptId === "computer-applications") {
    return (
      <>
        <PageHero
          eyebrow="Department of Technical & Vocational Studies"
          title="Department of Computer Applications"
          subtitle="Empowering technological innovators, software architects, and systems researchers since 2004."
        />

        {/* Overview Timeline Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Introduction & Academic Scope</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Computer Applications established its Post Graduate division (MCA) in 2004, followed by the launch of the Under Graduate wing (BCA) in 2013. Affiliated with Thiruvalluvar University, the department conducts a rigorous two-year MCA curriculum (annual intake of 15 slots) and a three-year BCA track (annual intake of 50 slots) designed to blend theoretical depth with exhaustive practical experimentation.
                  {"\n\n"}
                  Operating with a core mandate to equip young computing profiles for the intense demands of the Information Age, the department fosters capabilities in constructing high-scale information systems, visual application architectures, and advanced database engineering designs.
                </p>
              </div>
            </Reveal>

            {/* Core Pillars: Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Vision</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To be the front runner in Computer Applications education and to foster the students into globally competent professionals with expertise in software development and aptitude for research and ethical values.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Mission Milestones</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 text-justify leading-relaxed">
                    <li>Provide the ambience to become industry-ready Professionals, Researchers, and Entrepreneurs via advanced lab platforms.</li>
                    <li>Establish Centres of Excellence to train students in progressive and convergent research themes.</li>
                    <li>Impart high-quality experiential learning to master modern software development toolsets.</li>
                    <li>Inculcate deep problem-solving, team-building matrices, and lifelong ethical responsibilities.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Department Operational Features */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Layers className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Structural Features & Technology Focus</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Advanced System Methodologies</h4>
                    <p className="text-muted-foreground leading-normal">Covers theories required to build, refine, and deploy large-scale integrated software architectures and optimized human-computer interfaces.</p>
                  </div>
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Targeted Knowledge Buffers</h4>
                    <p className="text-muted-foreground leading-normal">Regularly integrates technical seminars, FDPs, workshops, and Short Term Training Programmes (STTP) supported by prime funding groups.</p>
                  </div>
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Interactive Hardware Labs</h4>
                    <p className="text-muted-foreground leading-normal">The infrastructure is embedded with an industry-grade IT environment utilizing high-definition projection systems and hardware integration desks.</p>
                  </div>
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Dynamic Reference Library</h4>
                    <p className="text-muted-foreground leading-normal">Maintains dedicated Circulation, Reference, and Periodical zones. Operating with an active user-driven recommendation pipeline for expanding resources.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Computer Applications Faculty Boards */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Grid */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Computer Applications</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {computerAppFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{prof.name}</div>
                            {prof.email && (
                              <a href={`mailto:${prof.email}`} className="text-[11px] font-mono text-gold-deep hover:underline block mt-0.5">
                                {prof.email}
                              </a>
                            )}
                          </td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Research Supervisors Section */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {computerAppSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

// ------------------------------------------
  // VIEW FORK 9: COMPUTER SCIENCE
  // ------------------------------------------
  if (lowerDeptId === "computer-science" || lowerDeptId === "cs" || lowerDeptId === "com-sci") {
    return (
      <>
        <PageHero
          eyebrow="Department of Advanced Computing"
          title="Department of Computer Science"
          subtitle="Driving computational excellence, analytical depth, and industry-aligned research frameworks since 2013."
        />

        {/* Structural Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Introduction & Academic Scope</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Computer Science initiated its core academic programs in the 2013-2014 cycle, offering comprehensive Under Graduate (B.Sc.) and Post Graduate (M.Sc.) streams. Affiliated with Thiruvalluvar University, the division balances an annual intake of 50 students in its three-year B.Sc. course alongside 26 designated seats within its specialized M.Sc. curriculum.
                  {"\n\n"}
                  Operating with a high focus on providing robust theoretical models and rigorous hands-on laboratory experiences, the department prepares scholars to fulfill the intense, knowledge-based requirements of modern Information Technology sectors. The research branch (M.Phil. & Ph.D.) actively fosters advanced problem-solving methodologies under a dedicated team of doctorate holders with rich publication profiles.
                </p>
              </div>
            </Reveal>

            {/* Vision / Mission Alignment */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Vision</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To be in the frontier of Computer Science to produce globally competent graduates with moral values committed to build a vibrant nation.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Mission Statements</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 text-justify leading-relaxed">
                    <li>To strengthen core competence in Computer Science through structured, analytical learning setups.</li>
                    <li>To produce successful graduates equipped with high personal, social, and professional ethical frameworks for lifelong learning.</li>
                    <li>To uplift innovative, breakthrough research in software metrics to serve the evolving needs of Industry, Government, and Society.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Features & Facilities */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Layers className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Structural Features & Technology Frameworks</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Software Design & Lifecycle Theories</h4>
                    <p className="text-muted-foreground leading-normal">Imparts advanced concepts and frameworks required for designing, optimizing, and deploying large-scale software systems and human-computer interfaces.</p>
                  </div>
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Intellectual Potential Development</h4>
                    <p className="text-muted-foreground leading-normal">Cultivates global competence through specialized problem-solving modules, comprehensive hardware exposure, and up-to-date tracks on emerging technology shifts.</p>
                  </div>
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Dedicated Library Ecosystem</h4>
                    <p className="text-muted-foreground leading-normal">Maintains its own structural archive containing Circulation, Reference, and Periodical wings, complete with an open recommendation pathway for immediate collection enrichment.</p>
                  </div>
                  <div className="bg-muted/20 p-3.5 rounded-xl border border-border/50 space-y-1">
                    <h4 className="font-bold text-primary">Co-Curricular Mobilization</h4>
                    <p className="text-muted-foreground leading-normal">Organizes technical symposiums, research codeathons, and co-curricular projects annually to encourage students to highlight their computational engineering talents.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Computer Science Faculty Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Grid */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Computer Science</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {computerSciFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{prof.name}</div>
                            {prof.email && (
                              <a href={`mailto:${prof.email}`} className="text-[11px] font-mono text-gold-deep hover:underline block mt-0.5">
                                {prof.email}
                              </a>
                            )}
                          </td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Research Supervisors Layout */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {computerSciSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

// ------------------------------------------
  // VIEW FORK 10: PHYSICS
  // ------------------------------------------
  if (lowerDeptId === "physics" || lowerDeptId === "phy") {
    return (
      <>
        <PageHero
          eyebrow="Department of Material & Physical Sciences"
          title="Department of Physics"
          subtitle="Probing the fundamental laws of the cosmos, structural crystallization, and nanomaterial mechanics since 1969."
        />

        {/* Timeline & Overview Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Historical Legacy & Research Domain</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Physics was initialized in 1969 with the launch of its Bachelor of Science (Physics) program under the initial affiliation of the University of Madras, transitioning smoothly to Thiruvalluvar University affiliation in 2005. To open up higher education paths for rural students, the department introduced its Postgraduate (M.Sc.) curriculum in the 2012–13 academic cycle.
                  {"\n\n"}
                  Elevated to a full PG and Research Department of Physics in 2018, the division has successfully driven specialized investigations across highly transformative scientific domains. The faculty and scholars are actively engaged in exploratory tracks including Spectroscopy, Crystallography, Quantum Chemical Calculation frameworks, Ultrasonic diagnostics, and Nanotechnology.
                </p>
              </div>
            </Reveal>

            {/* Strategic Anchors: Values & Mission Goals */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Target className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Departmental Objectives</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To instill strict academic discipline, professional sincerity, and social accountability in student pursuits. The department targets equipping majors with an expansive grasp of the physical principles governing the universe, strengthening analytical reasoning, and cultivating the creative thinking matrices vital for prospective research and administrative careers.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <TrendingUp className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Future Operational Blueprints</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 text-justify leading-relaxed">
                    <li>Constructing isolated, high-spec labs for electronics, core general practicals, and deep research schemes.</li>
                    <li>Integrating digitized smart classrooms to leverage web-based learning tools.</li>
                    <li>Deploying targeted certificate coaching courses and managing an institutional alumni database.</li>
                    <li>Sustaining an annual cycle of national or international technical conferences.</li>
                    <li>Committing each faculty member to publish at least two investigative articles annually in reputable international journals.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Physical Labs & Curricular Activities */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Layers className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Infrastructure Assets & Active Engagement</h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  The department features full laboratory frameworks optimized to conduct general and electronic physics experiments for both core majors and allied program candidates, supplemented by tailored optics labs. Postgraduate modules operate fluidly across the Main Wing and the modern Dr. MGR Centenary Building.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Academic Adjustments & Milestone Events</h4>
                    <p className="text-muted-foreground leading-normal">To empower student commitment across Sports, NCC, and NSS camps, laboratory sessions are dynamically allocated during afternoon blocks. The department hosts annual National Science Day functions and association assemblies.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Applied Field Visits & Projects</h4>
                    <p className="text-muted-foreground leading-normal">Second-year M.Sc. scholars systematically execute original project theses for university evaluation. Curricular boundaries are further expanded through industrial instrumentation exposures, such as advanced lab analyses at VIT Vellore.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Physics Department Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Faculty Board */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Physics</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {physicsFaculty.map((prof) => (
                        <tr key={prof.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Approved Research Supervisors */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {physicsSupervisors.map((sup) => (
                        <tr key={sup.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }


  // ------------------------------------------
  // VIEW FORK 11: CHEMISTRY
  // ------------------------------------------
  if (lowerDeptId === "chemistry" || lowerDeptId === "chem" || lowerDeptId === "ch") {
    return (
      <>
        <PageHero
          eyebrow="Department of Chemical & Molecular Sciences"
          title="Department of Chemistry"
          subtitle="Nurturing scientific inquiry, innovative molecular synthesis, and groundbreaking research in chemical sciences since 1980."
        />

        {/* Structural Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Historical Profile & Academic Layout</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  Established in the academic year 1980–1981, the Department of Chemistry has evolved into a premier hub for molecular education. The department systematically broadened its foundational curriculum by initiating dual-shift structures for its B.Sc. tracks in 2007–2008 and launching Postgraduate (M.Sc.) courses in 2012–2013. Acknowledging its active research contribution, the division was elevated to a full Research Department in the 2018–2019 cycle.
                  {"\n\n"}
                  Currently, the department guides the academic trajectories of 312 Undergraduate (B.Sc.) and 58 Postgraduate (M.Sc.) scholars. In addition to its core majors, it delivers vital subsidiary chemistry modules tailored for students specializing in Physics, Botany, or Zoology.
                </p>
              </div>
            </Reveal>

            {/* Strategic Anchors: Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Vision</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To establish a model centre of excellence in education across the frontier areas of chemistry. The primary focus rests on preparing highly competent graduates and post-graduates equipped with the dynamic skills necessary to navigate and excel within the rapidly shifting global scenarios of chemical science throughout their careers.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Mission & Objectives</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 text-justify leading-relaxed">
                    <li>To impart exceptional value-driven education through cutting-edge, updated datasets across theoretical and applied chemistry fields.</li>
                    <li>To train scholars in solving intricate chemical problems by utilizing logical workflows grounded in well-established scientific principles.</li>
                    <li>To align student training with deep core frameworks like Organic, Polymer, Applied, and Medicinal chemistry, maintaining contact with ongoing global breakthroughs.</li>
                    <li>To produce industry-ready and academia-ready professionals capable of heading development initiatives across the country.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Specialized Laboratory Infrastructure */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <FlaskConical className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Laboratory Ecosystem & Active Research Thrusts</h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  The department features a spacious, meticulously managed five-laboratory array specifically segmented to match rigorous experimental demands up to the PG and doctoral levels. This layout includes two dedicated Under Graduate laboratories, one specialized Post Graduate laboratory, an Allied Chemistry station, and an isolated Research laboratory.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Precision Instrumentation & Safety</h4>
                    <p className="text-muted-foreground leading-normal">Each ventilated lab module hosts a comfortable seating matrix for about 30 scholars simultaneously. The setups are completely provisioned with high-accuracy digital measuring instruments, molecular kits, experimental gadgets, structural charts, and modern safety apparatus.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Active Structural Investigations</h4>
                    <p className="text-muted-foreground leading-normal">Research teams and Ph.D. scholars drive structured, high-impact investigations into prominent scientific fields, including Drug Discovery and Development (Natural Products), Polymer Chemistry, Organic Synthesis, Advanced Materials Science, and Computational Chemistry.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Chemistry Department Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Board */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Chemistry</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {chemistryFaculty.map((prof, i) => (
                        <tr key={i} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Approved Research Supervisors */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {chemistrySupervisors.map((sup, i) => (
                        <tr key={i} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }


  // ------------------------------------------
  // VIEW FORK 12: BOTANY
  // ------------------------------------------
  if (lowerDeptId === "botany" || lowerDeptId === "bot") {
    return (
      <>
        <PageHero
          eyebrow="Department of Plant & Ecological Sciences"
          title="Department of Botany"
          subtitle="Exploring plant diversity, conservative ecology, and modern bio-technological research since 1969."
        />

        {/* Structural Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Historical Legacy & Student Matrix</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Botany initiated its academic footprint in 1969 with the introduction of the Bachelor of Science (B.Sc.) in Botany. Adapting to modern institutional frameworks, the department implemented a dual-shift architecture in July 2007, running parallel streams in both English and Tamil mediums. To accommodate higher academic exploration, the Postgraduate (M.Sc.) course was established in the 2012–2013 cycle.
                  {"\n\n"}
                  Currently, the department fosters the educational growth of 302 Undergraduate (UG) and 36 Postgraduate (PG) scholars. Admissions strictly adhere to regional Higher Secondary metrics and communal roster frameworks. Additionally, the department handles allied botany requirements for scholars majoring in neighboring branches like Chemistry and Zoology.
                </p>
              </div>
            </Reveal>

            {/* Strategic Anchors: Vision & Mission Split */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Eye className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Vision Foundation</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    To deliver affordable, high-quality botanical education while equipping students with practical taxonomic and ecological skills. The department identifies hidden potentials, shapes critical thinking, and prepares scholars to evolve into self-reliant leaders, green entrepreneurs, and ethical citizens.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Objective Anchors</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 text-justify leading-relaxed">
                    <li>Train scholars in clear macroscopic/microscopic identification and scientific plant labeling.</li>
                    <li>Nurture an active aptitude towards ecological preservation and conservation of natural biomes.</li>
                    <li>Deliver holistic, value-based pedagogy combining traditional field studies with innovative modern laboratory assays.</li>
                    <li>Ensure educational equity by providing robust remedial support pathways for slow learners.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Ecological Assets & Laboratory Facilities */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Sprout className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Botanical Treasures & Instrumentation Arrays</h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  Since its inception, the department has maintained a historic Botanical Garden—a vast conservatory of regional plant wealth containing rare, endangered species, mature trees, and shrubs that serve as a living laboratory for young botanists.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Analytical Hardware Inventory</h4>
                    <p className="text-muted-foreground leading-normal">The department laboratories are provisioned with accurate scientific equipment to conduct biochemical and plant physiological experiments, featuring high-spec Hot Air Ovens, Centrifuges, high-pressure Autoclaves, Shaking Incubators, digital projection assemblies, and horizontal Laminar Airflow Chambers.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Holistic & Co-Curricular Trajectories</h4>
                    <p className="text-muted-foreground leading-normal">Focuses on comprehensive development via national/state symposia, environmental campaigns, and competitive exam training. It cultivates values like social responsibility, interreligious harmony, and gender equity alongside targeted skill development to match dynamic global employment markets.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Botany Faculty Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Grid */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Botany</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {botanyFaculty.map((prof, i) => (
                        <tr key={i} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }


  // ------------------------------------------
  // VIEW FORK 13: ZOOLOGY
  // ------------------------------------------
  if (lowerDeptId === "zoology" || lowerDeptId === "zoo" || lowerDeptId === "zoo-sci") {
    return (
      <>
        <PageHero
          eyebrow="Department of Animal & Biosphere Sciences"
          title="Department of Zoology"
          subtitle="Advancing faunal biology, ecological aquaculture, and bio-resource management applications since 1968."
        />

        {/* Structural Profile */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Milestone className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Historical Legacy & Staff Distribution</h2>
                </div>
                <p className="text-sm text-foreground/95 leading-relaxed text-justify whitespace-pre-line">
                  The Department of Zoology commenced its academic trajectory in 1968, operating initially as an allied division providing subsidiary biological training for B.Sc. Botany and Chemistry students. Recognizing its expanding scope, the department was upgraded to a major division in 2013, launching its full Undergraduate (B.Sc.) major degree stream. Today, the program runs dual tracks in both Tamil and English mediums, admitting 24 students annually per medium, supporting a collaborative student community of approximately 144 scholars.
                  {"\n\n"}
                  The academic team is built upon a sanctioned strength of seven regular teaching posts and a dedicated laboratory technician. At present, the department features an Assistant Professor and an Associate Professor, with one faculty member explicitly deputed from Annamalai University. The remaining positions are maintained by five highly experienced Guest Lecturers. Notably, 100% of the active faculty board hold Ph.D. degrees, combining rich classrooms skills with deep research profiles.
                </p>
              </div>
            </Reveal>

            {/* Strategic Anchors: Objectives & Methodology */}
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Target className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Primary Objectives</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                    The department prioritizes high-tier academic values paired with deliberate personality and moral character building. Beyond delivering syllabus metrics, it is structured to cultivate technical competence, professional communication skillsets, and enduring social commitment among its undergraduate scholars.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3 h-full">
                  <div className="flex items-center gap-2.5 text-primary border-b pb-2">
                    <Compass className="size-4 text-gold-deep" />
                    <h3 className="font-bold text-xs uppercase tracking-wider">Curriculum Execution</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 text-justify leading-relaxed">
                    <li>**Granular Instruction:** Syllabi are detailed point-by-point via comprehensive unit-wise modular breakdowns.</li>
                    <li>**Individual Focus:** Practical laboratory sessions are managed by giving undivided personal attention to every student.</li>
                    <li>**Continuous Auditing:** Academic benchmarks are verified using routine class evaluations, model examinations, and student/alumni feedback loops.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Applied Skill-Based Training & Lab Assets */}
            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
                  <Layers className="size-5 text-gold-deep" />
                  <h2 className="text-lg font-bold">Skill Electives & Practical Infrastructure</h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  To open up modern vocational paths, the curriculum integrates specialized, entrepreneurially-focused elective papers, including Vermiculture, Pisciculture, and Industrial Fishery Management modules.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Laboratory Assets & Reference Library</h4>
                    <p className="text-muted-foreground leading-normal">The department administers two fully-furnished, spacious science laboratories equipped with customized worktables, modern microscopes, and high-capacity refrigeration setups. Glassware and required bio-reagents are continuously updated through state funding. Furthermore, the in-house library stores over 2,000 subject volumes to aid student and researcher studies.</p>
                  </div>
                  <div className="bg-muted/30 border border-border/60 p-4 rounded-xl space-y-1">
                    <h4 className="font-bold text-primary">Advanced Pedagogy & Research</h4>
                    <p className="text-muted-foreground leading-normal">Faculties enrich learning using LCD setups, Over Head Projectors, Bio-Visual Charts, and 3D illustrative models. Scholars participate in regional symposia and soft-skill ICT camps, while teachers routinely publish innovative findings in national and international peer-reviewed journals.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Zoology Faculty Registries */}
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Core Faculty Grid */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <Users className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Faculty Registry for Zoology</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">NAME OF THE STAFF</th>
                        <th className="p-4 font-semibold">QUALIFICATION</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 font-semibold text-center w-28">SHIFT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {zoologyFaculty.map((prof, i) => (
                        <tr key={i} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{i + 1}</td>
                          <td className="p-4 font-bold text-primary">{prof.name}</td>
                          <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase">{prof.shift}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Approved Research Supervisors */}
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">Approved Research Supervisors (M.Phil. / Ph.D.)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
                        <th className="p-4 font-semibold">SUPERVISOR NAME</th>
                        <th className="p-4 font-semibold">DESIGNATION</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED M.PHIL</th>
                        <th className="p-4 text-center font-semibold w-32">APPROVED PH.D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {zoologySupervisors.map((sup, i) => (
                        <tr key={i} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{i + 1}</td>
                          <td className="p-4">
                            <div className="font-bold text-primary">{sup.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{sup.qualification}</div>
                          </td>
                          <td className="p-4 text-xs font-medium text-muted-foreground">{sup.designation}</td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.mphil === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.mphil}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${sup.phd === "Yes" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "text-muted-foreground/40"}`}>
                              {sup.phd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

  // ------------------------------------------
  // VIEW FORK 4: STAGING FALLBACKS (OTHER 10 DEPTS)
  // ------------------------------------------
  const normalizedTitle = deptId ? deptId.replace("-", " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase()) : "";
  return (
    <>
      <PageHero eyebrow="Academic Registry" title={`Department of ${normalizedTitle}`} subtitle="Cultivating domain operational expertise guided under Thiruvalluvar University parameters." />
      <Section>
        <Reveal>
          <div className="max-w-2xl mx-auto p-12 border border-dashed rounded-3xl bg-card text-center space-y-3 text-muted-foreground">
            <BookOpen className="size-8 mx-auto stroke-1 opacity-60 text-gold-deep" />
            <h3 className="text-base font-bold text-primary">Department Registry Pending Profile Upload</h3>
            <p className="text-xs max-w-md mx-auto leading-relaxed">
              Official introductory descriptions, academic milestone timelines, and specific faculty registry datasets for the Department of {normalizedTitle} are currently undergoing structural formatting and will be rendered here shortly.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}