"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { LOCALE_EMOJI, UI } from "../_lib/portfolio.ui";
import {
  buildTimeline,
  buildUnifiedTimeline,
  getBrandLogos,
  getPortfolioImages,
  getProfile,
  getExtraMotionReels,
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
  const profile = useMemo(() => getProfile(), []);
  const images = useMemo(() => getPortfolioImages(), []);
  const skillSections = useMemo(() => getSkillSections(), []);
  const timeline = useMemo(() => buildTimeline(), []);
  const unifiedJourney = useMemo(() => buildUnifiedTimeline(), []);
  const brandLogos = useMemo(() => getBrandLogos(), []);
  const extraMotionReels = useMemo(() => getExtraMotionReels(), []);

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
    extraMotionReels,
    contact: PROFILE.contact,
    sourceUrl: PROFILE.sourceUrl,
  };
}
