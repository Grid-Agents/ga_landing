"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HowItWorksAnimation = dynamic(
  () => import("@/components/HowItWorksAnimation"),
  { ssr: false }
);

export default function HowItWorksAnimationLoader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [playKey, setPlayKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  // Armed = the section has been scrolled out of view past its bottom edge
  // (user scrolled UP beyond it), so the next time it enters view it should
  // restart from the beginning.
  const armed = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          if (armed.current) {
            setPlayKey((k) => k + 1); // (re)start the animation
            armed.current = false;
          }
        } else if (entry.boundingClientRect.top > 0) {
          // Section is now below the viewport → user scrolled up beyond it.
          // Arm a restart and unmount so it begins fresh on re-entry.
          armed.current = true;
          setMounted(false);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "350px" }}>
      {mounted && <HowItWorksAnimation key={playKey} />}
    </div>
  );
}
