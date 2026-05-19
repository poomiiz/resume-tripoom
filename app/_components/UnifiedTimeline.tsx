"use client";

import { useMemo, useState } from "react";

import Image from "next/image";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { UnifiedTimelinePhase, MotionGroup } from "../_lib/portfolio.types";
import type { ExtraMotionReel } from "../_lib/portfolio.types";
import { PROFILE, type LocalizedText } from "../_lib/portfolio.data";
import type { TechExperience } from "../_lib/techResume.data";
import { TECH_SKILL_GROUPS } from "../_lib/techResume.data";
import { techUi } from "../_lib/techResume.ui";
import { extractYoutubeVideoId } from "../_lib/youtube";
import { LocaleStack } from "./LocaleStack";
import { ExternalReelCard } from "./ExternalReelCard";
import { NinaReelCard } from "./ExtraMotionReels";
import type { PortfolioMode } from "../_lib/portfolioMode";

function phaseChipTitle(phase: UnifiedTimelinePhase, displayMode: PortfolioMode): LocalizedText {
  if (displayMode === "creative" && phase.arc.id === "advanced-systems") {
    return PROFILE.mainRole.creative;
  }
  if (displayMode === "creative" && phase.arc.id === "foundation") {
    return {
      th: "Motion Graphic Designer & VFX Artist",
      en: "Motion Graphic Designer & VFX Artist",
    };
  }
  return phase.arc.title;
}

function isFacebookReel(href: string): boolean {
  return /facebook\.com\/reel\//i.test(href);
}

