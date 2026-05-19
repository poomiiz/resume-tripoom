"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { SkillSection } from "../_lib/portfolio.data";
import { WorkToolsIconGrid } from "./WorkToolsIconGrid";
import { LocaleUiStack } from "./LocaleUiStack";
import { SkillsShowcase } from "./SkillsShowcase";
import type { PortfolioMode } from "../_lib/portfolioMode";
import { AnimatePresence, motion } from "framer-motion";

function ToolsCard({
  emoji,
  titlePath,
  subtitle,
  locale,
  lane,
  showGroups = false,
  theme,
}: {
  emoji: string;
  titlePath: string;
  subtitle: string;
  locale: PortfolioLocale;
  lane: "creative" | "tech";
  showGroups?: boolean;
  theme?: "light" | "dark";
}) {
  return (
    <article className="portfolio-skill-section portfolio-panel rounded-[1.75rem] p-6 md:p-8">
      <header className="flex items-center gap-3 mb-6 md:mb-8">
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
            className="text-[0.875rem] font-bold uppercase tracking-[0.18em] text-black/80 dark:text-white/80 block truncate"
          />
          <span className="text-[0.75rem] uppercase tracking-widest text-black/62 dark:text-white/52 font-semibold text-left mt-0.5">
            {subtitle}
          </span>
        </div>
      </header>
      <WorkToolsIconGrid locale={locale} lane={lane} showGroups={showGroups} theme={theme} />
    </article>
  );
}

export function SkillsLaneSection({
  sections,
  locale,
  displayMode = "creative",
  theme,
}: {
  sections: SkillSection[];
  locale: PortfolioLocale;
  displayMode?: PortfolioMode;
  theme?: "light" | "dark";
}) {
  return (
    <div className="mt-4 space-y-10">
      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={`soft-${displayMode}`}
            initial={{ opacity: 0, x: displayMode === "creative" ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: displayMode === "creative" ? 10 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <SkillsShowcase locale={locale} displayMode={displayMode} personalOnly />
          </motion.div>
        </AnimatePresence>

        <SkillsShowcase locale={locale} displayMode={displayMode} interestsOnly />

        <AnimatePresence mode="wait">
          <motion.div
            key={`craft-${displayMode}`}
            initial={{ opacity: 0, x: displayMode === "creative" ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: displayMode === "creative" ? 10 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <SkillsShowcase locale={locale} displayMode={displayMode} craftOnly />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="space-y-5 pt-6 border-t border-black/[0.05] dark:border-white/5">
        <LocaleUiStack
          path="sections.tools"
          locale={locale}
          as="h2"
          className="text-base md:text-lg font-bold block text-black dark:text-white"
        />

        <ToolsCard
          emoji="🎬"
          titlePath="nav.motion"
          subtitle="Motion Craft · VFX · Creative Tools"
          locale={locale}
          lane="creative"
          theme={theme}
        />

        <ToolsCard
          emoji="💻"
          titlePath="nav.tech"
          subtitle="AI · Dev · Design · Ops"
          locale={locale}
          lane="tech"
          showGroups
          theme={theme}
        />
      </div>
    </div>
  );
}
