export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  bullets: string[];
  projectSlug?: string;
  tag?: string;
  logo?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type GalleryItem = {
  image: string; // used as the poster when `video` is set
  caption: string;
  video?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  status?: string;
  stat: string;
  cardNote: string;
  // Short version — shown on the homepage card and, by default, on the
  // detail page too. Keep this to 2-3 lines.
  narrative: string;
  // Optional longer version, shown only on the detail page in place of
  // `narrative` when present. Use for a fuller story that would crowd
  // the homepage card.
  fullStory?: string;
  problem: string;
  whatIBuilt: string;
  myRole: string;
  whatItDoes: string[];
  results: string[];
  builtWith: string[];
  links: ProjectLink[];
  image: string;
  // When set, the hero shows `image` as a poster with a play button —
  // clicking opens `video` full-size, same treatment as a Featured video.
  video?: string;
  // "contain" is for portrait/mobile media that shouldn't be cropped to
  // fill the (landscape) hero box — pair with mediaBackground so the
  // letterboxed space isn't just bare card background. Defaults to "cover".
  mediaFit?: "cover" | "contain";
  // Raw CSS `background` value shown behind contain-fit media. Kept
  // theme-invariant (not swapped for light/dark) since it's tied to the
  // product's own brand, not the portfolio's.
  mediaBackground?: string;
  // Extra product screenshots for the "more" gallery on the project page.
  // Add {image, caption} entries once real screenshots are available —
  // the gallery only renders when this has items.
  gallery?: GalleryItem[];
};

export type Company = {
  name: string;
  logo?: string;
  url?: string;
};

export const profile = {
  name: "Chidera Anele",
  shortName: "Dera",
  title: "Product Engineer",
  location: "Kigali, Rwanda",
  status: "Building iDiscovr, open to relocation",
  email: "anelechidera4@gmail.com",
  linkedin: "https://www.linkedin.com/in/chidera-anele/",
  github: "https://github.com/Chidera0001",
  timezone: "Africa/Kigali",
  timezoneLabel: "Kigali",
};

export function getIntroduceHref() {
  return `mailto:?subject=${encodeURIComponent(
    `${profile.name} — worth a conversation`
  )}&body=${encodeURIComponent(
    `I came across Chidera and decided he was worth sharing, and might be a good fit for an opening. He is a product engineer and developer, currently based in Kigali, but is open to relocating.\n\nI have checked his profile and can vouch for him.\n\nLinkedIn: ${profile.linkedin}\nEmail: ${profile.email}\n\nThanks`
  )}`;
}

// Photos that rotate in the header avatar (and as the favicon). Add paths
// under public/avatar/ once supplied.
export const profilePhotos: string[] = [
  "/avatar/photo-1.png",
  "/avatar/photo-2.png",
];

export const taglineLines: string[] = [
  "spend most days building iDiscovr",
  "never skip flag football on Sundays",
  "still play soccer twice a week",
  "run a 5K most days this September",
  "play table tennis every chance I get",
  "believe good habits compound",
];

export const intro = `My name is Chidera (Dera for short). I use technology to solve problems I have experienced or seen people struggle with. I am a product manager and engineer.

I am currently building iDiscovr, a music discovery platform for independent artists, and previously built Citizn, a civic reporting platform with an AI verification pipeline.

In a more voluntary role, I work with Swift Haven — we run outreaches in schools and rural communities across Rwanda, sharing relief materials while talking to girls about their periods and educating young boys to understand it too, so it stops being something whispered about.`;

export const skills: SkillGroup[] = [
  {
    category: "Product",
    items: [
      "User Research",
      "Product Strategy",
      "Roadmapping",
      "Prioritization",
      "Stakeholder Communication",
    ],
  },
  {
    category: "Data & Experimentation",
    items: ["Product Analytics (SQL, PostgreSQL)", "Experimentation (Event Tracking)"],
  },
  {
    category: "Engineering",
    items: [
      "Frontend Development (React, React Native, Next.js)",
      "Backend Development (Node.js, Python)",
      "AI/LLM Integration (Gemini, Claude)",
    ],
  },
  {
    category: "Tools",
    items: ["Figma", "Linear", "Jira", "GitHub"],
  },
];

export type FeaturedUpdate = {
  kind: "Post" | "Video" | "Link";
  date: string;
  title: string;
  body: string;
  images?: string[];
  video?: { src: string; poster: string };
  link?: { label: string; href: string };
};

