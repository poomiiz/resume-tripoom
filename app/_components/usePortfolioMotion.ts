"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** เอียงเล็กน้อยตามเมาส์ — เบา ไม่รบกวนมือถือ */
export function usePointerTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setStyle({
        rotateX: -y * maxDeg,
        rotateY: x * maxDeg,
      });
    },
    [maxDeg]
  );

  const onLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  const transform = `perspective(900px) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg)`;

  return { ref, transform, onMove, onLeave };
}

/** โผล่เมื่อเลื่อนเข้า viewport */
export function useRevealOnScroll(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}
