"use client";

import Image from "next/image";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { UnifiedTimelinePhase, MotionGroup } from "../_lib/portfolio.build";
import type { LocalizedText } from "../_lib/portfolio.data";
import type { TechExperience } from "../_lib/techResume.data";
import { TECH_SKILL_GROUPS } from "../_lib/techResume.data";
import { techUi } from "../_lib/techResume.ui";
import { extractYoutubeVideoId } from "../_lib/youtube";
import { LocaleStack } from "./LocaleStack";
import { LocaleUiStack } from "./LocaleUiStack";
import { ShowreelEmbed } from "./ShowreelEmbed";
import type { PortfolioMode } from "./ProfileToggle";

function MotionReelCard({
  reel,
  locale,
}: {
  reel: MotionGroup["reels"][number];
  locale: PortfolioLocale;
}) {
  const isYoutube = !!extractYoutubeVideoId(reel.href);
  if (isYoutube) {
    return (
      <ShowreelEmbed
        href={reel.href}
        thumb={reel.thumb}
        label={reel.label}
        locale={locale}
        className="rounded-xl shadow-lg"
      />
    );
  }
  return (
    <ExternalReelCard
      href={reel.href}
      thumb={reel.thumb}
      label={reel.label}
      locale={locale}
    />
  );
}

