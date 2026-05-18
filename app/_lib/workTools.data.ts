import type { LocalizedText } from "./portfolio.data";

export type WorkToolLane = "creative" | "tech";

export type WorkTool = {
  id: string;
  lane: WorkToolLane;
  name: LocalizedText;
  iconSlug?: string;
  iconSrc?: string;
  fallbackAbbr: string;
  hue: string; // Used for the outer glow effect
};

/**
 * All Tools & Software Stack
 */
export const WORK_TOOLS: WorkTool[] = [
  // --- CREATIVE LANE ---
  { id: "ae", lane: "creative", name: { th: "After Effects", en: "After Effects" }, iconSlug: "adobeaftereffects", fallbackAbbr: "AE", hue: "260" },
  { id: "ps", lane: "creative", name: { th: "Photoshop", en: "Photoshop" }, iconSlug: "adobephotoshop", fallbackAbbr: "PS", hue: "210" },
  { id: "ai", lane: "creative", name: { th: "Illustrator", en: "Illustrator" }, iconSlug: "adobeillustrator", fallbackAbbr: "AI", hue: "35" },
  { id: "pr", lane: "creative", name: { th: "Premiere Pro", en: "Premiere Pro" }, iconSlug: "adobepremierepro", fallbackAbbr: "PR", hue: "280" },
  { id: "blender", lane: "creative", name: { th: "Blender", en: "Blender" }, iconSlug: "blender", fallbackAbbr: "BL", hue: "30" },
  { id: "capcut", lane: "creative", name: { th: "CapCut", en: "CapCut" }, fallbackAbbr: "CC", hue: "195" },

  // --- TECH LANE ---
  {
    id: "effecthouse",
    lane: "tech",
    name: { th: "Effect House", en: "Effect House" },
    fallbackAbbr: "EH",
    hue: "330",
  },
  { id: "nextjs", lane: "tech", name: { th: "Next.js", en: "Next.js" }, iconSlug: "nextdotjs", fallbackAbbr: "NX", hue: "0" },
  { id: "react", lane: "tech", name: { th: "React", en: "React" }, iconSlug: "react", fallbackAbbr: "RE", hue: "195" },
  { id: "typescript", lane: "tech", name: { th: "TypeScript", en: "TypeScript" }, iconSlug: "typescript", fallbackAbbr: "TS", hue: "210" },
  { id: "nodejs", lane: "tech", name: { th: "Node.js", en: "Node.js" }, iconSlug: "nodedotjs", fallbackAbbr: "NO", hue: "110" },
  { id: "firebase", lane: "tech", name: { th: "Firebase", en: "Firebase" }, iconSlug: "firebase", fallbackAbbr: "FB", hue: "45" },
  { id: "googlecloud", lane: "tech", name: { th: "GCP", en: "Google Cloud" }, iconSlug: "googlecloud", fallbackAbbr: "GC", hue: "210" },
  { id: "docker", lane: "tech", name: { th: "Docker", en: "Docker" }, iconSlug: "docker", fallbackAbbr: "DK", hue: "210" },
  { id: "postgresql", lane: "tech", name: { th: "PostgreSQL", en: "PostgreSQL" }, iconSlug: "postgresql", fallbackAbbr: "PS", hue: "210" },
  { id: "redis", lane: "tech", name: { th: "Redis", en: "Redis" }, iconSlug: "redis", fallbackAbbr: "RD", hue: "0" },
  { id: "git", lane: "tech", name: { th: "Git", en: "Git" }, iconSlug: "git", fallbackAbbr: "GT", hue: "15" },
  { id: "github", lane: "tech", name: { th: "GitHub", en: "GitHub" }, fallbackAbbr: "GH", hue: "0" },
  { id: "cursor", lane: "tech", name: { th: "Cursor", en: "Cursor" }, fallbackAbbr: "Cu", hue: "220" },
  { id: "vercel", lane: "tech", name: { th: "Vercel", en: "Vercel" }, fallbackAbbr: "Vc", hue: "0" },
  { id: "cloudflare", lane: "tech", name: { th: "Cloudflare", en: "Cloudflare" }, iconSlug: "cloudflare", fallbackAbbr: "CF", hue: "28" },
  { id: "telegram", lane: "tech", name: { th: "Telegram", en: "Telegram" }, iconSlug: "telegram", fallbackAbbr: "Tg", hue: "200" },
  { id: "notion", lane: "tech", name: { th: "Notion", en: "Notion" }, iconSlug: "notion", fallbackAbbr: "No", hue: "0" },
  { id: "python", lane: "tech", name: { th: "Python", en: "Python" }, iconSlug: "python", fallbackAbbr: "Py", hue: "210" },
  { id: "langgraph", lane: "tech", name: { th: "LangGraph", en: "LangGraph" }, fallbackAbbr: "LG", hue: "200" },
  { id: "gemini", lane: "tech", name: { th: "Gemini", en: "Gemini" }, fallbackAbbr: "Ge", hue: "260" },
  { id: "notebooklm", lane: "tech", name: { th: "NotebookLM", en: "NotebookLM" }, fallbackAbbr: "NB", hue: "180" },
  { id: "flow", lane: "tech", name: { th: "Google Flow", en: "Google Flow" }, fallbackAbbr: "GF", hue: "210" },
  { id: "sora", lane: "tech", name: { th: "Sora", en: "Sora" }, fallbackAbbr: "SO", hue: "0" },
  { id: "hermes", lane: "tech", name: { th: "Hermes", en: "Hermes" }, fallbackAbbr: "HM", hue: "200" },
  { id: "openclaw", lane: "tech", name: { th: "OpenClaw", en: "OpenClaw" }, fallbackAbbr: "OC", hue: "200" },
];

export function toolsForLane(lane: WorkToolLane): WorkTool[] {
  return WORK_TOOLS.filter((t) => t.lane === lane);
}
