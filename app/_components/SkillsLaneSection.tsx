"use client";

import { useState } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { SkillSection } from "../_lib/portfolio.data";
import { WorkToolsIconGrid } from "./WorkToolsIconGrid";
import { LocaleUiStack } from "./LocaleUiStack";
import { SkillsShowcase } from "./SkillsShowcase";
import type { PortfolioMode } from "./ProfileToggle";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Shared header+grid card so Motion and Tech modes share identical proportions
 */
function ToolsCard({
  emoji,
  titlePath,
  subtitle,
  locale,
  lane,
}: {
  emoji: string;
  titlePath: string;
  subtitle: string;
  locale: PortfolioLocale;
  lane: "creative" | "tech";
}) {
  return (
    <article className="portfolio-skill-section portfolio-panel rounded-[1.75rem] p-6 md:p-10 border border-black/[0.08] dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-xl">
      <header className="flex items-center gap-3 mb-7 md:mb-9">
        <span
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-xl shadow-sm backdrop-blur-md"
        >
          {emoji}
        </span>
        <div className="flex flex-col leading-tight min-w-0">
          <LocaleUiStack
            path={titlePath}
            locale={locale}
            as="h2"
            className="text-[0.9rem] font-bold uppercase tracking-[0.2em] text-black/80 dark:text-white/80 block truncate"
          />
          <span className="text-[0.65rem] uppercase tracking-widest text-black/50 dark:text-white/40 font-semibold text-left">
            {subtitle}
          </span>
        </div>
      </header>
      <WorkToolsIconGrid locale={locale} lane={lane} />
    </article>
  );
}

export function SkillsLaneSection({
  sections,
  locale,
  displayMode = 'creative'
}: {
  sections: SkillSection[];
  locale: PortfolioLocale;
  displayMode?: PortfolioMode;
}) {
  return (
    <div className="mt-4 space-y-10">
      {/* 1. Identity & Experience Summary (Static Grid, but content switches by mode) */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={displayMode}
          initial={{ opacity: 0, x: displayMode === 'creative' ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: displayMode === 'creative' ? 10 : -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <SkillsShowcase locale={locale} displayMode={displayMode} personalOnly />
          <SkillsShowcase locale={locale} displayMode={displayMode} interestsOnly />
          <SkillsShowcase locale={locale} displayMode={displayMode} craftOnly />
        </motion.div>
      </AnimatePresence>

      {/* 2. Professional Tools & Stack (Filtered by Display Mode) */}
      <div className="space-y-6 pt-6 border-t border-black/[0.05] dark:border-white/5">
        <LocaleUiStack
          path="sections.tools"
          locale={locale}
          as="h2"
          className="text-base md:text-lg font-bold block text-black dark:text-white"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={displayMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            <ToolsCard
              emoji={displayMode === "creative" ? "🎨" : "💻"}
              titlePath={displayMode === "creative" ? "nav.motion" : "nav.tech"}
              subtitle={displayMode === "creative" ? "Motion Craft" : "Technical Stack"}
              locale={locale}
              lane={displayMode === "creative" ? "creative" : "tech"}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
