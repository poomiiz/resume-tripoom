/**
 * One-time helper: export current TS content → content/*.json
 * Run: node scripts/migrate-content-json.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentDir = path.join(root, "content");
const require = createRequire(import.meta.url);

// Register ts-node for .ts imports
const { register } = await import("ts-node");
register({ transpileOnly: true, compilerOptions: { module: "commonjs", moduleResolution: "node" } });

const { PROFILE, JOBS, JOB_IMAGE_KEYS, TIMELINE, SKILL_SECTIONS_V2 } = require("../app/_lib/portfolio.data.ts");
const { UI } = require("../app/_lib/portfolio.ui.ts");
const { FRAMER_IMAGES, FRAMER_BRAND_LOGOS } = require("../app/_lib/framerAssets.ts");
const { CAREER_ARC_STEPS } = require("../app/_lib/careerArc.data.ts");
const { TECH_PROFILE, TECH_SKILL_GROUPS, TECH_EXPERIENCE } = require("../app/_lib/techResume.data.ts");
const { WORK_TOOLS } = require("../app/_lib/workTools.data.ts");

fs.mkdirSync(contentDir, { recursive: true });

const write = (name, data) => {
  const p = path.join(contentDir, name);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("wrote", name);
};

write("profile.json", PROFILE);
write("ui.json", { th: UI.th, en: UI.en });
write("jobs.json", { jobImageKeys: JOB_IMAGE_KEYS, jobs: JOBS });
write(
  "timeline.json",
  TIMELINE.map((entry) => {
    if ("kind" in entry && entry.kind === "featured") {
      return {
        kind: "featured",
        id: entry.id,
        jobKey: entry.jobKey ?? null,
        showreel: {
          url: entry.showreel.youtube,
          thumbKey: entry.showreel.thumbKey,
          label: entry.showreel.label,
        },
      };
    }
    return {
      year: entry.year,
      jobKey: entry.jobKey,
      showreel: {
        url: entry.showreel.youtube,
        thumbKey: entry.showreel.thumbKey,
        label: entry.showreel.label ?? null,
      },
    };
  })
);
write("skills.json", SKILL_SECTIONS_V2);
write("brands.json", { logos: FRAMER_BRAND_LOGOS });
write("career-arc.json", { steps: CAREER_ARC_STEPS });
write("tech.json", {
  profile: TECH_PROFILE,
  skillGroups: TECH_SKILL_GROUPS,
  experiences: TECH_EXPERIENCE,
});
write("work-tools.json", { tools: WORK_TOOLS });

const framerId = (url) => {
  const m = url.match(/framerusercontent\.com\/images\/([^./]+)\.(\w+)/);
  return m ? { framerId: m[1], ext: m[2] } : { url };
};

const media = {
  portrait: { local: FRAMER_IMAGES.portrait },
  hero: {
    background: framerId(FRAMER_IMAGES.heroBackground),
    overlay: framerId(FRAMER_IMAGES.heroOverlay),
    mark: framerId(FRAMER_IMAGES.mark),
  },
  experience: Object.fromEntries(
    Object.entries(FRAMER_IMAGES.experience).map(([k, v]) => [k, framerId(v)])
  ),
  reelThumbs: Object.fromEntries(
    Object.entries(FRAMER_IMAGES.reelThumbs).map(([k, v]) => [k, framerId(v)])
  ),
};

write("media.json", media);
console.log("done");
