"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { ResolvedTimelineRow } from "../_lib/portfolio.build";
import { LocaleStack } from "./LocaleStack";
import { LocaleUiStack } from "./LocaleUiStack";
import { ShowreelEmbed } from "./ShowreelEmbed";

type Props = {
  locale: PortfolioLocale;
  timeline: ResolvedTimelineRow[];
  brandLogos: { src: string; alt: string }[];
};

export function MotionProjectsSection({ locale, timeline }: Props) {
  return (
    <div className="space-y-16">
      <div id="timeline" className="scroll-mt-24">
        <LocaleUiStack path="sections.timeline" locale={locale} as="h2" className="text-lg font-bold block" />
        <ol className="portfolio-timeline-list mt-10 space-y-12">
          {timeline.map((row) => (
            <li key={row.id} className="portfolio-timeline-entry flex flex-col gap-6">
              {/* Year Header */}
              <div className="flex items-baseline gap-3">
                <span
                  className={[
                    "portfolio-timeline-year font-brand text-3xl md:text-4xl font-bold tabular-nums",
                    row.isFeatured ? "text-lg md:text-xl" : "",
                  ].join(" ")}
                >
                  {row.isFeatured ? "★" : row.yearLabel}
                </span>
                {!row.isFeatured && row.year ? (
                  <LocaleUiStack
                    path="timeline.year"
                    locale={locale}
                    className="text-[0.7rem] font-bold uppercase tracking-[0.2em] opacity-40 block"
                  />
                ) : null}
              </div>

              <ShowreelEmbed
                href={row.showreel.href}
                thumb={row.showreel.thumb}
                label={row.showreel.label}
                locale={locale}
                className="portfolio-panel border-0 md:rounded-[2rem]"
              />

              {/* Text Bottom: Only show full info for 'new' job entries in the span */}
              {row.job && row.job.isNewJob ? (
                <div className="portfolio-panel rounded-[1.5rem] p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_2fr]">
                  <div>
                    <LocaleStack
                      text={row.jobLabel.at}
                      locale={locale}
                      as="p"
                      className="portfolio-accent text-[0.7rem] font-bold uppercase tracking-widest"
                    />
                    <LocaleStack text={row.job.company} locale={locale} as="h3" className="mt-2 text-xl md:text-2xl font-bold" />
                    <LocaleStack text={row.job.title} locale={locale} as="p" className="text-base opacity-70" />
                    <LocaleStack text={row.job.period} locale={locale} as="p" className="text-xs opacity-40 font-medium" />
                  </div>

                  {row.job.highlights.length > 0 && (
                    <div className="md:border-l md:border-white/10 md:pl-8">
                      <ul className="space-y-3 text-sm md:text-base leading-relaxed opacity-80">
                        {row.job.highlights.map((h) => (
                          <li key={h.th} className="flex gap-3">
                            <span className="portfolio-accent shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full" />
                            <LocaleStack text={h} locale={locale} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {row.job.clientLists?.map((list) => (
                    <div key={list.id} className="md:col-span-2 mt-2 pt-6 border-t border-white/10">
                      <LocaleStack
                        text={list.label}
                        locale={locale}
                        as="p"
                        className="text-[0.65rem] font-bold uppercase tracking-wider opacity-50"
                      />
                      <LocaleStack
                        text={list.brands}
                        locale={locale}
                        as="p"
                        className="portfolio-job-clients mt-2 text-sm leading-relaxed opacity-75"
                      />
                    </div>
                  ))}
                </div>
              ) : row.job && !row.job.isNewJob ? (
                <div className="px-6 md:px-8 py-3 opacity-30 italic text-sm flex items-center gap-3">
                  <span className="text-lg">↑</span>
                  <div className="flex gap-2 items-center">
                    <LocaleUiStack path="timeline.continued" locale={locale} />
                    <span>·</span>
                    <LocaleStack text={row.job.company} locale={locale} />
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
