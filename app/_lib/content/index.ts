import profileJson from "../../../content/profile.json";
import jobsJson from "../../../content/jobs.json";
import timelineJson from "../../../content/timeline.json";
import skillsJson from "../../../content/skills.json";
import careerArcJson from "../../../content/career-arc.json";
import techJson from "../../../content/tech.json";
import workToolsJson from "../../../content/work-tools.json";
import uiJson from "../../../content/ui.json";
import motionReelsExtraJson from "../../../content/motion-reels-extra.json";

import type {
  CareerArcStep,
  JobKey,
  LocalizedText,
  ReelThumbKey,
  TechExperience,
  TechSkillGroup,
  TimelineEntry,
  TimelineFeaturedEntry,
  TimelineYearEntry,
  WorkTool,
} from "./types";

export const PROFILE = profileJson;

export const JOB_IMAGE_KEYS = jobsJson.jobImageKeys as Record<JobKey, string>;
export const JOBS = jobsJson.jobs as Record<
  JobKey,
  {
    imageKey: string;
    company: LocalizedText;
    title: LocalizedText;
    period: LocalizedText;
    highlights: { th: string[]; en: string[] };
  }
>;

type TimelineShowreelJson = {
  url: string;
  thumbKey?: string | null;
  thumbUrl?: string | null;
  label: LocalizedText | null;
};

function mapShowreel(s: TimelineShowreelJson) {
  const showreel: TimelineYearEntry["showreel"] = { youtube: s.url };
  if (s.thumbKey) showreel.thumbKey = s.thumbKey as ReelThumbKey;
  if (s.thumbUrl) showreel.thumbUrl = s.thumbUrl;
  if (s.label) showreel.label = s.label;
  return showreel;
}

function normalizeTimeline(raw: unknown[]): TimelineEntry[] {
  return raw.map((entry) => {
    const e = entry as Record<string, unknown>;
    if (e.kind === "featured") {
      const featured: TimelineFeaturedEntry = {
        kind: "featured",
        id: e.id as string,
        showreel: mapShowreel(e.showreel as TimelineShowreelJson) as TimelineFeaturedEntry["showreel"],
      };
      if (e.jobKey) featured.jobKey = e.jobKey as JobKey;
      return featured;
    }
    const year: TimelineYearEntry = {
      year: e.year as number,
      jobKey: e.jobKey as JobKey,
      showreel: mapShowreel(e.showreel as TimelineShowreelJson),
    };
    return year;
  });
}

export const TIMELINE = normalizeTimeline(timelineJson as unknown[]);

export const SKILL_SECTIONS_V2 = skillsJson;

export const CAREER_ARC_STEPS = careerArcJson.steps as CareerArcStep[];

export const TECH_PROFILE = techJson.profile;
export const TECH_SKILL_GROUPS = techJson.skillGroups as TechSkillGroup[];
export const TECH_EXPERIENCE = techJson.experiences as TechExperience[];

export const WORK_TOOLS = workToolsJson.tools as WorkTool[];

export const UI = uiJson;

export const MOTION_REELS_EXTRA = motionReelsExtraJson as {
  id: string;
  url: string;
  thumbKey?: ReelThumbKey;
  thumbUrl?: string;
  label: LocalizedText;
}[];
