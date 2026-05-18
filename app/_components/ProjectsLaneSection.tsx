"use client";

import { useState } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { ResolvedTimelineRow } from "../_lib/portfolio.build";
import { LaneSwitch } from "./LaneSwitch";
import type { PortfolioLane } from "./portfolioLanes";
import { TechProjectsList } from "./TechProjectsSection";
import { MotionProjectsSection } from "./MotionProjectsSection";

export function ProjectsLaneSection({
  locale,
  timeline,
  brandLogos,
}: {
  locale: PortfolioLocale;
  timeline: ResolvedTimelineRow[];
  brandLogos: { src: string; alt: string }[];
}) {
  const [lane, setLane] = useState<PortfolioLane>("motion");

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
        <LaneSwitch lane={lane} setLane={setLane} locale={locale} />
      </div>
      {lane === "tech" ? (
        <TechProjectsList locale={locale} />
      ) : (
        <MotionProjectsSection locale={locale} timeline={timeline} brandLogos={brandLogos} />
      )}
    </div>
  );
}

