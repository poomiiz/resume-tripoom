"use client";

import Image from "next/image";
import { useState } from "react";
import type { LocalizedText } from "../_lib/portfolio.data";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { extractYoutubeVideoId, youtubeEmbedUrl } from "../_lib/youtube";
import { reelLabelForLocale } from "../_lib/portfolio.build";
import { LocaleStack } from "./LocaleStack";

type Props = {
  href: string;
  thumb: string;
  label: LocalizedText;
  locale: PortfolioLocale;
  className?: string;
};

export function ShowreelEmbed({ href, thumb, label, locale, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYoutubeVideoId(href);
  const title = reelLabelForLocale(label, locale);
  const embedSrc = playing ? youtubeEmbedUrl(href, { autoplay: true }) : null;

  if (!videoId) return null;

  return (
    <div
      className={[
        "portfolio-showreel-embed portfolio-reel relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-black/[0.05] dark:border-white/10 shadow-2xl bg-black",
        className,
      ].join(" ")}
    >
      {playing && embedSrc ? (
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group/play absolute inset-0 flex w-full flex-col justify-end text-left"
          aria-label={title}
        >
          <Image
            src={thumb}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover/play:scale-[1.03]"
            sizes="(max-width:1280px) 100vw, 1100px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-lg transition-transform group-hover/play:scale-110">
              <span className="ml-0.5 text-2xl" aria-hidden>
                ▶
              </span>
            </span>
          </div>
          <div className="relative z-10 flex flex-col justify-end p-5 md:p-7 pointer-events-none">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white/60 block mb-1">Showreel</span>
            <LocaleStack text={label} locale={locale} as="p" className="text-lg md:text-xl font-bold text-white" />
          </div>
        </button>
      )}
    </div>
  );
}
