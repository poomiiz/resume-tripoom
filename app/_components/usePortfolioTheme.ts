"use client";

import { useCallback, useEffect, useState } from "react";

export type PortfolioTheme = "light" | "dark";

const STORAGE_KEY = "tripoom-portfolio-theme";

export function usePortfolioTheme() {
  const [theme, setThemeState] = useState<PortfolioTheme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PortfolioTheme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setThemeState("light");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.setAttribute("data-portfolio-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    return () => {
      document.documentElement.removeAttribute("data-portfolio-theme");
    };
  }, [theme, ready]);

  const toggle = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const setTheme = useCallback((t: PortfolioTheme) => {
    setThemeState(t);
  }, []);

  return { theme, toggle, setTheme, ready };
}
