"use client";

import { useState, useEffect } from "react";
import GoalTracker from "./GoalTracker";
import PledgeForm from "./PledgeForm";
import CollaborationForm from "./CollaborationForm";
import BulletinBoard from "./BulletinBoard";
import { Pledge, Goal } from "./Dashboard";

type FolderName = "blackmill" | "pledges" | "video";

const GOALS: Goal[] = [
  {
    id: 1,
    name: "Writer/Musician Funds",
    description: "Pay 3 writers for 12-week sprint, hire musicians, open project bank account",
    target: 25000,
    current: 0,
  },
  {
    id: 2,
    name: "Pilot Production",
    description: "Hire actors, crew, editors, and shoot our horror pilot",
    target: 100000,
    current: 0,
  },
  {
    id: 3,
    name: "Distribution Fees",
    description: "Festival submissions, streaming, and marketing push",
    target: 50000,
    current: 0,
  },
];

function FolderIcon({
  label,
  isOpen,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group select-none focus:outline-none"
      aria-pressed={isOpen}
    >
      <svg
        width="80"
        height="64"
        viewBox="0 0 80 64"
        className={`transition-all duration-150 drop-shadow-lg ${
          isOpen ? "scale-110" : "group-hover:scale-105"
        }`}
      >
        {/* Folder tab */}
        <rect
          x="3"
          y="6"
          width="24"
          height="10"
          rx="3"
          className={
            isOpen
              ? "fill-[#22c55e]"
              : "fill-[#374151] group-hover:fill-[#4b5563]"
          }
        />
        {/* Folder body */}
        <rect
          x="3"
          y="14"
          width="74"
          height="46"
          rx="5"
          className={
            isOpen
              ? "fill-[rgba(34,197,94,0.2)] stroke-[#22c55e]"
              : "fill-[#1f2937] stroke-[#374151] group-hover:stroke-[rgba(34,197,94,0.4)]"
          }
          strokeWidth="1.5"
        />
        {/* File lines */}
        <line x1="16" y1="31" x2="64" y2="31" stroke={isOpen ? "rgba(34,197,94,0.5)" : "rgba(156,163,175,0.25)"} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="40" x2="52" y2="40" stroke={isOpen ? "rgba(34,197,94,0.5)" : "rgba(156,163,175,0.25)"} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="49" x2="42" y2="49" stroke={isOpen ? "rgba(34,197,94,0.5)" : "rgba(156,163,175,0.25)"} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span
        className={`text-xs font-medium text-center px-2 py-0.5 rounded transition-colors mono ${
          isOpen
            ? "bg-accent text-bg"
            : "text-muted group-hover:text-text"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export default function Desktop() {
  const [openFolder, setOpenFolder] = useState<FolderName | null>(null);
  const [pledgesTab, setPledgesTab] = useState<"pledge" | "collab">("pledge");
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pledges");
    if (stored) setPledges(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("pledges", JSON.stringify(pledges));
    const total = pledges.reduce((s, p) => s + p.amount, 0);
    setGoals(GOALS.map((g) => ({ ...g, current: total })));
    GOALS.forEach((goal) => {
      if (
        total >= goal.target &&
        !localStorage.getItem(`goal-${goal.id}-notified`)
      ) {
        setNotification(`🎉 Goal ${goal.id} reached! ${goal.name} is now funded!`);
        localStorage.setItem(`goal-${goal.id}-notified`, "true");
        setTimeout(() => setNotification(""), 5000);
      }
    });
  }, [pledges]);

  const totalPledged = pledges.reduce((s, p) => s + p.amount, 0);

  const handlePledgeSubmit = (name: string, email: string, amount: number) => {
    const newPledge: Pledge = {
      id: Date.now().toString(),
      name,
      email,
      amount,
      timestamp: new Date().toISOString(),
    };
    setPledges([...pledges, newPledge]);
    setNotification(`✓ Pledge of $${amount} registered for ${name}`);
    setTimeout(() => setNotification(""), 3000);
  };

  const toggleFolder = (folder: FolderName) => {
    setOpenFolder((prev) => (prev === folder ? null : folder));
  };

  const folders: { id: FolderName; label: string }[] = [
    { id: "blackmill", label: "BlackmillVA" },
    { id: "pledges", label: "Pledges" },
    { id: "video", label: "Video" },
  ];

  const folderTitles: Record<FolderName, string> = {
    blackmill: "BlackmillVA",
    pledges: "Pledges",
    video: "Video",
  };

  return (
    <div
      className="min-h-screen bg-bg"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Menu bar */}
      <div className="border-b border-border bg-surface/80 backdrop-blur-sm px-6 py-2 flex items-center justify-between sticky top-0 z-10">
        <span className="mono text-xs text-muted">projectmiracles.org</span>
        <span className="mono text-xs text-accent tracking-widest">PROJECT MIRACLES</span>
        <span className="mono text-xs text-muted">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>

      <div className="px-6 md:px-12 py-12">
        {/* Desktop title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-text mb-3">
            Project <span className="text-accent accent-glow">Miracles</span>
          </h1>
          <p className="text-muted text-sm mono">
            — click a folder to explore —
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-6 max-w-xl mx-auto p-3 rounded-md border border-accent bg-accent/10 text-accent text-sm text-center">
            {notification}
          </div>
        )}

        {/* Folder icons */}
        <div className="flex justify-center gap-16 md:gap-28 mb-12">
          {folders.map((f) => (
            <FolderIcon
              key={f.id}
              label={f.label}
              isOpen={openFolder === f.id}
              onClick={() => toggleFolder(f.id)}
            />
          ))}
        </div>

        {/* Open folder window */}
        {openFolder && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Window chrome */}
            <div className="bg-surface-2 border border-border rounded-t-lg px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setOpenFolder(null)}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  aria-label="Close"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="mono text-xs text-muted ml-2 flex items-center gap-1">
                <span className="text-muted/50">~/</span>
                {folderTitles[openFolder]}
              </span>
            </div>

            {/* Window body */}
            <div className="bg-surface border border-t-0 border-border rounded-b-lg p-6 md:p-8">

              {/* ── BlackmillVA ── */}
              {openFolder === "blackmill" && (
                <div className="space-y-6">
                  {/* Hero Section */}
                  <div>
                    <p className="mono text-accent text-xs tracking-widest uppercase mb-3">{"// A DARK MYSTERY UNFOLDS"}</p>
                    <h2 className="text-4xl md:text-5xl font-black text-accent mb-2">MIRACLE</h2>
                    <p className="text-lg md:text-xl font-semibold text-text mb-3">in Blackmill, VA</p>
                    <p className="text-text leading-relaxed text-base max-w-2xl">
                      A psychological horror series where each season replays the same week from a new perspective. The deeper you go, the darker it gets.
                    </p>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-accent/20 border border-accent/40 rounded-md p-4">
                      <p className="mono text-[10px] text-accent uppercase tracking-widest mb-1">Episodes</p>
                      <p className="text-3xl font-black text-accent">6</p>
                      <p className="text-xs text-muted mt-1">per season</p>
                    </div>
                    <div className="bg-accent/20 border border-accent/40 rounded-md p-4">
                      <p className="mono text-[10px] text-accent uppercase tracking-widest mb-1">Seasons</p>
                      <p className="text-3xl font-black text-accent">6</p>
                      <p className="text-xs text-muted mt-1">arc planned</p>
                    </div>
                    <div className="bg-accent/20 border border-accent/40 rounded-md p-4">
                      <p className="mono text-[10px] text-accent uppercase tracking-widest mb-1">Pledged</p>
                      <p className="text-3xl font-black text-accent">${(totalPledged / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-muted mt-1">{pledges.length} backers</p>
                    </div>
                    <div className="bg-accent/20 border border-accent/40 rounded-md p-4">
                      <p className="mono text-[10px] text-accent uppercase tracking-widest mb-1">Rating</p>
                      <p className="text-3xl font-black text-accent">R</p>
                      <p className="text-xs text-muted mt-1">rated horror</p>
                    </div>
                  </div>

                  {/* The Hook */}
                  <div className="bg-surface-2 border border-border rounded-md p-5">
                    <p className="mono text-accent text-xs tracking-widest uppercase mb-3">{"// SEASON 1: THE SETUP"}</p>
                    <p className="text-text leading-relaxed">
                      Follow a married couple through obsession, manipulation, and murder while hidden cameras record every move. The wife kills the husband. SWAT raids the house. Red emergency lights. A single blinking lens in the corner.
                    </p>
                    <p className="text-xs text-muted mt-3">
                      And that's just the beginning. Rewatch as different characters reveal what you really missed.
                    </p>
                  </div>

                  {/* Why It Works */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-surface-2 border border-border rounded-md p-4">
                      <p className="mono text-accent text-xs tracking-widest uppercase mb-2">{"// Rashomon Effect"}</p>
                      <p className="text-xs text-muted leading-relaxed">Same 6 days. 4 different points of view. Each season peels back a new layer of the mystery.</p>
                    </div>
                    <div className="bg-surface-2 border border-border rounded-md p-4">
                      <p className="mono text-accent text-xs tracking-widest uppercase mb-2">{"// Audience Solves It"}</p>
                      <p className="text-xs text-muted leading-relaxed">By the finale, viewers unlock leaked security footage. You become the whistleblower.</p>
                    </div>
                    <div className="bg-surface-2 border border-border rounded-md p-4">
                      <p className="mono text-accent text-xs tracking-widest uppercase mb-2">{"// Music-Driven"}</p>
                      <p className="text-xs text-muted leading-relaxed">Each episode is a song. Ella Fitzgerald to Muse to Nothing but Thieves.</p>
                    </div>
                  </div>

                  {/* Funding */}
                  <GoalTracker goals={goals} totalPledged={totalPledged} />

                  <p className="text-xs text-muted">
                    If you see payment requests outside official domains, treat them as unauthorized and report them.
                  </p>
                </div>
              )}

              {/* ── Pledges ── */}
              {openFolder === "pledges" && (
                <div>
                  <div className="flex gap-3 mb-6 border-b border-border pb-4">
                    <button
                      onClick={() => setPledgesTab("pledge")}
                      className={`text-sm px-4 py-1.5 rounded-md border transition-all ${
                        pledgesTab === "pledge"
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted hover:text-text"
                      }`}
                    >
                      Back the Project
                    </button>
                    <button
                      onClick={() => setPledgesTab("collab")}
                      className={`text-sm px-4 py-1.5 rounded-md border transition-all ${
                        pledgesTab === "collab"
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted hover:text-text"
                      }`}
                    >
                      Join the Team
                    </button>
                  </div>
                  {pledgesTab === "pledge" ? (
                    <PledgeForm onSubmit={handlePledgeSubmit} />
                  ) : (
                    <CollaborationForm />
                  )}
                </div>
              )}

              {/* ── Video ── */}
              {openFolder === "video" && (
                <div className="space-y-10">
                  {/* Teasers */}
                  <div>
                    <p className="mono text-accent text-xs tracking-widest uppercase mb-4">
                      {"// TEASERS"}
                    </p>
                    {/* 
                      TO ADD TIKTOK VIDEOS:
                      Replace each placeholder div with a TikTok blockquote embed.
                      Get embed code from TikTok → Share → Embed.
                      Example:
                      <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@yourhandle/video/VIDEO_ID"
                        data-video-id="VIDEO_ID"
                        style={{ maxWidth: "325px", minWidth: "325px" }}
                      >
                        <section />
                      </blockquote>
                      Add this once at the bottom of the page:
                      <script async src="https://www.tiktok.com/embed.js" />
                    */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="bg-surface-2 border border-dashed border-border rounded-md flex flex-col items-center justify-center gap-2 text-muted text-xs text-center p-6 aspect-[9/16] max-w-[280px]"
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15 10l4.553-2.853A1 1 0 0121 8v8a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>TikTok teaser #{n}</span>
                          <span className="opacity-50">paste embed code here</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bulletin board */}
                  <div>
                    <p className="mono text-accent text-xs tracking-widest uppercase mb-4">
                      {"// BULLETIN BOARD"}
                    </p>
                    <BulletinBoard />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 text-center text-xs mono text-muted space-y-1">
          <p>projectmiracles.org © 2025 — Bringing horror to life through community support</p>
          <p>
            <a href="/terms" className="text-accent hover:underline">
              Terms & Pledge Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
