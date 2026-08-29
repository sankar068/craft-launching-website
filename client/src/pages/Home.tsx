/*
 * CRAFT / Nocturne Signal
 * Design reminder: Swiss-inspired cinematic launch room; oversized Space Grotesk display type,
 * Manrope utility copy, IBM Plex Mono timekeeping, near-black canvas, one ultraviolet signal color.
 */
import { useEffect, useRef, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

const LAUNCH_AT = new Date("2026-08-30T23:11:11+05:30").getTime();

function getTimeLeft(): TimeLeft {
  const total = Math.max(0, LAUNCH_AT - Date.now());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1_000);
  return { days, hours, minutes, seconds, total };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function Header() {
  return (
    <header className="site-header">
      <a className="header-brand" href="#top" aria-label="CRAFT home">
        <span className="brand-spark" aria-hidden="true">✦</span>
        <span>CRAFT</span>
      </a>
      <div className="status-label" aria-label="Launch status">
        <span className="status-dot" aria-hidden="true" />
        <span>Launching soon</span>
      </div>
    </header>
  );
}

function Countdown({ live }: { live: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    if (live) return;
    const tick = () => setTimeLeft(getTimeLeft());
    const interval = window.setInterval(tick, 1_000);
    tick();
    return () => window.clearInterval(interval);
  }, [live]);

  if (live || timeLeft.total === 0) {
    return (
      <div className="live-state" role="status" aria-live="polite">
        <span className="live-kicker">The signal is clear</span>
        <span className="live-message">We&apos;re live.</span>
      </div>
    );
  }

  const units = [
    [pad(timeLeft.days), "Days"],
    [pad(timeLeft.hours), "Hours"],
    [pad(timeLeft.minutes), "Minutes"],
    [pad(timeLeft.seconds), "Seconds"],
  ];

  return (
    <div className="countdown-shell" aria-label="Countdown to launch" role="timer">
      <div className="countdown-meta">
        <span className="meta-line" aria-hidden="true" />
        <span>The countdown begins</span>
      </div>
      <div className="countdown-grid">
        {units.map(([value, label], index) => (
          <div className="countdown-unit" key={label}>
            <span className="countdown-value" key={`${label}-${value}`}>
              {value}
            </span>
            <span className="countdown-label">{label}</span>
            {index < units.length - 1 && <span className="unit-divider" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Contact links">
      <a href="https://www.instagram.com/thecrafts.in" target="_blank" rel="noreferrer">
        Instagram <span aria-hidden="true">↗</span>
      </a>
      <a href="mailto:hellowearecraft@gmail.com">
        Email <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}

export default function Home() {
  const [live, setLive] = useState(() => Date.now() >= LAUNCH_AT);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (live) return;
    const interval = window.setInterval(() => {
      if (Date.now() >= LAUNCH_AT) {
        setLive(true);
      }
    }, 1_000);
    return () => window.clearInterval(interval);
  }, [live]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const moveLight = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      page.style.setProperty("--pointer-x", `${x}%`);
      page.style.setProperty("--pointer-y", `${y}%`);
    };
    window.addEventListener("pointermove", moveLight, { passive: true });
    return () => window.removeEventListener("pointermove", moveLight);
  }, []);

  return (
    <main className={`launch-page ${live ? "is-live" : ""}`} ref={pageRef} id="top">
      <div className="ambient-orb" aria-hidden="true" />
      <div className="signal-ring signal-ring-one" aria-hidden="true" />
      <div className="signal-ring signal-ring-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="page-frame">
        <Header />

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A new digital standard is arriving</p>
            <h1 id="hero-title" className="wordmark" data-text="CRAFT">
              CRAFT
            </h1>
            <p className="tagline">Digital experiences, crafted differently.</p>
          </div>

          <div className="countdown-position">
            <Countdown live={live} />
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-note">
            <span className="footer-index">01</span>
            <span>Built for the next signal</span>
          </div>
          <p className="launch-date">30 August 2026 <span>·</span> 11:11:11 PM IST</p>
          <SocialLinks />
        </footer>
      </div>
    </main>
  );
}
