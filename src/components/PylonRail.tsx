"use client";

import { useEffect, useRef, useState } from "react";

// Hand-drawn transmission pylons running down the left margin, connected by
// a sagging catenary wire. The wire + pylons "unroll" as the user scrolls
// down and "roll back up" as they scroll up — directly tied to scroll
// position (no persistence). A small draw-head dot rides the leading edge
// of the wire so the motion is clearly visible.

const STROKE = "#111111";
const ACCENT = "#111111";
const PYLON_CX = 64;
const INTERVAL = 540;
const START_Y = 560; // first pylon sits below the first fold so it draws in
const PYLON_H = 86;
const PYLON_W = 40;

function pylonSegments(cx: number, baseY: number) {
  const topY = baseY - PYLON_H;
  const halfB = PYLON_W / 2;
  const halfT = PYLON_W * 0.16;
  const legX = (side: -1 | 1, t: number) =>
    cx + side * (halfB + (halfT - halfB) * t);
  const yAt = (t: number) => baseY - PYLON_H * t;

  const segs: string[] = [];
  segs.push(`M ${legX(-1, 0)} ${baseY} L ${legX(-1, 1)} ${topY}`);
  segs.push(`M ${legX(1, 0)} ${baseY} L ${legX(1, 1)} ${topY}`);
  const levels = [0, 0.33, 0.62, 0.85];
  for (const t of levels) {
    segs.push(`M ${legX(-1, t)} ${yAt(t)} L ${legX(1, t)} ${yAt(t)}`);
  }
  for (let i = 0; i < levels.length - 1; i++) {
    const t0 = levels[i];
    const t1 = levels[i + 1];
    segs.push(`M ${legX(-1, t0)} ${yAt(t0)} L ${legX(1, t1)} ${yAt(t1)}`);
    segs.push(`M ${legX(1, t0)} ${yAt(t0)} L ${legX(-1, t1)} ${yAt(t1)}`);
  }
  const arm1Y = topY + 12;
  const arm2Y = topY + 24;
  segs.push(`M ${cx - PYLON_W * 0.78} ${arm1Y} L ${cx + PYLON_W * 0.78} ${arm1Y}`);
  segs.push(`M ${cx - PYLON_W * 0.62} ${arm2Y} L ${cx + PYLON_W * 0.62} ${arm2Y}`);
  segs.push(`M ${cx - PYLON_W * 0.78} ${arm1Y} L ${cx - PYLON_W * 0.78} ${arm1Y + 5}`);
  segs.push(`M ${cx + PYLON_W * 0.78} ${arm1Y} L ${cx + PYLON_W * 0.78} ${arm1Y + 5}`);
  segs.push(`M ${legX(-1, 1)} ${topY} L ${cx} ${topY - 8} L ${legX(1, 1)} ${topY}`);

  return { segs, topRightTip: { x: cx + PYLON_W * 0.78, y: arm1Y } };
}

export default function PylonRail() {
  const [docHeight, setDocHeight] = useState(0);
  const [revealY, setRevealY] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const wireRef = useRef<SVGPathElement | null>(null);
  const headRef = useRef<SVGCircleElement | null>(null);

  // Measure document + viewport gating
  useEffect(() => {
    const measure = () => {
      setEnabled(window.innerWidth >= 1120);
      setDocHeight(document.documentElement.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // rAF scroll tracker — robust against body-as-scroller. Reveal tracks
  // scroll directly (both directions), no high-water-mark.
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const loop = () => {
      const s =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (s !== last) {
        last = s;
        // Reveal line tracks the middle of the viewport so pylons draw in
        // as they are scrolled to — including the very first ones — and
        // roll back up when scrolled away.
        setRevealY(s + window.innerHeight * 0.5);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pylon base positions
  const pylons: number[] = [];
  for (let y = START_Y; y < docHeight - 80; y += INTERVAL) pylons.push(y);

  const built = pylons.map((y) => pylonSegments(PYLON_CX, y));
  let wireD = "";
  for (let i = 0; i < built.length - 1; i++) {
    const a = built[i].topRightTip;
    const b = built[i + 1].topRightTip;
    const sag = 46;
    const c1x = a.x + sag;
    const c2x = b.x + sag;
    const midY = (a.y + b.y) / 2;
    if (i === 0) wireD += `M ${a.x} ${a.y} `;
    wireD += `C ${c1x} ${a.y + (midY - a.y) * 0.5}, ${c2x} ${b.y - (b.y - midY) * 0.5}, ${b.x} ${b.y} `;
  }

  // Drive wire draw + head dot from reveal progress (recomputed each scroll)
  useEffect(() => {
    const path = wireRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (!len) return;
    // Map reveal progress across the span of pylons so the wire stays at 0
    // until the reveal line reaches the first pylon, then draws down to the
    // last — keeping pylon reveals and wire draw in sync.
    const firstY = pylons.length ? pylons[0] - PYLON_H : 0;
    const lastY = pylons.length ? pylons[pylons.length - 1] : docHeight;
    const span = Math.max(1, lastY - firstY);
    const frac = Math.max(0, Math.min(1, (revealY - firstY) / span));
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len * (1 - frac)}`;
    const head = headRef.current;
    if (head) {
      if (frac > 0.002 && frac < 0.999) {
        const pt = path.getPointAtLength(len * frac);
        head.setAttribute("cx", pt.x.toFixed(1));
        head.setAttribute("cy", pt.y.toFixed(1));
        head.style.opacity = "1";
      } else {
        head.style.opacity = "0";
      }
    }
  }, [revealY, docHeight, pylons.length]);

  if (!enabled || docHeight === 0) return null;

  return (
    <svg
      aria-hidden="true"
      width="150"
      height={docHeight}
      viewBox={`0 0 150 ${docHeight}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 150,
        height: docHeight,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "visible",
      }}
    >
      {/* Sagging wire connecting the pylons */}
      <path
        ref={wireRef}
        d={wireD}
        fill="none"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.6}
      />
      {/* Draw-head dot riding the wire's leading edge */}
      <circle
        ref={headRef}
        r={3}
        fill={ACCENT}
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
      />

      {/* Pylons — fade + lift as the reveal line passes; reverse on scroll up.
          The first pylon is always shown so the rail is anchored at the top of
          the page; the rest reveal/hide with scroll as usual. */}
      {built.map((p, i) => {
        const baseY = pylons[i];
        const shown = i === 0 || revealY > baseY - 30;
        return (
          <g
            key={`pylon-${i}`}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transformBox: "fill-box",
              transformOrigin: "center",
              transition:
                "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {p.segs.map((d, j) => (
              <path
                key={j}
                d={d}
                fill="none"
                stroke={STROKE}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
