// Single source of truth for all portfolio content.
// Update this file when the resume changes — every section reads from here.

export const SITE_URL = "https://gktechhub.com";
export const RESUME_PATH = "/ganesh_kumbhar_fullstack_developer.pdf";

export const profile = {
  name: "Ganesh Kumbhar",
  title: "Software Engineer",
  focus: "Backend & Distributed Systems",
  stack: "Python, FastAPI, React, PostgreSQL",
  location: "Pune, Maharashtra, India",
  email: "ganeshhh2003@gmail.com",
  phone: "+91 9096378354",
  phoneHref: "tel:+919096378354",
  whatsapp: "919096378354",
  currentCompany: "Integrated Active Monitoring",
  summary:
    "Software engineer with ~2 years of experience building production systems end to end. I design event-driven pipelines, secure APIs and bulk data workflows — and I care about clean, maintainable code that keeps working under real-world load.",
};

export const socials = [
  { name: "GitHub", href: "https://github.com/Ganesh-D-Kumbhar" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ganesh-d-kumbhar/" },
  { name: "HackerRank", href: "https://www.hackerrank.com/profile/ganeshhh2003" },
];

export const heroStats = [
  { value: "7,000+", label: "intrusion panels on the platform I work on" },
  { value: "40+", label: "repositories consolidated into one monorepo" },
  { value: "900M+", label: "MongoDB documents aggregated efficiently" },
  { value: "5,000+", label: "users across MERN apps I shipped" },
];

export const aboutPoints = [
  {
    title: "Event-driven systems",
    text: "RabbitMQ pipelines that keep critical fire, door and ATM alerts fast even under heavy telemetry load.",
  },
  {
    title: "Secure by default",
    text: "MFA/OTP, RBAC, account lockout, VAPT remediation and audit logging built into the APIs I ship.",
  },
  {
    title: "Data at scale",
    text: "Bulk import pipelines with validation and atomic commits, and aggregations over 900M+ documents.",
  },
  {
    title: "End-to-end ownership",
    text: "From PostgreSQL schemas and FastAPI services to React admin portals and 60-page technical docs.",
  },
];

export const experience = [
  {
    company: "Integrated Active Monitoring Pvt. Ltd.",
    role: "Full Stack Software Engineer",
    period: "June 2026 – Present",
    current: true,
    location: "Pune, India",
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "RabbitMQ", "WebSockets", "React", "MongoDB", "InfluxDB", "AWS"],
    highlights: [
      {
        title: "Monorepo consolidation",
        text: "Consolidated 40+ repositories into a single monorepo for the SentrixAI intrusion platform (7,000+ panels), extracting shared pipeline logic and isolating panel-specific event processing.",
      },
      {
        title: "Event pipeline",
        text: "Built the Panel → AWS Receiver → PostgreSQL → Forwarder pipeline, splitting traffic into separate Event and Heartbeat RabbitMQ flows so critical alerts are never delayed by high-volume telemetry. Implemented the Heartbeat consumer that persists panel health to PostgreSQL.",
      },
      {
        title: "Real-time alerting",
        text: "Engineered the Event RMQ → Consumer → Event Manager flow that validates and classifies events and pushes fire, door and ATM alerts over WebSockets to a CMS used by 40+ operators.",
      },
      {
        title: "Admin portal & bulk import",
        text: "Developed React, FastAPI and SQLAlchemy modules, including a 9-sheet Excel import/export pipeline with dropdown validation, preview, insert/upsert and atomic commits. Fixed camera de-duplication and false “updated” detection, and authored a 60-page technical document.",
      },
      {
        title: "Security & audit",
        text: "Implemented MFA/OTP, password reset, account lockout, backend role/module authorization, VAPT fixes and InfluxDB-based CRUD audit logging.",
      },
      {
        title: "Licensing system",
        text: "Extended the on-premise licensing service to support multiple application types (mobile and web) per license, with independent device/metric limits, a signed .lic payload with nested app scoping, endpoint-level enforcement and a catalog-driven React license form.",
      },
      {
        title: "Health-alert reliability",
        text: "Designed a redesign of the offline/restore alert worker with an explicit ONLINE/OFFLINE state machine, outage incident tracking with probable-cause classification, and idempotent alerts under concurrent workers, retries and out-of-order events.",
      },
      {
        title: "Large-scale data",
        text: "Building a monthly per-organization image-count aggregation over a 900M+ document MongoDB collection, optimized to run on existing indexes.",
      },
    ],
  },
  {
    company: "SevenMentor Corporate Services",
    role: "Full Stack Developer",
    period: "Feb 2025 – May 2026",
    current: false,
    location: "Pune, India",
    stack: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "JWT", "NodeMailer"],
    highlights: [
      {
        title: "Platform delivery",
        text: "Developed and maintained 5+ production MERN applications (CMS, LMS, Billing, Placement) serving 5,000+ active users.",
      },
      {
        title: "API design",
        text: "Designed and implemented RESTful APIs for efficient data flow while handling concurrent user requests.",
      },
      {
        title: "Authentication & authorization",
        text: "Implemented JWT-based authentication with role-based access control (RBAC) to protect APIs.",
      },
      {
        title: "Email workflows",
        text: "Integrated NodeMailer with OAuth2 to deliver account verification and password-reset flows.",
      },
      {
        title: "Performance",
        text: "Improved application performance by 30–40% with server-side rendering (SSR) and rendering optimizations.",
      },
      {
        title: "Reusable UI",
        text: "Built reusable UI components shared across modules, cutting development time by nearly 25%.",
      },
    ],
  },
];

