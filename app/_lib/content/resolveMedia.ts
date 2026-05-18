import mediaJson from "../../../content/media.json";
import brandsJson from "../../../content/brands.json";

const FRAMER_BASE = "https://framerusercontent.com/images";

type FramerRef = { framerId: string; ext: string };
type MediaRef = FramerRef | { local: string } | { url: string };

function resolveRef(ref: MediaRef): string {
  if ("local" in ref) return ref.local;
  if ("url" in ref) return ref.url;
  return `${FRAMER_BASE}/${ref.framerId}.${ref.ext}`;
}

function mapFramerRecord<T extends string>(record: Record<T, FramerRef>): Record<T, string> {
  return Object.fromEntries(
    Object.entries(record).map(([k, v]) => [k, resolveRef(v as FramerRef)])
  ) as Record<T, string>;
}

const media = mediaJson as {
  portrait: { local: string };
  hero: { background: FramerRef; overlay: FramerRef; mark: FramerRef };
  experience: Record<string, FramerRef>;
  reelThumbs: Record<string, FramerRef>;
};

export const FRAMER_IMAGES = {
  heroBackground: resolveRef(media.hero.background),
  heroOverlay: resolveRef(media.hero.overlay),
  portrait: resolveRef(media.portrait),
  mark: resolveRef(media.hero.mark),
  experience: mapFramerRecord(media.experience),
  reelThumbs: mapFramerRecord(media.reelThumbs),
} as const;

export const FRAMER_BRAND_LOGOS: { src: string; alt: string }[] = (
  brandsJson as { logos: { src: string; alt: string }[] }
).logos;
