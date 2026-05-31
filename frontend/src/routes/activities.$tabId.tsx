import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CloudLightning, FolderSync, CheckCircle2, Bookmark, GraduationCap, 
    Award, BookOpen, Clock, Shield, Milestone, HeartHandshake, Compass,Heart, 
    Users, Dumbbell,Trophy, Sparkles,Droplet, Inbox, BrainCircuit,HeartPulse,Trash2, Scale,Gavel, AlertTriangle,ShieldAlert, Briefcase, MapPin } from "lucide-react";

const PageHero = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <div className="bg-primary text-primary-foreground py-16 px-6 border-b border-border bg-gradient-to-br from-primary via-primary to-primary/90">
    <div className="max-w-5xl mx-auto space-y-3">
      <span className="text-xs uppercase tracking-widest font-bold text-gold-deep bg-primary-foreground/10 px-3 py-1 rounded-full">{eyebrow}</span>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-sm md:text-base max-w-2xl text-primary-foreground/80 leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

export const Route = createFileRoute("/activities/$tabId")({
  component: ActivitiesDynamicPage,
});

function ActivitiesDynamicPage() {
  const { tabId } = useParams({ from: "/activities/$tabId" });
  const normalizedId = tabId?.toLowerCase();

  // Mapping for clear display names
  const activityNames: Record<string, string> = {
    "clp": "Computer Literacy Programme (CLP)",
    "ncc": "National Cadet Corps (NCC)",
    "nss": "National Service Scheme (NSS)",
    "yrc": "Youth Red Cross (YRC)",
    "sports": "Sports & Athletics Department",
    "extension": "Extension Activities & Outreach",
    "sc-st-welfare": "SC / ST Welfare Cell",
    "college-committees": "College Committees Document Ledger",
    "womens-cell": "Women's Development Cell",
    "placement": "Placement & Career Guidance Cell",
    "anti-ragging": "Anti-Ragging & Anti-Eveteasing Committee",
    "grievance": "Student Grievance Redressal Cell",
    "counseling": "Student Counseling & Mentorship Cell",
  };

  const currentTitle = activityNames[normalizedId] || "Campus Activity Hub";

  // -------------------------------------------------------------
  // CASE A: IF IT IS COLLEGE COMMITTEES -> RENDER THE PDF PLACEHOLDER
  // -------------------------------------------------------------
  if (normalizedId === "college-committees") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Administrative Infrastructure" 
          title={currentTitle} 
          subtitle="Official regulatory constitution structure and statutory member logs." 
        />
        <section className="py-12 px-4 max-w-xl mx-auto text-center space-y-5">
          <div className="border border-border bg-card p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-primary" />
            <div className="mx-auto size-14 bg-amber-500/10 text-amber-600 flex items-center justify-center rounded-2xl mb-4">
              <FolderSync className="size-6 text-gold-deep" />
            </div>
            <h2 className="text-lg font-extrabold text-primary mb-2">Committee PDF Synchronizing</h2>
            <p className="text-xs text-muted-foreground mb-4">
              The statutory balance data sheets and verified committee portfolios for <span className="font-bold text-foreground bg-muted px-1.5 py-0.5 rounded border">{currentTitle}</span> are currently being converted to server-ready formats.
            </p>
            <div className="bg-muted/40 border p-4 rounded-xl text-left text-[11px] text-muted-foreground flex gap-2.5 mb-4">
              <CloudLightning className="size-4 text-amber-600 shrink-0" />
              <span>Once compilation concludes, the verified institutional files will render right inside this interface.</span>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
              <ArrowLeft className="size-3.5" /> Return to Dashboard
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE B: IF IT IS CLP -> RENDER OFFICIAL PROGRAMME CONTENT
  // -------------------------------------------------------------
  if (normalizedId === "clp") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Government of Tamil Nadu Initiative" 
          title={currentTitle} 
          subtitle="Enriching undergraduate non-computer science students with core technical literacy and market-oriented skillsets since 2000-2001." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Content Pane */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview Section */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" /> Programme Overview
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Computer Literacy Programme was initiated by the Government of TamilNadu in all Government Colleges to enrich all Undergraduate Non-Computer Science students from the year 2000-2001.
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                This course was exclusively designed and geared with updated systems orienting towards providing the required knowledge to the students and for their upliftments in computer literacy. This course has been conducted for students from all disciplines excepting computer science.
              </p>
            </div>

            {/* Program Benefits Section */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Award className="size-5 text-emerald-500" /> Benefits of Computer Literacy Programme
              </h2>
              <ul className="grid gap-3 text-sm text-foreground/85">
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>The Computer Literacy Program is being conducted for Non-computer science students.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>The students are being trained on the state-of-art technologies both theoretically and practically.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>The orientation of the training is towards job fetching in the IT market with renowned skills in recent developments.</span>
                </li>
              </ul>
            </div>

            {/* Curriculum Breakdown */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="size-5 text-amber-500" /> Course Curriculum & Evaluation
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The students are trained on the basic knowledge of Ms-Office, Internet technologies, basics of C language and HTML.
              </p>
              <div className="bg-muted/50 border p-4 rounded-xl text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground block mb-1">State Certification Framework:</span>
                A common examination (theory) is conducted for the CLP students throughout Tamil Nadu, at the end of the course. Based on their performance, a Certificate is issued from the Government of Tamil Nadu which is of great potential to them during their placement opportunities.
              </div>
            </div>
          </div>

          {/* Metrics & Administrative Sidebar */}
          <div className="space-y-6">
            {/* Cohort Administration Details */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bookmark className="size-3.5 text-gold-deep" /> Batch Administration
              </h3>
              <ul className="text-xs space-y-3 text-muted-foreground divide-y divide-border/50">
                <li className="pt-3 flex justify-between">
                  <span>Students on Roll</span>
                  <span className="font-bold text-foreground bg-background border px-2 py-0.5 rounded">Around 867</span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Academic Span</span>
                  <span className="font-bold text-foreground">13 Departments</span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Class Timings</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Clock className="size-3 text-primary" /> 9.00 AM to 5.00 PM
                  </span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Working Cadence</span>
                  <span className="font-medium text-foreground">All College Working Days</span>
                </li>
              </ul>
            </div>

            {/* Department Governance Profile */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Monitoring Body</span>
              <h4 className="text-xs font-extrabold text-primary">Department of Computer Science</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The Department of Computer Science is monitoring and managing the conduct of the programme.
              </p>
              <div className="border-t pt-3 mt-1 text-[11px]">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold mb-0.5">Course Coordinator</span>
                <span className="font-bold text-foreground block">Dr. K.Arulanandam</span>
                <span className="text-muted-foreground text-[10px]">MCA., M.Phil., Ph.D.</span>
                <span className="text-primary block mt-0.5 font-medium">Assistant Professor & Head</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }


  // -------------------------------------------------------------
  // CASE C: IF IT IS NCC -> RENDER NCC PROGRAMME PRODUCTION CONTENT
  // -------------------------------------------------------------
  if (normalizedId === "ncc") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Ministry of Defence" 
          title={currentTitle} 
          subtitle="Empowering youth through character, adventure, and the ideals of selfless service." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            {/* Introduction Card */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Shield className="size-5 text-primary" /> Introduction
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The 21st century has witnessed a drastic change due to globalization. Today, youth development and empowerment is the focus of almost all countries. One of the important key factors of empowering the youth is the National Cadet Corps (NCC). 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Originally created by the British as the 'University Corps' to serve as a second line of defence during the First World War, it was renamed into the National Cadet Corps under the Parliament Act XXXI on 16th April 1948 following independence. Today, Indian NCC is the world’s largest youth organization, commanding a strength of 15 lakhs school and college students under the Ministry of Defence.
              </p>
            </div>

            {/* Aims of NCC */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Award className="size-5 text-emerald-500" /> Aims of NCC
              </h2>
              <ul className="grid gap-3 text-sm text-foreground/85">
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>To develop Character, Comradeship, Discipline, Secular outlook, Spirit of Adventure, Sportsmanship and ideals of selfless service among the youth of the Country.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>To create a Human Resource of organized, trained and motivated youth, to provide leadership in all walks of life and always be available for the service of the Nation.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>To provide a suitable environment to motivate the youth to take up a career in the Armed Forces.</span>
                </li>
              </ul>
            </div>

            {/* Objectives Card */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Milestone className="size-5 text-amber-500" /> Core Objectives
              </h2>
              <ul className="grid gap-2.5 text-sm text-foreground/85">
                <li className="flex gap-2 items-start">👉 Train volunteer youth to become confident, committed and competent leaders.</li>
                <li className="flex gap-2 items-start">👉 Enhance awareness levels for being responsible citizens of the country.</li>
                <li className="flex gap-2 items-start">👉 Provide opportunities to enhance life, soft, communication skills, and personality development.</li>
                <li className="flex gap-2 items-start">👉 Conduct value-based contributions towards social and community development.</li>
                <li className="flex gap-2 items-start">👉 Undertake adventure activities for leadership and risk-taking abilities.</li>
                <li className="flex gap-2 items-start">👉 Launch "good-will ambassadors" to project the image of the country overseas.</li>
                <li className="flex gap-2 items-start">👉 Provide an environment to motivate cadets to join the armed forces as a career.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar Regiment & Battalion Details */}
          <div className="space-y-6">
            {/* Unit Deployment Summary */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bookmark className="size-3.5 text-gold-deep" /> GTM NCC Unit
              </h3>
              <ul className="text-xs space-y-3 text-muted-foreground divide-y divide-border/50">
                <li className="pt-3 flex justify-between">
                  <span>NCC Unit</span>
                  <span className="font-bold text-foreground bg-background border px-2 py-0.5 rounded">1A Company</span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Unit Raising Day</span>
                  <span className="font-semibold text-foreground">4.09.2014</span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Battalion</span>
                  <span className="font-semibold text-foreground text-right">10(TN) Bn NCC, Vellore</span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Group HQ</span>
                  <span className="font-semibold text-foreground">Madras ‘A’</span>
                </li>
                <li className="pt-3 flex justify-between">
                  <span>Sanctioned Strength</span>
                  <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2 rounded">104 Cadets</span>
                </li>
              </ul>
            </div>

            {/* Officer In Charge Profile */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Commanding Officer</span>
              <div className="border-t pt-2 text-[11px]">
                <span className="font-bold text-foreground block text-xs">Lt. L.Vikraman</span>
                <span className="text-primary block mt-0.5 font-medium">Associate NCC Officer</span>
                <span className="text-muted-foreground text-[10px] block">Assistant Professor of Mathematics</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }


  if (normalizedId === "nss") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Social Service Wing" 
          title={currentTitle} 
          subtitle="Fostering community service, leadership, and team spirit through social outreach since 1969." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview & Motto */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <HeartHandshake className="size-5 text-primary" /> Programme Overview & Motto
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Launched in 1969, the National Service Scheme (NSS) offers opportunities for services to develop character, team spirit, and leadership qualities while building a direct path to social awareness.
              </p>
              <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl space-y-2">
                <span className="text-xs uppercase tracking-wider font-extrabold text-primary block">The NSS Motto</span>
                <blockquote className="text-lg font-black tracking-tight text-primary">“Not Me But You” / “Not me, not you, but we”</blockquote>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  This expression underscores forgetting and surrendering the self to render selfless service to others. It expands into the guiding philosophies: <span className="italic">“I do not live for me but for you”</span> and <span className="italic">“The world is not only for me but to you also.”</span>
                </p>
              </div>
            </div>

            {/* NSS Symbol Concept */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Compass className="size-5 text-amber-500" /> The NSS Symbol
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The official symbol of the National Service Scheme is based on the <strong>‘Rath’ wheel of the Konark Sun Temple of Orissa</strong>. These giant wheels portray the cycle of creation, preservation, and release, signifying dynamic movement across time and space. The simplified Sun-chariot wheel layout highlights a progressive cycle of life.
              </p>
            </div>

            {/* Engagement Activities & Regular Projects */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Award className="size-5 text-emerald-500" /> Mandated Activities & Project Types
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Volunteers learn from people in villages how to lead a good life despite a scarcity of resources, participating in deployment projects such as:
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-muted/40 border p-3 rounded-xl text-center">
                  <span className="text-xs text-muted-foreground block">Adopted Area</span>
                  <span className="text-sm font-bold text-foreground">40hrs + 40hrs</span>
                </div>
                <div className="bg-muted/40 border p-3 rounded-xl text-center">
                  <span className="text-xs text-muted-foreground block">University Level</span>
                  <span className="text-sm font-bold text-foreground">10hrs + 10hrs</span>
                </div>
                <div className="bg-muted/40 border p-3 rounded-xl text-center">
                  <span className="text-xs text-muted-foreground block">College Level</span>
                  <span className="text-sm font-bold text-foreground">10hrs + 10hrs</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-2 pt-2">
                <p className="flex items-center gap-2">🎯 <strong>Regular Programs:</strong> 120 hours per year requirement.</p>
                <p className="flex items-center gap-2">🎪 <strong>Special Camping Programs:</strong> Structured and conducted every year.</p>
              </div>
            </div>
          </div>

          {/* Sidebar Metrics and Officers */}
          <div className="space-y-6">
            {/* Unit Cohort Box */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bookmark className="size-3.5 text-gold-deep" /> Unit Configuration
              </h3>
              <ul className="text-xs space-y-3 text-muted-foreground divide-y divide-border/50">
                <li className="pt-3 flex justify-between"><span>Total Units</span><span className="font-bold text-foreground">4 Active Units</span></li>
                <li className="pt-3 flex justify-between"><span>Enrolled Volunteers</span><span className="font-bold text-foreground bg-background border px-2 py-0.5 rounded">400 Students</span></li>
                <li className="pt-3 flex justify-between"><span>Service Window</span><span className="font-semibold text-foreground">Min. 2 Consecutive Years</span></li>
                <li className="pt-3 flex justify-between"><span>Annual Engagement</span><span className="font-semibold text-emerald-600">120 Hours Min.</span></li>
              </ul>
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-amber-800 dark:text-amber-400">
                ⚠️ <strong>Note:</strong> Students must maintain mandatory registration for consecutive TWO years to earn completion validation.
              </div>
            </div>

            {/* Management & Program Officers */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Supervisory Head</span>
                <h4 className="text-xs font-extrabold text-foreground">The College Principal</h4>
              </div>
              <div className="border-t pt-3 space-y-3">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">NSS Program Officers</span>
                <div className="text-xs space-y-2 divide-y divide-border/40">
                  <div className="pt-1 flex justify-between"><span>Unit I</span><span className="font-bold text-foreground">Dr. P. Chakkaravarthy</span></div>
                  <div className="pt-2 flex justify-between"><span>Unit II</span><span className="font-bold text-foreground">Prof. M. Malarvizhi</span></div>
                  <div className="pt-2 flex justify-between"><span>Unit III</span><span className="font-bold text-foreground">Dr. P. Puvi Arasu</span></div>
                  <div className="pt-2 flex justify-between"><span>Unit IV</span><span className="font-bold text-foreground">Dr. S. Manigandan</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE E: IF IT IS YRC -> RENDER YRC PROGRAMME PRODUCTION CONTENT
  // -------------------------------------------------------------
  if (normalizedId === "yrc") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Indian Red Cross Society Constituent" 
          title={currentTitle} 
          subtitle="An international student group movement dedicated to the core values of humanitarian service, protection of health, and world friendliness." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Heart className="size-5 text-red-500 animate-pulse" /> Overview & Motto
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The International Red Cross movement is a well-known worldwide humanitarian organization present in almost all countries. The Youth Red Cross (YRC) is the most crucial constituent of its parent organization, the Indian Red Cross Society. 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Organized at its initial stages for students between 18 and 25 years of age within colleges, this group movement functions with a singular focus: serving people under distress without any consideration of caste, religion, language, or nationality.
              </p>
              <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider block mb-1">Official YRC Motto</span>
                <p className="text-base font-extrabold text-foreground">"To Serve"</p>
              </div>
            </div>

            {/* Core Principles Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Fundamental Principles of Red Cross */}
              <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-500" /> Fundamental Principles
                </h3>
                <ul className="text-xs space-y-2 text-muted-foreground font-medium">
                  <li className="flex items-center gap-2">❤️ Humanity</li>
                  <li className="flex items-center gap-2">⚖️ Impartiality</li>
                  <li className="flex items-center gap-2">🏳️ Neutrality</li>
                  <li className="flex items-center gap-2">🧩 Independence</li>
                  <li className="flex items-center gap-2">🤝 Voluntary Service</li>
                  <li className="flex items-center gap-2">🌐 Unity & Universality</li>
                </ul>
              </div>

              {/* Three Core YRC Pillars */}
              <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <Award className="size-4 text-amber-500" /> Three YRC Principles
                </h3>
                <ul className="text-xs space-y-3 text-foreground/85">
                  <li className="flex items-start gap-2">🛡️ <span>Protection of health and life</span></li>
                  <li className="flex items-start gap-2">🏥 <span>Service to the sick and suffering</span></li>
                  <li className="flex items-start gap-2">🌍 <span>Promotion of national and international friendship to develop the mental and moral capacities of youth</span></li>
                </ul>
              </div>
            </div>

            {/* Core Operational Focus */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="size-5 text-primary" /> Strategic Activities & Relief Operations
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Under the guidance of the designated Programme Officer, student volunteers are thoroughly trained and encouraged to actively coordinate and manage vital humanitarian channels:
              </p>
              <ul className="grid gap-2.5 text-sm text-foreground/85 pl-1">
                <li className="flex gap-2 items-center">✨ Promotion of community health and hygiene.</li>
                <li className="flex gap-2 items-center">✨ Direct service deployment to needy or vulnerable demographics.</li>
                <li className="flex gap-2 items-center">✨ Relief operations during critical crises like floods, fires, and natural calamities.</li>
                <li className="flex gap-2 items-center">✨ Fostering structural national integration and world friendliness.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar Profiling and Camp Highlights */}
          <div className="space-y-6">
            {/* Management Box */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Unit Leadership</span>
              <div className="border-t pt-3">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">YRC Programme Officer</span>
                <span className="font-bold text-foreground block text-sm">Prof. N. GAJALAKSHMI</span>
                <span className="text-primary text-[11px] font-medium block mt-0.5">Assistant Professor</span>
                <span className="text-muted-foreground text-[10px] block">Department of Mathematics</span>
              </div>
            </div>

            {/* Features & Campus Engagements */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Users className="size-3.5 text-gold-deep" /> Campus Operational Framework
              </h3>
              <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <div className="bg-background border p-3 rounded-xl">
                  <span className="font-bold text-foreground block mb-1">Orientation Protocol</span>
                  On the first day of college reopening, the exact aims, operational mandates, and community functions of the YRC are thoroughly presented to the student body members.
                </div>
                <div className="bg-background border p-3 rounded-xl">
                  <span className="font-bold text-foreground block mb-1">Blood Donation Camp</span>
                  Every single academic year, a voluntary blood donation camp is structured and hosted on campus by the YRC purely on the basis of humanitarian service.
                </div>
              </div>

              {/* Dynamic Awareness Targets */}
              <div className="pt-2 border-t border-border/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Conducted Awareness Hubs:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Health Counseling", "Meditation", "Environmental Protection", "First Aid", "Disaster Management"].map((item) => (
                    <span key={item} className="text-[10px] font-medium bg-secondary text-secondary-foreground border px-2 py-0.5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE F: IF IT IS SPORTS -> RENDER SPORTS & ATHLETICS MOVEMENT
  // -------------------------------------------------------------
  if (normalizedId === "sports") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Department of Physical Education" 
          title={currentTitle} 
          subtitle="Nurturing physical excellence, mental fortitude, and ethical sportsmanship to cultivate a wholesome personality." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            {/* Philosophy & Overview */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Dumbbell className="size-5 text-primary" /> Philosophy & Core Benefits
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Justifying the timeless philosophy, <strong>“a sound mind resides only in a sound body,”</strong> sports education at our institution actively refines physical stamina alongside essential lifestyle metrics like obedience, self-discipline, punctuality, and willpower. 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                By blending structural athletics with academic modules, the department helps students protect themselves against lifestyle conditions like obesity, diabetes, and heart problems while actively managing stress, anxiety, and performance challenges.
              </p>
            </div>

            {/* Vision & Mission Statements */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Trophy className="size-5 text-gold-deep" /> Vision & Mission
              </h2>
              <div className="bg-muted/40 border p-4 rounded-xl space-y-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">Strategic Vision</span>
                <p className="text-xs text-foreground/80 italic leading-relaxed">
                  “Our vision is to promote ethical behavior and good Sportsmanship where every woman pupil is guided and facilitated to become a wholesome personality with high principles relevant to today’s global reality and the challenges of tomorrow.”
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-2">Operational Mission</span>
                <ul className="grid gap-2 text-xs text-muted-foreground">
                  <li className="flex gap-2 items-start">✔️ Identify and nurture intrinsic athletic skills.</li>
                  <li className="flex gap-2 items-start">✔️ Provide robust, competition-ready tournament training.</li>
                  <li className="flex gap-2 items-start">✔️ Extend holistic health counseling and consultative support.</li>
                  <li className="flex gap-2 items-start">✔️ Develop highly disciplined professionals contributing to societal needs.</li>
                </ul>
              </div>
            </div>

            {/* Social Responsibility: Camps */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Award className="size-5 text-emerald-500" /> Outreach & Social Development
              </h2>
              <h3 className="text-xs font-bold text-foreground">Sports Camp for Differently Abled & Rural Children</h3>
              <p className="text-sm text-foreground/85 leading-relaxed">
                As a pillar of community empowerment, the department steps beyond regular student modules. Every single academic year, the college organizes specialized sports training camps designed to uplift and provide dedicated coaching to rural school children and differently-abled persons.
              </p>
            </div>
          </div>

          {/* Sidebar Operations and Sports Profiles */}
          <div className="space-y-6">
            {/* Leadership Profile */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Department Head</span>
              <div className="border-t pt-3">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">Physical Director</span>
                <span className="font-bold text-foreground block text-sm">Dr. M.MURALI KRISHNA</span>
                <span className="text-primary text-[11px] font-medium block mt-0.5">Director of Physical Education</span>
              </div>
            </div>

            {/* Sports Infrastructure Box */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bookmark className="size-3.5 text-gold-deep" /> Infrastructure & Features
              </h3>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">🏟️ Exceptionally spacious playground facilities</li>
                <li className="flex items-center gap-2">🏋️ Separate fitness center infrastructures for Men & Women</li>
                <li className="flex items-center gap-2">🛡️ Dedicated Self-Defense Training programs</li>
              </ul>

              {/* Game Disciplines */}
              <div className="pt-3 border-t border-border/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Available Club Sports:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Chess", "Cricket", "Foot Ball", "Volley Ball", "Badminton", "Hand Ball"].map((game) => (
                    <span key={game} className="text-[10px] font-semibold bg-background text-foreground border border-border/80 px-2.5 py-1 rounded-md shadow-sm">
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE G: IF IT IS EXTENSION -> RENDER EXTENSION ACTIVITIES & OUTREACH
  // -------------------------------------------------------------
  if (normalizedId === "extension") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Institutional Outreach & Social Action" 
          title={currentTitle} 
          subtitle="Mobilizing student volunteers for nation-building, healthcare campaigns, environmental sustainability, and cultural preservation." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* National & Strategic Campaigns */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Milestone className="size-5 text-primary" /> National Service Campaigns
              </h2>
              
              <div className="space-y-4 divide-y divide-border/60">
                {/* Swachh Bharat Mission */}
                <div className="pt-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Trash2 className="size-4 text-amber-500" /> Swachh Bharat Mission (Clean India)
                    </h3>
                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded">250 Volunteers</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Implemented as a nation-wide campaign (Janandolan) aiming at eliminating open defecation in rural areas through mass-scale behavior change. Student volunteers actively drive awareness frameworks and clean-up mechanisms across adopted rural sectors.
                  </p>
                </div>

                {/* Fit India Movement */}
                <div className="pt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Clock className="size-4 text-emerald-500" /> Fit India Movement Cycle Rally
                    </h3>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded">03.06.2021</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A nation-wide campaign encouraging people to incorporate dynamic physical activities and sports into their everyday lives. A dedicated group of 200 NSS candidates participated in the localized cycle rally to champion fitness awareness.
                  </p>
                </div>

                {/* Jal Shakti Abhiyan */}
                <div className="pt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Droplet className="size-4 text-blue-500" /> Jal Shakti Abhiyan (Water Conservation)
                    </h3>
                    <span className="text-[10px] font-bold bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded">350 Volunteers</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inspired by the vision of Prime Minister Shri Narendra Modi on Jal Sanchay, this time-bound, mission-mode campaign gathers student volunteers from rural backgrounds. During the campaign, groundwater experts, officers, and scientists from the Government of India share conservation insights with students via online modes.
                  </p>
                </div>
              </div>
            </div>

            {/* Health, Yoga & Medical Camps */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <HeartPulse className="size-5 text-red-500" /> Public Health & Wellness Campaigns
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* International Yoga Day */}
                <div className="bg-muted/30 border border-border p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-foreground block">International Yoga Day</span>
                    <span className="text-[9px] font-semibold text-muted-foreground bg-background border px-1.5 py-0.5 rounded">21-Jun-2020</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Derived from the Sanskrit word <span className="italic font-medium">“Yuja”</span> (to unite, representing the unification of body and consciousness), this day focuses on spreading yoga's immense health merits. 85 students participated in driving outreach to local communities.
                  </p>
                </div>

                {/* Blood Donation Camp */}
                <div className="bg-muted/30 border border-border p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-foreground block">Annual Blood Donation</span>
                    <span className="text-[9px] font-extrabold text-red-600 bg-red-500/10 px-1.5 py-0.5 rounded">~100 Units</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    The institution organizes a highly successful blood donation camp regularly every year. Leveraging high rural potential and enthusiasm for blood donation, these student efforts directly benefit the public good through local medical channels.
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural & Linguistic Heritage */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Sparkles className="size-5 text-purple-500" /> Cultural Heritage & Arts Awareness
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Conducted by the <strong>Department of Tamil</strong>, a dedicated heritage carnival is hosted to protect, highlight, and spread awareness of traditional Tamil arts and indigenous culture. The platform serves as an open forum featuring various forms of Tamil performing arts and speeches that bring out the hidden creative talents of the student community.
              </p>
            </div>
          </div>

          {/* Sidebar Metrics and Uniformed Services Training Tracking */}
          <div className="space-y-6">
            {/* Uniformed Services Special Metrics */}
            <div className="border border-border bg-primary/5 p-5 rounded-2xl space-y-4 border-primary/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Shield className="size-3.5 text-primary" /> Uniformed Services Training
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Responding to high student interest in serving the nation, the wing relentlessly trains individuals to secure careers within the armed forces, BSF, CRPF, and State Police services.
              </p>
              
              <div className="border-t border-primary/10 pt-3 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Performance Tracking (2020-2021):</span>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-background border rounded-lg p-2">
                    <span className="text-lg font-black text-foreground block">51</span>
                    <span className="text-[9px] text-muted-foreground font-medium block">"B" Certificates</span>
                  </div>
                  <div className="bg-background border rounded-lg p-2">
                    <span className="text-lg font-black text-foreground block">25</span>
                    <span className="text-[9px] text-muted-foreground font-medium block">"C" Certificates</span>
                  </div>
                </div>
              </div>

              {/* Distinctions */}
              <div className="bg-background border p-3 rounded-xl text-[11px] text-muted-foreground space-y-1.5">
                <div className="flex gap-1.5 items-start">
                  <span>🎖️</span>
                  <span><strong>Republic Day Parade:</strong> An NCC cadet successfully represented the institution in the Republic Day celebration parade in Delhi.</span>
                </div>
                <div className="flex gap-1.5 items-start pt-1.5 border-t">
                  <span>🏆</span>
                  <span><strong>UMT Championship:</strong> Secured a prestigious IV place finish at the competitive championship.</span>
                </div>
              </div>
            </div>

            {/* Quick Extension Overview */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bookmark className="size-3.5 text-gold-deep" /> Wing Summary
              </h3>
              <ul className="text-xs space-y-2.5 text-muted-foreground divide-y divide-border/50">
                <li className="pt-2 flex justify-between"><span>Primary Focus</span><span className="font-semibold text-foreground">Rural Integration</span></li>
                <li className="pt-2 flex justify-between"><span>Coordinating Bodies</span><span className="font-semibold text-foreground text-right">NCC, NSS & Depts</span></li>
                <li className="pt-2 flex justify-between"><span>Deployment Scope</span><span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 rounded">Social Welfare</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }


  // -------------------------------------------------------------
  // CASE H: IF IT IS SC-ST-WELFARE -> RENDER SC/ST WELFARE CELL
  // -------------------------------------------------------------
  if (normalizedId === "sc-st-welfare") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Equity & Statutory Compliance" 
          title={currentTitle} 
          subtitle="Coordinating, monitoring, and implementing affirmative policies, scholarships, and remedial coaching programs for academic empowerment." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Overview & Objective */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Scale className="size-5 text-primary" /> Cell Mandate & Objective
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The SC/ST Cell was established to coordinate closely with college authorities in implementing various welfare policies and programs launched by the Central Government, MHRD, UGC, and State Government for the benefit of SC/ST students.
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The staff are actively engaged in solving admission matters, announcing scholarship details, and managing critical hostel accommodations for both men and women students—acting as a user-friendly counselor to all SC/ST employees and scholars, especially those from rural backgrounds.
              </p>
            </div>

            {/* Core Monitored Activities */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" /> Monitored Core Activities
              </h2>
              <ul className="grid gap-3 text-xs text-muted-foreground">
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">🔹</span>
                  <span><strong>Academic Alignment:</strong> Implements MHRD and UGC learning-level schemes to bridge community gaps and bring candidates up to general education levels.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">🔹</span>
                  <span><strong>Publicity & Distribution:</strong> Issues widespread circulars regarding Post-Matric, Meritorious, and Women Scholarships, as well as Fellowships for Research Scholars.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">🔹</span>
                  <span><strong>Institutional Grievance Management:</strong> Amicably resolves structural or professional issues faced by SC/ST students and employees with the management.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">🔹</span>
                  <span><strong>Statutory Reservations Advisory:</strong> Provides active legal position guidance to University Committees regarding recruitments and promotions.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">🔹</span>
                  <span><strong>Book Bank & Grants:</strong> Establishes dedicated library Book Banks and advises students to utilize resource lending based on availability.</span>
                </li>
              </ul>
            </div>

            {/* Comprehensive Scholarship Inventory */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Award className="size-5 text-amber-500" /> Available Schemes & Fellowships
                </h2>
                <p className="text-xs text-muted-foreground">
                  The cell provides continuous moral guidance to help scholars apply for funding through proper channels with robust follow-up activities:
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-foreground/80 border-t pt-3">
                <div className="space-y-1.5">
                  <p>🪙 Educational Loans & Fee Concessions</p>
                  <p>🏅 Gold Medal for Toppers</p>
                  <p>📜 Merit-cum-Means / Post Matric Schemes</p>
                  <p>✈️ National Overseas Scholarships for Education Abroad</p>
                  <p>👩 PG Indira Gandhi Scholarship for Single Girl Child</p>
                  <p>🎓 Rajiv Gandhi National Fellowship for SC/ST / PwD</p>
                  <p>🌐 Maulana Azad National Fellowship for Minorities</p>
                </div>
                <div className="space-y-1.5">
                  <p>🔬 CSIR / DST / ICMR Junior & Senior Fellowships</p>
                  <p>🧪 Dr. D.S. Kothari Post-Doctoral Fellowships (Sciences)</p>
                  <p>🏛️ Dr. S. Radhakrishnan PDF (Humanities & Social Sciences)</p>
                  <p>🚀 DST Start-up Research Grants (Young Scientists)</p>
                  <p>💼 Faculty Recharge Programmes for Researchers</p>
                  <p>🦅 Raman Fellowships for Post-Doctoral Research in USA</p>
                  <p>🩺 ICMR Short-Term Research Studentships</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Focus & Special Classes */}
          <div className="space-y-6">
            {/* Special Training Initiatives */}
            <div className="border border-border bg-primary/5 p-5 rounded-2xl space-y-4 border-primary/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-primary" /> Special Tuning Activities
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Government Thirumagal Mills College has launched customized vertical training tracks to explicitly tune and uplift SC/ST student competency matrices:
              </p>
              
              <div className="space-y-2 pt-1">
                <div className="bg-background border p-2.5 rounded-xl text-xs font-semibold text-foreground flex items-center gap-2">
                  <span>🗣️</span> Remedial English Coaching Classes
                </div>
                <div className="bg-background border p-2.5 rounded-xl text-xs font-semibold text-foreground flex items-center gap-2">
                  <span>📝</span> CSIR-JRF, NET, SLET, GATE & CAT Guidance
                </div>
                <div className="bg-background border p-2.5 rounded-xl text-xs font-semibold text-foreground flex items-center gap-2">
                  <span>🏦</span> Dedicated Banking Exam Coaching
                </div>
                <div className="bg-background border p-2.5 rounded-xl text-xs font-semibold text-foreground flex items-center gap-2">
                  <span>💼</span> Professional Placement Coaching Tracks
                </div>
              </div>
            </div>

            {/* Cell Schedule Box */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Clock className="size-3.5 text-gold-deep" /> Operational Windows
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                To guarantee zero disruption to core degree curriculums, competitive coaching and service commission programs are hosted flexibly:
              </p>
              <div className="bg-background border p-3 rounded-xl text-xs font-bold text-center text-primary space-y-1">
                <div>🌅 Evenings</div>
                <div className="text-muted-foreground text-[10px] font-normal">and</div>
                <div>🗓️ Weekends</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE I: IF IT IS WOMENS-CELL -> RENDER WOMEN'S CELL PROFILE
  // -------------------------------------------------------------
  if (normalizedId === "womens-cell") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Empowerment & Gender Equity Hub" 
          title={currentTitle} 
          subtitle="Fostering a harmonious institutional atmosphere that enables women to pursue their work with dignity, reassurance, and holistic health." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Mission & Core Mandate */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Sparkles className="size-5 text-purple-500" /> Vision & True Potential
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The Women's Cell is systematically constituted to help maintain a perfectly harmonious, safe, and collaborative atmosphere across our institution. It functions actively to empower and orient women to recognize their true inner strength, helping them achieve their personal and professional goals within an increasingly competitive global environment.
              </p>
              <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider block mb-1">Core Directive</span>
                <p className="text-xs text-foreground/90 italic leading-relaxed">
                  "Enabling women to pursue their academic, clinical, and administrative work with full dignity, institutional reassurance, and psychological safety."
                </p>
              </div>
            </div>

            {/* Core Strategic Features */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" /> Objectives & Structural Features
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Living in a patriarchal social structure with deep-rooted and socio-cultural values of male superiority, the cell drives strategic actions to fulfill an egalitarian baseline:
              </p>
              
              <ul className="grid gap-3 text-xs text-muted-foreground pt-1">
                <li className="flex gap-2.5 items-start">
                  <span className="text-purple-500 shrink-0">✨</span>
                  <span><strong>Egalitarian Focus:</strong> Actively dismantles traditional gender biases to construct a balanced, fair, and just campus society.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-purple-500 shrink-0">✨</span>
                  <span><strong>Psychological Balance:</strong> Helps female students steer a balanced course in life where they neither lurk into depression nor feel forced to adopt outward aggression.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-purple-500 shrink-0">✨</span>
                  <span><strong>Holistic Health Safeguards:</strong> Monitors parameters to ensure female students and staff remain strictly healthy both physically and mentally.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-purple-500 shrink-0">✨</span>
                  <span><strong>Omnipresent Growth:</strong> Places specific emphasis on the intentional advancement, development, and scaling of women in every single intellectual and socio-cultural sphere.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-purple-500 shrink-0">✨</span>
                  <span><strong>Empowerment Frameworks:</strong> Organizes structured events, community forums, and target workshops designed exclusively around complete women empowerment.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Executive Committee Details */}
          <div className="space-y-6">
            {/* Committee Composition */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Cell Executive Council</span>
                <h3 className="text-xs font-bold text-foreground mt-0.5">Appointed Committee Members</h3>
              </div>
              
              <div className="space-y-3 border-t pt-3">
                {/* Principal/Head */}
                <div className="bg-muted/40 p-2.5 rounded-xl border">
                  <span className="font-bold text-foreground text-xs block">Dr. P. Vasuki</span>
                  <span className="text-[10px] text-primary font-medium block">Principal (i/c)</span>
                  <span className="text-muted-foreground text-[9px] block">Associate Professor & Head, Dept. of English</span>
                </div>

                {/* Member 2 */}
                <div className="text-xs pl-1">
                  <span className="font-semibold text-foreground block">Dr. A. Thamarai</span>
                  <span className="text-muted-foreground text-[10px]">Assistant Professor of Physics</span>
                </div>

                {/* Member 3 */}
                <div className="text-xs pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold text-foreground block">Prof. N. Gajalakshmi</span>
                  <span className="text-muted-foreground text-[10px]">Assistant Professor of Mathematics</span>
                </div>

                {/* Member 4 */}
                <div className="text-xs pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold text-foreground block">Prof. M. Malarvizhi</span>
                  <span className="text-muted-foreground text-[10px]">Assistant Professor of Mathematics</span>
                </div>

                {/* Member 5 */}
                <div className="text-xs pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold text-foreground block">Prof. S. Bharathi</span>
                  <span className="text-muted-foreground text-[10px]">Assistant Professor of English</span>
                </div>
              </div>
            </div>

            {/* Quick Environment Support Box */}
            <div className="border border-border bg-purple-500/5 p-5 rounded-2xl space-y-3 border-purple-500/15">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-purple-500" /> Support Architecture
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The cell focuses on cultivating an inclusive environment that actively helps women realize their maximum potential, giving their absolute best back to the academic ecosystem and global reality.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }


  // -------------------------------------------------------------
  // CASE J: IF IT IS PLACEMENT -> RENDER PLACEMENT CELL PROFILE
  // -------------------------------------------------------------
  if (normalizedId === "placement") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Corporate Relations & Career Launchpad" 
          title={currentTitle} 
          subtitle="Bridging the gap between corporate industry networks and student talent through training, counseling, and recruitment drives." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Overview & Bridge Platform */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Briefcase className="size-5 text-primary" /> Industry Integration Platform
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The Placement Cell acts as a vital platform that bridges corporate industries and the students of the College. The cell structures campus recruitment drives for both part-time and full-time career opportunities across diverse market sectors. 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Specialized industry internship opportunities are actively created—focusing with particular attention on the practical requirements of the <strong>Computer Science</strong> student cohort. Beyond placements, individualized counseling is offered regarding job mapping and higher education tracks abroad.
              </p>
            </div>

            {/* Core Objectives */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Compass className="size-5 text-emerald-500" /> Strategic Objectives
              </h2>
              <p className="text-xs text-muted-foreground">
                The Career Guidance and Placement Cell drives day-to-day operations to fulfill three core institutional aims:
              </p>
              
              <ul className="grid gap-3.5 text-xs text-muted-foreground pt-1">
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">📌</span>
                  <span><strong>Recruitment Sourcing:</strong> Actively inviting recruiting agencies and premier corporate firms to conduct rigorous on-campus interviews for final-year UG and PG students.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">📌</span>
                  <span><strong>Database Sharing:</strong> Formatting and securely sharing student credentials and databases for off-campus pooling and direct hiring avenues.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">📌</span>
                  <span><strong>Perspective Highlighting:</strong> Organizing comprehensive career guidance programs for outgoing final-year students, highlighting future perspectives of higher education alongside upcoming job opportunities.</span>
                </li>
              </ul>
            </div>

            {/* Training and Skill Development */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="size-5 text-amber-500" /> Skill Transformation & Free Coaching
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                To transform and fulfill our career guidance mandates, the cell hosts <strong>free coaching classes</strong> for highly competitive examinations like the Civil Services (UPSC), TNPSC examinations, and Railway Recruitment Board (RRB) exams. These classes are handled in direct association with designated district employment officials.
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                To continually motivate, inspire, and guide students, the unit schedules structured leadership modules, skill development frameworks, and professional seminars by inviting domain experts and technical pioneers from various industries.
              </p>
            </div>
          </div>

          {/* Sidebar Operations & Leadership */}
          <div className="space-y-6">
            {/* Cell Convener Profile */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Placement Leadership</span>
              <div className="border-t pt-3">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">Cell Coordinator</span>
                <span className="font-bold text-foreground block text-sm">Dr. V. K. SIVAKUMAR</span>
                <span className="text-primary text-[11px] font-medium block mt-0.5">Assistant Professor & Head</span>
                <span className="text-muted-foreground text-[10px] block">Department of Zoology</span>
              </div>
            </div>

            {/* Placement Mobility Tracking */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-gold-deep" /> Recruitment Hub Mobility
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                In addition to on-campus drives, students are consistently mobilized and directed to attend highly competitive off-campus placement interviews across primary regional employment hubs:
              </p>
              
              <div className="space-y-2 pt-1 font-medium text-xs text-foreground/90">
                <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
                  <span>🏢</span> Chennai Hub
                </div>
                <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
                  <span>🏢</span> Vellore District Circuits
                </div>
              </div>
            </div>

            {/* Quick Summary Metrics */}
            <div className="border border-border bg-primary/5 p-5 rounded-2xl space-y-3 border-primary/15">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary block">Operational Highlights</h3>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-center gap-1.5">⚡ Core & Off-Campus Pooling</li>
                <li className="flex items-center gap-1.5">⚡ Public Sector Exam Training</li>
                <li className="flex items-center gap-1.5">⚡ Higher Education Counseling</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }


  // -------------------------------------------------------------
  // CASE K: IF IT IS ANTI-RAGGING -> RENDER ANTI-RAGGING CELL
  // -------------------------------------------------------------
  if (normalizedId === "anti-ragging") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Statutory Compliance & Student Safety" 
          title={currentTitle} 
          subtitle="Enforcing strict statutory guidelines and active surveillance to sustain a secure, disciplined, and zero-tolerance campus." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* History & Statutory Mandate */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Scale className="size-5 text-primary" /> Regulatory Mandate & History
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The Anti-Ragging Cell constitutes a core, mandatory element of the institution's student welfare mechanism. Established in strict alignment with the statutory guidelines of the University Grants Commission (UGC) under the Act of 1956, and modified under the <strong>UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009</strong>, the setting up of this defensive framework is strictly compulsory.
              </p>
              <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-xl flex gap-3 items-start">
                <ShieldAlert className="size-5 text-destructive shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-destructive tracking-wider block">Zero-Tolerance Charter</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The committee functions as the apex supervisory and advisory arm dedicated to preserving a permanent, absolute culture of a <strong>Ragging-Free Campus Environment</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Cell Objectives */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" /> Core Strategic Objectives
              </h2>
              <ul className="grid gap-3 text-xs text-muted-foreground">
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">▪️</span>
                  <span><strong>Dehumanizing Awareness:</strong> Educating the student collective regarding the dehumanizing psychological and legal effects inherent to the perversity of ragging.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">▪️</span>
                  <span><strong>Continuous Surveillance:</strong> Maintaining active, continuous watch, vigil, and situational mapping across campus spaces to completely block occurrence and recurrence.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">▪️</span>
                  <span><strong>Stringent Enforcement:</strong> Promptly, transparently, and rigorously processing any institutional or digital incidents brought directly to the committee's notice.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 shrink-0">▪️</span>
                  <span><strong>Disciplinary Atmosphere:</strong> Distributing an unambiguous, institutional notice that no form of harassment shall be tolerated, left unnoticed, or unpunished.</span>
                </li>
              </ul>
            </div>

            {/* Prohibited Legal Scope (Supreme Court Definition) */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" /> Prohibited Offenses & Violations
              </h2>
              <p className="text-xs text-muted-foreground">
                As per orders issued by the Hon’ble Supreme Court of India and subsequent UGC notifications, actions constituting ragging or human rights violations comprise:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 text-xs text-foreground/80 pt-1">
                <div className="space-y-2">
                  <p className="flex gap-2 items-start">❌ <span>Any act of indiscipline, teasing, or rudeness.</span></p>
                  <p className="flex gap-2 items-start">❌ <span>Disrupting or blocking regular academic activities.</span></p>
                  <p className="flex gap-2 items-start">❌ <span>Causing annoyance, hardship, or psychological apprehension.</span></p>
                  <p className="flex gap-2 items-start">❌ <span>Financial extortion or forcing unlawful expenditure.</span></p>
                </div>
                <div className="space-y-2">
                  <p className="flex gap-2 items-start">❌ <span>Physical abuse, assault, or actions endangering health.</span></p>
                  <p className="flex gap-2 items-start">❌ <span>Abuse via spoken words, emails, SMS, or public insults.</span></p>
                  <p className="flex gap-2 items-start">❌ <span>Confinement, trespassing, intimidation, or conspiracy.</span></p>
                  <p className="flex gap-2 items-start">❌ <span>Any structural infringement on human dignity.</span></p>
                </div>
              </div>
            </div>

            {/* Penalties & Punishments */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Gavel className="size-5 text-destructive" /> Statutory Penal Actions
              </h2>
              <p className="text-sm text-foreground/85">
                Any student found guilty of offenses inside or outside campus parameters will face immediate, severe penal enforcement:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Debarring from Sessional / University Exams",
                  "Suspension from Attending Classes",
                  "Withdrawal of Scholarships & Benefits",
                  "Immediate Suspension from College",
                  "Cancellation of Admission",
                  "Withholding of Academic Results"
                ].map((penalty) => (
                  <span key={penalty} className="text-xs font-semibold bg-destructive/5 text-destructive border border-destructive/20 px-3 py-1.5 rounded-lg">
                    ⚠️ {penalty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Operations and Committee Structure */}
          <div className="space-y-6">
            {/* Reporting Emergency Box */}
            <div className="border border-border bg-red-500/5 p-5 rounded-2xl space-y-4 border-red-500/15">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                🚨 Immediate Reporting Protocol
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Students suffering from or witnessing acts of ragging or eve-teasing must immediately contact the <strong>Principal</strong>, their respective <strong>Head of Department (HOD)</strong>, or any nearby faculty member to report the matter without delay.
              </p>
              <div className="bg-background border p-3 rounded-xl text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Committee Monitoring Audit</span>
                <span className="text-xs font-bold text-foreground">Convenes Every Single Month</span>
              </div>
            </div>

            {/* Council Organization */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Statutory Board</span>
                <h3 className="text-xs font-bold text-foreground mt-0.5">Anti-Ragging Committee Members</h3>
              </div>
              
              <div className="space-y-2.5 border-t pt-3 text-xs text-foreground/90">
                <div className="bg-muted/40 p-2 rounded-lg border">
                  <span className="font-bold block">Dr. P. Vasuki</span>
                  <span className="text-[10px] text-primary block">Principal (i/c), Head & Assoc. Prof. of English</span>
                </div>
                <div className="pl-1">
                  <span className="font-semibold block">Dr. V. K. Sivakumar</span>
                  <span className="text-[10px] text-muted-foreground">Head & Assistant Professor of Zoology</span>
                </div>
                <div className="pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold block">Dr. S. Karunanithi</span>
                  <span className="text-[10px] text-muted-foreground">Head & Assistant Professor of Mathematics</span>
                </div>
                <div className="pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold block">Dr. A. Thamarai</span>
                  <span className="text-[10px] text-muted-foreground">Head & Assistant Professor of Physics</span>
                </div>
                <div className="pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold block">Prof. L. Vikraman</span>
                  <span className="text-[10px] text-muted-foreground">Assistant Professor of Mathematics</span>
                </div>
                <div className="pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold block">Dr. M. Muralikrishna</span>
                  <span className="text-[10px] text-muted-foreground">Physical Director</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }


  // -------------------------------------------------------------
  // CASE L: IF IT IS STUDENT-GRIEVANCE -> RENDER STUDENT GRIEVANCE CELL
  // -------------------------------------------------------------
  if (normalizedId === "grievance") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Student Welfare & Conflict Redressal" 
          title={currentTitle} 
          subtitle="Providing an transparent, structured platform to voice institutional concerns, resolve issues, and sustain a harmonious campus life." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Overview & Objective */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Scale className="size-5 text-primary" /> Cell Mandate & Objective
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The institution has structured the <strong>Student Grievance Cell</strong> to earnestly exhort active and uninhibited participation of students across all available cells, clubs, and wings of the college. 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The primary purpose of this dedicated cell is to serve as a secure, listening entity that acts promptly to resolve the day-to-day problems, structural bottlenecks, and operational issues faced by the student collective.
              </p>
            </div>

            {/* Redressal Mechanism */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Inbox className="size-5 text-emerald-500" /> Transparent Redressal Mechanism
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                To guarantee confidentiality and an easily accessible pipeline for registering complaints, the cell has introduced a physical on-campus <strong>Complaint Box</strong>. Students can drop their written feedback, grievances, or complaints directly into this box for institutional evaluation and redressal.
              </p>
              
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex gap-3 items-start">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">Atmosphere Safeguard</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By resolving conflicts transparently and addressing feedback constructively, the cell actively maintains a highly stable and harmonious atmosphere across the entire campus ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Grievance Committee Details */}
          <div className="space-y-6">
            {/* Committee Council Box */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Redressal Board</span>
                <h3 className="text-xs font-bold text-foreground mt-0.5">Appointed Cell Members</h3>
              </div>
              
              <div className="space-y-3 border-t pt-3">
                {/* Chairperson / Head */}
                <div className="bg-muted/40 p-3 rounded-xl border border-border/80">
                  <span className="font-bold text-foreground text-xs block">Dr. P. Vasuki</span>
                  <span className="text-[10px] text-primary font-semibold block mt-0.5">Principal (i/c)</span>
                  <span className="text-muted-foreground text-[10px] block mt-0.5 leading-tight">Associate Professor and Head,<br />Department of English</span>
                </div>

                {/* Assistant Professor Profile */}
                <div className="p-3 bg-background border border-border/60 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-foreground block">Dr. P. G. Aravindan</span>
                  <span className="text-[10px] text-primary font-medium block">Assistant Professor</span>
                  <span className="text-muted-foreground text-[10px] block">Department of Physics</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="border border-border bg-primary/5 p-5 rounded-2xl space-y-3 border-primary/15">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary block">Student Assurance</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The cell ensures that all dropped items are routinely monitored, audited, and processed fairly to uphold student voice protections.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE M: IF IT IS STUDENTS-COUNSELLING -> RENDER COUNSELLING CELL
  // -------------------------------------------------------------
  if (normalizedId === "counseling") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Mental Health & Holistic Well-being" 
          title={currentTitle} 
          subtitle="Empowering students to overcome psychological, academic, and socio-cultural barriers within an absolute confidential ecosystem." 
        />
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Body Content Space */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Cell Core Philosophy */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Heart className="size-5 text-red-500 animate-pulse" /> Personal Well-being & Care
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The Students Counselling Cell systematically facilitates the personal well-being of the student body through the dedicated support and guidance of trained counselors. It addresses diverse social and personal issues—including depression, low self-esteem, disruptive classroom behavior, and chronic stress—by conducting structural, individual counseling sessions.
              </p>
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider block mb-1">Confidentiality Guarantee</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The cell guarantees a strictly confidential atmosphere in which students can securely talk through and discuss any mental, domestic, or environmental concerns they may have.
                </p>
              </div>
            </div>

            {/* Roles & Operational Responsibilities */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <BrainCircuit className="size-5 text-purple-500" /> Roles & Responsibilities
              </h2>
              
              <div className="grid gap-4 sm:grid-cols-2 text-xs text-muted-foreground">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">🎓 Academic Support</h4>
                    <p className="leading-relaxed">Helps students experiencing academic difficulties and offers tailored guidance and counseling to slow learners.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">🧠 Strengths Identification</h4>
                    <p className="leading-relaxed">Assists individuals to map out their inner strengths and weaknesses to catalyze holistic personal development.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">📢 Mental Health Literacy</h4>
                    <p className="leading-relaxed">Organizes dedicated awareness lectures focused on mental health, resilience, and general addiction issues.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">🩺 Clinical Referrals</h4>
                    <p className="leading-relaxed">Directs and refers students to professional psychiatrists or external clinicians for guidance in severe cases.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">🛡️ Barrier Demolition</h4>
                    <p className="leading-relaxed">Provides strategic toolkits to help students systematically overcome economic, social, and cultural barriers.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">📈 Continuous Monitoring</h4>
                    <p className="leading-relaxed">Performs continuous tracking via re-evaluation frameworks and recommends coping strategies for post-counseling issues.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tripartite Engagement (Teacher-Student-Parent) */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Users className="size-5 text-emerald-500" /> Interpersonal Ecosystem Calibration
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                To create a comprehensive support network, the cell initiates customized counseling sessions aimed specifically at improving and calibrating the crucial <strong>teacher-student relationship</strong>. 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Furthermore, in resolving deep-seated or persistent student issues, the cell actively seeks the alignment and help of the <strong>students' parents</strong>, arranging joint counseling sessions whenever needed to establish stability.
              </p>
            </div>
          </div>

          {/* Sidebar Panel: Board and Infrastructure */}
          <div className="space-y-6">
            {/* Committee Composition */}
            <div className="border border-border bg-card p-5 rounded-2xl space-y-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Advisory Board</span>
                <h3 className="text-xs font-bold text-foreground mt-0.5">Counselling Committee</h3>
              </div>
              
              <div className="space-y-2.5 border-t pt-3 text-xs text-foreground/90">
                <div className="bg-muted/40 p-2 rounded-lg border">
                  <span className="font-bold block">Dr. P. Vasuki</span>
                  <span className="text-[10px] text-primary block">Principal (i/c), Head & Assoc. Prof. of English</span>
                </div>
                <div className="pl-1">
                  <span className="font-semibold block">Dr. V. K. Sivakumar</span>
                  <span className="text-[10px] text-muted-foreground">Head & Assistant Professor of Zoology</span>
                </div>
                <div className="pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold block">Dr. S. Karunanithi</span>
                  <span className="text-[10px] text-muted-foreground">Head & Assistant Professor of Mathematics</span>
                </div>
                <div className="pl-1 pt-1.5 border-t border-border/40">
                  <span className="font-semibold block">Dr. S. Sagayaraj</span>
                  <span className="text-[10px] text-muted-foreground">Head & Assistant Professor of Commerce</span>
                </div>
              </div>
            </div>

            {/* Infrastructure Box */}
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                🏢 Cell Facilities
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The institution facilitates the department with the proper private infrastructure and spaces required for running awareness programs and safe one-on-one sessions seamlessly.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE C: FOR ALL OTHER PAGES -> RENDER REUSABLE CONTENT TEMPLATE
  // -------------------------------------------------------------
  if (normalizedId && Object.keys(activityNames).includes(normalizedId)) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Student & Campus Activities" 
          title={currentTitle} 
          subtitle="Fostering academic excellence, community service, and holistic personal development." 
        />
        <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Space */}
          <div className="md:col-span-2 space-y-6">
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" /> About the Cell / Programme
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Welcome to the official interface for {currentTitle}. This department works actively throughout the academic cycles to organize events, training modules, and strategic awareness programs for our student community.
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Detailed action updates, event photo galleries, and enrollment procedures are currently being synchronized by the coordinator team.
              </p>
            </div>
          </div>

          {/* Context Sidebar */}
          <div className="space-y-4">
            <div className="border border-border bg-muted/30 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bookmark className="size-3.5 text-gold-deep" /> Quick Overview
              </h3>
              <ul className="text-xs space-y-2 text-muted-foreground divide-y divide-border/50">
                <li className="pt-2 flex justify-between"><span>Status</span><span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span></li>
                <li className="pt-2 flex justify-between"><span>Audience</span><span className="font-semibold text-foreground">All Students</span></li>
                <li className="pt-2 flex justify-between"><span>Audit Status</span><span className="font-semibold text-foreground">Verified</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Fallback 404 block for unmatched identifiers
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-lg font-bold text-primary">Activity Profile Not Linked</h1>
      <Link to="/" className="text-xs font-bold text-primary underline mt-2">Return Home</Link>
    </div>
  );
}