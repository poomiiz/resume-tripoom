"use client";

import Image from "next/image";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { LocalizedText } from "../_lib/portfolio.data";
import { LocaleStack } from "./LocaleStack";

function ReelCaption({
  label,
  locale,
  platform = "external",
}: {
  label: LocalizedText;
  locale: PortfolioLocale;
  platform?: "external" | "facebook" | "youtube";
}) {
  const badge = platform === "facebook" ? "f" : platform === "youtube" ? "▶" : "↗";
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end p-3 text-left pointer-events-none">
      <div className="flex items-center justify-between gap-2 text-left">
        <div className="min-w-0 text-left">
          <LocaleStack
            text={label}
            locale={locale}
            as="p"
            className="text-[0.75rem] font-bold text-white truncate text-left"
          />
        </div>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform group-hover/reel-inner:scale-110 ${
            platform === "facebook" ? "font-bold text-[0.75rem]" : ""
          }`}
        >
          <span className="text-[0.625rem]">{badge}</span>
        </span>
      </div>
    </div>
  );
}

export function ExternalReelCard({
  href,
  thumb,
  label,
  locale,
  platform = "external",
}: {
  href: string;
  thumb: string;
  label: LocalizedText;
  locale: PortfolioLocale;
  platform?: "external" | "facebook" | "youtube";
}) {
  const fb = platform === "facebook";
  const yt = platform === "youtube";
  const showThumb = Boolean(thumb) && !fb;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-reel group/reel-inner relative block overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/10 shadow-lg transition-all duration-500 group-hover/reel:-translate-y-1 group-hover/reel:shadow-2xl bg-black aspect-video w-full"
    >
      {showThumb ? (
        <Image
          src={thumb}
          alt=""
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover/reel-inner:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 300px"
        />
      ) : fb ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1877F2]/35 via-[#0f0f14] to-black"
          aria-hidden
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1877F2] text-2xl font-bold text-white shadow-lg">
            f
          </span>
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-white/70">
            Facebook Reel
          </span>
        </div>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/reel-inner:opacity-100 transition-opacity pointer-events-none" />
      <ReelCaption label={label} locale={locale} platform={yt ? "youtube" : fb ? "facebook" : "external"} />
    </a>
  );
}
