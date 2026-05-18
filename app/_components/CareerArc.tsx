"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { CAREER_ARC_STEPS } from "../_lib/careerArc.data";
import { LocaleStack } from "./LocaleStack";

export function CareerArc({ locale }: { locale: PortfolioLocale }) {
  return (
    <div className="portfolio-arc mt-10 relative max-w-2xl mx-auto pl-8 md:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-3.5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--pf-accent)] via-[color:var(--pf-accent)]/30 to-transparent md:-translate-x-1/2" />

      <div className="space-y-12">
        {CAREER_ARC_STEPS.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center group">
            {/* Timeline Dot */}
            <div className="absolute left-[-1.3rem] md:left-1/2 top-1.5 md:top-auto h-3 w-3 rounded-full bg-[color:var(--pf-accent)] shadow-[0_0_10px_var(--pf-accent)] md:-translate-x-1/2 z-10" />

            {/* Content Card */}
            <article className={`portfolio-panel rounded-2xl p-5 md:p-6 w-full md:w-[calc(50%-2rem)] transition-all duration-300 group-hover:bg-black/[0.02] dark:group-hover:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] ${
              idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
            }`}>
              <LocaleStack
                text={step.period}
                locale={locale}
                as="p"
                className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[color:var(--pf-accent)]"
              />
              <LocaleStack text={step.title} locale={locale} as="h3" className="mt-1 text-base md:text-lg font-bold" />
              <LocaleStack text={step.body} locale={locale} as="p" className="mt-2 text-[0.9375rem] leading-relaxed opacity-70" />
            </article>

            {/* Year marker for desktop side */}
            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-[0.75rem] font-bold uppercase tracking-[0.12em] opacity-40 w-[calc(50%-3rem)] ${
              idx % 2 === 0 ? 'text-left left-[calc(50%+2rem)]' : 'text-right right-[calc(50%+2rem)]'
            }`}>
              <LocaleStack text={step.period} locale={locale} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
