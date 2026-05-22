"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

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
  extraReels,
}: {
  group: MotionGroup;
  locale: PortfolioLocale;
  ninaReels?: ExtraMotionReel[];
  extraReels?: ExtraMotionReel[];
}) {
  const reels = group.reels;
  const isNinaCard = group.job.key === "aiContent";
  const showNina = isNinaCard && ninaReels && ninaReels.length > 0;
  
  const isGoExtraCard = group.job.key === "goExtra";
  const showExtra = isGoExtraCard && extraReels && extraReels.length > 0;

  return (
    <article className="portfolio-panel portfolio-job-card portfolio-journey-motion-card text-left w-full">
      <div className="flex justify-between items-start mb-2">
        <LocaleStack text={group.job.period} locale={locale} as="p" className="portfolio-job-card__period" />
      </div>
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
              <span className="portfolio-job-card__bullet shadow-[0_0_12px_var(--pf-accent)] bg-[color:var(--pf-accent)]" aria-hidden />
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

      {/* Extra Reels for Go The Extra Mile */}
      {showExtra && (
        <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
          <p className="portfolio-label text-[color:var(--pf-accent)] mb-3 text-xs">
            {locale === 'th' ? 'วิดีโอเพิ่มเติม' : 'More Videos'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {extraReels!.map((reel) => (
              <ExternalReelCard
                key={reel.id}
                href={reel.href}
                thumb={reel.thumb || ""}
                label={reel.label}
                locale={locale}
                platform="youtube"
              />
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
        </div>
      </div>

      {/* Outcomes — Glowy Bullets */}
      <ul className="mt-6 space-y-4 text-left">
        {entry.outcomes.map((o, i) => (
          <li key={i} className="portfolio-highlight-item flex gap-5 text-left">
            <span className="text-[color:var(--pf-accent)] mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 shadow-[0_0_12px_var(--pf-accent)] bg-[color:var(--pf-accent)]" />
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
          locale={locale}
        />
      )}
    </article>
  );
}

function TechImageBlock({
  imageUrl,
  alt,
  url,
  locale,
}: {
  imageUrl: string;
  alt: string;
  url?: string;
  locale: PortfolioLocale;
}) {
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

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
            className="group relative block w-full cursor-zoom-in focus:outline-none"
            aria-label={locale === "th" ? "ขยายรูปเต็มจอ" : "Open full screen image"}
          >
            <Image
              src={imageUrl}
              alt={alt}
              width={800}
              height={450}
              unoptimized
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        )}
      </div>

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[10050] flex flex-col bg-black/92 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={locale === "th" ? "ดูรูปเต็มจอ" : "Full screen image"}
            onClick={() => setLightbox(false)}
          >
            <div className="flex shrink-0 justify-end p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                <span aria-hidden>✕</span> {locale === "th" ? "ปิด" : "Close"}
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-4 sm:pb-6">
              <div
                className="inline-flex max-h-[calc(100dvh-7rem)] max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={imageUrl}
                  alt={alt}
                  width={1600}
                  height={900}
                  unoptimized
                  className="max-h-[calc(100dvh-7rem)] max-w-full h-auto w-auto object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function UnifiedTimeline({
  journey,
  locale,
  displayMode = "creative",
  extraMotionReels,
}: {
  journey: UnifiedTimelinePhase[];
  locale: PortfolioLocale;
  displayMode?: PortfolioMode;
  extraMotionReels?: ExtraMotionReel[];
}) {
  const trackClass = "portfolio-journey-track";

  const ninaReels = useMemo(() => extraMotionReels?.filter((r) => r.id.startsWith("nina-")), [extraMotionReels]);
  const otherExtraReels = useMemo(() => extraMotionReels?.filter((r) => !r.id.startsWith("nina-")), [extraMotionReels]);

  const unifiedList = useMemo(() => {
    type UnifiedItem = 
      | { type: 'tech'; entry: TechExperience; year: number; order: number }
      | { type: 'motion'; group: MotionGroup; year: number; order: number };

    const items: UnifiedItem[] = [];

    // Map to keep track of sorting and original user list order
    const USER_ORDER: Record<string, number> = {
      "staedtler-voucher-2026": 1,
      "moonracle-2026": 2,
      "ai-music-pipeline-2026": 3,
      "aiContent": 4,
      "tiktok-ar-2024": 5,
      "goExtra": 6,
      "clickMotion": 7,
      "shortgun": 8,
    };

    journey.forEach(phase => {
      phase.techProjects.forEach(p => {
        items.push({ 
          type: 'tech', 
          entry: p, 
          year: parseInt(p.period.en) || 2026,
          order: USER_ORDER[p.id] || 99 
        });
      });
      phase.motionGroups.forEach(g => {
        items.push({ 
          type: 'motion', 
          group: g, 
          year: parseInt(g.job.period.en) || 2024,
          order: USER_ORDER[g.job.key] || 99
        });
      });
    });

    return items.sort((a, b) => a.order - b.order);
  }, [journey]);

  return (
    <div className="portfolio-unified-timeline relative mx-auto max-w-5xl px-4 md:px-6">
      <div className="space-y-16 md:space-y-20">
            <div className="relative">
              <div className="mb-4 flex flex-col items-start md:items-center md:text-center">
                <div className="portfolio-glass-chip relative z-20 inline-flex max-w-full rounded-full px-7 py-3.5 text-black dark:text-white md:px-10 md:py-4">
                  <h3 className="portfolio-phase-chip-title text-center text-black dark:text-white text-wrap">
                    {locale === 'th' ? 'ผลงาน & ประสบการณ์' : 'Experience & Projects'}
                  </h3>
                </div>
              </div>

              <div className={`${trackClass} !pt-0`}>
                {unifiedList.map((item, idx) => {
                  const align = idx % 2 === 0 ? "left" : "right";
                  const key = item.type === 'tech' ? item.entry.id : item.group.job.key;
                  
                  return (
                    <article
                      key={key}
                      className={`portfolio-journey-item portfolio-journey-item--align-${align} ${
                        item.type === 'motion' && item.group.job.key === 'aiContent' ? 'portfolio-journey-item--end' : ''
                      }`}
                    >
                      <span className="portfolio-journey-node shadow-[0_0_15px_var(--pf-accent)]" aria-hidden />
                      {item.type === 'tech' ? (
                        <div className="portfolio-panel portfolio-tech-project-card text-left">
                          <p className="portfolio-job-card__period">{item.entry.period[locale]}</p>
                          <TechTaskItem entry={item.entry} locale={locale} />
                        </div>
                      ) : (
                        <UnifiedMotionGroup
                          group={item.group}
                          locale={locale}
                          ninaReels={item.group.job.key === "aiContent" ? ninaReels : undefined}
                          extraReels={item.group.job.key === "goExtra" ? otherExtraReels : undefined}
                        />
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
      </div>
    </div>
  );
}