// Recent wins/news worth calling out on the Now page. Add a new entry at the
// top when something's worth featuring.
export const featuredUpdates: FeaturedUpdate[] = [
  {
    kind: "Post",
    date: "Sep 11, 2026",
    title: "Swift Haven won 10M RWF from Imbuto Foundation",
    body: "Swift Haven took home 10M RWF from Imbuto Foundation this Friday, funding to help more outreaches reach schools and rural communities across Rwanda.",
    images: ["/featured/swift-haven-1.jpg", "/featured/swift-haven-2.jpg"],
  },
  {
    kind: "Video",
    date: "Sep 2026",
    title: "Discover on the Street",
    body: "Part of what we do at iDiscovr — I interview independent artists on the street and give them visibility.",
    video: {
      src: "/featured/discover-on-the-street.mp4",
      poster: "/featured/discover-on-the-street-poster.jpg",
    },
  },
  {
    kind: "Video",
    date: "Sep 14, 2026",
    title: "Soccer juggling challenge",
    body: "Took on a juggling challenge with a friend — see who could keep it up longest.",
    video: {
      src: "/featured/soccer-juggling.mp4",
      poster: "/featured/soccer-juggling-poster.jpg",
    },
  },
];

// Photos from flag football games — drop image paths in here once added to
// public/gallery/.
// Last 10 lead, then the first 6 — the later shots are the better ones.
export const flagFootballGallery: string[] = [
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6,
].map((n) => `/gallery/flag-football/ff-${String(n).padStart(2, "0")}.jpg`);

export const companies: Company[] = [
  { name: "Venue Manager", logo: "/logos/venuemanager.svg" },
  { name: "Specc AS", logo: "/logos/specc.svg" },
  { name: "African Leadership University", logo: "/logos/alu.svg" },
  { name: "InversePay", logo: "/logos/inversepay.svg" },
  { name: "Swift Haven", logo: "/logos/swifthaven.svg", url: "https://www.swift-haven.org/" },
  { name: "iDiscovr", logo: "/logos/idiscovr-long.svg" },
];

export const experience: ExperienceItem[] = [
  {
    company: "Venue Manager",
    role: "Systems Developer",
    location: "Aalborg, Denmark (Remote)",
    start: "Apr 2026",
    end: "Present",
    current: true,
    bullets: [
      "Built Venue Intelligence to bring ticketing, access control, POS, and app data into one view for 150+ customers across Denmark and Germany, covering 6M+ sales and 20M+ scans annually.",
      "Reduced manual report stitching by ~2–4 hours per week per venue team by consolidating customer and revenue data into a single reporting view.",
      "Connected Dynamics and Klaviyo to Venue Intelligence, reducing manual exports and reporting for finance and marketing teams.",
    ],
    logo: "/logos/venuemanager.svg",
  },
  {
    company: "iDiscovr",
    role: "Co-Founder & CTO",
    location: "Kigali, Rwanda",
    start: "Feb 2026",
    end: "Present",
    current: true,
    bullets: [
      "Co-founded iDiscovr to help emerging artists find collaborators; grew to 102+ signups across 2 Nigerian universities through a campus ambassador programme.",
      "Built a matching engine using genre, location, recency, and engagement signals to suggest collaborators based on musical fit rather than follower count.",
      "Cut onboarding from 11 to 4 screens after spotting user drop-off, then added one-tap music imports — reaching 92% completion and 45+ signups in one week.",
    ],
    projectSlug: "idiscovr",
    tag: "Startup Venture",
    logo: "/logos/idiscovr.svg",
  },
  {
    company: "Citizn",
    role: "Founder",
    location: "Lagos, Nigeria",
    start: "Aug 2025",
    end: "Mar 2026",
    current: false,
    bullets: [
      "Founded Citizn after identifying a gap in how infrastructure issues are reported; piloted in Nigeria, reaching 65 active users and ~50 reports.",
      "Built an AI verification pipeline using Gemini 2.5 Flash to validate photos, location, and metadata and convert reports into clean infrastructure data.",
      "Spoke with government stakeholders on adoption requirements, focusing on data privacy, safety, and integration with existing reporting processes.",
    ],
    projectSlug: "citizn",
    tag: "Startup Venture",
    logo: "/logos/citizn.svg",
  },
  {
    company: "LadX",
    role: "Product Lead & Founding Engineer",
    location: "Kigali, Rwanda",
    start: "Feb 2025",
    end: "Sep 2025",
    current: false,
    bullets: [
      "Led a team of 4 engineers building a marketplace connecting travellers with spare luggage space to people shipping goods across Africa.",
      "Identified a gap in the cross-border purchasing journey where buyers struggled to source vendors; proposed and added Shop & Ship to the product roadmap, bringing verified vendors onto the platform.",
      "As a result, LadX expanded to 5+ African countries, moved 3+ tonnes of cargo, and paid $30K+ to travellers.",
    ],
    projectSlug: "ladx",
    logo: "/logos/ladx.avif",
  },
  {
    company: "Specc AS",
    role: "Frontend & Product Engineer",
    location: "Skien, Norway (Remote)",
    start: "Jan 2025",
    end: "Oct 2025",
    current: false,
    bullets: [
      "Helped ship an AI-powered integration flow and cost-simulation engine that removed the need for non-technical users to rely on engineers when setting up complex API integrations.",
      "Worked with product and design to prioritise and ship 20+ features and screens as part of the updated AI flow.",
    ],
    logo: "/logos/specc.svg",
  },
  {
    company: "InversePay",
    role: "Software Engineer",
    location: "Kigali, Rwanda (Hybrid)",
    start: "Jul 2024",
    end: "May 2025",
    current: false,
    bullets: [
      "Built an admin dashboard with analytics, reporting, and funnel views after seeing that operations teams lacked a simple way to understand transactions and customer behaviour, replacing manual, on-request reporting.",
      "Analysed transaction funnels and customer behaviour to identify usage patterns and inform product and market decisions for expansion into Kenya.",
    ],
    logo: "/logos/inversepay.svg",
  },
];

