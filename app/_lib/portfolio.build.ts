import { FRAMER_BRAND_LOGOS, FRAMER_IMAGES } from "./framerAssets";
import {
  JOBS,
  JOB_IMAGE_KEYS,
  PROFILE,
  SKILL_SECTIONS_V2,
  TIMELINE,
  type JobKey,
  type LocalizedText,
  type TimelineEntry,
} from "./portfolio.data";
import { CAREER_ARC_STEPS, type CareerArcStep } from "./careerArc.data";
import { TECH_EXPERIENCE, type TechExperience } from "./techResume.data";
import type { PortfolioLocale } from "./portfolio.ui";
import { pickLocale } from "./portfolio.ui";
import { youtubeWatchUrl } from "./youtube";

function showreelHref(youtube: string): string {
  return youtubeWatchUrl(youtube);
}

function reelThumb(thumbKey: keyof typeof FRAMER_IMAGES.reelThumbs): string {
  return FRAMER_IMAGES.reelThumbs[thumbKey];
}

export type ResolvedTimelineRow = {
  id: string;
  year: number | null;
  yearLabel: string;
  isFeatured: boolean;
  showreel: {
    href: string;
    thumb: string;
    label: LocalizedText;
  };
  job: {
    key: JobKey;
    company: LocalizedText;
    title: LocalizedText;
    period: LocalizedText;
    image: string;
    highlights: LocalizedText[];
    isNewJob: boolean;
    clientLists?: { id: string; label: LocalizedText; brands: LocalizedText }[];
  } | null;
  jobLabel: {
    at: LocalizedText;
    continued: LocalizedText;
  };
};

export type MotionGroup = {
  job: {
    key: JobKey | "featured";
    company: LocalizedText;
    title: LocalizedText;
    period: LocalizedText;
    highlights: LocalizedText[];
    clientLists?: import("./portfolio.data").JobClientList[];
  };
  reels: {
    id: string;
    yearLabel: string;
    href: string;
    thumb: string;
    label: LocalizedText;
  }[];
};

export type UnifiedTimelinePhase = {
  arc: CareerArcStep;
  techProjects: TechExperience[];
  motionGroups: MotionGroup[];
};

const TIMELINE_UI = {
  at: {
    th: "ที่ทำงาน",
    en: "Employer",
  },
  continued: {
    th: "ทำงานต่อเนื่อง",
    en: "Ongoing role",
  },
} as const;

function isFeatured(entry: TimelineEntry): entry is Extract<TimelineEntry, { kind: "featured" }> {
  return "kind" in entry && entry.kind === "featured";
}

function toHighlightPairs(jobKey: JobKey): LocalizedText[] {
  const job = JOBS[jobKey];
  if (!job) return [];
  const len = job.highlights.th.length;
  return Array.from({ length: len }, (_, i) => ({
    th: job.highlights.th[i] ?? "",
    en: job.highlights.en[i] ?? "",
  }));
}

/** จัดกลุ่มข้อมูลตามเฟสของเส้นทางอาชีพ */
export function buildUnifiedTimeline(): UnifiedTimelinePhase[] {
  const TECH_PHASE_MAP: Record<string, string> = {
    "moonracle-2026": "advanced-systems",
    "staedtler-voucher-2026": "advanced-systems",
    "ai-music-pipeline-2026": "advanced-systems",
    "ai-workspace-infra-2026": "advanced-systems",
    "hermes-integration-2026": "advanced-systems",
    "ai-media-research-2026": "advanced-systems",
    "automation-make-notion-2026": "advanced-systems",
    "ai-business-design-2026": "advanced-systems",
    "tiktok-spiritual-2025": "advanced-systems",
    "oracle-display-2025": "advanced-systems",
    "tiktok-ar-2024": "advanced-systems",
  };

  const motionGroups: MotionGroup[] = [];
  let currentGroup: MotionGroup | null = null;

  for (const entry of TIMELINE) {
    if (isFeatured(entry)) {
      motionGroups.push({
        job: {
          key: "featured",
          company: entry.showreel.label,
          title: { th: "Portfolio", en: "Portfolio" },
          period: { th: "รวมงานโฆษณา", en: "Ad reel collection" },
          highlights: [],
        },
        reels: [
          {
            id: entry.id,
            yearLabel: "★",
            href: showreelHref(entry.showreel.youtube),
            thumb: reelThumb(entry.showreel.thumbKey),
            label: entry.showreel.label,
          },
        ],
      });
      continue;
    }

    const job = JOBS[entry.jobKey];
    if (!job) continue;

    if (!currentGroup || currentGroup.job.key !== entry.jobKey) {
      currentGroup = {
        job: {
          key: entry.jobKey,
          company: job.company,
          title: job.title,
          period: job.period,
          highlights: toHighlightPairs(entry.jobKey),
          clientLists: job.clientLists,
        },
        reels: [],
      };
      motionGroups.push(currentGroup);
    }

    currentGroup.reels.push({
      id: `y-${entry.year}`,
      yearLabel: String(entry.year),
      href: showreelHref(entry.showreel.youtube),
      thumb: reelThumb(entry.showreel.thumbKey),
      label: entry.showreel.label || { th: `Showreel ${entry.year}`, en: `Showreel ${entry.year}` },
    });
  }

  return CAREER_ARC_STEPS.map((arc) => {
    const phaseTech = TECH_EXPERIENCE.filter((t) => TECH_PHASE_MAP[t.id] === arc.id);
    const phaseMotion = arc.id === "foundation" ? motionGroups : [];

    return {
      arc,
      techProjects: phaseTech,
      motionGroups: phaseMotion,
    };
  });
}

// REST OF FILE (COMPATIBILITY)
export function buildTimeline(): ResolvedTimelineRow[] { return []; }
export function getPortfolioImages() {
  return {
    heroBackground: FRAMER_IMAGES.heroBackground,
    heroOverlay: FRAMER_IMAGES.heroOverlay,
    portrait: FRAMER_IMAGES.portrait,
  };
}
export function getProfile() { return PROFILE; }
export function getSkillSections(): import("./portfolio.data").SkillSection[] {
  return Object.entries(SKILL_SECTIONS_V2).map(([id, section]) => ({
    id,
    title: section.title,
    items: section.items,
  }));
}
export function getBrandLogos() { return FRAMER_BRAND_LOGOS; }
export function reelLabelForLocale(label: LocalizedText, locale: PortfolioLocale) {
  return pickLocale(locale, label);
}
export { PROFILE, SKILL_SECTIONS_V2 };
