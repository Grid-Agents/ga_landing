"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  Building2,
  Cable,
  RadioTower,
  Bot,
  User,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────────────────
// Layout
// ────────────────────────────────────────────────────────────────────────────
const SVG_W = 740;
const SVG_H = 360;

const DEV = { x: 100, y: 150 };
const DNO = { x: 420, y: 150 };

const STROKE = "#1a1a18";
const ACCENT = "#2d3f2e";
const PAPER = "#f7efdf";

// ────────────────────────────────────────────────────────────────────────────
// Timing (seconds from mount)
// ────────────────────────────────────────────────────────────────────────────
// Beat timings — compressed ~13% from the original cadence for a slightly
// faster overall play, keeping the same relative pacing.
const T = {
  beat1: 0.5,   // grid forms
  beat2: 2.7,   // dev submits docs
  beat3: 4.4,   // agents review
  beat4: 6.6,   // engineering studies
  beat5: 9.2,   // operator + ontology
  beat6: 11.8,  // decision returns
  beat7: 13.1,  // project built
  loop: 14.9,   // power flows infinitely
  payoff: 16.5, // payoff text
};

const EASE = "cubic-bezier(0.65,0,0.35,1)";
const EASE_OUT = "cubic-bezier(0.16,1,0.3,1)";
const EASE_SPRING = "cubic-bezier(0.175,0.885,0.32,1.275)";

// ────────────────────────────────────────────────────────────────────────────
// New network layout — replaces the rigid 4×3 grid with a cohesive
// "transmission network" comprised of:
//   - a sparse constellation field as the background
//   - a single graceful curve connecting DEV→DNO (the main connection)
//   - a small set of pylons at organic positions, each linked to the main
//     curve via a thin vertical branch
//   - HUD corner brackets that frame the canvas
// ────────────────────────────────────────────────────────────────────────────

// Background constellation dots — fixed positions, intentionally avoiding
// the central band (y=140-220) so the diagram has room to breathe.
const BG_DOTS = [
  { x: 36, y: 28 }, { x: 116, y: 18 }, { x: 188, y: 32 }, { x: 268, y: 22 },
  { x: 348, y: 16 }, { x: 432, y: 28 }, { x: 514, y: 18 }, { x: 600, y: 32 },
  { x: 678, y: 22 },
  { x: 24, y: 100 }, { x: 70, y: 130 }, { x: 158, y: 110 },
  { x: 712, y: 112 }, { x: 668, y: 142 }, { x: 582, y: 124 },
  { x: 24, y: 250 }, { x: 70, y: 226 }, { x: 158, y: 248 },
  { x: 712, y: 244 }, { x: 668, y: 222 }, { x: 582, y: 240 },
  { x: 36, y: 332 }, { x: 116, y: 342 }, { x: 188, y: 330 }, { x: 268, y: 342 },
  { x: 348, y: 336 }, { x: 432, y: 344 }, { x: 514, y: 332 }, { x: 600, y: 344 },
  { x: 678, y: 336 },
];

// Pylons at organic, non-grid positions, with slight vertical variation
// to create a wave-like skyline. Each pylon has a curved sagging branch
// down to the main DEV-DNO connection line, evoking cable suspension.
const PYLONS = [
  { x: 188, y: 78 },
  { x: 296, y: 52 },
  { x: 550, y: 70 },
  { x: 232, y: 296 },
  { x: 550, y: 286 }, // shares x with the upper-right pylon so their risers
  //                     and branch-anchor dots align (no doubled dot)
];

// Main DEV→DNO connection — deeper catenary sag so the connection reads
// like a real transmission cable. Both cubic control points pulled down
// to y=DEV.y+30, producing a smooth ~30px sag through the middle.
// Straight horizontal bus line from DEV to DNO.
const MAIN_PATH = `M ${DEV.x} ${DEV.y} L ${DNO.x} ${DNO.y}`;
const MAIN_PATH_LEN = DNO.x - DEV.x;

// Branches: each pylon drops straight down (or up) to the main line at its
// own x — clean vertical risers rather than draped curves.
const BRANCHES = PYLONS.map((p) => {
  const isUpper = p.y < DEV.y;
  const endY = isUpper ? p.y + 14 : p.y - 14;
  const attachY = DEV.y; // straight main line sits at DEV.y
  const len = Math.abs(attachY - endY);
  return {
    d: `M ${p.x} ${attachY} L ${p.x} ${endY}`,
    len,
    key: `branch-${p.x}-${p.y}`,
    attachY,
  };
});

