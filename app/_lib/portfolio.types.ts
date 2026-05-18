import type { CareerArcStep } from "./careerArc.data";
import type { LocalizedText, JobKey } from "./content/types";
import type { TechExperience } from "./techResume.data";

export type MotionGroup = {
  job: {
    key: JobKey | "featured";
    company: LocalizedText;
    title: LocalizedText;
    period: LocalizedText;
    highlights: LocalizedText[];
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

export type ExtraMotionReel = {
  id: string;
  href: string;
  thumb: string;
  label: LocalizedText;
};
