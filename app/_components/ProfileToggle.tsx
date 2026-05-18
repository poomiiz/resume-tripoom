"use client";

import { motion } from "framer-motion";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { PortfolioMode } from "../_lib/portfolioMode";

export type { PortfolioMode };

export function ProfileToggle({
  mode,
  setMode,
  locale,
}: {
  mode: PortfolioMode;
  setMode: (m: PortfolioMode) => void;
  locale: PortfolioLocale;
}) {
  return (
    <div className="portfolio-mode-toggle relative flex items-center p-1 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full shadow-2xl overflow-hidden min-w-[220px] h-10 group hover:border-black/20 dark:hover:border-white/20 transition-all">
      {/* Sliding Background */}
      <motion.div
        className="absolute inset-y-1 rounded-full bg-[color:var(--pf-accent)] shadow-[0_0_15px_var(--pf-accent)] z-0"
        initial={false}
        animate={{
          x: mode === "creative" ? 0 : 106, 
          width: mode === "creative" ? 110 : 106,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      />

      <button
        type="button"
        onClick={() => setMode("creative")}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
          mode === "creative" ? "text-white dark:text-black" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        }`}
      >
        <span>🎬</span>
        <span>Creative</span>
      </button>

      <button
        type="button"
        onClick={() => setMode("tech")}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
          mode === "tech" ? "text-white dark:text-black" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        }`}
      >
        <span>🤖</span>
        <span>Systems</span>
      </button>
      
      {/* Dynamic Glow Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-10 dark:opacity-20 group-hover:opacity-40 ${
        mode === "creative" ? "bg-[radial-gradient(circle_at_25%,var(--pf-accent)_0%,transparent_60%)]" : "bg-[radial-gradient(circle_at_75%,var(--pf-accent)_0%,transparent_60%)]"
      }`} />
    </div>
  );
}
