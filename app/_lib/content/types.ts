export type LocalizedText = { th: string; en: string };

export type LocalizedTagline = {
  creative: LocalizedText;
  tech: LocalizedText;
};

export type JobKey = "goExtra" | "clickMotion" | "shortgun" | "aiContent";

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
    thumbKey?: ReelThumbKey;
    thumbUrl?: string;
    label?: LocalizedText;
  };
};

export type TimelineFeaturedEntry = {
  kind: "featured";
  id: string;
  showreel: {
    youtube: string;
    thumbKey?: ReelThumbKey;
    thumbUrl?: string;
    label: LocalizedText;
  };
  jobKey?: JobKey;
};

export type TimelineEntry = TimelineYearEntry | TimelineFeaturedEntry;

export type SkillSection = {
  id: string;
  title: { creative: LocalizedText; tech: LocalizedText };
  items: { creative: LocalizedText[]; tech: LocalizedText[] };
};

export type CareerArcStep = {
  id: string;
  period: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
};

export type TechSkillGroup = {
  id: string;
  title: LocalizedText;
  items: { label: LocalizedText; bullets: LocalizedText[] }[];
};

export type TechExperience = {
  id: string;
  period: LocalizedText;
  role: LocalizedText;
  project: LocalizedText;
  stack: LocalizedText;
  outcomes: LocalizedText[];
  url?: string;
  status?: LocalizedText;
  imageUrl?: string;
};

export type WorkToolLane = "creative" | "tech";
export type WorkToolGroup = "ai" | "tool";

export type WorkTool = {
  id: string;
  lane: WorkToolLane;
  /** ai = โมเดล/เอเจนต์/งาน AI ก่อน, tool = เครื่องมือทั่วไป */
  group?: WorkToolGroup;
  name: LocalizedText;
  iconSlug?: string;
  iconSrc?: string;
  fallbackAbbr: string;
  hue: string;
};
