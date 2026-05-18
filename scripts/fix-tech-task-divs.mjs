import fs from "fs";

const p = new URL("../app/_components/UnifiedTimeline.tsx", import.meta.url);
let s = fs.readFileSync(p, "utf8");

const start = s.indexOf("function TechTaskItem");
const end = s.indexOf("export function UnifiedTimeline", start);
if (start < 0 || end < 0) throw new Error("TechTaskItem block not found");

const block = `function TechTaskItem({ entry, locale }: { entry: TechExperience; locale: PortfolioLocale }) {
  return (
    <article className="tech-task-item portfolio-tech-task py-4 md:py-5 border-0 text-left">
      <div className="text-left">
        <LocaleStack
          text={entry.project}
          locale={locale}
          as="h3"
          className="portfolio-job-card__company text-black dark:text-white text-left"
        />
        <LocaleStack text={entry.role} locale={locale} as="p" className="portfolio-job-card__title text-left" />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 items-center text-left">
        <p className="portfolio-label text-black/45 dark:text-white/45 text-left">{techUi(locale, "stack")}</p>
        <LocaleStack text={entry.stack} locale={locale} as="p" className="portfolio-text-subtitle text-left" />
      </div>

      <ul className="mt-6 space-y-4 text-left">
        {entry.outcomes.map((o, i) => (
          <li key={i} className="portfolio-highlight-item flex gap-5 text-left">
            <span className="text-[color:var(--pf-accent)] mt-2.5 h-1.5 w-1.5 rounded-full shrink-0" />
            <LocaleStack text={o} locale={locale} className="portfolio-text-body flex-1" />
          </li>
        ))}
      </ul>
    </article>
  );
}

`;

s = s.slice(0, start) + block + s.slice(end);
fs.writeFileSync(p, s);
console.log("fixed TechTaskItem");