// HUD corner brackets — thin charcoal `┌ ┐ └ ┘` marks at 14px from each
// corner, giving the canvas a "viewport / instrument readout" feel.
const BRK_INSET = 8;
const BRK_LEN = 18;
const BRACKETS = [
  { d: `M ${BRK_INSET + BRK_LEN} ${BRK_INSET} L ${BRK_INSET} ${BRK_INSET} L ${BRK_INSET} ${BRK_INSET + BRK_LEN}` },
  { d: `M ${SVG_W - BRK_INSET - BRK_LEN} ${BRK_INSET} L ${SVG_W - BRK_INSET} ${BRK_INSET} L ${SVG_W - BRK_INSET} ${BRK_INSET + BRK_LEN}` },
  { d: `M ${BRK_INSET} ${SVG_H - BRK_INSET - BRK_LEN} L ${BRK_INSET} ${SVG_H - BRK_INSET} L ${BRK_INSET + BRK_LEN} ${SVG_H - BRK_INSET}` },
  { d: `M ${SVG_W - BRK_INSET - BRK_LEN} ${SVG_H - BRK_INSET} L ${SVG_W - BRK_INSET} ${SVG_H - BRK_INSET} L ${SVG_W - BRK_INSET} ${SVG_H - BRK_INSET - BRK_LEN}` },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────
const pct = (x: number, y: number) => ({
  left: `${((x / SVG_W) * 100).toFixed(3)}%`,
  top: `${((y / SVG_H) * 100).toFixed(3)}%`,
});

// HTML overlay positioned over SVG via percentage left/top
interface OverlayProps {
  x: number;
  y: number;
  offsetX?: number;
  offsetY?: number;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

function Overlay({ x, y, offsetX = 0, offsetY = 0, style, className = "icon-overlay", children }: OverlayProps) {
  const { left, top } = pct(x, y);
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left,
        top,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        lineHeight: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-component: engineering studies readout panel (beat 4)
// ────────────────────────────────────────────────────────────────────────────
function ReadoutPanel() {
  const X = 470;  // panel left — pushed right so DNO area is clearer
  const Y = 38;   // panel top — lifted a touch
  const W = 254;
  const H = 250;
  const RIGHT = X + W;
  const PADX = 14;

  // Mini-topology nodes (3 cols × 2 rows) inside panel — centered horizontally
  const mtSX = 56;
  const mtSY = 28;
  const mtX0 = X + (W - mtSX * 2) / 2;
  const mtY0 = Y + 42;
  const mtNodes: { x: number; y: number }[] = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      mtNodes.push({ x: mtX0 + c * mtSX, y: mtY0 + r * mtSY });
    }
  }
  // Edges: connect col c → c+1 in each row, and col c row 0 → col c row 1
  const mtEdges: { d: string; key: string; len: number }[] = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const a = mtNodes[r * 3 + c];
      const b = mtNodes[r * 3 + c + 1];
      mtEdges.push({ d: `M ${a.x} ${a.y} L ${b.x} ${b.y}`, key: `e-h-${r}-${c}`, len: mtSX });
    }
  }
  for (let c = 0; c < 3; c++) {
    const a = mtNodes[c];
    const b = mtNodes[3 + c];
    mtEdges.push({ d: `M ${a.x} ${a.y} L ${b.x} ${b.y}`, key: `e-v-${c}`, len: mtSY });
  }

  // Readout rows
  const rowY0 = Y + 122;
  const rowGap = 22;
  const rowX = X + PADX;

  return (
    <g
      style={{
        opacity: 0,
        animation:
          `ga-slide-in-right 0.9s ${EASE_OUT} ${T.beat4}s forwards, ` +
          `ga-slide-out-right 0.7s ${EASE} ${T.beat5 + 0.3}s forwards`,
      }}
    >
      {/* Card */}
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        rx={3}
        fill={PAPER}
        stroke={STROKE}
        strokeWidth={0.6}
        strokeOpacity={0.85}
      />
      {/* Title */}
      <text
        x={X + PADX}
        y={Y + 22}
        fontSize="8.5"
        letterSpacing="0.14em"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fill={STROKE}
      >
        POWER FLOW STUDY
      </text>
      <text
        x={RIGHT - PADX}
        y={Y + 22}
        fontSize="6.5"
        letterSpacing="0.1em"
        textAnchor="end"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fill={ACCENT}
        opacity={0.85}
      >
        DIgSILENT POWERFACTORY
      </text>
      <line
        x1={X + PADX}
        y1={Y + 28}
        x2={RIGHT - PADX}
        y2={Y + 28}
        stroke={STROKE}
        strokeWidth={0.4}
        opacity={0.5}
      />

      {/* Mini-topology — edges */}
      {mtEdges.map((e, i) => (
        <path
          key={e.key}
          d={e.d}
          stroke={STROKE}
          strokeWidth={0.6}
          fill="none"
          style={{
            strokeDasharray: e.len,
            strokeDashoffset: e.len,
            animation: `ga-draw 0.6s ${EASE} ${T.beat4 + 0.6 + i * 0.06}s forwards`,
          }}
        />
      ))}
      {/* Mini-topology — moving dots (flow arrows) */}
      {mtEdges.slice(0, 4).map((e, i) => (
        <circle
          key={`flow-${e.key}`}
          r={1.3}
          fill={ACCENT}
          opacity={0}
          style={{
            animation: `ga-fade-in 0.4s ease ${T.beat4 + 1.1 + i * 0.08}s forwards`,
          }}
        >
          <animateMotion
            path={e.d}
            begin={`${T.beat4 + 1.1 + i * 0.08}s`}
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      ))}
      {/* Mini-topology — nodes */}
      {mtNodes.map((n, i) => (
        <circle
          key={`mt-n-${i}`}
          cx={n.x}
          cy={n.y}
          r={2}
          fill={STROKE}
          opacity={0}
          style={{
            animation: `ga-fade-in 0.3s ease ${T.beat4 + 0.55 + i * 0.05}s forwards`,
          }}
        />
      ))}

      {/* Divider above readout rows */}
      <line
        x1={X + PADX}
        y1={Y + 110}
        x2={RIGHT - PADX}
        y2={Y + 110}
        stroke={STROKE}
        strokeWidth={0.3}
        opacity={0.4}
      />

      {/* Readout rows */}
      {[
        { label: "Load", value: "2.4 → 4.1 MW", delay: 1.4 },
        { label: "Fault level", value: "12.5 kA", delay: 1.7 },
        { label: "Voltage step", value: "+1.8%", delay: 2.0 },
      ].map((r, i) => (
        <g
          key={`row-${i}`}
          opacity={0}
          style={{
            animation: `ga-rise 0.5s ${EASE_OUT} ${T.beat4 + r.delay}s forwards`,
          }}
        >
          <text
            x={rowX}
            y={rowY0 + i * rowGap}
            fontSize="9"
            fontFamily="var(--font-sans), system-ui, sans-serif"
            fill={STROKE}
            opacity={0.7}
          >
            {r.label}
          </text>
          <text
            x={RIGHT - PADX}
            y={rowY0 + i * rowGap}
            textAnchor="end"
            fontSize="9"
            fontFamily="var(--font-serif), Georgia, serif"
            fill={STROKE}
          >
            {r.value}
          </text>
        </g>
      ))}

      {/* Thermal capacity bar */}
      <g
        opacity={0}
        style={{
          animation: `ga-rise 0.5s ${EASE_OUT} ${T.beat4 + 2.3}s forwards`,
        }}
      >
        <text
          x={rowX}
          y={rowY0 + 3 * rowGap}
          fontSize="9"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fill={STROKE}
          opacity={0.7}
        >
          Thermal capacity
        </text>
        <rect
          x={rowX + 96}
          y={rowY0 + 3 * rowGap - 7}
          width={108}
          height={5}
          rx={0.5}
          fill="none"
          stroke={STROKE}
          strokeWidth={0.4}
        />
        <rect
          x={rowX + 96}
          y={rowY0 + 3 * rowGap - 7}
          width={108}
          height={5}
          rx={0.5}
          fill={ACCENT}
          opacity={0.85}
          style={{
            transformOrigin: `${rowX + 96}px ${rowY0 + 3 * rowGap - 7}px`,
            transform: "scaleX(0)",
            animation: `ga-bar-fill 0.9s ${EASE_OUT} ${T.beat4 + 2.4}s forwards`,
          }}
        />
        <text
          x={RIGHT - PADX}
          y={rowY0 + 3 * rowGap}
          textAnchor="end"
          fontSize="9"
          fontFamily="var(--font-serif), Georgia, serif"
          fill={STROKE}
        >
          89%
        </text>
      </g>

      {/* Within envelope settle — the analysis-complete moment */}
      <g
        opacity={0}
        style={{
          animation: `ga-rise 0.5s ${EASE_SPRING} ${T.beat4 + 2.8}s forwards`,
        }}
      >
        <line
          x1={X + PADX}
          y1={Y + H - 28}
          x2={RIGHT - PADX}
          y2={Y + H - 28}
          stroke={STROKE}
          strokeWidth={0.3}
          opacity={0.3}
        />
        {/* Tick — pulses once on settle */}
        <g
          style={{
            transformOrigin: `${X + PADX + 6}px ${Y + H - 14}px`,
            animation: `ga-pulse-once 0.6s ${EASE_SPRING} ${T.beat4 + 3.1}s forwards`,
          }}
        >
          <polyline
            points={`${X + PADX + 1},${Y + H - 14} ${X + PADX + 5},${Y + H - 10} ${X + PADX + 12},${Y + H - 18}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x={X + PADX + 20}
          y={Y + H - 11}
          fontSize="9"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fill={STROKE}
          letterSpacing="0.12em"
        >
          WITHIN ENVELOPE
        </text>
      </g>
    </g>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-component: operator + AI ontology constellation (beat 5)
// ────────────────────────────────────────────────────────────────────────────
function OperatorAndOntology() {
  // Ontology constellation sits in the clear lower-centre band — below the
  // main line (y=150) and between the two lower-pylon risers (x=232, x=552),
  // so it never overlaps the line, pylons or operator.
  const cx = 300;
  const cy = 236;
  const ontoNodes = [
    { x: cx - 32, y: cy - 23 },
    { x: cx - 8, y: cy - 37 },
    { x: cx + 17, y: cy - 30 },
    { x: cx + 36, y: cy - 6 },
    { x: cx + 25, y: cy + 18 },
    { x: cx + 1, y: cy + 27 },
    { x: cx - 22, y: cy + 15 },
    { x: cx - 36, y: cy - 3 },
  ];
  const ontoEdges: { from: number; to: number }[] = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
    { from: 7, to: 0 },
    { from: 0, to: 3 },
    { from: 1, to: 5 },
    { from: 6, to: 2 },
    { from: 0, to: 4 },
    { from: 3, to: 6 },
    { from: 7, to: 2 },
  ];
  // Operator sits on the operator node.
  const opX = DNO.x;
  const opY = DNO.y;

  // Small arrowhead helper: returns a path "d" for a chevron at the tip,
  // opening back toward (fromX, fromY).
  const head = (tipX: number, tipY: number, fromX: number, fromY: number, s = 5) => {
    const dx = tipX - fromX;
    const dy = tipY - fromY;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const ang = 0.5; // ~28°
    const cosA = Math.cos(ang);
    const sinA = Math.sin(ang);
    // back direction rotated ±ang
    const lx = tipX - s * (ux * cosA - uy * sinA);
    const ly = tipY - s * (uy * cosA + ux * sinA);
    const rx = tipX - s * (ux * cosA + uy * sinA);
    const ry = tipY - s * (uy * cosA - ux * sinA);
    return `M ${lx.toFixed(1)} ${ly.toFixed(1)} L ${tipX} ${tipY} L ${rx.toFixed(1)} ${ry.toFixed(1)}`;
  };

  // Arrow geometry — query (operator → ontology) and return (ontology →
  // operator), routed in the band above the chips and left of them.
  const qTip = { x: 322, y: 206 };
  const qFrom = { x: 360, y: 175 };
  const rTip = { x: 412, y: 162 };
  const rFrom = { x: 332, y: 188 };

  // Context chips — to the right of the constellation, in the same lower band.
  const chips = [
    "Similar case · 2024-Q3 substation upgrade",
    "Constraint · feeder F12 thermal limit",
    "Precedent · G99 §A.3 voltage tolerance",
  ];
  const chipX = 352;
  const chipW = 184;
  const chipH = 15;

  return (
    <g>
      {/* Ontology constellation */}
      <g
        opacity={0}
        style={{
          animation:
            `ga-fade-in 0.5s ${EASE_OUT} ${T.beat5}s forwards, ` +
            `ga-fade-out 0.4s ${EASE} ${T.beat6 - 0.2}s forwards`,
        }}
      >
        {ontoEdges.map((e, i) => {
          const a = ontoNodes[e.from];
          const b = ontoNodes[e.to];
          const len = Math.hypot(b.x - a.x, b.y - a.y);
          return (
            <path
              key={`onto-e-${i}`}
              d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              stroke={STROKE}
              strokeWidth={0.45}
              fill="none"
              opacity={0.55}
              style={{
                strokeDasharray: len,
                strokeDashoffset: len,
                animation: `ga-draw 0.65s ${EASE} ${T.beat5 + 0.35 + i * 0.06}s forwards`,
              }}
            />
          );
        })}
        {ontoNodes.map((n, i) => (
          <g key={`onto-n-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={5}
              fill={STROKE}
              opacity={0}
              style={{
                animation: `ga-fade-in 0.5s ease ${T.beat5 + 0.2 + i * 0.07}s forwards`,
                fillOpacity: 0.12,
              }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={4}
              fill={ACCENT}
              filter="url(#ga-glow)"
              opacity={0}
              style={{
                animation:
                  `ga-scale-in 0.5s ${EASE_SPRING} ${T.beat5 + 0.2 + i * 0.07}s forwards, ` +
                  `ga-pulse 2.2s ease-in-out ${T.beat5 + 1.2 + i * 0.1}s infinite`,
                transformOrigin: `${n.x}px ${n.y}px`,
              }}
            />
          </g>
        ))}
        {/* Label above the constellation, clear of the main line */}
        <text
          x={cx}
          y={cy - 48}
          textAnchor="middle"
          fontSize="8"
          letterSpacing="0.28em"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fill={STROKE}
          opacity={0}
          style={{
            animation: `ga-fade-in 0.5s ease ${T.beat5 + 0.6}s forwards`,
          }}
        >
          ONTOLOGY
        </text>
      </g>

      {/* Query + return arrows between operator and ontology */}
      <g
        opacity={0}
        style={{
          animation:
            `ga-fade-in 0.5s ${EASE_OUT} ${T.beat5 + 0.5}s forwards, ` +
            `ga-fade-out 0.4s ${EASE} ${T.beat6 - 0.2}s forwards`,
        }}
      >
        {/* Operator → Ontology (query) */}
        <path
          d={`M ${rTip.x} ${rTip.y} C 360 156, ${qFrom.x} ${qFrom.y - 6}, ${qTip.x} ${qTip.y}`}
          stroke={ACCENT}
          strokeWidth={0.7}
          fill="none"
          opacity={0.8}
        />
        <path d={head(qTip.x, qTip.y, qFrom.x, qFrom.y)} stroke={ACCENT} strokeWidth={0.8} fill="none" opacity={0.85} />
        {/* Ontology → Operator (returned context) */}
        <path
          d={`M ${rFrom.x} ${rFrom.y} C 360 196, 392 178, ${rTip.x + 2} ${rTip.y + 10}`}
          stroke={STROKE}
          strokeWidth={0.6}
          fill="none"
          opacity={0.5}
          strokeDasharray="2.5 2.5"
        />
        <path d={head(rTip.x + 2, rTip.y + 10, rFrom.x, rFrom.y)} stroke={STROKE} strokeWidth={0.7} fill="none" opacity={0.6} />
      </g>

      {/* Context chips — right of the constellation, fed by short connectors */}
      {chips.map((text, i) => {
        const cY = 210 + i * 19;
        const node = ontoNodes[3]; // right node of the constellation
        return (
          <g
            key={`chip-${i}`}
            opacity={0}
            style={{
              animation:
                `ga-rise 0.55s ${EASE_OUT} ${T.beat5 + 1.1 + i * 0.28}s forwards, ` +
                `ga-fade-out 0.4s ${EASE} ${T.beat6 - 0.2}s forwards`,
            }}
          >
            <path
              d={`M ${node.x} ${node.y} L ${chipX} ${cY + chipH / 2}`}
              stroke={STROKE}
              strokeWidth={0.35}
              fill="none"
              opacity={0.35}
            />
            <rect
              x={chipX}
              y={cY}
              width={chipW}
              height={chipH}
              rx={2}
              fill={PAPER}
              stroke={STROKE}
              strokeWidth={0.55}
              strokeOpacity={0.7}
            />
            <text
              x={chipX + 9}
              y={cY + 10}
              fontSize="7.5"
              fontFamily="var(--font-sans), system-ui, sans-serif"
              fill={STROKE}
            >
              {text}
            </text>
          </g>
        );
      })}

      {/* Operator focus halo at the operator node */}
      <g
        opacity={0}
        style={{
          animation:
            `ga-fade-in 0.5s ${EASE_OUT} ${T.beat5 + 0.4}s forwards, ` +
            `ga-fade-out 0.4s ${EASE} ${T.beat6 - 0.2}s forwards`,
        }}
      >
        <circle
          cx={opX}
          cy={opY}
          r={16}
          fill="none"
          stroke={ACCENT}
          strokeWidth={0.5}
          opacity={0.5}
          style={{
            transformOrigin: `${opX}px ${opY}px`,
            animation: `ga-pulse 1.8s ease-in-out ${T.beat5 + 0.5}s infinite`,
          }}
        />
      </g>
    </g>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-component: differentiated document glyphs (inline SVG — NO foreignObject,
// because foreignObject does not inherit parent <g opacity="0">)
// ────────────────────────────────────────────────────────────────────────────
function DocGlyph({ type, tx = 0, ty = 0, scale = 1 }: { type: 0 | 1 | 2; tx?: number; ty?: number; scale?: number }) {
  // 0: single-line diagram (zigzag inside doc rect)
  // 1: planning consent (doc with stamp circle)
  // 2: power-flow study (doc with mini bar chart)
  // Scale is applied about the anchor (tx,ty) so the glyph stays centred there.
  return (
    <g transform={`translate(${tx} ${ty}) scale(${scale}) translate(-8 -10)`} fill="none" stroke={STROKE} strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 2 1 L 11 1 L 14 4 L 14 19 L 2 19 Z" />
      <path d="M 11 1 L 11 4 L 14 4" />
      {type === 0 && (
        <g>
          <path d="M 4 9 L 6 11 L 8 9 L 10 11 L 12 9" />
          <line x1={4} y1={14} x2={12} y2={14} />
          <line x1={4} y1={16.5} x2={9} y2={16.5} />
        </g>
      )}
      {type === 1 && (
        <g>
          <line x1={4} y1={8} x2={12} y2={8} />
          <line x1={4} y1={10.5} x2={12} y2={10.5} />
          <line x1={4} y1={13} x2={9} y2={13} />
          <circle cx={11} cy={15.5} r={1.8} />
        </g>
      )}
      {type === 2 && (
        <g>
          <line x1={4} y1={16} x2={12} y2={16} />
          <rect x={5} y={12} width={1.2} height={4} fill={STROKE} stroke="none" />
          <rect x={7.5} y={9.5} width={1.2} height={6.5} fill={STROKE} stroke="none" />
          <rect x={10} y={11} width={1.2} height={5} fill={STROKE} stroke="none" />
        </g>
      )}
    </g>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-component: solar panel glyph
// ────────────────────────────────────────────────────────────────────────────
function SolarPanel() {
  // Hand-built 6-cell panel
  return (
    <svg width={28} height={20} viewBox="0 0 28 20" fill="none" stroke={STROKE} strokeWidth={1} strokeLinejoin="round">
      <path d="M 1 18 L 5 4 L 27 4 L 23 18 Z" />
      {/* Cells */}
      <path d="M 8.5 4 L 6 18" />
      <path d="M 16 4 L 14 18" />
      <path d="M 23.5 4 L 22 18" />
      <path d="M 4 11 L 25 11" />
      {/* Stand */}
      <line x1={14} y1={18} x2={14} y2={20} />
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────
export default function HowItWorksAnimation() {
  // Curved document flight path (DEV → DNO with arc up) — taller arc so
  // the documents visibly travel rather than skim across. The end point is
  // slightly offset right + up from DNO so docs "deposit" near the doc
  // stack that appears at the start of beat 3, smoothing the handoff.
  // Documents travel in a straight line along the main bus from DEV to DNO.
  const docPath = `M ${DEV.x} ${DEV.y} L ${DNO.x} ${DNO.y}`;

  // Decision pulse travels straight back along the same line, DNO → DEV.
  const decisionPath = `M ${DNO.x} ${DNO.y} L ${DEV.x} ${DEV.y}`;

  // Power-out path — traces along the main connection then up to the
  // upper-middle pylon (PYLONS[1] at 300,50), then horizontally to the
  // upper-right pylon (PYLONS[2] at 540,70). Reads as "solar energy
  // generated at DEV flowing back into the network".
  const powerOutPath = `M ${DEV.x} ${DEV.y} L ${PYLONS[1].x} ${DEV.y} L ${PYLONS[1].x} ${PYLONS[1].y + 14} L ${PYLONS[2].x} ${PYLONS[1].y + 14} L ${PYLONS[2].x} ${PYLONS[2].y + 14}`;
  const POWER_OUT_LEN = (PYLONS[1].x - DEV.x) + (DEV.y - PYLONS[1].y - 14) + (PYLONS[2].x - PYLONS[1].x) + Math.abs(PYLONS[1].y - PYLONS[2].y);

  // Pylons (from new layout)
  const pylonPositions = PYLONS.map((p) => ({ x: p.x, y: p.y }));

  // Captions — 7 beats + payoff
  const captions = [
    { text: "01 — Grid network traced", start: T.beat1, dur: T.beat2 - T.beat1 },
    { text: "02 — Developer submits the application pack", start: T.beat2, dur: T.beat3 - T.beat2 },
    { text: "03 — Agents run completeness · compliance · consistency · readiness", start: T.beat3, dur: T.beat4 - T.beat3 },
    { text: "04 — Engineering studies · power flow, fault level, thermal", start: T.beat4, dur: T.beat5 - T.beat4 },
    { text: "05 — Operator reviews · assisted by the proprietary ontology", start: T.beat5, dur: T.beat6 - T.beat5 },
    { text: "06 — Decision returned in hours and days, not months", start: T.beat6, dur: T.beat7 - T.beat6 },
    { text: "07 — Project enters construction · power flows", start: T.beat7, dur: 3.0 },
  ];

  return (
    <div className="how-it-works-animation" style={{ position: "relative" }}>
      <div style={{ position: "relative", maxWidth: `${SVG_W}px`, margin: "0 auto", aspectRatio: `${SVG_W} / ${SVG_H}`, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ display: "block", width: "100%", height: "100%" }}
        aria-label="How Grid Agents works — animated diagram"
        role="img"
      >
        <defs>
          <filter id="ga-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── HUD corner brackets — frame the canvas, suggest "instrument
            readout". Persistent throughout the entire animation. ── */}
        {BRACKETS.map((b, i) => (
          <path
            key={`bracket-${i}`}
            d={b.d}
            stroke={STROKE}
            strokeWidth={1}
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity={0}
            style={{
              animation: `ga-fade-in 0.7s ${EASE_OUT} ${0.3 + i * 0.1}s forwards`,
              strokeOpacity: 0.42,
            }}
          />
        ))}

        {/* ── Network layer (dims during studies, brightens for finale) ── */}
        <g
          style={{
            animation:
              `ga-dim 0.6s ${EASE} ${T.beat4}s forwards, ` +
              `ga-undim 0.6s ${EASE} ${T.beat6}s forwards`,
          }}
        >
          {/* Background constellation — sparse dots that breathe in slowly,
              then pulse on a long cycle. Reads as a quiet digital field.
              Sizes alternate (1px / 1.6px) for organic variation. */}
          {BG_DOTS.map((d, i) => (
            <circle
              key={`bg-${i}`}
              cx={d.x}
              cy={d.y}
              r={i % 5 === 0 ? 1.8 : i % 3 === 0 ? 1.4 : 1}
              fill={STROKE}
              opacity={0}
              style={{
                fillOpacity: i % 5 === 0 ? 0.45 : 0.3,
                animation:
                  `ga-fade-in 1.2s ease ${T.beat1 + (i % 10) * 0.04}s forwards, ` +
                  `ga-pulse 6s ease-in-out ${T.beat1 + 2.5 + i * 0.08}s infinite`,
              }}
            />
          ))}

          {/* Main DEV→DNO connection — soft blurred underlay + crisp top */}
          <path
            d={MAIN_PATH}
            stroke={STROKE}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            opacity={0}
            style={{
              strokeDasharray: MAIN_PATH_LEN,
              strokeDashoffset: MAIN_PATH_LEN,
              filter: "blur(2px)",
              strokeOpacity: 0.25,
              animation:
                `ga-fade-in 0.8s ease ${T.beat1 + 0.4}s forwards, ` +
                `ga-draw 1.6s ${EASE} ${T.beat1 + 0.4}s forwards`,
            }}
          />
          <path
            d={MAIN_PATH}
            stroke={STROKE}
            strokeWidth={1.3}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: MAIN_PATH_LEN,
              strokeDashoffset: MAIN_PATH_LEN,
              animation: `ga-draw 1.6s ${EASE} ${T.beat1 + 0.4}s forwards`,
            }}
          />

          {/* Branches from main path to each pylon (organic placement) */}
          {BRANCHES.map((b, i) => (
            <path
              key={b.key}
              d={b.d}
              stroke={STROKE}
              strokeWidth={0.85}
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: b.len,
                strokeDashoffset: b.len,
                animation: `ga-draw 0.9s ${EASE} ${T.beat1 + 1.4 + i * 0.1}s forwards`,
              }}
            />
          ))}

          {/* Branch-anchor dots — where each pylon's branch meets the main
              line. Position uses the branch's own attachY so the dots sit
              flush against the curved main path. */}
          {BRANCHES.map((b, i) => {
            const p = PYLONS[i];
            return (
              <circle
                key={`branch-anchor-${i}`}
                cx={p.x}
                cy={b.attachY}
                r={2.4}
                fill={STROKE}
                opacity={0}
                style={{
                  animation: `ga-scale-in 0.45s ${EASE_SPRING} ${T.beat1 + 1.9 + i * 0.06}s forwards`,
                  transformOrigin: `${p.x}px ${b.attachY}px`,
                }}
              />
            );
          })}

          {/* Pylon endpoint dots — small filled circle at the pylon icon's
              connection point (just outside its body) */}
          {PYLONS.map((p, i) => {
            const dy = p.y < DEV.y ? p.y + 14 : p.y - 14;
            return (
              <circle
                key={`pylon-tip-${i}`}
                cx={p.x}
                cy={dy}
                r={1.6}
                fill={STROKE}
                opacity={0}
                style={{
                  animation: `ga-scale-in 0.4s ${EASE_SPRING} ${T.beat1 + 2.2 + i * 0.06}s forwards`,
                  transformOrigin: `${p.x}px ${dy}px`,
                }}
              />
            );
          })}
        </g>

        {/* ── Scan line: sweeps across the canvas during agents analysis,
            reads as "system is scanning". A thin accent vertical line
            with a gentle blur. ── */}
        <g style={{ animation: `ga-scan 2.6s ${EASE_OUT} ${T.beat3 + 0.3}s forwards` }}>
          <line
            x1={20}
            y1={28}
            x2={20}
            y2={SVG_H - 28}
            stroke={ACCENT}
            strokeWidth={0.8}
            strokeLinecap="round"
            opacity={0.5}
            style={{ filter: "blur(0.4px)" }}
          />
          {/* Soft glow underlay */}
          <line
            x1={20}
            y1={28}
            x2={20}
            y2={SVG_H - 28}
            stroke={ACCENT}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.18}
            style={{ filter: "blur(3px)" }}
          />
        </g>

        {/* ── DNO reticle: crosshair brackets framing the DNO node during
            agents-review and engineering-studies beats. Suggests "target
            in focus". Fades out before operator + ontology beat. ── */}
        <g
          opacity={0}
          style={{
            animation:
              `ga-reticle-in 0.5s ${EASE_OUT} ${T.beat3 + 0.1}s forwards, ` +
              `ga-fade-out 0.4s ${EASE} ${T.beat5 - 0.3}s forwards`,
            transformOrigin: `${DNO.x}px ${DNO.y}px`,
          }}
        >
          {[
            `M ${DNO.x - 32} ${DNO.y - 24} L ${DNO.x - 32} ${DNO.y - 32} L ${DNO.x - 24} ${DNO.y - 32}`,
            `M ${DNO.x + 24} ${DNO.y - 32} L ${DNO.x + 32} ${DNO.y - 32} L ${DNO.x + 32} ${DNO.y - 24}`,
            `M ${DNO.x - 32} ${DNO.y + 24} L ${DNO.x - 32} ${DNO.y + 32} L ${DNO.x - 24} ${DNO.y + 32}`,
            `M ${DNO.x + 24} ${DNO.y + 32} L ${DNO.x + 32} ${DNO.y + 32} L ${DNO.x + 32} ${DNO.y + 24}`,
          ].map((d, i) => (
            <path
              key={`reticle-${i}`}
              d={d}
              stroke={ACCENT}
              strokeWidth={1.2}
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
              opacity={0.85}
            />
          ))}
        </g>

        {/* ── Loop layer: dashed energy current along the main path +
            branches, appearing AFTER beat 7. ── */}
        <path
          d={MAIN_PATH}
          stroke={ACCENT}
          strokeWidth={1.7}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="6 10"
          opacity={0}
          style={{
            animation:
              `ga-fade-in 0.8s ease ${T.loop}s forwards, ` +
              `ga-flow 2.2s linear ${T.loop + 0.6}s infinite`,
          }}
        />
        {BRANCHES.map((b, i) => (
          <path
            key={`flow-${b.key}`}
            d={b.d}
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="none"
            strokeDasharray="4 7"
            opacity={0}
            style={{
              animation:
                `ga-fade-in 0.6s ease ${T.loop + 0.3 + i * 0.06}s forwards, ` +
                `ga-flow 1.8s linear ${T.loop + 0.9 + i * 0.06}s infinite`,
            }}
          />
        ))}

        {/* Continuous data particles along the main DEV-DNO connection —
            reads as "the network is alive, data flowing" during the loop. */}
        {[0, 0.8, 1.6].map((offsetSec, i) => (
          <circle
            key={`particle-${i}`}
            r={2.2}
            fill={ACCENT}
            filter="url(#ga-glow)"
            opacity={0}
            style={{
              animation: `ga-fade-in 0.6s ease ${T.loop + 0.8 + offsetSec}s forwards`,
            }}
          >
            <animateMotion
              path={MAIN_PATH}
              begin={`${T.loop + 0.8 + offsetSec}s`}
              dur="2.6s"
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ── Node labels ── */}
        {/* Anchor rings under DEV/DNO nodes: small open circle that calls
            out these two grid intersections as named anchors. */}
        {[DEV, DNO].map((n, i) => (
          <circle
            key={`anchor-${i}`}
            cx={n.x}
            cy={n.y}
            r={5}
            fill="none"
            stroke={STROKE}
            strokeWidth={0.5}
            opacity={0}
            style={{
              animation: `ga-fade-in 0.5s ease ${T.beat2 - 0.15 + i * 0.05}s forwards`,
            }}
          />
        ))}

        {/* DEVELOPER / DNO labels: fade in at beat 2, then fade out for the
            ontology beat (so chips have a clean band) and fade back in for
            beats 6-7. */}
        <text
          x={DEV.x}
          y={DEV.y + 32}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="0.14em"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fill={STROKE}
          opacity={0}
          style={{
            animation:
              `ga-fade-in 0.5s ease ${T.beat2}s forwards, ` +
              `ga-fade-out 0.4s ${EASE} ${T.beat5 - 0.1}s forwards, ` +
              `ga-fade-in 0.5s ease ${T.beat6 + 0.2}s forwards`,
          }}
        >
          DEVELOPER
        </text>
        <text
          x={DNO.x}
          y={DNO.y + 32}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="0.14em"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fill={STROKE}
          opacity={0}
          style={{
            animation:
              `ga-fade-in 0.5s ease ${T.beat2 + 0.1}s forwards, ` +
              `ga-fade-out 0.4s ${EASE} ${T.beat5 - 0.1}s forwards, ` +
              `ga-fade-in 0.5s ease ${T.beat6 + 0.2}s forwards`,
          }}
        >
          OPERATOR
        </text>

        {/* ── Beat 2: documents fly DEV → OPERATOR along the line ──
            NOTE: no base `transform` here — animateMotion's transform is
            ADDITIVE to the element's transform attribute, so a base
            translate(DEV) would double the offset and push docs off the
            line. Docs are opacity:0 until `begin`, so there's no origin
            flash before the motion starts. */}
        {[0, 1, 2].map((i) => {
          const begin = T.beat2 + 0.3 + i * 0.32;
          return (
            <g
              key={`docflight-${i}`}
              opacity={0}
              style={{
                animation:
                  `ga-fade-in 0.4s ease ${begin}s forwards, ` +
                  `ga-fade-out 0.4s ease ${begin + 1.6}s forwards`,
              }}
            >
              {/* Slightly larger (scale 1.3 about the anchor) for legibility */}
              <DocGlyph type={(i % 3) as 0 | 1 | 2} scale={1.3} />
              <animateMotion
                path={docPath}
                begin={`${begin}s`}
                dur="1.7s"
                fill="freeze"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
                calcMode="spline"
              />
            </g>
          );
        })}

        {/* Path the docs traverse — fades subtly */}
        <path
          d={docPath}
          stroke={STROKE}
          strokeWidth={0.5}
          fill="none"
          strokeDasharray="2.5 4"
          opacity={0}
          style={{
            animation:
              `ga-fade-in 0.4s ease ${T.beat2 + 0.2}s forwards, ` +
              `ga-fade-out 0.4s ease ${T.beat3 + 0.2}s forwards`,
            fillOpacity: 0.6,
          }}
        />

        {/* ── Beat 3: scanning rings around DNO + per-doc tick/flag ── */}
        <g
          style={{
            animation:
              `ga-fade-in 0.5s ${EASE_OUT} ${T.beat3}s forwards, ` +
              `ga-fade-out 0.4s ${EASE} ${T.beat4 - 0.2}s forwards`,
            opacity: 0,
          }}
        >
          {/* Outer scanning ring — radius 50 so it stays inside the cell
              boundaries instead of crossing the DNO label below */}
          <g
            style={{
              transformOrigin: `${DNO.x}px ${DNO.y}px`,
              animation: `ga-spin 6s linear ${T.beat3}s infinite`,
            }}
          >
            <circle
              cx={DNO.x}
              cy={DNO.y}
              r={50}
              fill="none"
              stroke={ACCENT}
              strokeWidth={0.55}
              strokeDasharray="42 180"
              opacity={0.6}
            />
          </g>
          {/* Inner scanning ring */}
          <g
            style={{
              transformOrigin: `${DNO.x}px ${DNO.y}px`,
              animation: `ga-spin-rev 4s linear ${T.beat3}s infinite`,
            }}
          >
            <circle
              cx={DNO.x}
              cy={DNO.y}
              r={38}
              fill="none"
              stroke={ACCENT}
              strokeWidth={0.45}
              strokeDasharray="3 7"
              opacity={0.55}
            />
          </g>
          {/* Agent → Doc connectors: each Bot sends a thin accent line to
              the doc it is verifying. Dashes flow agent → doc so the
              "scanning" reads as data moving toward the doc. */}
          {[238, 210, 182].map((angleDeg, i) => {
            const rad = (angleDeg * Math.PI) / 180;
            const bx = DNO.x + 48 * Math.cos(rad);
            const by = DNO.y + 48 * Math.sin(rad);
            const dx = DNO.x + 12 + i * 14;
            const dy = DNO.y - 18 + i * 4;
            return (
              <line
                key={`agent-link-${i}`}
                x1={bx}
                y1={by}
                x2={dx - 2}
                y2={dy}
                stroke={ACCENT}
                strokeWidth={0.6}
                strokeDasharray="2 4"
                opacity={0}
                style={{
                  animation:
                    `ga-fade-in 0.5s ease ${T.beat3 + 0.5 + i * 0.18}s forwards, ` +
                    `ga-flow 1.2s linear ${T.beat3 + 1.0 + i * 0.18}s infinite`,
                }}
              />
            );
          })}
          {/* Stack of docs sitting at DNO with per-doc tick/flag.
              Slight rotational tilt per index reads as a paper stack
              instead of perfectly aligned cards. */}
          {[0, 1, 2].map((i) => {
            const sx = DNO.x + 12 + i * 14;
            const sy = DNO.y - 18 + i * 4;
            const tilt = [-4, 2, -2][i];
            return (
              <g key={`stack-${i}`} transform={`rotate(${tilt} ${sx} ${sy})`}>
                <DocGlyph type={(i % 3) as 0 | 1 | 2} tx={sx} ty={sy} />
                {/* Verdict mark — i=1 gets a flag, others a tick. Larger
                    + thicker so the per-doc verdict reads clearly. */}
                <g
                  opacity={0}
                  style={{
                    animation: `ga-scale-in 0.5s ${EASE_SPRING} ${T.beat3 + 0.7 + i * 0.35}s forwards`,
                    transformOrigin: `${sx + 12}px ${sy - 2}px`,
                  }}
                >
                  {i === 1 ? (
                    // Flag glyph
                    <>
                      <line x1={sx + 12} y1={sy - 10} x2={sx + 12} y2={sy + 5} stroke={STROKE} strokeWidth={1} strokeLinecap="round" />
                      <path d={`M ${sx + 12} ${sy - 10} L ${sx + 20} ${sy - 7} L ${sx + 12} ${sy - 4}`} fill={STROKE} stroke={STROKE} strokeWidth={0.6} strokeLinejoin="round" />
                    </>
                  ) : (
                    // Tick glyph in green
                    <polyline
                      points={`${sx + 8},${sy - 2} ${sx + 11},${sy + 1} ${sx + 17},${sy - 6}`}
                      fill="none"
                      stroke={ACCENT}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </g>
              </g>
            );
          })}
        </g>

        {/* ── Beat 4: engineering studies panel ── */}
        <ReadoutPanel />

        {/* ── Beat 5: operator + ontology constellation ── */}
        <OperatorAndOntology />

        {/* ── Beat 6: decision pulse along arced path back to dev ──
            Wider blurred underlay reads as electrified current beneath
            the crisp top stroke. */}
        <path
          d={decisionPath}
          stroke={ACCENT}
          strokeWidth={5}
          strokeOpacity={0.35}
          fill="none"
          opacity={0}
          style={{
            strokeDasharray: 320,
            strokeDashoffset: 320,
            animation:
              `ga-fade-in 0.3s ease ${T.beat6}s forwards, ` +
              `ga-draw 1.2s ${EASE} ${T.beat6}s forwards`,
            filter: "blur(3px)",
          }}
        />
        <path
          d={decisionPath}
          stroke={ACCENT}
          strokeWidth={1.9}
          fill="none"
          opacity={0}
          style={{
            strokeDasharray: 320,
            strokeDashoffset: 320,
            animation:
              `ga-fade-in 0.3s ease ${T.beat6}s forwards, ` +
              `ga-draw 1.2s ${EASE} ${T.beat6}s forwards`,
            filter: "url(#ga-glow)",
          }}
        />
        {/* opacity 0 until beat 6 so it isn't parked at the SVG origin (0,0) */}
        <circle
          r={6}
          fill={ACCENT}
          filter="url(#ga-glow)"
          opacity={0}
          style={{ animation: `ga-fade-in 0.2s ease ${T.beat6}s forwards` }}
        >
          <animateMotion path={decisionPath} begin={`${T.beat6}s`} dur="1.2s" fill="freeze" />
        </circle>

        {/* Timer chip "30 days → 12 minutes" — sits above DEV, clear of the
            solar panel. Small callout tick anchors the chip visually to
            the DEV node so the metric reads as DEV-specific. Persists
            through beat 7 and into the loop for a longer payoff hold. */}
        <g
          opacity={0}
          style={{
            animation:
              `ga-rise 0.55s ${EASE_OUT} ${T.beat6 + 0.7}s forwards, ` +
              `ga-fade-out 0.6s ${EASE} ${T.loop + 1.2}s forwards`,
          }}
        >
          <rect
            x={DEV.x - 68}
            y={DEV.y - 94}
            width={136}
            height={24}
            rx={2}
            fill={PAPER}
            stroke={STROKE}
            strokeWidth={0.8}
          />
          <text
            x={DEV.x}
            y={DEV.y - 78}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-serif), Georgia, serif"
            fill={STROKE}
          >
            <tspan>30 days</tspan>
            <tspan dx="2" fill={ACCENT} fontWeight="500">→</tspan>
            <tspan dx="2">6 hours</tspan>
          </text>
          {/* Tick anchoring chip to DEV (subtle line) */}
          <line
            x1={DEV.x}
            y1={DEV.y - 70}
            x2={DEV.x}
            y2={DEV.y - 62}
            stroke={STROKE}
            strokeWidth={0.5}
            opacity={0.5}
          />
        </g>

        {/* ── Beat 7: power-out path from DEV through grid ── */}
        <path
          d={powerOutPath}
          stroke={ACCENT}
          strokeWidth={1.4}
          fill="none"
          style={{
            strokeDasharray: POWER_OUT_LEN,
            strokeDashoffset: POWER_OUT_LEN,
            animation: `ga-draw 1.4s ${EASE} ${T.beat7 + 0.4}s forwards`,
            filter: "url(#ga-glow)",
          }}
        />
        {/* Moving energy dot along power-out path, infinite after beat 7 */}
        <circle r={2.5} fill={ACCENT} opacity={0}
          style={{
            animation: `ga-fade-in 0.5s ease ${T.beat7 + 1.4}s forwards`,
          }}
        >
          <animateMotion
            path={powerOutPath}
            begin={`${T.beat7 + 1.4}s`}
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* ── Icon overlays (HTML positioned over SVG) ── */}

      {/* Pylons — appear with the grid. Upper pylons stand above the grid
          line; lower pylons mirror via a CSS-only flip on the icon itself
          (the outer Overlay can't carry scaleY because ga-rise's keyframe
          overrides the final transform). */}
      {pylonPositions.map((p, i) => {
        const isUpper = p.y < SVG_H / 2;
        // Right-side pylons (x within the studies-panel band) sit under the
        // beat-4 panel; fade their icons out while the panel is shown so they
        // don't render on top of it, then bring them back as it slides away.
        const iconY = isUpper ? p.y - 12 : p.y + 12;
        const underPanel = p.x > 460 && iconY < 290;
        const anim =
          `ga-rise 0.6s ${EASE_OUT} ${T.beat1 + 1.6 + i * 0.1}s forwards` +
          (underPanel
            ? `, ga-fade-out 0.4s ${EASE} ${T.beat4 - 0.2}s forwards` +
              `, ga-fade-in 0.5s ease ${T.beat5 + 0.6}s forwards`
            : "");
        return (
          <Overlay
            key={`pylon-${i}`}
            x={p.x}
            y={isUpper ? p.y - 12 : p.y + 12}
            offsetX={-10}
            offsetY={isUpper ? -20 : 0}
            style={{
              opacity: 0,
              animation: anim,
            }}
          >
            <span style={isUpper ? undefined : { display: "inline-block", transform: "scaleY(-1)" }}>
              <RadioTower size={20} strokeWidth={1.4} color={STROKE} />
            </span>
          </Overlay>
        );
      })}

      {/* Developer building — 22px to balance the 24px Operator icon */}
      <Overlay
        x={DEV.x}
        y={DEV.y}
        offsetX={-11}
        offsetY={-11}
        style={{
          opacity: 0,
          animation: `ga-scale-in 0.55s ${EASE_SPRING} ${T.beat2}s forwards`,
          transformOrigin: "center",
        }}
      >
        <Building2 size={22} strokeWidth={1.4} color={STROKE} />
      </Overlay>

      {/* DNO cable — fades out when operator takes over in beat 5 */}
      <Overlay
        x={DNO.x}
        y={DNO.y}
        offsetX={-11}
        offsetY={-11}
        style={{
          opacity: 0,
          animation:
            `ga-scale-in 0.55s ${EASE_SPRING} ${T.beat2 + 0.15}s forwards, ` +
            `ga-fade-out 0.45s ${EASE} ${T.beat5 + 0.1}s forwards`,
        }}
      >
        <Cable size={22} strokeWidth={1.4} color={STROKE} />
      </Overlay>

      {/* Operator user icon — appears when Cable fades. 24px reads as a
          peer to the Building2/Cable icons (both 20px) but slightly heavier,
          giving the human-in-the-loop moment more narrative weight. */}
      <Overlay
        x={DNO.x}
        y={DNO.y}
        offsetX={-12}
        offsetY={-12}
        style={{
          opacity: 0,
          animation:
            `ga-scale-in 0.55s ${EASE_SPRING} ${T.beat5 + 0.3}s forwards, ` +
            `ga-fade-out 0.4s ${EASE} ${T.beat6 - 0.1}s forwards`,
        }}
      >
        <User size={24} strokeWidth={1.4} color={STROKE} />
      </Overlay>

      {/* DNO returns after operator beat */}
      <Overlay
        x={DNO.x}
        y={DNO.y}
        offsetX={-11}
        offsetY={-11}
        style={{
          opacity: 0,
          animation: `ga-fade-in 0.5s ${EASE} ${T.beat6 + 0.2}s forwards`,
        }}
      >
        <Cable size={22} strokeWidth={1.4} color={STROKE} />
      </Overlay>

      {/* Three Bot icons — fan radially from DNO during beat 3.
          Spec asks for agents that "fan out" from the DNO node, not stacked.
          Angles ordered upper→middle→lower so the index matches the
          corresponding doc-stack position. */}
      {[238, 210, 182].map((angleDeg, i) => {
        const rad = (angleDeg * Math.PI) / 180;
        const r = 48;
        const bx = DNO.x + r * Math.cos(rad);
        const by = DNO.y + r * Math.sin(rad);
        return (
          <Overlay
            key={`bot-${i}`}
            x={bx}
            y={by}
            offsetX={-10}
            offsetY={-10}
            style={{
              opacity: 0,
              animation:
                `ga-scale-in 0.55s ${EASE_SPRING} ${T.beat3 + 0.15 + i * 0.18}s forwards, ` +
                `ga-fade-out 0.4s ${EASE} ${T.beat4 - 0.2}s forwards`,
            }}
          >
            <Bot size={20} strokeWidth={1.4} color={STROKE} />
          </Overlay>
        );
      })}

      {/* Solar panel grows in above the Developer building (beat 7).
          Sun is intentionally omitted — the solar panel alone reads as the
          generation asset and avoids visual clutter at the DEV node. */}
      <Overlay
        x={DEV.x}
        y={DEV.y - 32}
        offsetX={-14}
        offsetY={-10}
        style={{
          opacity: 0,
          animation: `ga-scale-in 0.7s ${EASE_SPRING} ${T.beat7}s forwards`,
        }}
      >
        <SolarPanel />
      </Overlay>
      </div>

      {/* ── Caption slot ── */}
      <div
        className="caption-slot"
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop: "1.25rem",
        }}
      >
        {captions.map((c, i) => (
          <span
            key={`caption-${i}`}
            style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.09em",
              opacity: 0,
              position: "absolute",
              textAlign: "center",
              whiteSpace: "nowrap",
              animation: `ga-caption ${c.dur}s linear ${c.start}s both`,
              color: STROKE,
            }}
          >
            {c.text}
          </span>
        ))}
      </div>

      {/* Payoff text — holds at end */}
      <div
        className="payoff-text"
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "0.84rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          opacity: 0,
          textAlign: "center",
          marginTop: "0.75rem",
          animation: `ga-fade-in 0.9s ease ${T.payoff}s forwards`,
          color: STROKE,
        }}
      >
        From application to decision: hours and days, not months.
      </div>
    </div>
  );
}
