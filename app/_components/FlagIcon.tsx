"use client";

import type { PortfolioLocale } from "../_lib/portfolio.ui";

type Props = {
  locale: PortfolioLocale;
  className?: string;
  title?: string;
};

/** ธงไทย / อังกฤษ แบบ SVG — แสดงเหมือนรูปธงจริง ไม่ใช้ emoji */
export function FlagIcon({ locale, className = "", title }: Props) {
  const label = title ?? (locale === "th" ? "ภาษาไทย" : "English");

  if (locale === "th") {
    return (
      <svg
        viewBox="0 0 24 16"
        className={className}
        role="img"
        aria-label={label}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{label}</title>
        <rect width="24" height="16" fill="#A51931" />
        <rect y="3" width="24" height="10" fill="#F4F5F8" />
        <rect y="5" width="24" height="6" fill="#2D2A4A" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="4" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  );
}
