"use client";

import type { ReactNode } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { LocaleStack } from "./LocaleStack";
import type { PortfolioMode } from "./ProfileToggle";
import { SKILL_SECTIONS_V2 } from "../_lib/portfolio.data";

type Props = {
  locale: PortfolioLocale;
  displayMode: PortfolioMode;
  /** แสดงเฉพาะทักษะส่วนตัว (จุดยืน) */
  personalOnly?: boolean;
  /** แสดงเฉพาะความสนใจ */
  interestsOnly?: boolean;
  /** แสดงเฉพาะงานกราฟิกและโมชัน (หรือ Value Prop) */
  craftOnly?: boolean;
};

const SECTION_GLYPHS: Record<string, string> = {
  soft: "◆",
  craft: "◎",
  interests: "✦",
};

function SectionHeader({
  title,
  locale,
  glyph,
}: {
  title: { th: string; en: string };
  locale: PortfolioLocale;
  glyph: string;
}) {
  return (
    <header className="portfolio-skill-section__head flex items-start gap-3 text-left">
      <span className="portfolio-skill-section__icon text-[color:var(--pf-accent)] text-lg" aria-hidden>
        {glyph}
      </span>
      <LocaleStack text={title} locale={locale} as="h2" className="text-base md:text-lg font-bold leading-tight text-black dark:text-white" />
    </header>
  );
}

/**
 * A unified list style (01, 02, 03) for all skill types
 */
function UnifiedNumberedList({ items, locale }: { items: { th: string; en: string }[]; locale: PortfolioLocale }) {
  return (
    <ul className="portfolio-skill-list mt-6 space-y-4 text-left">
      {items.map((item, i) => (
        <li key={item.th} className="portfolio-skill-item flex items-start gap-4 group">
          <span className="portfolio-skill-num tabular-nums text-[color:var(--pf-accent)] font-black text-[0.65rem] mt-1 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <LocaleStack 
              text={item} 
              locale={locale} 
              className="text-[0.85rem] md:text-[0.95rem] leading-relaxed text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-all font-medium" 
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SkillSectionCard({
  title,
  id,
  locale,
  children,
}: {
  title: { th: string; en: string };
  id: string;
  locale: PortfolioLocale;
  children?: ReactNode;
}) {
  const glyph = SECTION_GLYPHS[id] || "◇";
  return (
    <article
      className={[
        "portfolio-skill-section portfolio-panel rounded-[2rem] p-7 md:p-8 h-full border border-black/[0.1] dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-xl dark:shadow-none transition-all hover:border-[color:var(--pf-accent)]/30",
        `portfolio-skill-section--${id}`,
      ].join(" ")}
    >
      <SectionHeader title={title} locale={locale} glyph={glyph} />
      {children}
    </article>
  );
}

export function SkillsShowcase({ locale, displayMode, personalOnly, interestsOnly, craftOnly }: Props) {
  const data = SKILL_SECTIONS_V2;

  if (personalOnly) {
    return (
      <SkillSectionCard title={data.soft.title[displayMode]} id="soft" locale={locale}>
        <UnifiedNumberedList items={data.soft.items[displayMode]} locale={locale} />
      </SkillSectionCard>
    );
  }

  if (interestsOnly) {
    return (
      <SkillSectionCard title={data.interests.title[displayMode]} id="interests" locale={locale}>
        <UnifiedNumberedList items={data.interests.items[displayMode]} locale={locale} />
      </SkillSectionCard>
    );
  }

  if (craftOnly) {
    return (
      <SkillSectionCard title={data.craft.title[displayMode]} id="craft" locale={locale}>
        <UnifiedNumberedList items={data.craft.items[displayMode]} locale={locale} />
      </SkillSectionCard>
    );
  }

  return null;
}
