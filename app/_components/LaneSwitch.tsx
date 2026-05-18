"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { pickLocale } from "../_lib/portfolio.ui";
import type { PortfolioLane } from "./portfolioLanes";

const LABELS: Record<PortfolioLane, { th: string; en: string }> = {
  motion: { th: "งาน Motion", en: "Motion work" },
  tech: { th: "สาย Tech", en: "Tech" },
};

export function LaneSwitch({
  lane,
  setLane,
  locale,
}: {
  lane: PortfolioLane;
  setLane: (l: PortfolioLane) => void;
  locale: PortfolioLocale;
}) {
  return (
    <div
      className="portfolio-lane-switch flex rounded-full p-0.5 text-[0.75rem] font-semibold w-full max-w-xs sm:max-w-sm"
      role="tablist"
    >
      {(["motion", "tech"] as const).map((id) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={lane === id}
          onClick={() => setLane(id)}
          className={[
            "flex-1 px-3 py-1.5 rounded-full transition-colors",
            lane === id ? "portfolio-lane-switch__active" : "opacity-60 hover:opacity-90",
          ].join(" ")}
        >
          {pickLocale(locale, LABELS[id])}
        </button>
      ))}
    </div>
  );
}
