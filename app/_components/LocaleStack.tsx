"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";
import type { LocalizedText } from "../_lib/portfolio.data";

type Props = {
  text: LocalizedText | string;
  locale: PortfolioLocale;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
};

/** ซ้อนข้อความสองภาษาในช่องเดียว — สลับภาษาแล้ว layout ไม่กระโดด */
export function LocaleStack({ text, locale, className = "", as: Tag = "span" }: Props) {
  if (typeof text === "string") {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={["portfolio-locale-stack", className].filter(Boolean).join(" ")}>
      <span
        className={locale === "th" ? "portfolio-locale-stack__active" : "portfolio-locale-stack__ghost"}
        lang="th"
        aria-hidden={locale !== "th"}
      >
        {text.th}
      </span>
      <span
        className={locale === "en" ? "portfolio-locale-stack__active" : "portfolio-locale-stack__ghost"}
        lang="en"
        aria-hidden={locale !== "en"}
      >
        {text.en}
      </span>
    </Tag>
  );
}
