"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { ExtraMotionReel } from "../_lib/portfolio.types";
import { LocaleUiStack } from "./LocaleUiStack";
import { ExternalReelCard } from "./ExternalReelCard";

export function ExtraMotionReels({
  reels,
  locale,
}: {
  reels: ExtraMotionReel[];
  locale: PortfolioLocale;
}) {
  if (reels.length === 0) return null;

  return (
    <section id="extra-reels" className="portfolio-extra-reels mt-14 md:mt-16 text-left">
      <LocaleUiStack
        path="sections.extraReels"
        locale={locale}
        as="h2"
        className="portfolio-section-heading block text-black dark:text-white mb-6"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reels.map((reel) => (
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
