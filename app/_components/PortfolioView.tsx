"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { usePointerTilt } from "./usePortfolioMotion";
import { usePortfolioTheme } from "./usePortfolioTheme";
import { usePortfolioLocale } from "./usePortfolioLocale";
import { LocaleStack } from "./LocaleStack";
import { LocaleUiStack } from "./LocaleUiStack";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { FlagIcon } from "./FlagIcon";
import { SkillsLaneSection } from "./SkillsLaneSection";
import { UnifiedTimeline } from "./UnifiedTimeline";
import { ExtraMotionReels } from "./ExtraMotionReels";
import { ProfileToggle } from "./ProfileToggle";
import type { PortfolioMode } from "../_lib/portfolioMode";
import { ContactDock, PORTFOLIO_OPEN_CONTACT_EVENT } from "./ContactDock";
import { BrandsMarquee } from "./BrandsMarquee";
import { EducationSection } from "./EducationSection";
import { EDUCATION } from "../_lib/content";
import { AnimatePresence, motion } from "framer-motion";

function scrollToSection(id: string) {
  if (id === "contact") {
    window.dispatchEvent(new CustomEvent(PORTFOLIO_OPEN_CONTACT_EVENT));
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({
  path,
  locale,
  icon,
}: {
  path: string;
  locale: PortfolioLocale;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      {icon && (
        <span
          aria-hidden
          className="inline-grid h-7 w-7 place-items-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-[0.85rem] backdrop-blur-md shadow-sm"
        >
          {icon}
        </span>
      )}
      <LocaleUiStack
        path={path}
        locale={locale}
        as="p"
        className="portfolio-section-label text-[0.75rem] font-semibold uppercase tracking-[0.16em] block text-[color:var(--pf-accent)]"
      />
      <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-[color:var(--pf-accent)]/40 via-black/[0.06] to-transparent dark:via-white/10" />
    </div>
  );
}

function LocaleSwitch({
  locale,
  setLocale,
}: {
  locale: PortfolioLocale;
  setLocale: (l: PortfolioLocale) => void;
}) {
  const nextLocale = locale === "th" ? "en" : "th";
  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      className="portfolio-locale-toggle flex items-center gap-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-full px-2.5 py-1 transition-all active:scale-95 group"
      title={locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
    >
      <div className="flex items-center -space-x-1">
        <FlagIcon locale="th" className={`h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10 transition-opacity ${locale === 'th' ? 'opacity-100 z-10' : 'opacity-40 group-hover:opacity-60'}`} />
        <FlagIcon locale="en" className={`h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10 transition-opacity ${locale === 'en' ? 'opacity-100 z-10' : 'opacity-40 group-hover:opacity-60'}`} />
      </div>
      <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors ml-1">
        {locale}
      </span>
    </button>
  );
}

export default function PortfolioView() {
  const pf = usePortfolioLocale();
  const { theme, toggle, ready: themeReady } = usePortfolioTheme();
  const [mode, setModeState] = useState<PortfolioMode>("creative");
  const [modeReady, setModeReady] = useState(false);
  const portraitTilt = usePointerTilt(2);
  const navRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [navHeight, setNavHeight] = useState(56);

  // Sync mode with localStorage and URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode") as PortfolioMode | null;
    const storedMode = localStorage.getItem("portfolio-mode") as PortfolioMode | null;
    
    if (urlMode === "creative" || urlMode === "tech") {
      setModeState(urlMode);
    } else if (storedMode === "creative" || storedMode === "tech") {
      setModeState(storedMode);
    }
    setModeReady(true);
  }, []);

  const setMode = (m: PortfolioMode) => {
    setModeState(m);
    localStorage.setItem("portfolio-mode", m);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", m);
    window.history.replaceState({}, "", url);
  };

  useEffect(() => {
    document.body.classList.add("portfolio-standalone");
    return () => document.body.classList.remove("portfolio-standalone");
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [modeReady, pf.ready, themeReady, mode, pf.locale]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!pf.ready || !themeReady || !modeReady) {
    return <div className="portfolio-page min-h-screen" aria-busy="true" />;
  }

  const { profile, images, skillSections, unifiedJourney, brandLogos, extraMotionReels, contact, locale, setLocale } = pf;
  const parallax = scrollY * 0.06;
  const navScrolled = scrollY > 6;

  // Theme configuration based on mode
  const accentColor = mode === "creative" ? "#F59E0B" : "#10B981"; 
  const modeTheme = mode === "creative" ? "creative" : "tech";

  return (
    <>
    <div
      className="portfolio-page min-h-screen pb-28 transition-colors duration-500"
      data-portfolio-theme={theme}
      data-portfolio-mode={modeTheme}
      data-locale={locale}
      style={{ "--pf-accent": accentColor } as any}
    >
      <nav
        ref={navRef}
        className={`portfolio-nav${navScrolled ? " portfolio-nav--scrolled" : ""}`}
        aria-label="Portfolio"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4 flex-1 text-left">
            <a
              href="#top"
              aria-label="Home"
              className="portfolio-brand-logo group hidden md:flex items-center gap-2.5 shrink-0"
            >
              <span
                aria-hidden
                className="relative grid h-9 w-9 place-items-center rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-base backdrop-blur-xl shadow-md transition-all group-hover:scale-105 group-hover:border-[color:var(--pf-accent)]/50"
                style={{ boxShadow: "0 4px 18px -6px var(--pf-accent)" }}
              >
                <span className="transition-opacity duration-300" key={mode}>
                  {mode === "creative" ? "🎬" : "🤖"}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 text-[0.55rem] leading-none">
                  {mode === "creative" ? "✨" : "⚙️"}
                </span>
              </span>
              <span className="font-brand text-xs sm:text-sm font-bold tracking-[0.15em] text-black dark:text-white opacity-80 group-hover:opacity-100 transition-opacity">
                {profile.name[locale]}
              </span>
            </a>
            <ProfileToggle mode={mode} setMode={setMode} locale={locale} />
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <LocaleSwitch locale={locale} setLocale={setLocale} />
            
            <button 
              type="button" 
              onClick={toggle} 
              className="portfolio-theme-toggle flex h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xl transition-all hover:bg-black/10 dark:hover:bg-white/10 active:scale-90"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="portfolio-btn-primary text-xs px-3 py-2 sm:px-4 min-w-[4.5rem] text-center"
            >
              <LocaleUiStack path="nav.contact" locale={locale} />
            </a>
          </div>
        </div>
      </nav>

      <div id="top" style={{ height: navHeight }} aria-hidden className="shrink-0" />

      <header className="relative mx-auto max-w-6xl px-5 pt-4 md:pt-8">
        <div className="portfolio-hero relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] bg-[#0a0a0a]">
          <div className="absolute inset-0">
            <Image
              src={images.heroBackground}
              alt=""
              fill
              priority
              className="object-cover brightness-[0.62] contrast-[1.04] saturate-[0.94]"
              sizes="1152px"
            />
            <Image
              src={images.heroOverlay}
              alt=""
              fill
              className="object-cover mix-blend-soft-light opacity-[0.44]"
              sizes="1152px"
            />
            <div className="portfolio-hero-gradient absolute inset-0" />
          </div>

          <div className="relative z-10 grid gap-10 p-8 md:p-16 lg:p-20 md:grid-cols-[1.4fr_0.6fr] md:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "creative" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "creative" ? 20 : -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-2xl portfolio-hero-copy text-left"
              >
                <LocaleStack
                  text={profile.name}
                  locale={locale}
                  as="h1"
                  className="portfolio-hero-name font-brand font-semibold leading-[1.08] text-white drop-shadow-2xl mb-2 text-left tracking-tight"
                />

                <div className="portfolio-hero-role-row mb-5 flex flex-nowrap items-start gap-2.5 text-left md:gap-3">
                  <span
                    aria-hidden
                    className="portfolio-hero-role-emoji mt-[0.2em] shrink-0 select-none text-[1.35rem] leading-none md:text-[1.65rem]"
                  >
                    {mode === "creative" ? "🎬" : "🤖"}
                  </span>
                  <div className="min-w-0 max-w-2xl flex-1 basis-0">
                    <LocaleStack
                      text={mode === "creative" ? profile.mainRole.creative : profile.mainRole.tech}
                      locale={locale}
                      as="p"
                      className="portfolio-hero-role text-left font-semibold leading-snug text-[color:var(--pf-accent)]"
                    />
                  </div>
                </div>

                {profile.position && (
                  <p className="mb-5 text-left text-sm font-semibold uppercase tracking-[0.18em] text-white/55 md:text-base">
                    {profile.position[locale] ?? profile.position.en}
                  </p>
                )}

                <p className="mb-0 max-w-2xl text-left text-lg font-medium leading-snug tracking-normal text-white/90 md:text-xl">
                  {mode === "creative" ? profile.tagline.creative[locale] : profile.tagline.tech[locale]}
                </p>

                <div className="flex items-center gap-3 my-10">
                  <div className="w-24 h-1.5 bg-[color:var(--pf-accent)] rounded-full shadow-[0_0_15px_var(--pf-accent)] transition-all duration-500" />
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    <span aria-hidden>{mode === "creative" ? "🎨" : "🧠"}</span>
                    <span aria-hidden className="opacity-40">·</span>
                    <span aria-hidden>{mode === "creative" ? "✨" : "⚙️"}</span>
                  </div>
                </div>

                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl font-normal text-left">
                  {mode === "creative" ? profile.subtitle.creative[locale] : profile.subtitle.tech[locale]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div
              ref={portraitTilt.ref}
              onPointerMove={portraitTilt.onMove}
              onPointerLeave={portraitTilt.onLeave}
              className="portfolio-portrait relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-[3rem] border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] md:mx-0 md:mt-6 self-center justify-self-end group"
              style={{
                transform: `${portraitTilt.transform} translateY(${parallax * 0.3}px)`,
                transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: `0 40px 80px -15px ${mode === "creative" ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.2)"}`,
              }}
            >
              <Image
                src={images.portrait}
                alt={profile.name[locale]}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="300px"
              />
              <div className={`absolute inset-0 bg-[color:var(--pf-accent)]/10 mix-blend-overlay transition-opacity duration-700 ${mode === 'creative' ? 'opacity-40' : 'opacity-0'}`} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 space-y-24 md:space-y-40 mt-16 md:mt-28">
        <section id="journey" className="scroll-mt-24">
          <div className="mt-0 md:mt-2">
            <UnifiedTimeline
              journey={unifiedJourney}
              locale={pf.locale}
              displayMode={mode}
              ninaReels={extraMotionReels.filter((r) => r.id.startsWith("nina-"))}
            />
            {mode === "creative" && extraMotionReels.some((r) => !r.id.startsWith("nina-")) && (
              <ExtraMotionReels reels={extraMotionReels} locale={locale} />
            )}
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 text-left">
          <SectionLabel path="sections.skills" locale={locale} icon={mode === "creative" ? "✨" : "⚙️"} />
          <div className="mt-4 flex flex-col md:flex-row md:items-baseline gap-2">
            <LocaleUiStack path="sections.skills" locale={locale} as="h2" className="portfolio-section-heading block text-black dark:text-white text-left" />
            <span className="portfolio-label text-[color:var(--pf-accent)] opacity-90 flex items-center gap-1.5">
              <span aria-hidden>{mode === "creative" ? "🎞️" : "🧠"}</span>
              {mode === "creative" ? "Tools & Craft Stack" : "Engineering Stack"}
            </span>
          </div>
          <div className="mt-8">
            <SkillsLaneSection sections={skillSections} locale={pf.locale} displayMode={mode} theme={theme} />
          </div>
        </section>

        {/* Global Brands Section */}
        <section id="brands" className="scroll-mt-24 pt-10 text-left">
          <SectionLabel path="sections.brands" locale={locale} icon="🌐" />
          <div className="mt-4 flex flex-col md:flex-row md:items-baseline gap-2 mb-10">
            <LocaleUiStack path="sections.brandsTitle" locale={locale} as="h2" className="portfolio-section-heading block text-black dark:text-white text-left" />
            <span className="portfolio-label text-[color:var(--pf-accent)] opacity-90 flex items-center gap-1.5">
              <span aria-hidden>🏢</span>
              Trusted Collaborations
            </span>
          </div>

          {/* Dual marquee — row 1 LTR, row 2 RTL, fade mask on both sides */}
          <BrandsMarquee logos={brandLogos} />
        </section>

        <section id="education" className="scroll-mt-24 pt-10 text-left">
          <SectionLabel path="sections.education" locale={locale} icon="🎓" />
          <div className="mt-4 mb-8 flex flex-col gap-2 md:flex-row md:items-baseline">
            <LocaleUiStack
              path="sections.educationTitle"
              locale={locale}
              as="h2"
              className="portfolio-section-heading block text-left text-black dark:text-white"
            />
            <span className="portfolio-label flex items-center gap-1.5 text-[color:var(--pf-accent)] opacity-90">
              <span aria-hidden>📚</span>
              <LocaleUiStack
                path="sections.educationTagline"
                locale={locale}
                as="span"
                className="portfolio-label text-[color:var(--pf-accent)] opacity-90"
              />
            </span>
          </div>
          <EducationSection data={EDUCATION} locale={locale} />
        </section>

      </main>
    </div>

    <ContactDock locale={locale} contact={contact} />
    </>
  );
}
