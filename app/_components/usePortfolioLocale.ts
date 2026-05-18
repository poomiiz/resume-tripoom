"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { LOCALE_EMOJI, UI } from "../_lib/portfolio.ui";
import {
  buildTimeline,
  buildUnifiedTimeline,
  getBrandLogos,
  getPortfolioImages,
  getProfile,
  getSkillSections,
} from "../_lib/portfolio.build";
import { PROFILE } from "../_lib/portfolio.data";

const STORAGE_KEY = "tripoom-portfolio-locale";

export function usePortfolioLocale() {
  const [locale, setLocaleState] = useState<PortfolioLocale>("th");
  const [ready, setReady] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PortfolioLocale | null;
    if (stored === "th" || stored === "en") setLocaleState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "th" ? "th" : "en";
  }, [locale, ready]);

  const setLocale = useCallback((l: PortfolioLocale) => {
    startTransition(() => setLocaleState(l));
  }, []);

  const t = UI[locale];
  const profile = getProfile();
  const images = getPortfolioImages();
  const skillSections = getSkillSections();
  const timeline = buildTimeline();
  const unifiedJourney = buildUnifiedTimeline();
  const brandLogos = getBrandLogos();

  return {
    ready,
    locale,
    setLocale,
    emoji: LOCALE_EMOJI,
    t,
    profile,
    images,
    skillSections,
    timeline,
    unifiedJourney,
    brandLogos,
    contact: PROFILE.contact,
    sourceUrl: PROFILE.sourceUrl,
  };
}
