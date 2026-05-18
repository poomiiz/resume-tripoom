import type { LocalizedText } from "./content/types";
import { UI } from "./content";

export type PortfolioLocale = "th" | "en";

export const LOCALE_EMOJI: Record<PortfolioLocale, string> = {
  th: "🇹🇭",
  en: "🇬🇧",
};

export { UI };

export function pickLocale<T extends LocalizedText>(locale: PortfolioLocale, text: T): string {
  return text[locale];
}
