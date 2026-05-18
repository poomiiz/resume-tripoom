"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { TECH_EXPERIENCE } from "../_lib/techResume.data";
import { techUi } from "../_lib/techResume.ui";
import { LocaleStack } from "./LocaleStack";

export function TechProjectsList({ locale }: { locale: PortfolioLocale }) {
  if (TECH_EXPERIENCE.length === 0) {
    return (
      <div className="portfolio-panel rounded-[1.5rem] p-10 md:p-16 text-center border border-white/5 opacity-50">
        <p className="text-3xl mb-4">🚀</p>
        <h3 className="text-xl font-bold mb-2">
          {locale === "th" ? "กำลังเตรียมข้อมูลโปรเจกต์เทค" : "Tech Projects Coming Soon"}
        </h3>
        <p className="text-sm">
          {locale === "th" 
            ? "กำลังรวบรวมผลงานด้านการพัฒนาแพลตฟอร์มและ AI Agents" 
            : "Gathering information on platform development and AI Agent projects."}
        </p>
      </div>
    );
  }

  return (
    <ol className="mt-8 space-y-10">
      {TECH_EXPERIENCE.map((entry) => (
        <li
          key={entry.id}
          className="portfolio-tech-entry flex flex-col gap-4"
        >
          {/* Year Header */}
          <div className="flex items-baseline gap-3">
            <LocaleStack
              text={entry.period}
              locale={locale}
              as="span"
              className="font-brand text-2xl md:text-3xl font-bold text-[color:var(--pf-accent)] tabular-nums"
            />
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em] opacity-50">Timeline</span>
          </div>

          {/* Project Card */}
          <div className="portfolio-panel rounded-[1.5rem] p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_1.8fr]">
            <div>
              <LocaleStack text={entry.role} locale={locale} as="p" className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[color:var(--pf-accent)]" />
              <LocaleStack text={entry.project} locale={locale} as="h3" className="mt-2 text-xl md:text-2xl font-bold leading-tight" />

              <div className="mt-6">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] opacity-55">{techUi(locale, "stack")}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <LocaleStack text={entry.stack} locale={locale} as="p" className="text-[0.9375rem] opacity-80" />
                </div>
              </div>
            </div>

            <div className="md:border-l md:border-black/[0.08] dark:md:border-white/10 md:pl-8">
              <ul className="space-y-3">
                {entry.outcomes.map((o) => (
                  <li key={o.en} className="flex gap-3 text-[0.9375rem] md:text-base leading-relaxed opacity-85">
                    <span className="portfolio-accent shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full" />
                    <LocaleStack text={o} locale={locale} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
