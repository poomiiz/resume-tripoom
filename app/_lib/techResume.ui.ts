import type { PortfolioLocale } from "./portfolio.ui";

export const TECH_RESUME_UI = {
  th: {
    stack: "เทคโนโลยี",
    outcomes: "ผลลัพธ์หลัก",
  },
  en: {
    stack: "Stack",
    outcomes: "Key outcomes",
  },
} as const;

export function techUi(locale: PortfolioLocale, key: keyof (typeof TECH_RESUME_UI)["th"]): string {
  return TECH_RESUME_UI[locale][key];
}