// Engineering case studies drawn from professional work (code is proprietary).
export const caseStudies = [
  {
    title: "Real-time alert pipeline",
    tag: "Distributed systems",
    problem: "Critical fire, door and ATM alerts shared a path with high-volume panel heartbeats, so a telemetry spike could delay an emergency.",
    solution: "Split traffic into dedicated Event and Heartbeat RabbitMQ flows. Events are validated, classified and pushed over WebSockets to the monitoring CMS.",
    flow: ["Panel", "AWS Receiver", "PostgreSQL", "RabbitMQ", "Event Manager", "WebSocket → CMS"],
    impact: "Alerts reach 40+ operators across bank, retail and ATM sites without queueing behind telemetry.",
    stack: ["Python", "RabbitMQ", "PostgreSQL", "WebSockets", "AWS"],
  },
  {
    title: "Idempotent health-alert worker",
    tag: "Reliability",
    problem: "Offline/restore alerts could duplicate or flip incorrectly with concurrent workers, retries and out-of-order events.",
    solution: "Explicit ONLINE/OFFLINE state machine, outage incident tracking with probable-cause classification, and idempotent alert emission.",
    flow: ["Heartbeat", "State machine", "Incident tracker", "Alert (once)"],
    impact: "One correct alert per outage, regardless of retries or event ordering.",
    stack: ["Python", "PostgreSQL", "RabbitMQ"],
  },
  {
    title: "9-sheet Excel bulk import",
    tag: "Data engineering",
    problem: "Onboarding sites, panels and cameras by hand was slow and error-prone.",
    solution: "Import/export pipeline with dropdown validation, preview, insert/upsert and atomic commits, plus fixes for camera de-duplication and false “updated” detection.",
    flow: ["Upload", "Validate", "Preview", "Upsert", "Atomic commit"],
    impact: "Safe bulk changes in one step, documented in a 60-page technical spec.",
    stack: ["FastAPI", "SQLAlchemy", "React", "PostgreSQL"],
  },
  {
    title: "Multi-app licensing service",
    tag: "Security",
    problem: "Each on-premise license could only cover a single application type.",
    solution: "Signed .lic payload with nested app scoping, independent device/metric limits per app, endpoint-level enforcement and a catalog-driven React license form.",
    flow: ["Catalog", "Signed .lic", "App scopes", "Endpoint enforcement"],
    impact: "One license now governs web and mobile apps with separate limits.",
    stack: ["Python", "FastAPI", "React", "Cryptographic signing"],
  },
];

export const sideProjects = [
  {
    title: "Dream Homes",
    category: "Real estate platform",
    description:
      "Full-stack property platform with an admin dashboard for listings, user favourites, profile updates with image upload, secure admin auth and email/WhatsApp enquiries.",
    image: "/images/dream-homes.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://dream-homes.gktechhub.com",
    githubUrl: "https://github.com/Ganesh-D-Kumbhar/Dream-Homes",
  },
];

export const skillGroups = [
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL"] },
  {
    title: "Backend & Systems",
    items: ["FastAPI", "Django", "Node.js", "Express.js", "REST APIs", "WebSockets", "RabbitMQ", "SQLAlchemy"],
  },
  { title: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "InfluxDB"] },
  {
    title: "Cloud & Tools",
    items: ["AWS (S3, EC2)", "Docker", "Git", "GitHub", "CI/CD", "Jest", "Postman", "Webpack"],
  },
  { title: "Security", items: ["JWT", "MFA / OTP", "RBAC", "Audit logging", "VAPT remediation"] },
];

export const education = {
  degree: "B.Tech, Electronics & Telecommunication Engineering",
  institution: "Karmayogi Institute of Technology, Pandharpur",
  period: "Aug 2020 – Aug 2024",
  grade: "CGPA 8.4 / 10",
};

export const achievements = [
  "HackerRank Gold Badges in Python and JavaScript (100+ coding challenges solved).",
  "Scored 90+ in SSC, HSC and Engineering Mathematics.",
];

export const certifications = [
  { title: "React", provider: "HackerRank", href: "https://www.hackerrank.com/certificates/11f62b637b64" },
  { title: "JavaScript (Intermediate)", provider: "HackerRank", href: "https://www.hackerrank.com/certificates/81e4395e7632" },
  { title: "JavaScript (Basic)", provider: "HackerRank", href: "https://www.hackerrank.com/certificates/15eb66c0e5e6" },
  { title: "MySQL (Intermediate)", provider: "HackerRank", href: "https://www.hackerrank.com/certificates/1a96e24f8ef2" },
  { title: "MySQL (Basic)", provider: "HackerRank", href: "https://www.hackerrank.com/certificates/d536ccb7004d" },
  {
    title: "Employability & Skill Development",
    provider: "TCS iON",
    href: "https://drive.google.com/file/d/1CTGFNNZnBSAc9bpOg7dpucbns5WX-tcB/view?usp=drivesdk",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
