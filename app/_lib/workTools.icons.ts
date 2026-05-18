import type { WorkTool } from "./workTools.data";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONIFY = "https://api.iconify.design";

/** โลโก้ที่หาจาก Devicon อัตโนมัติไม่ได้ — เจาะจง URL ที่ชัวร์ที่สุด */
export const WORK_TOOL_ICON_SRC = {
  ae: `${DEVICON}/aftereffects/aftereffects-original.svg`,
  ps: `${DEVICON}/photoshop/photoshop-original.svg`,
  ai: `${DEVICON}/illustrator/illustrator-original.svg`,
  pr: `${DEVICON}/premierepro/premierepro-original.svg`,
  blender: `${DEVICON}/blender/blender-original.svg`,
  capcut: `https://www.vectorlogo.zone/logos/capcut/capcut-icon.svg`, 
  effecthouse: `https://p16-va.lemon8cdn.com/obj/eden-va/ulwhp_ljp_lp/ljp/effect_house_logo.png`, 
  cursor: `https://www.vectorlogo.zone/logos/cursorai/cursorai-icon.svg`,
  langgraph: `https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/langchain_logo.png`,
  telegram: `https://www.vectorlogo.zone/logos/telegram/telegram-icon.svg`,
  vercel: `https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg`,
  cloudflare: `${ICONIFY}/logos/cloudflare-icon.svg`,
  notion: `${ICONIFY}/logos/notion-icon.svg`,
  redis: `${DEVICON}/redis/redis-original.svg`,
  github: `https://www.vectorlogo.zone/logos/github/github-icon.svg`,
  gemini: `https://www.gstatic.com/lamda/images/favicon_v2_128.png`,
  notebooklm: `https://raw.githubusercontent.com/google-gemini/notebooklm-samples/main/notebooklm_logo.png`,
  googlecloud: `${DEVICON}/googlecloud/googlecloud-original.svg`,
  flow: `${ICONIFY}/logos/google-cloud-functions.svg`, 
  sora: `https://openai.com/favicon.ico`, 
  hermes: `https://raw.githubusercontent.com/NousResearch/Hermes/main/assets/nous-logo.png`, 
  openclaw: `https://raw.githubusercontent.com/openclaw/openclaw/master/assets/icon.png`, 
} as const;

export function workToolIconUrl(tool: WorkTool, theme: "light" | "dark"): string | null {
  // พิเศษสำหรับ GitHub และ Vercel ที่มักจะเป็นสีดำจนจมหายในโหมดมืด
  if (tool.id === "github") {
    return theme === "dark" 
      ? `https://cdn.simpleicons.org/github/white` 
      : `https://cdn.simpleicons.org/github/black`;
  }
  
  if (tool.id === "vercel") {
    return theme === "dark"
      ? `https://cdn.simpleicons.org/vercel/white` 
      : `https://cdn.simpleicons.org/vercel/black`;
  }

  if (tool.id === "effecthouse") {
    return `https://p16-va.lemon8cdn.com/obj/eden-va/ulwhp_ljp_lp/ljp/effect_house_logo.png`; 
  }

  if (tool.id === "cursor") {
    return `https://www.vectorlogo.zone/logos/cursorai/cursorai-icon.svg`;
  }

  if (tool.id === "langgraph") {
    return `https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/langchain_logo.png`;
  }

  if (tool.id === "gemini") {
    return `https://www.gstatic.com/lamda/images/favicon_v2_128.png`;
  }

  if (tool.id === "notebooklm") {
    return `https://raw.githubusercontent.com/google-gemini/notebooklm-samples/main/notebooklm_logo.png`;
  }

  if (tool.id === "hermes") {
    return `https://raw.githubusercontent.com/NousResearch/Hermes/main/assets/nous-logo.png`; 
  }

  if (tool.id === "sora") {
     return `https://openai.com/favicon.ico`;
  }

  if (tool.iconSrc) return tool.iconSrc;
  
  if (tool.iconSlug) {
    const slug = tool.iconSlug.replace("dotjs", "").replace("dot", "");
    
    const specialCases: Record<string, string> = {
      "nextdotjs": "nextjs/nextjs-original.svg",
      "typescript": "typescript/typescript-original.svg",
      "nodedotjs": "nodejs/nodejs-original.svg",
      "googlecloud": "googlecloud/googlecloud-original.svg",
      "postgresql": "postgresql/postgresql-original.svg",
      "firebase": "firebase/firebase-plain.svg",
      "docker": "docker/docker-original.svg",
      "python": "python/python-original.svg",
      "git": "git/git-original.svg",
      "github": "github/github-original.svg",
      "react": "react/react-original.svg",
    };

    if (specialCases[tool.iconSlug]) {
      return `${DEVICON}/${specialCases[tool.iconSlug]}`;
    }

    return `${DEVICON}/${slug}/${slug}-original.svg`;
  }
  
  return null;
}
