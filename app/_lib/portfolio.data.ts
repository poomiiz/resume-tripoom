/**
 * Profile and Contact Data
 */
import { FRAMER_IMAGES } from "./framerAssets";

export type LocalizedText = { th: string; en: string };

export type LocalizedTagline = {
  creative: LocalizedText;
  tech: LocalizedText;
};

export const PROFILE = {
  name: {
    th: "Tripoom Singhaart",
    en: "Tripoom Singhaart",
  } satisfies LocalizedText,
  nameLatin: {
    th: "Tripoom Singhaart",
    en: "Tripoom Singhaart",
  } satisfies LocalizedText,
  // Combined Roles as Title
  mainRole: {
    creative: { 
      th: "Senior Motion Artist & AI Content Director", 
      en: "Senior Motion Artist & AI Content Director" 
    },
    tech: { 
      th: "Creative Automation & AI Systems Architect", 
      en: "Creative Automation & AI Systems Architect" 
    }
  },
  tagline: {
    creative: {
      th: "12+ Years of Cinematic Motion Design & AI Storytelling",
      en: "12+ Years of Cinematic Motion Design & AI Storytelling",
    },
    tech: {
      th: "Building Intelligent Systems & Code-Driven Creative Pipelines",
      en: "Building Intelligent Systems & Code-Driven Creative Pipelines",
    },
  } as LocalizedTagline,
  subtitle: {
    creative: {
      th: "จากประสบการณ์กว่า 12 ปีในฐานะ Senior Motion Artist ให้กับแบรนด์ระดับโลก (Samsung, Lexus, PTT, SCB) ผมก้าวสู่บทบาท AI Content Director โดยผสานทักษะการเล่าเรื่อง (Storytelling) ระดับมืออาชีพเข้ากับเทคโนโลยี Generative AI เพื่อทลายขีดจำกัดของงานโปรดักชันดั้งเดิม ผมเนรมิตนิทานดิจิทัลและงานภาพ Cinematic ที่สมบูรณ์แบบได้ครบวงจรด้วยตัวคนเดียว",
      en: "With 12+ years of experience as a Senior Motion Artist for global giants (Samsung, Lexus, PTT, SCB), I have evolved into an AI Content Director. I bridge the gap between professional visual storytelling and Generative AI, single-handedly directing and producing full-scale digital narratives and cinematic visuals—mastering the end-to-end creative process through technology.",
    },
    tech: {
      th: "ผมเป็นนักพัฒนาระบบที่มุ่งเน้นการสร้างสถาปัตยกรรมอัจฉริยะ (AI Systems Architecture) และการทำ Automation เพื่อแก้ปัญหาธุรกิจจริง จากการพัฒนาระบบ Full-stack สำหรับแคมเปญระดับประเทศ (STAEDTLER) ไปจนถึงการสร้างแพลตฟอร์ม AI ขั้นสูง (MoonRacle) ผมเชี่ยวชาญการออกแบบ Workflow ที่ปลอดภัย มั่นคง และสามารถขยายตัวได้ โดยมีเป้าหมายเพื่อเปลี่ยนความซับซ้อนให้กลายเป็นระบบอัตโนมัติที่มีประสิทธิภาพ",
      en: "I am a systems developer focused on building intelligent architectures and high-impact automation. From developing full-stack systems for national campaigns (STAEDTLER) to creating advanced AI platforms (MoonRacle), I specialize in designing secure, robust, and scalable workflows. My goal is to transform business complexity into efficient, code-driven automation.",
    }
  },
  sourceUrl: "https://tripoomsinghaart.framer.website/",
  contact: {
    phone: "062-465-9950",
    phoneHref: "tel:+66624659950",
    email: "singhaarttripoom@gmail.com",
    emailHref: "mailto:singhaarttripoom@gmail.com",
  },
} as const;

/** Job Image Keys */
export const JOB_IMAGE_KEYS = {
  goExtra: "goTheExtraMile",
  clickMotion: "clickMotion",
  shortgun: "shortgun",
  aiContent: "aiContent",
} as const;

export type JobKey = keyof typeof JOB_IMAGE_KEYS;

/** Detailed Job Experience */
export const JOBS: Record<
  JobKey,
  {
    imageKey: string;
    company: LocalizedText;
    title: LocalizedText;
    period: LocalizedText;
    highlights: { th: string[]; en: string[] };
  }
