import type { LocalizedText } from "./portfolio.data";

export type PortfolioLocale = "th" | "en";

export const LOCALE_EMOJI: Record<PortfolioLocale, string> = {
  th: "🇹🇭",
  en: "🇬🇧",
};

export const UI = {
  th: {
    nav: {
      story: "หน้าแรก",
      skills: "Systems",
      projects: "Motion",
      motion: "Motion",
      contact: "ติดต่อ",
    },
    theme: { light: "สว่าง", dark: "มืด" },
    hero: {
      ctaStory: "ดูผลงาน",
      ctaProjects: "โปรเจกต์",
      ctaMotion: "Showreel",
      ctaContact: "ติดต่อ",
    },
    sections: {
      strengths: "จุดแข็ง",
      about: "เกี่ยวกับ",
      story: "ผลงาน",
      skills: "Systems & Architecture",
      tools: "Motion Craft & Technical Stack",
      projects: "โปรเจกต์",
      motion: "ผลงาน Motion",
      timeline: "Showreel รายปี",
      brands: "แบรนด์",
      brandsTitle: "แบรนด์ที่เคยร่วมงาน",
      contact: "ติดต่อ",
      contactTitle: "มาคุยงานกัน",
      contactSub: "Motion · VFX · แพลตฟอร์ม · AI · งานสร้างสรรค์",
    },
    timeline: {
      year: "ปี",
      showreel: "Highlight",
      watch: "รับชมวิดีโอ",
      continued: "ทำงานต่อเนื่อง",
    },
    footer: {
      source: "เนื้อหาและรูปจาก",
    },
  },
  en: {
    nav: {
      story: "Home",
      skills: "Systems",
      projects: "Motion",
      motion: "Motion",
      contact: "Contact",
    },
    theme: { light: "Light", dark: "Dark" },
    hero: {
      ctaStory: "View Portfolio",
      ctaProjects: "Projects",
      ctaMotion: "Showreel",
      ctaContact: "Contact",
    },
    sections: {
      strengths: "Strengths",
      about: "About",
      story: "Portfolio",
      skills: "Systems & Architecture",
      tools: "Motion Craft & Technical Stack",
      projects: "Projects",
      motion: "Motion Graphic",
      timeline: "Yearly Showreels",
      brands: "Brands",
      brandsTitle: "Experience Working With Brands",
      contact: "Contact",
      contactTitle: "Let's Work Together",
      contactSub: "Motion · VFX · Platforms · AI · Creative Work",
    },
    timeline: {
      year: "Year",
      showreel: "Highlight",
      watch: "Watch Video",
      continued: "Continued role",
    },
    footer: {
      source: "Content and images from",
    },
  },
} as const;

export function pickLocale<T extends LocalizedText>(locale: PortfolioLocale, text: T): string {
  return text[locale];
}