function ExternalReelCard({
  href,
  thumb,
  label,
  locale,
}: {
  href: string;
  thumb: string;
  label: LocalizedText;
  locale: PortfolioLocale;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-reel group/reel-inner relative block overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/10 shadow-lg transition-all duration-500 group-hover/reel:-translate-y-1 group-hover/reel:shadow-2xl bg-black aspect-video w-full"
    >
      {thumb ? (
        <Image
          src={thumb}
          alt=""
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover/reel-inner:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 300px"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/reel-inner:opacity-100 transition-opacity pointer-events-none" />
      <ReelCaption label={label} locale={locale} external />
    </a>
  );
}

function MotionReelOverlay({
  label,
  locale,
  badge = "Showreel",
}: {
  label: LocalizedText;
  locale: PortfolioLocale;
  badge?: string;
}) {
  return (
    <>
      <motion-reel-overlay-inner />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/reel-inner:opacity-100 transition-opacity pointer-events-none" />
      <motion-reel-footer label={label} locale={locale} badge={badge} />
    </>
  );
}

function MotionReelFooter({
  label,
  locale,
  badge,
}: {
  label: LocalizedText;
  locale: PortfolioLocale;
  badge: string;
}) {
  return (
    <motion-reel-footer-inner>
      <div className="flex items-center justify-between gap-2 text-left pointer-events-none">
        <motion-reel-label label={label} locale={locale} badge={badge} />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform group-hover/reel-inner:scale-110">
          <span className="text-[0.6rem]">↗</span>
        </span>
      </motion-reel-label-wrapper>
    </motion-reel-footer-inner>
  );
}

/**
 * 🎞️ Motion Experience Group
 */
function UnifiedMotionGroup({ group, locale, side }: { group: MotionGroup; locale: PortfolioLocale; side: 'left' | 'right' }) {
  const isDetailsLeft = side === 'left';
  
  return (
    <div className={`flex flex-col md:flex-row gap-12 md:gap-20 items-start ${!isDetailsLeft ? 'md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-[48%]">
        <article className="portfolio-panel rounded-[2rem] p-8 md:p-12 border border-black/[0.12] dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xl text-left">
          <LocaleStack text={group.job.period} locale={locale} as="p" className="text-[0.75rem] font-black uppercase tracking-[0.3em] text-[color:var(--pf-accent)] mb-4" />
          <LocaleStack text={group.job.company} locale={locale} as="h3" className="text-3xl md:text-5xl font-bold leading-tight text-black dark:text-white text-left tracking-tight" />
          <LocaleStack text={group.job.title} locale={locale} as="p" className="text-lg md:text-xl text-black/60 dark:text-white/60 mt-3 font-semibold text-left" />
          
          <div className="mt-10 pt-10 border-t border-black/[0.08] dark:border-white/5 text-left">
            <ul className="space-y-5 text-left">
              {group.job.highlights.map((h) => (
                <li key={h.th} className="flex gap-4 group/item text-left">
                  <span className="text-[color:var(--pf-accent)] mt-2 h-2 w-2 rounded-full shrink-0 shadow-[0_0_8px_var(--pf-accent)]" />
                  <LocaleStack text={h} locale={locale} className="text-[0.95rem] md:text-[1.1rem] leading-relaxed text-black/80 dark:text-white/80 transition-opacity" />
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <div className="w-full md:w-[55%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left">
          {group.reels.map((reel) => (
            <div key={reel.id} className="group/reel relative text-left">
              <div className="absolute -top-2 -right-2 z-20 bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-md text-[0.55rem] font-black tracking-widest shadow-xl border border-white/10 dark:border-black/10">
                {reel.yearLabel}
              </div>

              <MotionReelCard reel={reel} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 💻 Tech Task Item
 */
function TechTaskItem({ entry, locale }: { entry: TechExperience; locale: PortfolioLocale }) {
  return (
    <div className="tech-task-item group/task py-14 border-b border-black/[0.08] dark:border-white/5 last:border-0 transition-all hover:pl-2 text-left">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 text-left">
        <LocaleStack text={entry.project} locale={locale} as="h3" className="text-2xl md:text-4xl font-extrabold text-black dark:text-white group-hover/task:text-[color:var(--pf-accent)] transition-colors text-left tracking-tight" />
        <LocaleStack text={entry.role} locale={locale} as="span" className="text-[0.8rem] font-black uppercase tracking-[0.25em] text-[color:var(--pf-accent)] opacity-70 text-left md:text-right" />
      </div>
      
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 items-center text-left">
        <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-black/40 dark:text-white/40 text-left">{techUi(locale, "stack")}</p>
        <LocaleStack text={entry.stack} locale={locale} as="p" className="text-sm md:text-lg font-bold text-black/70 dark:text-white/90 text-left" />
      </div>

      <ul className="mt-10 space-y-5 text-left">
        {entry.outcomes.map((o, i) => (
          <li key={i} className="flex gap-6 text-[1.05rem] md:text-[1.25rem] leading-relaxed text-black/80 dark:text-white/80 text-left font-medium">
            <span className="text-[color:var(--pf-accent)] mt-3 h-2 w-2 rounded-full shrink-0 shadow-[0_0_10px_var(--pf-accent)]" />
            <LocaleStack text={o} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 🚀 MAIN Unified Timeline Component
 */
export function UnifiedTimeline({ 
  journey, 
  locale,
  displayMode = 'creative'
}: { 
  journey: UnifiedTimelinePhase[]; 
  locale: PortfolioLocale;
  displayMode?: PortfolioMode;
}) {
  const groupTechByYear = (projects: TechExperience[]) => {
    const years: Record<string, TechExperience[]> = {};
    projects.forEach(p => {
      const year = p.period.en.split(' ')[0];
      if (!years[year]) years[year] = [];
      years[year].push(p);
    });
    return Object.entries(years).sort((a, b) => b[0].localeCompare(a[0]));
  };

  return (
    <div className="portfolio-unified-timeline relative mx-auto max-w-6xl px-4 md:px-0">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[color:var(--pf-accent)] via-black/20 dark:via-white/20 to-transparent md:-translate-x-1/2 opacity-50" />

      <div className="space-y-32 md:space-y-48">
        {journey.map((phase) => {
          if (displayMode === 'creative' && phase.motionGroups.length === 0) {
            return null;
          }

          if (displayMode === 'tech' && phase.arc.id === 'foundation' && phase.techProjects.length === 0) {
            return null;
          }

          return (
            <div key={phase.arc.id} className="relative">
              {/* Phase Header */}
              <div className="md:flex md:justify-center mb-16">
                <div className="relative z-20 bg-white dark:bg-black border border-black/[0.12] dark:border-white/20 rounded-full px-8 py-3 shadow-2xl">
                  <LocaleStack 
                    text={displayMode === 'creative' ? { th: "Motion Graphic Designer & VFX Artist", en: "Motion Graphic Designer & VFX Artist" } : phase.arc.title} 
                    locale={locale} 
                    as="h3" 
                    className="text-sm md:text-lg font-bold uppercase tracking-[0.25em] text-center text-black dark:text-white text-wrap" 
                  />
                </div>
              </div>

              {/* Narrative Card */}
              <div className="mb-24 md:flex md:justify-center px-2 md:px-6 text-left md:text-center">
                 <article className="relative rounded-[3rem] p-12 md:p-20 lg:p-24 bg-white dark:bg-white/[0.01] border border-black/[0.12] dark:border-white/5 max-w-5xl mx-auto backdrop-blur-3xl shadow-2xl dark:shadow-none text-left">
                    <LocaleStack text={phase.arc.body} locale={locale} as="p" className="text-xl md:text-4xl leading-snug text-black dark:text-white/90 font-bold mb-16 text-left md:text-center tracking-tight" />
                    
                    {/* Integrated Technical Expertise - Strictly Tech Mode Only */}
                    {displayMode === 'tech' && (phase.arc.id === "advanced-systems" || phase.arc.id === "technologist") && (
                      <div className="grid gap-6 md:grid-cols-2 text-left pt-16 border-t border-black/[0.1] dark:border-white/5 text-left">
                        {TECH_SKILL_GROUPS.map((group) => (
                          <div key={group.id} className="portfolio-expertise-box p-6 md:p-8 rounded-[1.5rem] border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col h-full transition-all hover:border-[color:var(--pf-accent)]/20 shadow-sm text-left text-black dark:text-white">
                            <header className="flex items-center gap-3 mb-8 text-left">
                              <span className="h-2 w-2 rounded-full bg-[color:var(--pf-accent)] shadow-[0_0_8px_var(--pf-accent)]" />
                              <LocaleStack text={group.title} locale={locale} as="h3" className="text-[0.8rem] font-bold text-[color:var(--pf-accent)] uppercase tracking-[0.2em] text-left" />
                            </header>
                            <ul className="space-y-8 flex-1 text-left">
                              {group.items.map((item, idx) => (
                                <li key={idx} className="space-y-3 text-left">
                                  <LocaleStack text={item.label} locale={locale} as="p" className="text-[0.95rem] font-bold text-black dark:text-white text-left" />
                                  <ul className="pl-4 space-y-2 border-l-2 border-black/[0.05] dark:border-white/10 text-left">
                                    {item.bullets.map((bullet, bIdx) => (
                                      <li key={bIdx} className="flex gap-3 text-left">
                                        <span className="opacity-30 text-[0.6rem] mt-1.5 text-[color:var(--pf-accent)]">●</span>
                                        <LocaleStack text={bullet} locale={locale} className="text-[0.85rem] md:text-[0.9rem] leading-relaxed text-black/70 dark:text-white/60 font-medium text-left" />
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                 </article>
              </div>

              {/* Sub-Projects Flow */}
              <div className="space-y-24">
                {/* 1. Tech Projects */}
                {displayMode === 'tech' && phase.techProjects.length > 0 && (
                  <div className="space-y-24">
                    {groupTechByYear(phase.techProjects).map(([year, projs], idx) => (
                      <div key={year} className="relative">
                        <div className="absolute left-[1.1rem] md:left-1/2 top-10 h-3 w-3 rounded-full bg-[color:var(--pf-accent)] md:-translate-x-1/2 z-10 shadow-[0_0_15px_var(--pf-accent)] border-2 border-white dark:border-black" />
                        
                        <div className={`pl-14 md:pl-0 flex flex-col md:flex-row gap-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className="w-full md:w-[85%] text-left">
                            <article className="portfolio-panel rounded-[2.5rem] p-10 md:p-16 border border-black/[0.12] dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xl text-left">
                              <div className="flex items-baseline gap-5 mb-12 pb-8 border-b-2 border-black/[0.08] dark:border-white/5 text-left text-black dark:text-white">
                                <span className="font-brand text-5xl font-bold text-[color:var(--pf-accent)] tabular-nums">{year}</span>
                                <span className="text-[0.8rem] font-bold uppercase tracking-[0.3em] opacity-40 italic text-left">Technical Experience Log</span>
                              </div>
                              <div className="divide-y-2 divide-black/[0.05] dark:divide-white/5 text-left text-black dark:text-white">
                                {projs.map(p => <TechTaskItem key={p.id} entry={p} locale={locale} />)}
                              </div>
                            </article>
                          </div>
                          <div className="hidden md:block w-[15%]" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {displayMode === 'creative' && phase.motionGroups.length > 0 && (
                  <div className="space-y-24 md:space-y-48">
                    {phase.motionGroups.map((group, idx) => {
                       const isFeatured = group.job.key === 'featured';
                       return (
                        <div key={group.job.key} className="relative">
                          <div className="absolute left-[1.1rem] md:left-1/2 top-10 h-3 w-3 rounded-full bg-[color:var(--pf-accent)] md:-translate-x-1/2 z-10 shadow-[0_0_15px_var(--pf-accent)] border-2 border-white dark:border-black" />
                          <div className={`pl-14 md:pl-0 ${isFeatured ? 'md:flex md:justify-center' : ''}`}>
                             <div className={isFeatured ? 'w-full md:w-[80%]' : ''}>
                                <UnifiedMotionGroup group={group} locale={locale} side={idx % 2 === 0 ? 'left' : 'right'} />
                             </div>
                          </div>
                        </div>
                       );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
