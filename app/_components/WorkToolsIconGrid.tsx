"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { pickLocale } from "../_lib/portfolio.ui";
import { workToolIconNeedsDarkInvert, workToolIconUrl } from "../_lib/workTools.icons";
import { toolsForLane, type WorkTool, type WorkToolLane } from "../_lib/workTools.data";
import { usePortfolioTheme } from "./usePortfolioTheme";

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
  const invertOnDark = workToolIconNeedsDarkInvert(tool.id, theme);

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
      <div
        className="group-hover:border-[color:var(--tool-color)]"
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          width: "100%",
          maxWidth: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          border: "1px solid",
          borderColor: theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
          background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.80)",
          backdropFilter: "blur(14px) saturate(1.35)",
          WebkitBackdropFilter: "blur(14px) saturate(1.35)",
          padding: 10,
          transition: "transform .25s, border-color .25s, box-shadow .25s",
          boxShadow:
            theme === "dark"
              ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.25)"
              : "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(20,20,31,0.06)",
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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            onError={() => setIconFailed(true)}
            style={{
              position: "relative",
              zIndex: 1,
              width: "auto",
              height: "auto",
              maxWidth: "76%",
              maxHeight: "76%",
              objectFit: "contain",
              transition: "transform .4s",
              filter: invertOnDark ? "brightness(0) invert(1)" : undefined,
            }}
          />
        ) : (
          <span
            aria-hidden
            style={{
              position: "relative",
              zIndex: 1,
              fontWeight: 700,
              fontSize: "0.75rem",
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
            fontSize: "0.75rem",
            lineHeight: 1.25,
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

function ToolIconList({
  tools,
  locale,
  theme,
  hideLabels,
}: {
  tools: WorkTool[];
  locale: PortfolioLocale;
  theme: "light" | "dark";
  hideLabels?: boolean;
}) {
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
        columnGap: 12,
        rowGap: 20,
        justifyItems: "center",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {tools.map((tool) => (
        <ToolIconCell
          key={tool.id}
          tool={tool}
          locale={locale}
          theme={theme}
          hideLabel={hideLabels}
        />
      ))}
    </ul>
  );
}

function GroupHeading({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
}) {
  return (
    <p
      style={{
        margin: "0 0 12px 0",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: theme === "dark" ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)",
      }}
    >
      {children}
    </p>
  );
}

export function WorkToolsIconGrid({
  locale,
  lane = "tech",
  hideLabels = false,
  showGroups = false,
  theme: themeProp,
}: {
  locale: PortfolioLocale;
  lane?: WorkToolLane;
  hideLabels?: boolean;
  showGroups?: boolean;
  /** รับ theme จาก parent เพื่อให้ sync ถูกต้องเสมอ */
  theme?: "light" | "dark";
}) {
  const { theme: hookTheme } = usePortfolioTheme();
  const theme = themeProp ?? hookTheme;
  const tools = toolsForLane(lane);

  if (showGroups) {
    const aiTools = tools.filter((t) => t.group === "ai");
    const devTools = tools.filter((t) => t.group !== "ai");

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
        <div>
          <GroupHeading theme={theme}>AI &amp; Automation</GroupHeading>
          <ToolIconList tools={aiTools} locale={locale} theme={theme} hideLabels={hideLabels} />
        </div>
        <div>
          <GroupHeading theme={theme}>Design, Dev &amp; Ops</GroupHeading>
          <ToolIconList tools={devTools} locale={locale} theme={theme} hideLabels={hideLabels} />
        </div>
      </div>
    );
  }

  return <ToolIconList tools={tools} locale={locale} theme={theme} hideLabels={hideLabels} />;
}
