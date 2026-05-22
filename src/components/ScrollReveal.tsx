"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  offsetY?: number;
  as?: "div" | "li" | "section" | "article";
}

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  style,
  offsetY = 24,
  as = "div",
}: ScrollRevealProps) {
  const ref = useReveal();
  const baseStyle: CSSProperties = {
    opacity: 0,
    transform: `translateY(${offsetY}px)`,
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    willChange: "opacity, transform",
    ...style,
  };

  if (as === "li") {
    return (
      <li ref={ref as React.RefObject<HTMLLIElement>} className={className} style={baseStyle}>
        {children}
      </li>
    );
  }
  if (as === "section") {
    return (
      <section ref={ref as React.RefObject<HTMLElement>} className={className} style={baseStyle}>
        {children}
      </section>
    );
  }
  if (as === "article") {
    return (
      <article ref={ref as React.RefObject<HTMLElement>} className={className} style={baseStyle}>
        {children}
      </article>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={baseStyle}>
      {children}
    </div>
  );
}
