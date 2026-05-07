"use client";

interface TerminalEntryProps {
  onEnter: () => void;
}

export default function TerminalEntry({ onEnter }: TerminalEntryProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Eyebrow tag */}
      <p className="mono text-accent text-xs tracking-widest uppercase mb-6 opacity-80">
        {"// CROWDFUNDING INITIATIVE"}
      </p>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-bold text-text mb-4 tracking-tight leading-tight">
        Project{" "}
        <span className="text-accent accent-glow">Miracles</span>
      </h1>

      {/* Tagline */}
      <p className="text-lg md:text-xl text-muted max-w-xl mb-4 leading-relaxed">
        A horror TV series built by the community — writers, musicians, and fans funding something real.
      </p>

      {/* Pledge notice badge */}
      <div className="mb-10 inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 text-sm text-muted">
        <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
        No charge until a funding goal is reached
      </div>

      {/* CTA */}
      <button
        onClick={onEnter}
        className="bg-cta hover:bg-cta-hover text-white font-semibold text-lg px-10 py-4 rounded-md mb-4 shadow-lg shadow-red-900/30"
      >
        See the Campaign →
      </button>

      <p className="text-muted text-xs mono mt-2">projectmiracles.org</p>

      {/* Scroll hint */}
      <div className="absolute bottom-8 text-muted text-sm mono animate-bounce">
        ↓
      </div>
    </div>
  );
}
