"use client";

import Image from "next/image";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { ExtraMotionReel } from "../_lib/portfolio.types";
import { LocaleUiStack } from "./LocaleUiStack";
import { ExternalReelCard } from "./ExternalReelCard";
import { extractYoutubeVideoId } from "../_lib/youtube";

/* ─── Popup Player ─────────────────────────────────────── */
export function VideoPopup({
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors"
          aria-label="Close"
        >
          <span aria-hidden>✕</span> Close
        </button>
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
export function NinaReelCard({
  reel,
  size = "normal",
}: {
  reel: ExtraMotionReel;
  size?: "normal" | "small";
}) {
  const thumb = reel.thumb || "";
  const iconSize = size === "small" ? "h-7 w-7 text-base" : "h-10 w-10 text-lg";

  return (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-reel group/reel relative block w-full overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pf-accent)]"
      style={{ aspectRatio: "9/16" }}
      aria-label="เปิดวิดีโอ Nina.digital บน YouTube"
    >
      {thumb && (
        <Image
          src={thumb}
          alt=""
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover/reel:scale-[1.04]"
          sizes="(max-width:640px) 33vw, (max-width:1024px) 20vw, 120px"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className={`flex ${iconSize} items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white shadow transition-transform group-hover/reel:scale-110`}>
          <span className="ml-0.5" aria-hidden>▶</span>
        </span>
      </span>
    </a>
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
  const otherReels = reels.filter((r) => !r.id.startsWith("nina-"));
  if (otherReels.length === 0) return null;

  return (
    <section id="extra-reels" className="portfolio-extra-reels mt-14 md:mt-16 text-left">
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
    </section>
  );
}
