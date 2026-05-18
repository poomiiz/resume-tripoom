"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { usePointerTilt, useRevealOnScroll } from "./usePortfolioMotion";
import { usePortfolioTheme } from "./usePortfolioTheme";
import { usePortfolioLocale } from "./usePortfolioLocale";
import { LocaleStack } from "./LocaleStack";
import { LocaleUiStack } from "./LocaleUiStack";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { reelLabelForLocale } from "../_lib/portfolio.build";
import { FlagIcon } from "./FlagIcon";
import { SkillsLaneSection } from "./SkillsLaneSection";
import { UnifiedTimeline } from "./UnifiedTimeline";
import { ProfileToggle, type PortfolioMode } from "./ProfileToggle";
import { AnimatePresence, motion } from "framer-motion";

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
        className="portfolio-section-label text-[0.68rem] font-semibold uppercase tracking-[0.22em] block text-[color:var(--pf-accent)]/80"
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
      <span className="text-[0.6rem] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-opacity ml-1">
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
  const heroTilt = usePointerTilt(4);
  const [scrollY, setScrollY] = useState(0);

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

  const { profile, images, skillSections, unifiedJourney, brandLogos, contact, locale, setLocale } = pf;
  const parallax = scrollY * 0.06;

  // Theme configuration based on mode
  const accentColor = mode === "creative" ? "#F59E0B" : "#10B981"; 
  const modeTheme = mode === "creative" ? "creative" : "tech";

  return (
    <div 
      className="portfolio-page min-h-screen pb-20 transition-colors duration-500 bg-[#f8f8f8] dark:bg-[#0a0a0a]" 
      data-portfolio-theme={theme}
      data-portfolio-mode={modeTheme}
      style={{ "--pf-accent": accentColor } as any}
    >
      <nav className="portfolio-nav sticky top-0 z-50 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/5 bg-white/80 dark:bg-black/80">
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

            <a href={contact.emailHref} className="portfolio-btn-primary text-xs px-3 py-2 sm:px-4 min-w-[4.5rem] text-center">
              <LocaleUiStack path="nav.contact" locale={locale} />
            </a>
          </div>
        </div>
      </nav>

      <header className="relative mx-auto max-w-6xl px-5 pt-4 md:pt-8">
        <div className="portfolio-hero relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] bg-[#0a0a0a]">
          <div className="absolute inset-0">
            <Image src={images.heroBackground} alt="" fill priority className="object-cover" sizes="1152px" />
            <Image src={images.heroOverlay} alt="" fill className="object-cover mix-blend-soft-light opacity-70" sizes="1152px" />
            <div className="portfolio-hero-gradient absolute inset-0" />
          </div>

          <div
            className="relative z-10 grid gap-10 p-8 md:p-16 lg:p-20 md:grid-cols-[1.4fr_0.6fr] md:items-start"
            ref={heroTilt.ref}
            onPointerMove={heroTilt.onMove}
            onPointerLeave={heroTilt.onLeave}
            style={{
              transform: heroTilt.transform,
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "creative" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "creative" ? 20 : -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-2xl portfolio-hero-copy text-left"
              >
                <p className="text-[0.85rem] font-black uppercase tracking-[0.4em] text-[color:var(--pf-accent)] mb-6 flex items-center gap-3 text-wrap text-left">
                  <span className="w-8 h-px bg-[color:var(--pf-accent)]/50 shrink-0" />
                  <span aria-hidden className="text-base leading-none drop-shadow-[0_0_10px_var(--pf-accent)]">
                    {mode === "creative" ? "🎬" : "🤖"}
                  </span>
                  {mode === "creative" ? profile.mainRole.creative[locale] : profile.mainRole.tech[locale]}
                </p>
                
                <LocaleStack
                  text={profile.name}
                  locale={locale}
                  as="h1"
                  className="font-brand text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.9] text-white drop-shadow-2xl mb-6 text-left"
                />

                <p className="text-lg md:text-2xl text-white/90 tracking-tight font-medium text-left max-w-2xl leading-snug">
                  {mode === "creative" ? profile.tagline.creative[locale] : profile.tagline.tech[locale]}
                </p>

                <div className="flex items-center gap-3 my-10">
                  <div className="w-24 h-1.5 bg-[color:var(--pf-accent)] rounded-full shadow-[0_0_15px_var(--pf-accent)] transition-all duration-500" />
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                    <span aria-hidden>{mode === "creative" ? "🎨" : "🧠"}</span>
                    <span aria-hidden className="opacity-40">·</span>
                    <span aria-hidden>{mode === "creative" ? "✨" : "⚙️"}</span>
                  </div>
                </div>

                <p className="text-base md:text-xl text-white/80 leading-relaxed max-w-2xl font-medium opacity-90 text-left">
                  {mode === "creative" ? profile.subtitle.creative[locale] : profile.subtitle.tech[locale]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div
              className="portfolio-portrait relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-[3rem] border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] md:mx-0 md:mt-6 self-center justify-self-end group"
              style={{ 
                transform: `translateY(${parallax * 0.3}px)`,
                boxShadow: `0 40px 80px -15px ${mode === 'creative' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
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
          <SectionLabel path="sections.story" locale={locale} icon={mode === "creative" ? "🎬" : "🏗️"} />
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mt-4 mb-10 text-left">
            <LocaleUiStack path="sections.story" locale={locale} as="h2" className="text-2xl md:text-4xl font-bold block text-black dark:text-white" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[color:var(--pf-accent)] opacity-60 flex items-center gap-1.5">
              <span aria-hidden>{mode === "creative" ? "🎨" : "🔗"}</span>
              {mode === 'creative' ? "Motion & VFX Craft" : "Systems & Architecture"}
            </span>
          </div>
          
          <div className="mt-12">
            <UnifiedTimeline journey={unifiedJourney} locale={pf.locale} displayMode={mode} />
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 text-left">
          <SectionLabel path="sections.skills" locale={locale} icon={mode === "creative" ? "✨" : "⚙️"} />
          <div className="mt-4 flex flex-col md:flex-row md:items-baseline gap-2">
            <LocaleUiStack path="sections.skills" locale={locale} as="h2" className="text-2xl md:text-4xl font-bold block text-black dark:text-white text-left" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[color:var(--pf-accent)] opacity-60 flex items-center gap-1.5">
              <span aria-hidden>{mode === "creative" ? "🎞️" : "🧠"}</span>
              {mode === "creative" ? "Tools & Craft Stack" : "Engineering Stack"}
            </span>
          </div>
          <div className="mt-8">
            <SkillsLaneSection sections={skillSections} locale={pf.locale} displayMode={mode} />
          </div>
        </section>

        {/* Global Brands Section */}
        <section id="brands" className="scroll-mt-24 pt-10 text-left">
          <SectionLabel path="sections.brands" locale={locale} icon="🌐" />
          <div className="mt-4 flex flex-col md:flex-row md:items-baseline gap-2">
            <LocaleUiStack path="sections.brandsTitle" locale={locale} as="h2" className="text-2xl md:text-4xl font-bold block text-black dark:text-white text-left" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[color:var(--pf-accent)] opacity-60 flex items-center gap-1.5">
              <span aria-hidden>🏢</span>
              Trusted Collaborations
            </span>
          </div>
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
            {brandLogos.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="portfolio-brand-cell portfolio-panel group relative flex aspect-square items-center justify-center rounded-2xl p-4 bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--pf-accent)]/30 hover:shadow-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.05] shadow-sm dark:shadow-none overflow-hidden"
              >
                <span className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--pf-accent)]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Image src={logo.src} alt={logo.alt} width={80} height={80} className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 pb-20 text-left">
          <footer className="portfolio-contact relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center border border-black/[0.08] dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-xl dark:shadow-none">
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0 opacity-60 dark:opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--pf-accent) 18%, transparent) 0%, transparent 55%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3 text-2xl md:text-3xl">
                <span aria-hidden className="drop-shadow-[0_0_12px_var(--pf-accent)]">🎬</span>
                <span aria-hidden className="text-base text-[color:var(--pf-accent)] opacity-50">×</span>
                <span aria-hidden className="drop-shadow-[0_0_12px_var(--pf-accent)]">🤖</span>
              </div>

              <SectionLabel path="sections.contact" locale={locale} icon="✉️" />

              <LocaleUiStack
                path="sections.contactTitle"
                locale={locale}
                as="h2"
                className="mt-4 font-brand text-3xl md:text-5xl block text-black dark:text-white"
              />
              <LocaleUiStack
                path="sections.contactSub"
                locale={locale}
                as="p"
                className="mt-3 text-base md:text-lg text-black/60 dark:text-white/60 block max-w-xl mx-auto leading-relaxed"
              />

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={contact.phoneHref}
                  className="portfolio-btn-ghost w-full sm:w-auto px-10 py-4 text-lg border-black/[0.2] text-black dark:border-white/20 dark:text-white font-bold inline-flex items-center justify-center gap-2"
                >
                  <span aria-hidden>📞</span>
                  {contact.phone}
                </a>
                <a
                  href={contact.emailHref}
                  className="portfolio-btn-primary w-full sm:w-auto px-10 py-4 text-lg font-bold inline-flex items-center justify-center gap-2"
                >
                  <span aria-hidden>✨</span>
                  {contact.email}
                </a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
