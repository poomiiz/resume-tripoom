"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { pickLocale } from "../_lib/portfolio.ui";
import { workToolIconUrl } from "../_lib/workTools.icons";
import { toolsForLane, type WorkTool, type WorkToolLane } from "../_lib/workTools.data";
import { usePortfolioTheme } from "./usePortfolioTheme";

/**
 * NOTE on inline styles
 * ─────────────────────
 * The legacy global stylesheet defines `.portfolio-tool-icon__*` rules with
 * higher cascade priority than Tailwind utilities. To guarantee consistent
 * sizing across creative/tech lanes we drop those child class names entirely
 * and pin critical dimensions via inline `style={}` (specificity 1,0,0,0).
 * Only the outermost `portfolio-tool-icon` class is kept so theme-level
 * cosmetic rules can still apply.
 */

function ToolIconCell({
  tool,
  locale,
  theme,
  hideLabel = false,
}: {
  tool: WorkTool;
  locale: PortfolioLocale;
  theme: "light" | "dark";
  hideLabel?: boolean;
}) {
  const [iconFailed, setIconFailed] = useState(false);
  const label = pickLocale(locale, tool.name);
  const src = workToolIconUrl(tool, theme);
  const showIcon = src && !iconFailed;

  return (
    <li
      className="portfolio-tool-icon group"
      style={
        {
          "--tool-color": `hsl(${tool.hue}, 68%, 48%)`,
          "--tool-color-deep": `hsl(${tool.hue}, 62%, 36%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          minWidth: 0,
          width: "100%",
          listStyle: "none",
          padding: 0,
          margin: 0,
        } as CSSProperties
      }
      title={label}
    >
      {/* Visual tile — inline styles to defeat legacy CSS */}
      <div
        className="group-hover:border-[color:var(--tool-color)]"
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          width: "100%",
          maxWidth: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          border: "1px solid",
          borderColor: theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
          background: theme === "dark" ? "#161616" : "#ffffff",
          padding: 10,
          transition: "transform .25s, border-color .25s, box-shadow .25s",
          boxShadow: theme === "dark" ? "none" : "0 4px 14px -6px rgba(0,0,0,0.12)",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            opacity: 0,
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--tool-color) 22%, transparent) 0%, transparent 70%)",
          }}
        />
        {showIcon ? (
          // eslint-disable-next-line @next/next/no-img-element -- SVG จาก CDN; ต้องใช้ <img> เพื่อรองรับ onError
          <img
            src={src}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            onError={() => setIconFailed(true)}
            style={{
              position: "relative",
              zIndex: 1,
              width: "auto",
              height: "auto",
              maxWidth: "68%",
              maxHeight: "68%",
              objectFit: "contain",
              transition: "transform .4s",
            }}
          />
        ) : (
          <span
            aria-hidden
            style={{
              position: "relative",
              zIndex: 1,
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "-0.02em",
              color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
            }}
          >
            {tool.fallbackAbbr}
          </span>
        )}
      </div>

      {!hideLabel && (
        <span
          title={label}
          style={{
            display: "block",
            width: "100%",
            marginTop: 6,
            fontSize: "0.62rem",
            lineHeight: 1.2,
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
          }}
        >
          {label}
        </span>
      )}
    </li>
  );
}

export function WorkToolsIconGrid({
  locale,
  lane = "tech",
  hideLabels = false,
}: {
  locale: PortfolioLocale;
  lane?: WorkToolLane;
  hideLabels?: boolean;
}) {
  const { theme } = usePortfolioTheme();
  const tools = toolsForLane(lane);

  return (
    <ul
      className="portfolio-tool-icons"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
        columnGap: 12,
        rowGap: 20,
        justifyItems: "center",
        listStyle: "none",
        padding: 0,
        margin: 0,
        marginTop: 8,
      }}
    >
      {tools.map((tool) => (
        <ToolIconCell key={tool.id} tool={tool} locale={locale} theme={theme} hideLabel={hideLabels} />
      ))}
    </ul>
  );
}
