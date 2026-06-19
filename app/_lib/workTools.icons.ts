import type { WorkTool } from "./workTools.data";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE_ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@14.15.0/icons";

export type WorkToolIconPin = string | { light: string; dark: string };

function resolveIconPin(pin: WorkToolIconPin, theme: "light" | "dark"): string {
  return typeof pin === "string" ? pin : pin[theme];
}

/** โลโก้ที่ต้องกลับสีบนธีมมืด (SVG โมโนโครมจาก Simple Icons) */
export const WORK_TOOL_INVERT_ON_DARK = new Set<string>(["sora", "gpt", "codex"]);

/** โลโก้คงที่ — ใช้ id เป็น key */
export const WORK_TOOL_ICON_SRC: Record<string, WorkToolIconPin> = {
  ae: `${DEVICON}/aftereffects/aftereffects-original.svg`,
  ps: `${DEVICON}/photoshop/photoshop-original.svg`,
  ai: `${DEVICON}/illustrator/illustrator-original.svg`,
  pr: `${DEVICON}/premierepro/premierepro-original.svg`,
  blender: `${DEVICON}/blender/blender-original.svg`,
  capcut: {
    light: "/icons/work-tools/capcut-light.png",
    dark: "/icons/work-tools/capcut-dark.png",
  },
  nextjs: `${DEVICON}/nextjs/nextjs-original.svg`,
  react: `${DEVICON}/react/react-original.svg`,
  typescript: `${DEVICON}/typescript/typescript-original.svg`,
  nodejs: `${DEVICON}/nodejs/nodejs-original.svg`,
  firebase: `${DEVICON}/firebase/firebase-plain.svg`,
  googlecloud: `${DEVICON}/googlecloud/googlecloud-original.svg`,
  docker: `${DEVICON}/docker/docker-original.svg`,
  postgresql: `${DEVICON}/postgresql/postgresql-original.svg`,
  redis: `${DEVICON}/redis/redis-original.svg`,
  git: `${DEVICON}/git/git-original.svg`,
  cloudflare: `${DEVICON}/cloudflare/cloudflare-original.svg`,
  notion: `${DEVICON}/notion/notion-original.svg`,
  python: `${DEVICON}/python/python-original.svg`,
  langgraph: {
    light: "https://cdn.simpleicons.org/langgraph/1C3C3C",
    dark: "https://cdn.simpleicons.org/langgraph/FFFFFF",
  },
  gemini: {
    light: "https://cdn.simpleicons.org/googlegemini/4285F4",
    dark: "https://cdn.simpleicons.org/googlegemini/FFFFFF",
  },
  notebooklm: {
    light: "/icons/work-tools/notebooklm-light.png",
    dark: "/icons/work-tools/notebooklm-dark.png",
  },
  flow: {
    light: "https://cdn.simpleicons.org/googlecloud/4285F4",
    dark: "https://cdn.simpleicons.org/googlecloud/FFFFFF",
  },
  gpt: `${SIMPLE_ICONS}/openai.svg`,
  codex: `${SIMPLE_ICONS}/openai.svg`,
  sora: `${SIMPLE_ICONS}/openai.svg`,
  hermes: "https://hermes-agent.ai/icon.png",
  obsidian: {
    light: "https://cdn.simpleicons.org/obsidian/7C3AED",
    dark: "https://cdn.simpleicons.org/obsidian/FFFFFF",
  },
  topaz: {
    light: "/icons/work-tools/topazlabs-light.png",
    dark: "/icons/work-tools/topazlabs-dark.png",
  },
};

/** โลโก้ที่สลับสีตามธีม (มืด/สว่าง) */
const THEME_SIMPLE_ICONS: Record<string, string> = {
  github: "github",
  vercel: "vercel",
  cursor: "cursor",
  effecthouse: "tiktok",
};

function simpleIcon(slug: string, theme: "light" | "dark"): string {
  const color = theme === "dark" ? "ffffff" : "171717";
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

const DEVICON_BY_SLUG: Record<string, string> = {
  adobeaftereffects: "aftereffects/aftereffects-original.svg",
  adobephotoshop: "photoshop/photoshop-original.svg",
  adobeillustrator: "illustrator/illustrator-original.svg",
  adobepremierepro: "premierepro/premierepro-original.svg",
  blender: "blender/blender-original.svg",
  nextdotjs: "nextjs/nextjs-original.svg",
  nodedotjs: "nodejs/nodejs-original.svg",
  typescript: "typescript/typescript-original.svg",
  googlecloud: "googlecloud/googlecloud-original.svg",
  postgresql: "postgresql/postgresql-original.svg",
  firebase: "firebase/firebase-plain.svg",
  docker: "docker/docker-original.svg",
  python: "python/python-original.svg",
  git: "git/git-original.svg",
  react: "react/react-original.svg",
  redis: "redis/redis-original.svg",
  cloudflare: "cloudflare/cloudflare-original.svg",
  notion: "notion/notion-original.svg",
};

export function workToolIconUrl(tool: WorkTool, theme: "light" | "dark"): string | null {
  if (tool.iconSrc) return tool.iconSrc;

  const pinned = WORK_TOOL_ICON_SRC[tool.id];
  if (pinned) return resolveIconPin(pinned, theme);

  const simpleSlug = THEME_SIMPLE_ICONS[tool.id];
  if (simpleSlug) return simpleIcon(simpleSlug, theme);

  if (tool.iconSlug) {
    const mapped = DEVICON_BY_SLUG[tool.iconSlug];
    if (mapped) return `${DEVICON}/${mapped}`;
    const base = tool.iconSlug.replace(/dotjs$/i, "js").replace(/dot/g, "");
    return `${DEVICON}/${base}/${base}-original.svg`;
  }

  return null;
}

export function workToolIconNeedsDarkInvert(toolId: string, theme: "light" | "dark"): boolean {
  return theme === "dark" && WORK_TOOL_INVERT_ON_DARK.has(toolId);
}
