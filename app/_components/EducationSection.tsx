"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { EducationRecord } from "../_lib/content/types";
import { LocaleStack } from "./LocaleStack";

export function EducationSection({ data, locale }: { data: EducationRecord; locale: PortfolioLocale }) {
  return (
    <article className="portfolio-edu-card portfolio-panel mt-2 max-w-3xl rounded-2xl px-6 py-7 md:px-8 md:py-8 text-left">
      <LocaleStack
        text={data.degreeLine}
        locale={locale}
        as="h3"
        className="text-lg font-bold leading-snug text-black dark:text-white md:text-xl"
      />
      <LocaleStack
        text={data.institution}
        locale={locale}
        as="p"
        className="mt-2 text-base font-medium text-black/75 dark:text-white/75 md:text-lg"
      />
      <p className="portfolio-label mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-black/68 dark:text-white/70">
        <LocaleStack text={data.highlightsLabel} locale={locale} as="span" />
      </p>
      <LocaleStack
        text={data.highlightsBody}
        locale={locale}
        as="p"
        className="portfolio-text-body mt-2 text-[0.9375rem] leading-relaxed text-black/80 dark:text-white/80 md:text-base"
      />
    </article>
  );
}