function youtubeThumbUrl(href: string): string {
  const id = extractYoutubeVideoId(href);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function MotionReelCard({
  reel,
  locale,
}: {
  reel: MotionGroup["reels"][number];
  locale: PortfolioLocale;
}) {
  const isYoutube = !!extractYoutubeVideoId(reel.href);
  return (
    <ExternalReelCard
      href={reel.href}
      thumb={isYoutube ? reel.thumb || youtubeThumbUrl(reel.href) : reel.thumb}
      label={reel.label}
      locale={locale}
      platform={isYoutube ? "youtube" : isFacebookReel(reel.href) ? "facebook" : "external"}
    />
  );
}

/** การ์ดงานมาตรฐาน: ช่วงเวลา → บริษัท → ตำแหน่ง → bullet → วิดีโอ */
function UnifiedMotionGroup({
  group,
  locale,
  ninaReels,
}: {
  group: MotionGroup;
  locale: PortfolioLocale;
  ninaReels?: ExtraMotionReel[];
}) {
  const reels = group.reels;
  const isNinaCard = group.job.key === "aiContent";
  const showNina = isNinaCard && ninaReels && ninaReels.length > 0;

  return (
    <article className="portfolio-panel portfolio-job-card text-left w-full">
      <LocaleStack text={group.job.period} locale={locale} as="p" className="portfolio-job-card__period" />
      <LocaleStack
        text={group.job.company}
        locale={locale}
        as="h3"
        className="portfolio-job-card__company text-black dark:text-white"
      />
      <LocaleStack text={group.job.title} locale={locale} as="p" className="portfolio-job-card__title" />

      {group.job.highlights.length > 0 && (
        <ul className="portfolio-job-card__list">
          {group.job.highlights.map((h) => (
            <li key={h.th} className="portfolio-job-card__list-item">
              <span className="portfolio-job-card__bullet" aria-hidden />
              <LocaleStack text={h} locale={locale} as="span" className="portfolio-job-card__list-text" />
            </li>
          ))}
        </ul>
      )}

      {/* Nina.digital inline video grid */}
      {showNina && (
        <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
          <p className="portfolio-label text-[color:var(--pf-accent)] mb-3 text-xs">
            AI Storytelling Videos
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-1.5 sm:gap-2">
            {ninaReels!.map((reel) => (
              <NinaReelCard key={reel.id} reel={reel} size="small" />
            ))}
          </div>
        </div>
      )}

      {reels.length > 0 && (
        <div
          className={`portfolio-job-card__reels ${
            reels.length >= 3 ? "portfolio-job-card__reels--many" : ""
          }`}
        >
          {reels.map((reel) => (
            <div key={reel.id} className="group/reel portfolio-job-card__reel min-w-0">
              <div className="portfolio-job-card__reel-badge">
                <LocaleStack text={reel.label} locale={locale} as="span" />
              </div>
              <MotionReelCard reel={reel} locale={locale} />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function TechExpertiseStrip({ locale }: { locale: PortfolioLocale }) {
  return (
    <div
      className="portfolio-tech-expertise-strip text-left"
      aria-label={locale === "th" ? "ทักษะเทคนิค" : "Technical skills"}
    >
      <div className="portfolio-tech-expertise-strip__track">
      {TECH_SKILL_GROUPS.map((group) => (
        <div
          key={group.id}
          className={`portfolio-expertise-box portfolio-tech-expertise-strip__card portfolio-tech-skill-group--${group.id} p-5 md:p-6 rounded-2xl flex flex-col text-left text-black dark:text-white`}
        >
          <header className="flex items-center gap-2.5 mb-5 text-left">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pf-accent)] shadow-[0_0_8px_var(--pf-accent)]" />
            <LocaleStack
              text={group.title}
              locale={locale}
              as="h3"
              className="portfolio-label text-[color:var(--pf-accent)] text-left"
            />
          </header>
          <ul className="space-y-5 flex-1 text-left">
            {group.items.map((item, idx) => (
              <li key={idx} className="space-y-2 text-left">
                <LocaleStack
                  text={item.label}
                  locale={locale}
                  as="p"
                  className="text-sm font-semibold text-black dark:text-white text-left"
                />
                <ul className="pl-3 space-y-1.5 border-l border-black/[0.06] dark:border-white/10 text-left">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-2 text-left">
                      <span className="text-[color:var(--pf-accent)] text-[0.625rem] mt-1.5 shrink-0">●</span>
                      <LocaleStack text={bullet} locale={locale} className="portfolio-text-body text-left" />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}

function TechTaskItem({ entry, locale }: { entry: TechExperience; locale: PortfolioLocale }) {
  return (
    <article className="tech-task-item portfolio-tech-task py-4 md:py-5 border-0 text-left">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 text-left">
        <div className="text-left">
          <LocaleStack
            text={entry.project}
            locale={locale}
            as="h3"
            className="portfolio-job-card__company text-black dark:text-white text-left"
          />
          <LocaleStack text={entry.role} locale={locale} as="p" className="portfolio-job-card__title text-left" />
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          {entry.status && (
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border border-[color:var(--pf-accent)]/40 text-[color:var(--pf-accent)] bg-[color:var(--pf-accent)]/10">
              {entry.status[locale]}
            </span>
          )}
          {entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.7rem] font-semibold text-[color:var(--pf-accent)] hover:underline flex items-center gap-1 transition-opacity hover:opacity-80"
            >
              <span aria-hidden>↗</span>
              {locale === "th" ? "เปิดลิงก์" : "View"}
            </a>
          )}
        </div>
      </div>

      {/* Stack */}
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 items-center text-left">
        <p className="portfolio-label text-black/65 dark:text-white/62 text-left">{techUi(locale, "stack")}</p>
        <LocaleStack text={entry.stack} locale={locale} as="p" className="portfolio-text-subtitle text-left" />
      </div>

      {/* Outcomes */}
      <ul className="mt-6 space-y-4 text-left">
        {entry.outcomes.map((o, i) => (
          <li key={i} className="portfolio-highlight-item flex gap-5 text-left">
            <span className="text-[color:var(--pf-accent)] mt-2.5 h-1.5 w-1.5 rounded-full shrink-0" />
            <LocaleStack text={o} locale={locale} className="portfolio-text-body flex-1" />
          </li>
        ))}
      </ul>

      {/* Screenshot — below text */}
      {entry.imageUrl && (
        <TechImageBlock
          imageUrl={entry.imageUrl}
          alt={entry.project[locale]}
          url={entry.url}
        />
      )}
    </article>
  );
}

function TechImageBlock({ imageUrl, alt, url }: { imageUrl: string; alt: string; url?: string }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.07] dark:border-white/[0.08] shadow-md">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="block group">
            <Image
              src={imageUrl}
              alt={alt}
              width={800}
              height={450}
              unoptimized
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="block w-full group focus:outline-none"
            aria-label="ขยายรูป"
          >
            <Image
              src={imageUrl}
              alt={alt}
              width={800}
              height={450}
              unoptimized
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
              ⤢ ขยาย
            </span>
          </button>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold flex items-center gap-1.5"
            >
              <span aria-hidden>✕</span> Close
            </button>
            <Image
              src={imageUrl}
              alt={alt}
              width={1600}
              height={900}
              unoptimized
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export function UnifiedTimeline({
  journey,
  locale,
  displayMode = "creative",
  ninaReels,
}: {
  journey: UnifiedTimelinePhase[];
  locale: PortfolioLocale;
  displayMode?: PortfolioMode;
  ninaReels?: ExtraMotionReel[];
}) {
  const groupTechByYear = (projects: TechExperience[]) => {
    const years: Record<string, TechExperience[]> = {};
    projects.forEach((p) => {
      const year = p.period.en.split(" ")[0];
      if (!years[year]) years[year] = [];
      years[year].push(p);
    });
    return Object.entries(years).sort((a, b) => b[0].localeCompare(a[0]));
  };

  const trackClass = "portfolio-journey-track";

  const orderedPhases = useMemo(() => {
    const raw = displayMode === "creative" ? [...journey].reverse() : journey;
    return raw.filter((phase) => {
      if (displayMode === "creative" && phase.motionGroups.length === 0) return false;
      if (displayMode === "tech" && phase.arc.id === "foundation" && phase.techProjects.length === 0)
        return false;
      return true;
    });
  }, [journey, displayMode]);

  return (
    <div className="portfolio-unified-timeline relative mx-auto max-w-5xl px-4 md:px-6">
      <div className="space-y-16 md:space-y-20">
        {orderedPhases.map((phase, phaseIdx) => (
            <div key={phase.arc.id} className="relative">
              <div className="mb-10 flex flex-col items-start gap-2 md:mb-12 md:items-center md:text-center">
                <div className="portfolio-glass-chip relative z-20 inline-flex max-w-full rounded-full px-7 py-3.5 text-black dark:text-white md:px-10 md:py-4">
                  <LocaleStack
                    text={phaseChipTitle(phase, displayMode)}
                    locale={locale}
                    as="h3"
                    className="portfolio-phase-chip-title text-center text-black dark:text-white text-wrap"
                  />
                </div>
                {phaseIdx === 0 && (
                  <p className="portfolio-journey-craft-line-under-chip flex flex-wrap items-center justify-start gap-1.5 text-[color:var(--pf-accent)] opacity-95 md:justify-center">
                    <span aria-hidden>{displayMode === "creative" ? "🎨" : "🔗"}</span>
                    <span>
                      {displayMode === "creative" ? "Motion & VFX Craft" : "Systems & Architecture"}
                    </span>
                  </p>
                )}
              </div>

              <div className="mb-8 md:mb-10 text-left">
                <article className="portfolio-glass-strong portfolio-phase-narrative relative mx-auto text-left max-w-2xl">
                  <LocaleStack
                    text={phase.arc.body}
                    locale={locale}
                    as="p"
                    className="portfolio-phase-narrative__body text-left"
                  />
                </article>
              </div>

              {displayMode === "tech" && phase.arc.id === "advanced-systems" && (
                <div className="mb-10">
                  <TechExpertiseStrip locale={locale} />
                </div>
              )}

              <div className="space-y-12 md:space-y-16">
                {displayMode === "tech" && phase.techProjects.length > 0 && (
                  <div className={trackClass}>
                    {groupTechByYear(phase.techProjects)
                      .flatMap(([year, projs]) => projs.map((entry) => ({ year, entry })))
                      .map(({ year, entry }, idx, arr) => {
                        const align =
                          idx === arr.length - 1 ? "right" : idx % 2 === 0 ? "left" : "right";
                        return (
                          <article
                            key={entry.id}
                            className={`portfolio-journey-item portfolio-journey-item--tech portfolio-journey-item--align-${align}`}
                          >
                            <span className="portfolio-journey-node" aria-hidden />
                            <div className="portfolio-panel portfolio-tech-project-card text-left">
                              <p className="portfolio-job-card__period">{year}</p>
                              <TechTaskItem entry={entry} locale={locale} />
                            </div>
                          </article>
                        );
                      })}
                  </div>
                )}

                {displayMode === "creative" && phase.motionGroups.length > 0 && (
                  <div className={trackClass}>
                    {phase.motionGroups.map((group) => (
                      <article
                        key={group.job.key}
                        className={`portfolio-journey-item${
                          group.job.key === "aiContent" ? " portfolio-journey-item--end" : ""
                        }`}
                      >
                        <span className="portfolio-journey-node" aria-hidden />
                        <UnifiedMotionGroup
                          group={group}
                          locale={locale}
                          ninaReels={group.job.key === "aiContent" ? ninaReels : undefined}
                        />
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