export const additionalLeadership: ExperienceItem[] = [
  {
    company: "Swift Haven",
    role: "Tech & Outreach Co-Lead",
    location: "Kigali, Rwanda",
    start: "Mar 2024",
    end: "Present",
    current: true,
    bullets: [
      "Raised a total of $11k+ for menstrual health access and education in Kigali, reaching 1000+ girls.",
      "Won 10M RWF on Sept 11, 2026 via the Imbuto Foundation accelerator programme to help launch our smart pad dispensers (Lyft).",
    ],
    logo: "/logos/swifthaven.svg",
  },
  {
    company: "TEDxALU",
    role: "Operations Project Manager",
    location: "Kigali, Rwanda",
    start: "Jan 2024",
    end: "Dec 2024",
    current: false,
    bullets: [
      "Sourced 30% of a $2K event budget through visibility partnerships with companies like Rwanda Events and Rwanda Development Board.",
      "Managed logistics for 320+ attendees, including guest itinerary and venue set-up.",
    ],
  },
  {
    company: "African Leadership University",
    role: "Student Life Operations Intern",
    location: "Kigali, Rwanda",
    start: "Aug 2023",
    end: "Dec 2024",
    current: false,
    bullets: [
      "Coordinated onboarding for 1,000+ incoming students from 40+ countries with 300+ volunteers across four intakes.",
      "Ended the orientation week (onboarding) with a culturally themed event called “Ikaze”, meaning welcome in Kinyarwanda.",
    ],
    logo: "/logos/alu.svg",
  },
];

export const education = [
  {
    school: "African Leadership University",
    location: "Kigali, Rwanda",
    credential: "B.Sc. (Honours) Software Engineering, First Class, GPA 4.52/5.00",
    date: "2026",
  },
  {
    school: "Coursera",
    location: "",
    credential: "Google Project Management Certification",
    date: "Aug 2024",
  },
];

