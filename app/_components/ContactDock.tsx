"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { PortfolioLocale } from "../_lib/portfolio.ui";
import { LocaleUiStack } from "./LocaleUiStack";
import { LocaleStack } from "./LocaleStack";

export const PORTFOLIO_OPEN_CONTACT_EVENT = "portfolio:open-contact";

function mailtoWithSubject(email: string, locale: PortfolioLocale): string {
  const subject =
    locale === "th" ? "สอบถามงานจาก Portfolio — Tripoom" : "Portfolio inquiry — Tripoom Singhaart";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export type PortfolioContact = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref?: string;
  line?: string;
  lineHref?: string;
};

/** การ์ดติดต่อ — ลอยมุมล่างขวา เปิด/ปิดได้ */
export function ContactDock({
  locale,
  contact,
}: {
  locale: PortfolioLocale;
  contact: PortfolioContact;
}) {
  const [open, setOpen] = useState(false);
  const phoneLabel = locale === "th" ? "โทรศัพท์" : "Phone";
  const emailLabel = locale === "th" ? "อีเมล" : "Email";
  const lineLabel = "LINE";
  const toggleLabel = open
    ? locale === "th"
      ? "ปิดช่องทางติดต่อ"
      : "Close contact"
    : locale === "th"
      ? "เปิดช่องทางติดต่อ"
      : "Open contact";

  const openDock = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("contact");
      el?.focus({ preventScroll: true });
      el?.classList.add("portfolio-contact-dock__panel--focus");
      window.setTimeout(() => el?.classList.remove("portfolio-contact-dock__panel--focus"), 1200);
    });
  }, []);

  useEffect(() => {
    const onOpen = () => openDock();
    window.addEventListener(PORTFOLIO_OPEN_CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(PORTFOLIO_OPEN_CONTACT_EVENT, onOpen);
  }, [openDock]);

  return (
    <aside
      className={`portfolio-contact-dock${open ? " portfolio-contact-dock--open" : ""}`}
      aria-label={locale === "th" ? "ติดต่อ" : "Contact"}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="contact-panel"
            id="contact"
            className="portfolio-contact-dock__panel"
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="portfolio-contact-dock__head">
              <span className="portfolio-contact-dock__head-icon" aria-hidden>
                ✉️
              </span>
              <LocaleUiStack path="sections.contact" locale={locale} as="p" className="portfolio-contact-dock__head-text !text-gray-900 dark:!text-white" />
              <button
                type="button"
                className="portfolio-contact-dock__close"
                onClick={() => setOpen(false)}
                aria-label={locale === "th" ? "ปิด" : "Close"}
              >
                ×
              </button>
            </header>

            <motion.div className="portfolio-contact-dock__links">
              <a href={contact.phoneHref} className="portfolio-contact-dock__link">
                <span className="portfolio-contact-dock__link-icon portfolio-contact-dock__link-icon--phone" aria-hidden>
                  📞
                </span>
                <span className="portfolio-contact-dock__link-body">
                  <LocaleStack
                    text={{ th: 'โทรศัพท์', en: 'Phone' }}
                    locale={locale}
                    as="span"
                    className="portfolio-contact-dock__link-label !text-gray-500 dark:!text-gray-400"
                  />
                  <span className="portfolio-contact-dock__link-value !text-gray-900 dark:!text-white">{contact.phone}</span>
                </span>
              </a>

              {contact.lineHref && contact.line ? (
                <a
                  href={contact.lineHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-contact-dock__link portfolio-contact-dock__link--line"
                >
                  <span className="portfolio-contact-dock__link-icon portfolio-contact-dock__link-icon--line" aria-hidden>
                    LINE
                  </span>
                  <span className="portfolio-contact-dock__link-body">
                    <span className="portfolio-contact-dock__link-label !text-gray-500 dark:!text-gray-400">{lineLabel}</span>
                    <span className="portfolio-contact-dock__link-value !text-gray-900 dark:!text-white">{contact.line}</span>
                  </span>
                </a>
              ) : null}

              <a
                href={mailtoWithSubject(contact.email, locale)}
                className="portfolio-contact-dock__link portfolio-contact-dock__link--email"
              >
                <span className="portfolio-contact-dock__link-icon portfolio-contact-dock__link-icon--email" aria-hidden>
                  ✉️
                </span>
                <span className="portfolio-contact-dock__link-body">
                  <LocaleStack
                    text={{ th: 'อีเมล', en: 'Email' }}
                    locale={locale}
                    as="span"
                    className="portfolio-contact-dock__link-label !text-gray-500 dark:!text-gray-400"
                  />
                  <span className="portfolio-contact-dock__link-value !text-gray-900 dark:!text-white">{contact.email}</span>
                </span>
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        className="portfolio-contact-dock__fab"
        onClick={() => (open ? setOpen(false) : openDock())}
        aria-expanded={open}
        aria-controls="contact"
        aria-label={toggleLabel}
      >
        <span className="portfolio-contact-dock__fab-icon" aria-hidden>
          {open ? "×" : "✉️"}
        </span>
        {!open ? (
          <LocaleUiStack path="sections.contact" locale={locale} as="span" className="portfolio-contact-dock__fab-label" />
        ) : null}
      </button>
    </aside>
  );
}
