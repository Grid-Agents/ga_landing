"use client";

import { useEffect, useRef } from "react";

// Knowledge-graph constellation that gently repels away from the mouse
// pointer. Used as the inline illustration for the "Knowledge capture"
// USP — reads as "tacit judgement encoded into an interactive graph".
//
// Internal coordinate system is a 100×100 viewBox; the SVG itself sizes
// to ~120px on the page (matching the other USP illustrations).

const VB = 100;

type Node = {
  ox: number; // resting x
  oy: number; // resting y
  x: number;
  y: number;
  vx: number;
  vy: number;
};

// A small graph: 11 nodes loosely arranged in a 3-tier constellation.
const NODE_POSITIONS: Array<[number, number]> = [
  // Outer ring
  [20, 22],
  [50, 12],
  [80, 22],
  [88, 50],
  [78, 78],
  [50, 88],
  [22, 78],
  [12, 50],
  // Inner ring
  [38, 42],
  [62, 42],
  [50, 62],
];

// Edges (indices into NODE_POSITIONS). Perimeter + diagonals + inner.
const EDGES: Array<[number, number]> = [
  // Perimeter cycle
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  // Outer cross-edges
  [0, 3], [1, 5], [2, 6], [4, 7],
  // Inner triangle
  [8, 9], [9, 10], [10, 8],
  // Inner to outer
  [8, 0], [8, 1], [8, 7], [9, 2], [9, 3], [9, 1], [10, 5], [10, 6], [10, 4],
];

export default function KnowledgeGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesRef = useRef<Node[]>(
    NODE_POSITIONS.map(([x, y]) => ({ ox: x, oy: y, x, y, vx: 0, vy: 0 }))
  );
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const circleRefs = useRef<Array<SVGCircleElement | null>>([]);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const REPEL_RADIUS = 22;
    const REPEL_STRENGTH = 0.55;
    const SPRING = 0.06;
    const DAMP = 0.84;

    const tick = () => {
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }
        // Spring back to rest
        n.vx += (n.ox - n.x) * SPRING;
        n.vy += (n.oy - n.y) * SPRING;
        // Damping
        n.vx *= DAMP;
        n.vy *= DAMP;
        // Integrate
        n.x += n.vx;
        n.y += n.vy;

        const c = circleRefs.current[i];
        if (c) {
          c.setAttribute("cx", n.x.toFixed(2));
          c.setAttribute("cy", n.y.toFixed(2));
        }
      }

      // Update edge positions
      for (let i = 0; i < EDGES.length; i++) {
        const [a, b] = EDGES[i];
        const l = lineRefs.current[i];
        if (l) {
          l.setAttribute("x1", nodes[a].x.toFixed(2));
          l.setAttribute("y1", nodes[a].y.toFixed(2));
          l.setAttribute("x2", nodes[b].x.toFixed(2));
          l.setAttribute("y2", nodes[b].y.toFixed(2));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // Map screen coords to viewBox coords
    const x = ((e.clientX - rect.left) / rect.width) * VB;
    const y = ((e.clientY - rect.top) / rect.height) * VB;
    mouseRef.current = { x, y, active: true };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, active: false };
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB} ${VB}`}
      width="120"
      height="120"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "default", display: "block" }}
    >
      {/* Edges first (so nodes paint over them) */}
      {EDGES.map(([a, b], i) => {
        const na = NODE_POSITIONS[a];
        const nb = NODE_POSITIONS[b];
        return (
          <line
            key={`e-${i}`}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            x1={na[0]}
            y1={na[1]}
            x2={nb[0]}
            y2={nb[1]}
            stroke="#111111"
            strokeWidth={0.6}
            strokeOpacity={0.4}
            strokeLinecap="round"
          />
        );
      })}
      {/* Nodes — outer ring charcoal, inner accent green & slightly bigger */}
      {NODE_POSITIONS.map(([x, y], i) => (
        <circle
          key={`n-${i}`}
          ref={(el) => {
            circleRefs.current[i] = el;
          }}
          cx={x}
          cy={y}
          r={i < 8 ? 2.2 : 3}
          fill={i < 8 ? "#111111" : "#111111"}
        />
      ))}
    </svg>
  );
}