export const projects: Project[] = [
  {
    slug: "idiscovr",
    name: "iDiscovr",
    tagline: "Music Discovery Platform",
    category: "Mobile · Product",
    year: "2026–",
    stat: "100+ signups across 2 Nigerian universities",
    cardNote:
      "Watched onboarding drop off across 11 screens, so we cut it to 4 and swapped manual uploads for one-tap imports.",
    narrative:
      "\"My papa no get anybody\", a Nigerian expression for having no connections, is what creatives kept saying while we were filming Discover on the Street. This is what inspired iDiscovr.",
    fullStory:
      "\"My papa no get anybody\" — a Nigerian expression for having no connections — is something I heard over and over interviewing creatives for Discover on the Street, a street-interview series my friend Shukee and I run through iDiscovr Media, a platform we started to spotlight upcoming and independent creatives. In the Nigerian creative space, and honestly most creative industries, who you know can decide whether your career goes anywhere. Those conversations are what built iDiscovr — and gave me a real appreciation for how much hustle goes unseen.",
    problem:
      "Breaking into the music industry often comes down to who you know. Independent artists, producers, labels, investors, and managers struggle to discover each other, especially across different countries and communities.",
    whatIBuilt:
      "I co-founded iDiscovr and led development of the mobile app from the ground up — personalized recommendations, swipe-based networking, profiles, and messaging, built in React Native. After watching users drop off across an 11-screen onboarding flow, I redesigned it down to 4 screens and replaced manual music uploads with one-tap imports from Spotify and Apple Music.",
    myRole: "Co-Founder & CTO — product, mobile engineering, and onboarding design.",
    whatItDoes: [
      "Swipe-based discovery matched on sound and genre",
      "One-tap portfolio import from Spotify, Apple Music, and other platforms",
      "Personalized recommendations for collaborators, labels, and managers",
      "In-app messaging and profiles built for musicians",
    ],
    results: [
      "Grew to 100+ signups across 2 Nigerian universities through a campus ambassador programme",
      "Cut onboarding from 11 screens to 4, reaching 90% completion",
      "40+ signups in the first week after the onboarding redesign",
    ],
    builtWith: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://idiscovr.app" },
      { label: "App Store", href: "https://apps.apple.com/us/app/idiscovr/id6764885098" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=app.idiscovr.mobile",
      },
    ],
    image: "/projects/idiscovr/idiscovr-poster.jpg",
    video: "/projects/idiscovr/idiscovr-1.mp4",
    mediaFit: "contain",
    mediaBackground:
      "radial-gradient(55% 45% at 12% 18%, rgba(107, 14, 173, 0.28) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(50% 40% at 88% 12%, rgba(212, 155, 98, 0.32) 0%, rgba(0, 0, 0, 0) 68%), radial-gradient(60% 50% at 50% 70%, rgba(140, 60, 160, 0.12) 0%, rgba(0, 0, 0, 0) 75%), linear-gradient(rgb(250, 247, 255) 0%, rgb(255, 255, 255) 42%, rgb(255, 250, 245) 100%)",
    gallery: [
      {
        image: "/projects/idiscovr/idiscovr-2.png",
        caption: "Import your work — paste a link from Spotify, Apple Music, and more",
      },
      {
        image: "/projects/idiscovr/idiscovr-3.png",
        caption: "Login or sign up",
      },
      {
        image: "/featured/discover-on-the-street-poster.jpg",
        video: "/featured/discover-on-the-street.mp4",
        caption: "Discover on the Street — interviewing independent artists and giving them visibility",
      },
    ],
  },
  {
    slug: "citizn",
    name: "Citizn",
    tagline: "Civic Technology",
    category: "Civic Tech · Full-Stack",
    year: "2025–2026",
    stat: "65 active users · ~50 verified reports",
    cardNote:
      "Started after a pothole put me in a motorbike accident, and weeks later nothing had changed.",
    narrative:
      "Citizn came out of a personal moment of frustration: I was in a motorbike accident caused by a pothole, and weeks later nothing had changed. There was no simple way to report infrastructure problems or know if anyone was acting on them.",
    problem:
      "Ordinary people have no simple way to report roads, water issues, or broken infrastructure to local authorities, and no visibility into whether anything is being done about it.",
    whatIBuilt:
      "I built an AI verification pipeline using Gemini 2.5 Flash to validate photos, location, and metadata, turning citizen reports into structured infrastructure data local authorities can act on.",
    myRole: "Founder — product, AI pipeline, and government stakeholder discovery.",
    whatItDoes: [
      "Citizens report roads, water issues, and broken streetlights from their phone",
      "AI verification pipeline checks photos, location, and metadata for authenticity",
      "Structured data output designed to plug into existing local-authority reporting processes",
      "Status tracking so reporters can see what's being worked on",
    ],
    results: [
      "Reached 65 active users and ~50 verified reports",
      "Ran discovery with government stakeholders in Rwanda and Nigeria",
      "Used stakeholder feedback to define requirements around data privacy, safety, and integration",
    ],
    builtWith: ["Next.js", "TypeScript", "Gemini 2.5 Flash", "PostgreSQL"],
    links: [{ label: "Live", href: "https://www.citiznvoice.com" }],
    image: "/projects/citizn/citizn-poster.jpg",
    video: "/projects/citizn/citizn-1.mp4",
    gallery: [
      {
        image: "/projects/citizn/citizn-2.avif",
        caption: "Homepage — capture photos, report issues, and monitor resolutions",
      },
      {
        image: "/projects/citizn/citizn-3.avif",
        caption: "Map View — every reported issue plotted across the city",
      },
    ],
  },
  {
    slug: "ladx",
    name: "LadX",
    tagline: "Crowdshipping Marketplace",
    category: "Marketplace · Logistics",
    year: "2025",
    stat: "5+ countries · $30K+ paid to travellers",
    cardNote:
      "Led a team of 4, then shipped Shop & Ship after buyers kept struggling to find vendors.",
    narrative:
      "LadX connects travellers with spare luggage space to people who need items shipped across Africa, turning unused suitcase space into a delivery network.",
    problem:
      "Cross-border buyers in Africa struggled to source reliable vendors, while traditional shipping stayed slow and expensive. Meanwhile, travellers had unused luggage space going to waste.",
    whatIBuilt:
      "I led a team of 4 engineers building the marketplace end to end. After identifying a gap in the cross-border purchasing journey, I proposed and shipped Shop & Ship, bringing verified vendors onto the platform so buyers could source and ship in one flow.",
    myRole: "Technical Lead & Founding Engineer — team leadership, product, and platform architecture.",
    whatItDoes: [
      "Marketplace matching travellers with spare luggage to people shipping goods",
      "Shop & Ship: verified vendors buyers can purchase from directly",
      "Live flight telemetry for shipment tracking",
      "Traveller payouts for completed deliveries",
    ],
    results: [
      "Expanded to 5+ African countries",
      "Moved 3+ tonnes of cargo weekly",
      "Paid out $30K+ to travellers within three months",
    ],
    builtWith: ["Vue.js", "TypeScript", "Go", "Node.js"],
    links: [{ label: "Live", href: "https://ladx.io" }],
    image: "/projects/ladx/ladx-1.webp",
    gallery: [
      {
        image: "/projects/ladx/ladx-2.webp",
        caption: "Product design overview — Quick Drop, Carry More, and Travel Discounts",
      },
      {
        image: "/projects/ladx/ladx-3.webp",
        caption: "Discover Brands & Stores — the shop-and-ship marketplace",
      },
      {
        image: "/projects/ladx/ladx-4.webp",
        caption: "Create Journey — uploading a flight itinerary",
      },
      {
        image: "/projects/ladx/ladx-5.webp",
        caption: "Create Journey — reviewing luggage details before confirming",
      },
      {
        image: "/projects/ladx/ladx-6.webp",
        caption: "Product listing with filters — browsing by size, color, and price",
      },
    ],
  },
  {
    slug: "strand",
    name: "Strand",
    tagline: "AI Product · Productivity",
    category: "AI Product",
    year: "2026–",
    status: "In progress · MVP",
    stat: "MVP at 65% · validating with founders",
    cardNote:
      "Built from my own experience fundraising — first users are a group of founders giving feedback pre-launch.",
    narrative:
      "I built Strand after noticing that great investor conversations often faded simply because nobody remembered to send the next email. I wanted something that quietly kept fundraising moving without becoming another tool founders had to manage.",
    problem:
      "Fundraising is messy. Founders juggle investor meetings, emails, customer work, and hiring all at once, and important follow-ups get missed, not from lack of care, but from too much happening at once.",
    whatIBuilt:
      "Strand connects to Gmail, understands the context of investor conversations, identifies who needs attention, and drafts follow-ups in the founder's own writing style, helping them stay consistent instead of replacing their judgment.",
    myRole: "Solo — idea, product, AI integration, and deployment.",
    whatItDoes: [
      "Connects to Gmail and reads investor-conversation context",
      "Flags investors who need a follow-up",
      "Drafts emails matched to the founder's own writing style",
      "Designed to keep fundraising moving without adding busywork",
    ],
    results: [
      "MVP at roughly 65% complete",
      "Validating with a small group of founders ahead of public launch",
    ],
    builtWith: ["Next.js", "TypeScript", "Gmail API", "LLM Integration"],
    links: [{ label: "Live", href: "https://strand-gules.vercel.app" }],
    image: "/projects/strand/strand-1.avif",
    mediaFit: "contain",
    gallery: [
      {
        image: "/projects/strand/strand-2.webp",
        caption: "Investor Board — tracking every conversation by stage, from follow-up to closed",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getLiveLink(project: Project): string | undefined {
  return project.links.find((l) => l.label === "Live")?.href;
}