> = {
  aiContent: {
    imageKey: "aiContent",
    company: { th: "Nina.digital (AI Storytelling)", en: "Nina.digital (AI Storytelling)" },
    title: { th: "AI Content Director", en: "AI Content Director" },
    period: { th: "2024 — Present", en: "2024 — Present" },
    highlights: {
      th: [
        "กำกับและผลิต 'นิทาน AI' (Storytelling) แบบครบวงจร ตั้งแต่การแต่งเรื่อง บทละคร ออกแบบตัวละคร จนถึงงานวิดีโอและเสียง",
        "สร้างสรรค์ Digital Character ที่มีความต่อเนื่อง (Consistency) และมีเอกลักษณ์ผ่านเทคโนโลยี Generative AI",
        "ออกแบบกระบวนการผลิตสื่อ (Creative Pipeline) ที่ผสาน AI เข้ากับทักษะ Motion Graphics ระดับสูง",
        "ดูแลช่องทาง TikTok @nina.digital สร้างคอนเทนต์ที่มีผู้เข้าชมและมีส่วนร่วมสูง",
      ],
      en: [
        "Directed and produced end-to-end 'AI Storytelling' projects—from scriptwriting and character design to video and audio production.",
        "Created consistent and unique Digital Characters using Generative AI technologies.",
        "Designed Creative Pipelines that fuse AI capabilities with high-end Motion Graphics expertise.",
        "Managed TikTok channel @nina.digital, creating high-engagement and viral content.",
      ],
    },
  },
  goExtra: {
    imageKey: "goTheExtraMile",
    company: { th: "Go The Extra Mile", en: "Go The Extra Mile" },
    title: { th: "Senior Motion Graphic Designer", en: "Senior Motion Graphic Designer" },
    period: { th: "2022 — Present", en: "2022 — Present" },
    highlights: {
      th: [
        "สร้างสรรค์โมชันกราฟิกและแอนิเมชันสำหรับโฆษณาออนไลน์ในระดับพรีเมียม (CGI Ads, Social Media Content)",
        "บริหารจัดการและผลิตวิดีโอสำหรับ YouTube, Facebook และ Instagram ให้กับแบรนด์ชั้นนำมากมาย",
        "ออกแบบและปรับปรุงคอนเทนต์โฆษณาดิจิทัลให้เหมาะสมกับแต่ละแพลตฟอร์มอย่างมีประสิทธิภาพ",
        "สนับสนุนงานโมชันสำหรับงาน Event และการ Live Stream ระดับมืออาชีพ",
        "Key Clients: Burger King, The Pizza Company, Staedtler, Hunter Poke, 75Izakaya, Beauty Pro, Spectra, Jupiter Kids",
      ],
      en: [
        "Crafting premium motion graphics and animations for high-impact online advertising (CGI Ads, Social Media).",
        "Producing dynamic video content for YouTube, Facebook, and Instagram for leading global brands.",
        "Adapting and optimizing digital advertising content across various platforms for maximum engagement.",
        "Providing motion graphic support for professional events and live streaming productions.",
        "Key Clients: Burger King, The Pizza Company, Staedtler, Hunter Poke, 75Izakaya, Beauty Pro, Spectra, Jupiter Kids.",
      ],
    },
  },
  clickMotion: {
    imageKey: "clickMotion",
    company: { th: "Click Motion Co., Ltd.", en: "Click Motion Co., Ltd." },
    title: { th: "Motion Graphic Designer", en: "Motion Graphic Designer" },
    period: { th: "2020 — 2022", en: "2020 — 2022" },
    highlights: {
      th: [
        "ผลิตโมชันและ 3D แอนิเมชันสำหรับโฆษณาทีวี (TVC) แคมเปญระดับประเทศ เช่น 'ชิมช้อปใช้'",
        "สร้างสรรค์วิดีโอรายการ Krungsri 'The COACH' (6 ตอน) บน YouTube",
        "พัฒนาและออกแบบแอนิเมชันมาสคอต 'แม่มณี' สำหรับสื่อวิดีโอของ SCB",
        "ออกแบบ Visual Effects (VFX) และงาน Post-production สำหรับโฆษณาธนาคารชั้นนำ",
        "สร้างสรรค์แอนิเมชัน 2D สำหรับวิดีโอเล่าเรื่องในพิพิธภัณฑ์สึนามิ (Tsunami Museum)",
      ],
      en: [
        "Produced 3D animations and motion graphics for national TV commercials (Chim-Shop-Chai campaign).",
        "Created the Krungsri 'The COACH' YouTube series (6 episodes).",
        "Re-designed and animated the 'Mae Manee' mascot for SCB's video advertising campaigns.",
        "Designed cinematic visual effects (VFX) and managed post-production for banking advertisements.",
        "Produced 2D storytelling animations for the Tsunami Museum project.",
      ],
    },
  },
  shortgun: {
    imageKey: "shortgun",
    company: { th: "Shortgun Studio", en: "Shortgun Studio" },
    title: { th: "Motion Graphic Designer", en: "Motion Graphic Designer" },
    period: { th: "2012 — 2014", en: "2012 — 2014" },
    highlights: {
      th: [
        "สนับสนุนงานกราฟิกและโมชันสำหรับ Event ระดับประเทศ (Samsung Galaxy Note, Amway, Unicity)",
        "ผลิตวิดีโอคอนเสิร์ตและออกแบบ Motion Logo ดั้งเดิมสำหรับคอนเสิร์ต NOK AIR",
        "สนับสนุนงานกราฟิกสำหรับการเดินสาย Roadshow ของแบรนด์รถยนต์หรู Lexus",
        "สร้างสรรค์วิดีโออินโฟกราฟิกเพื่อให้ข้อมูลเชิงลึกสำหรับ PTT, Foremost และ Dumex",
      ],
      en: [
        "Provided motion graphic support for large-scale events (Samsung Galaxy Note, Amway, Unicity).",
        "Produced concert visuals and designed original motion logos for NOK AIR concerts.",
        "Delivered creative graphic support for the Lexus nationwide Roadshow.",
        "Created detailed infographic videos for PTT, Foremost, and Dumex.",
      ],
    },
  },
};

