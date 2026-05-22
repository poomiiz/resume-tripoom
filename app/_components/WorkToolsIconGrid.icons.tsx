"use client";

import Image from "next/image";
import { workToolIconUrl, workToolIconNeedsDarkInvert } from "../_lib/workTools.icons";
import { usePortfolioTheme } from "./usePortfolioTheme";
import type { WorkTool } from "../_lib/content/types";
import { WORK_TOOLS } from "../_lib/workTools.data";

export function ToolIcon({ icon, className }: { icon: string; className?: string }) {
  const { theme } = usePortfolioTheme();
  const tool = WORK_TOOLS.find(t => t.id === icon);
  
  if (!tool) return null;
  
  const url = workToolIconUrl(tool, theme as "light" | "dark");
  const needsInvert = workToolIconNeedsDarkInvert(tool.id, theme as "light" | "dark");

  if (!url) return <div className={className} />;

  return (
    <div className={`relative ${className} ${needsInvert ? "dark:invert" : ""}`}>
      <img
        src={url}
        alt=""
        className="h-full w-full object-contain"
      />
    </div>
  );
}
