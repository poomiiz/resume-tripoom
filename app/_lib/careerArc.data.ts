import type { LocalizedText } from "./portfolio.data";

export type CareerArcStep = {
  id: string;
  period: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
};

/** เส้นทางอาชีพ — เล่าเรื่องการพัฒนาการแบบไทม์ไลน์ที่อ้างอิงจากงานจริง */
export const CAREER_ARC_STEPS: CareerArcStep[] = [
  {
    id: "foundation",
    period: { th: "2012 — 2024", en: "2012 — 2024" },
    title: { th: "Senior Motion Artist & Visual Legacy", en: "Senior Motion Artist & Visual Legacy" },
    body: {
      th: "สร้างรากฐานจากงาน Motion Graphics และ VFX ให้กับแบรนด์ระดับโลก (Samsung, Lexus, PTT, SCB) ผ่านงานโฆษณาทีวีและ Event ใหญ่ระดับประเทศ บูรณาการศิลปะดั้งเดิมเข้ากับเทคนิคสมัยใหม่เพื่อสร้างภาพลักษณ์ที่น่าจดจำ",
      en: "Built a robust creative foundation as a Senior Motion Artist for global giants (Samsung, Lexus, PTT, SCB). Delivered high-end visuals for TV commercials and national-scale events, bridging traditional artistry with modern production techniques.",
    },
  },
  {
    id: "advanced-systems",
    period: { th: "2025 — ปัจจุบัน", en: "2025 — Present" },
    title: { th: "AI Systems Architect & Content Director", en: "AI Systems Architect & Content Director" },
    body: {
      th: "ก้าวสู่การเป็นผู้ออกแบบระบบ Creative Automation และกำกับเนื้อหาด้วย AI (AI Content Director) พัฒนาแพลตฟอร์ม Full-stack (MoonRacle, STAEDTLER) และ AI Agents ที่เชื่อมโยงงานภาพระดับพรีเมียมเข้ากับสถาปัตยกรรมทางเทคนิคที่ชาญฉลาด",
      en: "Evolved into a Creative Automation Architect and AI Content Director. Building intelligent full-stack platforms (MoonRacle, STAEDTLER) and AI Agents that bridge premium visual storytelling with robust, code-driven creative pipelines.",
    },
  },
];