/** Showreel Thumbs */
export type ReelThumbKey =
  | "y2024"
  | "y2023"
  | "y2022"
  | "y2021"
  | "y2020"
  | "y2019"
  | "adsMotion";

export type TimelineYearEntry = {
  year: number;
  jobKey: JobKey;
  showreel: {
    youtube: string;
    thumbKey: ReelThumbKey;
    label?: LocalizedText;
  };
};

export type TimelineFeaturedEntry = {
  kind: "featured";
  id: string;
  showreel: {
    youtube: string;
    thumbKey: ReelThumbKey;
    label: LocalizedText;
  };
  jobKey?: JobKey;
};

export type TimelineEntry = TimelineYearEntry | TimelineFeaturedEntry;

/** Yearly Timeline */
export const TIMELINE: TimelineEntry[] = [
  { year: 2026, jobKey: "aiContent", showreel: { youtube: "https://www.tiktok.com/@nina.digital/video/7542394295031008530", thumbKey: "y2024" } },
  { year: 2025, jobKey: "aiContent", showreel: { youtube: "https://www.tiktok.com/@nina.digital/video/7535492183193963784", thumbKey: "y2024" } },
  { year: 2024, jobKey: "goExtra", showreel: { youtube: "https://www.youtube.com/watch?v=g7G_Xs4PSZY", thumbKey: "y2024" } },
  { year: 2023, jobKey: "goExtra", showreel: { youtube: "https://youtu.be/j2tRb8hwxfY", thumbKey: "y2023" } },
  { year: 2022, jobKey: "clickMotion", showreel: { youtube: "https://youtu.be/skfflbyNozU", thumbKey: "y2022" } },
  { year: 2021, jobKey: "clickMotion", showreel: { youtube: "https://youtu.be/c2H-W1FBsFQ", thumbKey: "y2021" } },
  { year: 2020, jobKey: "clickMotion", showreel: { youtube: "https://youtu.be/BJ4l98I5zQs", thumbKey: "y2020" } },
  { year: 2019, jobKey: "clickMotion", showreel: { youtube: "https://youtu.be/-_rIPxQRnmc", thumbKey: "y2019" } },
  { year: 2012, jobKey: "shortgun", showreel: { youtube: "https://www.youtube.com/watch?v=9YHs1BGWX0k", thumbKey: "adsMotion" } },
  {
    kind: "featured",
    id: "ads-motion",
    showreel: {
      youtube: "https://youtu.be/nIN4jYTmnX4",
      thumbKey: "adsMotion",
      label: { th: "Ads Motion Compilation", en: "Ads Motion Compilation" },
    },
  },
];

/** Skill Sections (Identity-specific) */
export type SkillSection = {
  id: string;
  title: { creative: LocalizedText; tech: LocalizedText };
  items: { creative: LocalizedText[]; tech: LocalizedText[] };
};

