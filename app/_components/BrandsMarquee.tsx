"use client";

import Image from "next/image";
import { useState } from "react";

interface BrandLogo {
  src: string;
  alt: string;
}

function BrandCell({ logo, dupeIdx }: { logo: BrandLogo; dupeIdx: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      aria-hidden={dupeIdx >= 1}
      className="portfolio-brand-cell portfolio-panel group relative flex flex-shrink-0 items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ width: 84, height: 68, borderRadius: 14 }}
    >
      {/* accent line on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--pf-accent)]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />
      {!failed && (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={58}
          height={46}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="max-h-[80%] max-w-[80%] object-contain opacity-80 transition-opacity group-hover:opacity-100"
        />
      )}
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
}: {
  logos: BrandLogo[];
  direction: "ltr" | "rtl";
}) {
  const cls =
    direction === "ltr"
      ? "portfolio-brands-row--ltr"
      : "portfolio-brands-row--rtl";

  return (
    /* outer: clips overflow; width 100% so fade mask applies end-to-end */
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-3 will-change-transform ${cls}`}
        style={{ width: "max-content" }}
      >
        {/* duplicate for seamless infinite loop */}
        {[...logos, ...logos].map((logo, i) => (
          <BrandCell key={`${logo.src}-${i}`} logo={logo} dupeIdx={Math.floor(i / logos.length)} />
        ))}
      </div>
    </div>
  );
}

export function BrandsMarquee({ logos }: { logos: BrandLogo[] }) {
  const mid = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, mid);   // ~23 logos  →  scrolls left
  const row2 = logos.slice(mid);      // ~23 logos  →  scrolls right

  return (
    <div
      className="portfolio-brands-strip relative space-y-3 overflow-hidden"
      style={{
        /* fade out edges so the marquee feels infinite */
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <MarqueeRow logos={row1} direction="ltr" />
      <MarqueeRow logos={row2} direction="rtl" />
    </div>
  );
}
