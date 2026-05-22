"use client";

import { useEffect, useRef, useState } from "react";

// Animated USP illustrations. Each replays its motion every time it scrolls
// into view: an IntersectionObserver bumps a key that remounts the animated
// element, restarting its CSS animation (reliable across browsers — unlike
// SMIL begin/beginElement which was firing inconsistently).

function useReplay() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setK((x) => x + 1);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, k };
}

const STROKE = "#111111";
const ACCENT = "#111111";
const svgProps = {
  viewBox: "0 0 100 100",
  width: 84,
  height: 84,
  fill: "none" as const,
  stroke: STROKE,
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// 02 — Onboarding: a figure climbs the staircase from bottom to top.
export function OnboardingGlyph() {
  const { ref, k } = useReplay();
  return (
    <svg ref={ref} {...svgProps}>
      <path d="M 18 82 L 18 64 L 38 64 L 38 47 L 58 47 L 58 32 L 80 32 L 80 82 Z" />
      <line x1="90" y1="58" x2="90" y2="28" />
      <line x1="85" y1="35" x2="90" y2="28" />
      <line x1="95" y1="35" x2="90" y2="28" />
      <g key={k} className="ga-glyph-climb">
        <circle cx="0" cy="0" r="4" />
        <line x1="0" y1="4" x2="0" y2="15" />
        <line x1="0" y1="15" x2="-4" y2="23" />
        <line x1="0" y1="15" x2="4" y2="23" />
      </g>
    </svg>
  );
}

// 03 — Capacity: gauge needle sweeps clockwise from 0 up to 95%.
export function GaugeGlyph() {
  const { ref, k } = useReplay();
  return (
    <svg ref={ref} {...svgProps}>
      <path d="M 12 68 A 38 38 0 0 1 88 68" />
      <line x1="12" y1="68" x2="16" y2="65" />
      <line x1="50" y1="30" x2="50" y2="35" />
      <line x1="80" y1="42" x2="77" y2="46" />
      <circle cx="50" cy="68" r="3" fill={STROKE} stroke="none" />
      <text x="8" y="80" fontSize="8" fill={STROKE} fillOpacity="0.5" stroke="none">0</text>
      <text x="69" y="80" fontSize="8" fill={STROKE} fillOpacity="0.5" stroke="none">95%</text>
      <line
        key={k}
        className="ga-glyph-needle"
        x1="50"
        y1="68"
        x2="76"
        y2="40"
        strokeWidth="1.6"
      />
    </svg>
  );
}

// 04 — Voice agents: a live voice waveform (equalizer) with sound waves
// reaching out to either side. Bars and waves loop continuously while in view.
const EQ_BARS = [
  { x: 34, h: 11 },
  { x: 40, h: 20 },
  { x: 46, h: 30 },
  { x: 52, h: 16 },
  { x: 58, h: 24 },
  { x: 64, h: 12 },
];
export function VoiceGlyph() {
  const { ref } = useReplay();
  return (
    <svg ref={ref} {...svgProps}>
      {/* Sound waves reaching out — left (from agent) */}
      <path className="ga-wave" style={{ animationDelay: "0s" }} d="M 22 42 Q 28 50 22 58" />
      <path className="ga-wave" style={{ animationDelay: "0.35s" }} d="M 15 37 Q 25 50 15 63" />
      {/* Equalizer bars — the live voice */}
      {EQ_BARS.map((b, i) => (
        <rect
          key={i}
          className="ga-eq-bar"
          x={b.x - 1.6}
          y={50 - b.h / 2}
          width="3.2"
          height={b.h}
          rx="1.6"
          fill={i === 2 || i === 4 ? ACCENT : STROKE}
          stroke="none"
          style={{ animationDelay: `${i * 0.13}s` }}
        />
      ))}
      {/* Sound waves reaching out — right (to developer) */}
      <path className="ga-wave" style={{ animationDelay: "0.18s" }} d="M 76 42 Q 70 50 76 58" />
      <path className="ga-wave" style={{ animationDelay: "0.5s" }} d="M 83 37 Q 73 50 83 63" />
    </svg>
  );
}

// 05 — The queue, cleared: a stacked backlog of applications drains out one
// by one, leaving a green check (the queue cleared).
const QUEUE_BARS = [0, 1, 2, 3, 4];
export function QueueGlyph() {
  const { ref, k } = useReplay();
  return (
    <svg ref={ref} {...svgProps}>
      {/* Queue baseline / tray */}
      <line x1="14" y1="84" x2="72" y2="84" />
      <line x1="14" y1="84" x2="14" y2="79" />
      <line x1="72" y1="84" x2="72" y2="79" />
      {/* Backlog bars draining out (top first) — the queue clears */}
      {QUEUE_BARS.map((i) => (
        <rect
          key={`${k}-${i}`}
          className="ga-queue-bar"
          x="16"
          y={16 + i * 12}
          width="44"
          height="8"
          rx="2"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </svg>
  );
}
