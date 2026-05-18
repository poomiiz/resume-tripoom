import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../app/_components/UnifiedTimeline.tsx",
);
let s = fs.readFileSync(file, "utf8");

const anchor = '{displayMode === "tech" && phase.techProjects.length > 0 && (';
const start = s.indexOf(anchor);
if (start < 0) throw new Error("tech block start not found");

const creativeAnchor =
  '{displayMode === "creative" && phase.motionGroups.length > 0 && (';
const end = s.indexOf(creativeAnchor, start);
if (end < 0) throw new Error("creative block not found");

const rep = `                {displayMode === "tech" && phase.techProjects.length > 0 && (
                  <div className={trackClass}>
                    {groupTechByYear(phase.techProjects).map(([year, projs]) => (
                      <div key={year} className="portfolio-tech-year-block">
                        <motion.div className="portfolio-tech-year-label">
                          <span className="portfolio-tech-year-label__year">{year}</span>
                          <span className="portfolio-tech-year-label__meta">
                            {locale === "th" ? "โปรเจกต์เทค" : "Tech projects"}
                          </span>
                        </motion.div>
                        <article className="portfolio-panel portfolio-tech-year-panel text-left">
                          {projs.map((p) => (
                            <TechTaskItem key={p.id} entry={p} locale={locale} />
                          ))}
                        </article>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                `;

// Fix motion typos in rep - all div
const repClean = rep.replace(/motion\.div/g, "motion.div".replace("motion.div", "div"));
// that's still wrong

const repFinal = `                {displayMode === "tech" && phase.techProjects.length > 0 && (
                  <div className={trackClass}>
                    {groupTechByYear(phase.techProjects).map(([year, projs]) => (
                      <div key={year} className="portfolio-tech-year-block">
                        <div className="portfolio-tech-year-label">
                          <span className="portfolio-tech-year-label__year">{year}</span>
                          <span className="portfolio-tech-year-label__meta">
                            {locale === "th" ? "โปรเจกต์เทค" : "Tech projects"}
                          </span>
                        </div>
                        <article className="portfolio-panel portfolio-tech-year-panel text-left">
                          {projs.map((p) => (
                            <TechTaskItem key={p.id} entry={p} locale={locale} />
                          ))}
                        </article>
                      </div>
                    ))}
                  </div>
                )}

                `;

s = s.slice(0, start) + repFinal + s.slice(end);

s = s.replace(
  /(\{displayMode === "creative" && phase\.motionGroups\.length > 0 && \(\s*)<motion.div className="portfolio-journey-track">/,
  "$1<div className={trackClass}>",
);
s = s.replace(
  /(\{displayMode === "creative" && phase\.motionGroups\.length > 0 && \(\s*)<div className="portfolio-journey-track">/,
  "$1<div className={trackClass}>",
);

s = s.replace(
  '<article className="tech-task-item portfolio-tech-task py-6 md:py-7 border-b',
  '<article className="tech-task-item portfolio-tech-task py-4 md:py-5 border-b',
);
s = s.replace("mt-6 flex flex-wrap", "mt-4 flex flex-wrap");
s = s.replace("mt-10 space-y-5", "mt-6 space-y-4");

fs.writeFileSync(file, s);
console.log("patched OK");
