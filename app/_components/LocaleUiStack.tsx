"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { UI } from "../_lib/portfolio.ui";

type UiTree = typeof UI.th;

function getPath(tree: UiTree, path: string): { th: string; en: string } {
  const parts = path.split(".");
  let thCur: unknown = UI.th;
  let enCur: unknown = UI.en;
  for (const p of parts) {
    thCur = (thCur as Record<string, unknown>)?.[p];
    enCur = (enCur as Record<string, unknown>)?.[p];
  }
  return { th: String(thCur ?? ""), en: String(enCur ?? "") };
}

/** ข้อความ UI (ปุ่ม/หัวข้อ) แบบไม่เด้ง layout */
export function LocaleUiStack({
  path,
  locale,
  className = "",
  as: Tag = "span",
}: {
  path: string;
  locale: PortfolioLocale;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
}) {
  const text = getPath(UI.th, path);
  return (
    <Tag className={["portfolio-locale-stack", className].filter(Boolean).join(" ")}>
      <span
        className={locale === "th" ? "portfolio-locale-stack__active" : "portfolio-locale-stack__ghost"}
        aria-hidden={locale !== "th"}
      >
        {text.th}
      </span>
      <span
        className={locale === "en" ? "portfolio-locale-stack__active" : "portfolio-locale-stack__ghost"}
        aria-hidden={locale !== "en"}
      >
        {text.en}
      </span>
    </Tag>
  );
}
