import HowItWorksAnimationLoader from "@/components/HowItWorksAnimationLoader";

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      {/* Sticky nav with section anchors + CTA */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(245,245,247,0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(26,26,24,0.08)",
          padding: "0.875rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <a
            href="#hero"
            aria-label="Grid Agents"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              color: "var(--foreground)",
              fontFamily: "'Proxima Nova', 'proxima-nova', var(--font-sans), system-ui, sans-serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "-0.005em",
            }}
          >
            Grid Agents
          </a>
          <div style={{ flex: 1 }} />
          <a
            href="mailto:hello@grid-agents.com"
            className="cta-pill-filled"
            style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: "var(--background)",
              background: "var(--foreground)",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Contact Us
          </a>
        </div>
      </nav>

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="hero"
          style={{
            paddingTop: "8.5rem",
            paddingBottom: "5.5rem",
          }}
        >
          <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <div
              className="hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.85fr)",
                gap: "5rem",
                alignItems: "center",
              }}
            >
              <div>
            <h1
              style={{
                fontSize: "clamp(3rem, 6vw, 4.25rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                marginBottom: "1.75rem",
                letterSpacing: "-0.015em",
              }}
            >
              The intelligence layer{" "}
              <span style={{ color: "var(--accent)" }}>for the grid.</span>
            </h1>

            <div
              className="hero-paragraph-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
                marginBottom: "2.5rem",
              }}
            >
              <svg
                aria-hidden="true"
                width="40"
                height="80"
                viewBox="0 0 50 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hero-pylon"
                style={{ flexShrink: 0, marginTop: "0.15rem", opacity: 0.5, color: "var(--foreground)" }}
              >
                <defs>
                  <filter
                    id="hero-pylon-glow"
                    x="-200%"
                    y="-200%"
                    width="500%"
                    height="500%"
                  >
                    <feGaussianBlur stdDeviation="2.8" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Legs */}
                <line x1="22" y1="14" x2="14" y2="92" />
                <line x1="28" y1="14" x2="36" y2="92" />
                {/* Horizontal bracings */}
                <line x1="14" y1="92" x2="36" y2="92" />
                <line x1="17" y1="68" x2="33" y2="68" />
                <line x1="19" y1="46" x2="31" y2="46" />
                <line x1="21" y1="28" x2="29" y2="28" />
                {/* X bracings */}
                <line x1="14" y1="92" x2="33" y2="68" />
                <line x1="36" y1="92" x2="17" y2="68" />
                <line x1="17" y1="68" x2="31" y2="46" />
                <line x1="33" y1="68" x2="19" y2="46" />
                <line x1="19" y1="46" x2="29" y2="28" />
                <line x1="31" y1="46" x2="21" y2="28" />
                {/* Cross arms */}
                <line x1="6" y1="20" x2="44" y2="20" />
                <line x1="10" y1="14" x2="40" y2="14" />
                <line x1="6" y1="20" x2="6" y2="24" />
                <line x1="44" y1="20" x2="44" y2="24" />
                {/* Top tip */}
                <line x1="22" y1="14" x2="25" y2="6" />
                <line x1="28" y1="14" x2="25" y2="6" />
                {/* Energy flow dot — rises from base, fades through the top */}
                <circle
                  cx="25"
                  cy="92"
                  r="2.8"
                  fill="#c2853f"
                  stroke="none"
                  filter="url(#hero-pylon-glow)"
                  className="hero-pylon-flow"
                />
              </svg>
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: 1.55,
                  maxWidth: "37rem",
                  margin: 0,
                  opacity: 0.85,
                }}
              >
                Automating the technical reviews and assessments behind every grid connection — at the pace the energy transition demands.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="mailto:hello@grid-agents.com"
                className="cta-pill-filled"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--background)",
                  background: "var(--foreground)",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  fontWeight: 500,
                }}
              >
                Contact Us →
              </a>
            </div>
              </div>

              <div className="hero-animation-wrap" style={{ width: "100%" }}>
                <HowItWorksAnimationLoader />
              </div>
            </div>
          </div>
        </section>

        {/* ── Backed by — dedicated band ─────────────────────── */}
        <section
          id="backing"
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            borderTop: "1px solid rgba(26,26,24,0.1)",
            borderBottom: "1px solid rgba(26,26,24,0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              padding: "0 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <p
              className="font-label"
              style={{
                margin: 0,
                opacity: 0.55,
                fontSize: "0.8rem",
                letterSpacing: "0.18em",
              }}
            >
              Backed by
            </p>
            <a
              href="https://www.ewor.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EWOR"
              style={{
                display: "inline-block",
                lineHeight: 0,
              }}
            >
              <svg
                width="140"
                height="34"
                viewBox="0 0 81 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g clipPath="url(#ewor-clip)">
                  <path d="M39.283 0.242188L35.9561 11.1785L32.5832 0.242188H28.744L25.3692 11.1862L22.0424 0.242188H17.0073L23.3487 19.758H27.4211L30.6387 9.44524L33.8563 19.758H37.9766L44.318 0.242188H39.283Z" fill="#1a1a18" />
                  <path d="M60.5105 2.84421L60.4945 2.82751C58.7212 0.951066 56.3532 0 53.4581 0C50.5631 0 48.1963 0.951066 46.4217 2.82751C44.6727 4.67955 43.7579 7.0858 43.7036 9.98009V9.98395V10.0244C43.7579 12.9168 44.6727 15.3211 46.4217 17.1718C48.195 19.0489 50.5624 20 53.4581 20C56.3538 20 58.7212 19.0483 60.4951 17.1718C62.2448 15.3217 63.1589 12.9155 63.2132 10.0199V10.0161V9.9756C63.1589 7.09222 62.2499 4.69304 60.5105 2.84421ZM58.4286 10C58.4286 11.6029 57.9866 12.8744 57.0763 13.8871C56.2011 14.8613 55.0136 15.3352 53.4472 15.3352C51.8809 15.3352 50.6998 14.8626 49.8329 13.8903C48.929 12.8782 48.4902 11.6061 48.4902 10C48.4902 8.39391 48.9296 7.1224 49.8335 6.10968C50.7004 5.13743 51.8822 4.66543 53.4479 4.66543C55.0136 4.66543 56.2018 5.13935 57.0769 6.11354C57.9866 7.12625 58.4293 8.39777 58.4293 10H58.4286Z" fill="#1a1a18" />
                  <path d="M79.9799 9.84917C80.6564 8.8493 81.0001 7.70944 81.0001 6.46233C81.0001 4.59295 80.2897 3.05685 78.8888 1.8958C77.5627 0.798314 75.6316 0.242188 73.1486 0.242188H65.1533V19.758H69.9386V13.1686H73.6309C74.4115 13.1686 74.9513 13.3157 75.1927 13.5944C75.3761 13.8429 75.5236 14.0792 75.6329 14.2975L75.6565 14.3419C75.7012 14.4221 75.9242 14.9038 75.9478 16.4771V19.758H80.7356V16.3711C80.7356 13.8872 80.1792 12.0409 79.0792 10.8728C79.4222 10.5697 79.7244 10.2268 79.9805 9.84853L79.9799 9.84917ZM76.2148 6.65755C76.2148 7.21496 76.0283 7.56816 75.5703 7.87705L75.5594 7.88411C74.9691 8.27841 74.11 8.47877 73.0042 8.47877H69.9379V4.93137H72.8828C74.782 4.93137 75.4815 5.29613 75.6942 5.45282C76.064 5.72639 76.2148 6.07509 76.2148 6.65691V6.65755Z" fill="#1a1a18" />
                  <path d="M0 19.758H15.4698V15.0932H4.9769V12.3209H14.6024V7.65549H4.9769V4.90697H15.4698V0.242188H0V19.758Z" fill="#1a1a18" />
                </g>
                <defs>
                  <clipPath id="ewor-clip">
                    <rect width="81" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer
          style={{
            paddingTop: "5rem",
            paddingBottom: "1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              padding: "0 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <p className="font-label" style={{ opacity: 0.45, margin: 0 }}>
              © 2026 Grid Agents Ltd
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
