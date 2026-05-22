import Image from "next/image";
import HowItWorksAnimationLoader from "@/components/HowItWorksAnimationLoader";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import ScrollReveal from "@/components/ScrollReveal";
import PylonRail from "@/components/PylonRail";
import { OnboardingGlyph, GaugeGlyph, VoiceGlyph, QueueGlyph } from "@/components/UspGlyphs";

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <PylonRail />
      {/* Sticky nav with section anchors + CTA */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(247, 239, 223, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(26,26,24,0.08)",
          padding: "0.875rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <a
          href="#hero"
          aria-label="Grid Agents"
          style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/grid-agents-logo.png`}
            alt="Grid Agents"
            width={130}
            height={24}
            priority
            style={{ height: 24, width: "auto" }}
          />
        </a>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "1.75rem",
            margin: 0,
            padding: 0,
            flex: 1,
            justifyContent: "center",
          }}
          className="nav-links"
        >
          {[
            { href: "#problem", label: "Problem" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#outcomes", label: "Outcomes" },
            { href: "#backing", label: "Backed by" },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "0.8125rem",
                  color: "var(--foreground)",
                  opacity: 0.7,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "opacity 150ms ease",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:hello@gridagents.com"
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
          Book a pilot
        </a>
      </nav>

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="hero" style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
          <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <h1
              style={{
                fontSize: "clamp(3rem, 7.5vw, 4.25rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                maxWidth: "48rem",
                marginBottom: "1.75rem",
                letterSpacing: "-0.015em",
              }}
            >
              700&nbsp;GW stuck in the queue.{" "}
              <span style={{ color: "var(--accent)" }}>
                Four times what Britain needs.
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: 1.55,
                maxWidth: "37rem",
                marginBottom: "2.5rem",
                opacity: 0.85,
              }}
            >
              The connection queue grew tenfold in five years. Grid Agents builds AI agents that review grid connection applications and run the engineering studies — turning a months-long bottleneck into hours and days, for developers and grid operators alike.
            </p>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="mailto:hello@gridagents.com"
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
                Book a pilot →
              </a>
              <a
                href="#how-it-works"
                className="cta-pill-outline"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--foreground)",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  border: "1px solid rgba(26,26,24,0.16)",
                  letterSpacing: "0.01em",
                }}
              >
                See how it works
              </a>
            </div>

            {/* Stat row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "2.5rem",
                marginTop: "5rem",
                paddingTop: "2.5rem",
                borderTop: "1px solid rgba(26,26,24,0.12)",
                maxWidth: "46rem",
              }}
            >
              {[
                { numeral: "700 GW", label: "In the connection queue — 4× what's needed by 2030" },
                { numeral: "5–10 yrs", label: "Typical wait for a connection date" },
                { numeral: "70–95%", label: "Engineer time saved per application review" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      fontSize: "2.125rem",
                      fontWeight: 500,
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {s.numeral}
                  </div>
                  <p className="font-label" style={{ opacity: 0.6, margin: 0, fontSize: "0.7rem", lineHeight: 1.5 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Market band ───────────────────────────────────── */}
        <section
          style={{
            paddingTop: "3.5rem",
            paddingBottom: "3.5rem",
            borderTop: "1px solid rgba(26,26,24,0.1)",
            borderBottom: "1px solid rgba(26,26,24,0.1)",
            background: "rgba(45,63,46,0.04)",
          }}
        >
          <div
            style={{
              maxWidth: "60rem",
              margin: "0 auto",
              padding: "0 1.5rem",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="market-band"
          >
            <div>
              <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
                The market
              </p>
              <div
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                £40bn<span style={{ fontSize: "0.45em", opacity: 0.6 }}>&nbsp;/ year</span>
              </div>
              <p className="font-label" style={{ opacity: 0.6, margin: "0.6rem 0 0" }}>
                Investment the connections reform could unlock
              </p>
            </div>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
              Clearing the queue unlocks up to{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>£40bn of investment a year</span>, on top of roughly{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>£58bn of grid upgrades</span> planned for 2030. Yet no existing tool reviews the complex, document-heavy applications that cause the backlog — Grid Agents is the first that does.
            </p>
          </div>
        </section>

        {/* ── Problem ───────────────────────────────────────── */}
        <section id="problem" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>
              The problem
            </p>
            <h2
              style={{
                fontSize: "clamp(1.875rem, 4.2vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                maxWidth: "42rem",
                marginBottom: "2rem",
                letterSpacing: "-0.015em",
              }}
            >
              A headcount problem.{" "}
              <span style={{ opacity: 0.6 }}>And a knowledge one.</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.75rem",
                maxWidth: "56rem",
              }}
            >
              {[
                {
                  k: "Senior engineers retire",
                  v: "Decades of tacit judgement walk out the door each year.",
                },
                {
                  k: "New hires take years",
                  v: "Independence on connection reviews is 3–5 years away.",
                },
                {
                  k: "The AI data-centre boom",
                  v: "140 schemes already seek ~50 GW — more than today's national peak. The queue only grows.",
                },
                {
                  k: "Engineers do paperwork",
                  v: "Most time spent screening packs, not on the technical judgement that matters.",
                },
              ].map((b) => (
                <div
                  key={b.k}
                  style={{
                    paddingTop: "1.25rem",
                    borderTop: "1px solid rgba(26,26,24,0.12)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      margin: "0 0 0.4rem",
                    }}
                  >
                    {b.k}
                  </p>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.55,
                      margin: 0,
                      opacity: 0.75,
                    }}
                  >
                    {b.v}
                  </p>
                </div>
              ))}
            </div>

            <p
              style={{
                marginTop: "2.5rem",
                maxWidth: "42rem",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              And demand is only accelerating:{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                data-centre electricity demand is forecast to grow roughly fivefold by 2030
              </span>{" "}
              as the AI boom lands — piling fresh applications onto a queue that already dwarfs the network.
            </p>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────── */}
        <section id="how-it-works" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>
              How it works
            </p>
            <h2
              style={{
                fontSize: "clamp(1.875rem, 4.2vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                maxWidth: "42rem",
                marginBottom: "1.5rem",
                letterSpacing: "-0.015em",
              }}
            >
              Submission to decision.{" "}
              <span style={{ color: "var(--accent)" }}>
                In hours and days.
              </span>
            </h2>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                maxWidth: "40rem",
                marginBottom: "1.25rem",
                opacity: 0.85,
              }}
            >
              Agents screen each pack for completeness, compliance and consistency, prioritise it against Clean Power 2030 and Gate&nbsp;1/Gate&nbsp;2 readiness, then run the engineering studies an assessment normally waits weeks for — power flow, fault level, thermal and voltage-step analysis — automating tools like{" "}
              <span style={{ fontWeight: 600 }}>DIgSILENT PowerFactory</span> end to end and handing the operator ontology-backed context for every result.
            </p>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                maxWidth: "40rem",
                marginBottom: "3rem",
                opacity: 0.8,
              }}
            >
              Every check and study is traced back to the rule or model it came from — so developers and grid operators see exactly why a decision was reached.
            </p>

            {/* Animation */}
            <div style={{ marginBottom: "3rem" }}>
              <HowItWorksAnimationLoader />
            </div>

            {/* Beat captions — single row */}
            <ol
              style={{
                listStyle: "none",
                margin: "2.5rem 0 0",
                padding: 0,
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                gap: "1rem",
                overflowX: "auto",
              }}
            >
              {[
                "Grid",
                "Submit",
                "Agents review",
                "Engineering studies",
                "Operator + ontology",
                "Decision",
                "Built",
              ].map((caption, i) => (
                <li key={i} style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
                  <span className="font-label" style={{ display: "inline-flex", gap: "0.35rem", alignItems: "baseline", fontSize: "0.6875rem", letterSpacing: "0.07em" }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ opacity: 0.7 }}>{caption}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Outcomes / USPs ───────────────────────────────── */}
        <section id="outcomes" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>
              What changes
            </p>
            <h2
              style={{
                fontSize: "clamp(1.875rem, 4.2vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                maxWidth: "36rem",
                marginBottom: "3rem",
                letterSpacing: "-0.015em",
              }}
            >
              Five shifts that{" "}
              <span style={{ color: "var(--accent)" }}>compound.</span>
            </h2>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "48rem" }}>
              {/* USP 0 — Knowledge capture (mouse-repelling graph) */}
              <ScrollReveal as="li" style={{ borderTop: "1px solid rgba(26,26,24,0.1)", padding: "1.75rem 0" }} delay={0}>
                <div className="usp-row" style={{ position: "relative" }}>
                  <div style={{ flexShrink: 0 }}>
                    <KnowledgeGraph />
                  </div>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, margin: 0 }}>
                    <strong style={{ fontWeight: 600, display: "block", marginBottom: "0.35rem", fontSize: "1.125rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.12em", marginRight: "0.6rem", verticalAlign: "0.18em", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>01</span>
                      Knowledge capture &amp; transfer.
                    </strong>
                    Tacit judgement — which edge cases to flag, how to read ambiguous diagrams, where network constraints bite — encoded into a model that improves with every application.
                  </p>
                </div>
              </ScrollReveal>

              {/* USP 1 — Training acceleration */}
              <ScrollReveal as="li" style={{ borderTop: "1px solid rgba(26,26,24,0.1)", padding: "1.75rem 0" }} delay={0.05}>
                <div className="usp-row" style={{ position: "relative" }}>
                  <div style={{ flexShrink: 0 }}>
                    <OnboardingGlyph />
                  </div>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, margin: 0 }}>
                    <strong style={{ fontWeight: 600, display: "block", marginBottom: "0.35rem", fontSize: "1.125rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.12em", marginRight: "0.6rem", verticalAlign: "0.18em", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>02</span>
                      Onboarding acceleration.
                    </strong>
                    From day one, new engineers work alongside an AI that surfaces similar prior cases — how they were assessed, what was flagged, how resolved.
                  </p>
                </div>
              </ScrollReveal>

              {/* USP 2 — Capacity release */}
              <ScrollReveal as="li" style={{ borderTop: "1px solid rgba(26,26,24,0.1)", padding: "1.75rem 0" }} delay={0.05}>
                <div className="usp-row" style={{ position: "relative" }}>
                  <div style={{ flexShrink: 0 }}>
                    <GaugeGlyph />
                  </div>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, margin: 0 }}>
                    <strong style={{ fontWeight: 600, display: "block", marginBottom: "0.35rem", fontSize: "1.125rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.12em", marginRight: "0.6rem", verticalAlign: "0.18em", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>03</span>
                      70–95% off engineer time.
                    </strong>
                    2–3× throughput, zero net new recruitment. Seniors freed for the judgement calls that actually need them.
                  </p>
                </div>
              </ScrollReveal>

              {/* USP 3 — Customer journeys */}
              <ScrollReveal as="li" style={{ borderTop: "1px solid rgba(26,26,24,0.1)", padding: "1.75rem 0" }} delay={0.05}>
                <div className="usp-row" style={{ position: "relative" }}>
                  <div style={{ flexShrink: 0 }}>
                    <VoiceGlyph />
                  </div>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, margin: 0 }}>
                    <strong style={{ fontWeight: 600, display: "block", marginBottom: "0.35rem", fontSize: "1.125rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.12em", marginRight: "0.6rem", verticalAlign: "0.18em", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>04</span>
                      Voice agents that reach out.
                    </strong>
                    No more months of silence. AI voice agents call and message developers the moment a pack is incomplete — chasing missing documents, clarifying ambiguous drawings, confirming details — so a review never stalls waiting on a reply.
                  </p>
                </div>
              </ScrollReveal>

              {/* USP 4 — Faster connection reviews */}
              <ScrollReveal as="li" style={{ borderTop: "1px solid rgba(26,26,24,0.1)", padding: "1.75rem 0" }} delay={0.05}>
                <div className="usp-row" style={{ position: "relative" }}>
                  <div style={{ flexShrink: 0 }}>
                    <QueueGlyph />
                  </div>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, margin: 0 }}>
                    <strong style={{ fontWeight: 600, display: "block", marginBottom: "0.35rem", fontSize: "1.125rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.12em", marginRight: "0.6rem", verticalAlign: "0.18em", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>05</span>
                      The queue, cleared.
                    </strong>
                    Every week off the queue accelerates revenue for developers and frees grid operators to connect what the country actually needs.
                  </p>
                </div>
              </ScrollReveal>
            </ol>
          </div>
        </section>

        {/* ── EWOR backing ──────────────────────────────────── */}
        <section id="backing" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div
            style={{
              maxWidth: "44rem",
              margin: "0 auto",
              padding: "0 1.5rem",
              textAlign: "center",
            }}
          >
            <p className="font-label" style={{ marginBottom: "2rem", opacity: 0.6 }}>
              Backed by
            </p>
            {/* EWOR official wordmark (from ewor.com) */}
            <a
              href="https://www.ewor.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EWOR"
              style={{
                display: "inline-block",
                marginBottom: "1.75rem",
                lineHeight: 0,
              }}
            >
              <svg
                width="180"
                height="44"
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
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.55,
                maxWidth: "32rem",
                margin: "0 auto",
                opacity: 0.8,
              }}
            >
              The world&apos;s most selective talent investor — top 0.1% of founder talent globally.
            </p>
          </div>
        </section>

        {/* ── CTA footer ────────────────────────────────────── */}
        <footer
          id="contact"
          style={{
            paddingTop: "5rem",
            paddingBottom: "2.5rem",
            borderTop: "1px solid rgba(26,26,24,0.1)",
            background: "rgba(26,26,24,0.025)",
          }}
        >
          <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
                gap: "3rem",
                alignItems: "end",
              }}
              className="footer-grid"
            >
              <div>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                    fontWeight: 400,
                    lineHeight: 1.05,
                    maxWidth: "28rem",
                    marginBottom: "1rem",
                    letterSpacing: "-0.015em",
                  }}
                >
                  Run a pilot{" "}
                  <span style={{ color: "var(--accent)" }}>with us.</span>
                </h2>
                <p
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.55,
                    maxWidth: "32rem",
                    marginBottom: "2rem",
                    opacity: 0.8,
                  }}
                >
                  Actively partnering with developers and grid operators on structured pilots. Two-week scope, one connection-pack workflow.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a
                    href="mailto:hello@gridagents.com"
                    className="cta-pill-filled"
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "0.9375rem",
                      color: "var(--background)",
                      background: "var(--foreground)",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Book a pilot →
                  </a>
                  <a
                    href="mailto:hello@gridagents.com"
                    className="cta-pill-outline"
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "0.9375rem",
                      color: "var(--foreground)",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      border: "1px solid rgba(26,26,24,0.18)",
                    }}
                  >
                    hello@gridagents.com
                  </a>
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <p className="font-label" style={{ opacity: 0.55, margin: "0 0 0.75rem" }}>
                  Network
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
                  {[
                    ["Problem", "#problem"],
                    ["How it works", "#how-it-works"],
                    ["Outcomes", "#outcomes"],
                    ["Backed by", "#backing"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <a
                        href={href}
                        style={{
                          fontFamily: "var(--font-sans), system-ui, sans-serif",
                          fontSize: "0.9rem",
                          color: "var(--foreground)",
                          opacity: 0.75,
                          textDecoration: "none",
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                marginTop: "4rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(26,26,24,0.08)",
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
          </div>
        </footer>
      </main>
    </div>
  );
}