export const SKILL_SECTIONS_V2 = {
  soft: {
    title: {
      creative: { th: "Creative Soft Skills", en: "Creative / Motion Soft Skills" },
      tech: { th: "Tech Soft Skills", en: "Tech / Dev Soft Skills" },
    },
    items: {
      creative: [
        { th: "ทำงานภายใต้ deadline ได้โดยไม่กระทบคุณภาพงาน", en: "Thrives under tight deadlines without compromising quality" },
        { th: "บริหารหลายโปรเจกต์พร้อมกันได้อย่างมีประสิทธิภาพ", en: "Manages multiple projects simultaneously with sharp prioritization" },
        { th: "เรียนรู้เครื่องมือและเทคโนโลยีใหม่ ๆ อยู่เสมอ", en: "Constantly upskilling in emerging tools and creative technologies" },
        { th: "สื่อสารได้ดีทั้งในทีม creative และกับลูกค้า", en: "Communicates clearly across creative and client-facing teams" },
        { th: "ทำงานร่วมกับหลายทีมในกระบวนการผลิตงาน creative", en: "Cross-functional collaborator with a track record in creative production" },
      ],
      tech: [
        { th: "แปลง creative brief ให้กลายเป็นระบบที่ scale ได้จริง", en: "Translates creative briefs into scalable technical systems" },
        { th: "ทำงานในสภาวะที่ requirement เปลี่ยนเร็วได้อย่างมีประสิทธิภาพ", en: "Comfortable shipping under ambiguous, fast-moving requirements" },
        { th: "เรียนรู้ stack ใหม่ได้เร็วและนำมาใช้จริงก่อนตลาดแมสส์", en: "Self-driven learner — consistently adopts new stacks before they become mainstream" },
        { th: "เชื่อมการสื่อสารระหว่าง designer, developer และ stakeholder", en: "Bridges communication between designers, developers, and stakeholders" },
        { th: "ทำงานข้ามทีมได้ดี มุ่งเน้นการส่งมอบงานจริง", en: "Strong cross-team collaborator with a bias toward action and delivery" },
      ],
    },
  },
  interests: {
    title: {
      creative: { th: "Interests", en: "Interests" },
      tech: { th: "Tech Interests", en: "Interests — Tech angle" },
    },
    items: {
      creative: [
        { th: "AI และเทคโนโลยีเพื่องาน creative", en: "AI & emerging creative technology" },
        { th: "การเขียนโปรแกรมและระบบอัตโนมัติ", en: "Programming, automation, and systems thinking" },
        { th: "ภาพยนตร์ เกม และวัฒนธรรมดิจิทัล", en: "Cinema, gaming, and digital culture" },
      ],
      tech: [
        { th: "Generative AI, LLM และ pipeline อัตโนมัติสำหรับงาน creative", en: "Generative AI, LLM tooling, and creative automation pipelines" },
        { th: "Systems architecture และการออกแบบ workflow", en: "Systems architecture, workflow design, and developer tooling" },
        { th: "จุดตัดระหว่าง code, motion และ interactive experience", en: "The intersection of code, motion, and interactive experience" },
      ],
    },
  },
  craft: {
    title: {
      creative: { th: "Motion Graphics & VFX Craft", en: "Motion Graphics & VFX Craft" },
      tech: { th: "Value Proposition", en: "Creative Dev — Value proposition" },
    },
    items: {
      creative: [
        { th: "ประสบการณ์กว่า 10 ปีด้าน Motion Graphics และ Visual Effects สำหรับ TV, ดิจิทัล และ Live Event", en: "10+ years crafting motion graphics and visual effects for broadcast, digital, and live events" },
        { th: "เชี่ยวชาญด้าน 2D/3D Animation, VFX Compositing และ Post-production", en: "Specializes in 2D/3D animation, compositing, and cinematic post-production" },
        { th: "ผลงาน CGI Commercial และ Brand Content ให้กับแบรนด์ชั้นนำทั้งในและต่างประเทศ", en: "Delivered CGI commercials and brand content for major Thai and regional brands" },
      ],
      tech: [
        { th: "พื้นฐาน 10+ ปีด้าน motion & VFX ทำให้เข้าใจทั้ง visual และ technical ในเวลาเดียวกัน", en: "10+ years in motion & VFX production — bringing visual intuition into every system built" },
        { th: "สร้างเครื่องมือที่ automate กระบวนการงาน creative ในระดับ production จริง", en: "Designs and develops tools that automate creative workflows at scale" },
        { th: "ประสบการณ์ full-stack ที่มาจาก production จริง ไม่ใช่แค่ทฤษฎี", en: "Full-stack experience grounded in real production constraints, not just theory" },
      ],
    },
  },
};
