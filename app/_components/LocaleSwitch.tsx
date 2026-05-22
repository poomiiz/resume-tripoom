"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { FlagIcon } from "./FlagIcon";

export function LocaleSwitch({
  locale,
  setLocale,
}: {
  locale: PortfolioLocale;
  setLocale: (l: PortfolioLocale) => void;
}) {
  return (
    <div
      className="portfolio-locale-segmented"
      role="group"
      aria-label={locale === "th" ? "เลือกภาษา" : "Language"}
    >
      {(["th", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={`portfolio-locale-segmented__btn${active ? " portfolio-locale-segmented__btn--active" : ""}`}
            title={code === "th" ? "ภาษาไทย" : "English"}
          >
            <span aria-hidden className="inline-flex shrink-0">
              <FlagIcon locale={code} className="portfolio-locale-segmented__flag" />
            </span>
            <span className="portfolio-locale-segmented__label">
              {code === "th" ? "ไทย" : "EN"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
