"use client";

import Image from "next/image";
import { useState } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { ExtraMotionReel } from "../_lib/portfolio.types";
import { LocaleUiStack } from "./LocaleUiStack";
import { ExternalReelCard } from "./ExternalReelCard";
import { extractYoutubeVideoId } from "../_lib/youtube";

/* ─── Popup Player ─────────────────────────────────────── */
function VideoPopup({
  href,
  onClose,
}: {
  href: string;
  onClose: () => void;
}) {
  const id = extractYoutubeVideoId(href);
  const src = id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : null;

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors"
          aria-label="Close"
        >
          <span aria-hidden>✕</span> Close
        </button>

        {/* Video — portrait 9:16 for Shorts */}
        <div
          className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black"
          style={{ aspectRatio: "9/16", maxHeight: "80vh", width: "auto" }}
        >
          <iframe
            src={src}
            title="Nina.digital — AI Storytelling"
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Small Popup Reel Card ────────────────────────────── */
function NinaReelCard({
  reel,
}: {
  reel: ExtraMotionReel;
}) {
  const [open, setOpen] = useState(false);
  const thumb = reel.thumb || "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="portfolio-reel group/reel relative block w-full overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pf-accent)]"
        style={{ aspectRatio: "9/16" }}
        aria-label="เล่นวิดีโอ Nina.digital"
      >
        {thumb && (
          <Image
            src={thumb}
            alt=""
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover/reel:scale-[1.04]"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 160px"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {/* Play badge */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white shadow transition-transform group-hover/reel:scale-110">
            <span className="ml-0.5 text-lg" aria-hidden>▶</span>
          </span>
        </span>
      </button>

      {open && (
        <VideoPopup href={reel.href} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

/* ─── Main Export ──────────────────────────────────────── */
export function ExtraMotionReels({
  reels,
  locale,
}: {
  reels: ExtraMotionReel[];
  locale: PortfolioLocale;
}) {
  if (reels.length === 0) return null;

  const ninaReels = reels.filter((r) => r.id.startsWith("nina-"));
  const otherReels = reels.filter((r) => !r.id.startsWith("nina-"));

  return (
    <section id="extra-reels" className="portfolio-extra-reels mt-14 md:mt-16 text-left space-y-10">

      {/* Other reels (Ads Motion, etc.) */}
      {otherReels.length > 0 && (
        <div>
          <LocaleUiStack
            path="sections.extraReels"
            locale={locale}
            as="h2"
            className="portfolio-section-heading block text-black dark:text-white mb-6"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherReels.map((reel) => (
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

      {/* Nina.digital sub-section — portrait short cards + popup */}
      {ninaReels.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
            <p className="portfolio-label text-[color:var(--pf-accent)]">
              Nina.digital — AI Storytelling
            </p>
            <div className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
            {ninaReels.map((reel) => (
              <NinaReelCard key={reel.id} reel={reel} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
