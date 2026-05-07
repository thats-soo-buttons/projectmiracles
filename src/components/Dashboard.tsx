"use client";

import { useState, useEffect } from "react";
import PledgeForm from "./PledgeForm";
import GoalTracker from "./GoalTracker";
import CollaborationForm from "./CollaborationForm";

export interface Pledge {
  id: string;
  name: string;
  email: string;
  amount: number;
  timestamp: string;
}

export interface Goal {
  id: number;
  name: string;
  description: string;
  target: number;
  current: number;
}

const GOALS: Goal[] = [
  {
    id: 1,
    name: "Writer/Musician Funds",
    description:
      "Pay 3 writers for 12-week sprint, hire musicians, open project bank account",
    target: 15000,
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

export default function Dashboard() {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [activeTab, setActiveTab] = useState<"tracker" | "pledge" | "collab">(
    "tracker"
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pledges");
    if (stored) {
      setPledges(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pledges", JSON.stringify(pledges));

    const totalPledged = pledges.reduce((sum, p) => sum + p.amount, 0);
    const updatedGoals = GOALS.map((goal) => ({
      ...goal,
      current: totalPledged,
    }));
    setGoals(updatedGoals);

    checkGoalMilestones(totalPledged);
  }, [pledges]);

  const checkGoalMilestones = (totalPledged: number) => {
    GOALS.forEach((goal) => {
      if (totalPledged >= goal.target) {
        const alreadyNotified = localStorage.getItem(`goal-${goal.id}-notified`);
        if (!alreadyNotified) {
          setNotificationMessage(
            `🎉 GOAL ${goal.id} REACHED! ${goal.name} is now funded! Check your email.`
          );
          localStorage.setItem(`goal-${goal.id}-notified`, "true");
          setTimeout(() => setNotificationMessage(""), 5000);
        }
      }
    });
  };

  const handlePledgeSubmit = (name: string, email: string, amount: number) => {
    const newPledge: Pledge = {
      id: Date.now().toString(),
      name,
      email,
      amount,
      timestamp: new Date().toISOString(),
    };

    setPledges([...pledges, newPledge]);
    setActiveTab("tracker");
    setNotificationMessage(`✓ Pledge of $${amount} registered for ${name}`);
    setTimeout(() => setNotificationMessage(""), 3000);
  };

  const totalPledged = pledges.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-border">
        <p className="mono text-accent text-xs tracking-widest uppercase mb-3 opacity-70">
          {"// PROJECT MIRACLES — CROWDFUNDING"}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-1">Campaign Dashboard</h1>
        <p className="text-muted text-sm">projectmiracles.org &mdash; official campaign website</p>
      </div>

      {/* Notification */}
      {notificationMessage && (
        <div className="mb-6 p-4 rounded-md border border-accent bg-accent/10 text-accent text-sm font-medium">
          {notificationMessage}
        </div>
      )}

      {/* Navigation */}
      <div className="mb-8 flex flex-wrap gap-3">
        {(["tracker", "pledge", "collab"] as const).map((tab) => {
          const labels = { tracker: "Goal Tracker", pledge: "Pledge Support", collab: "Collaborate" };
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-medium border transition-all ${
                active
                  ? "bg-accent text-bg border-accent"
                  : "bg-surface border-border text-muted hover:border-accent/50 hover:text-text"
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}

        {/* Live total — top right on desktop */}
        <div className="ml-auto mono text-xs text-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse"></span>
          ${totalPledged.toLocaleString()} pledged &bull; {pledges.length} backers
        </div>
      </div>

      {/* Official verification banner */}
      <div className="mb-8 bg-surface border border-border rounded-md p-4 text-sm space-y-1">
        <p className="font-semibold text-text mb-2">✓ Official Campaign Verification</p>
        <p className="text-muted">This is the official campaign at <span className="text-text">projectmiracles.org</span>. Production by <span className="text-text">DevillierMedia.com</span>.</p>
        <p className="text-muted">Conditional pledges only — no payment is taken at submission. If you see payment requests outside these domains, report them as unauthorized.</p>
      </div>

      {/* Content */}
      <div className="mb-12">
        {activeTab === "tracker" && (
          <GoalTracker goals={goals} totalPledged={totalPledged} />
        )}
        {activeTab === "pledge" && (
          <PledgeForm onSubmit={handlePledgeSubmit} />
        )}
        {activeTab === "collab" && <CollaborationForm />}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border text-sm space-y-4 text-muted">
        <div>
          <p className="font-semibold text-text mb-1">Legal Disclaimer</p>
          <p className="text-xs leading-relaxed">
            Conditional pledges are not transactions. No funds are collected at pledge submission. Once a funding goal is reached, pledgers receive an email and can confirm or decline before any charge is made. Data used only for goal milestone notifications.{" "}
            <a href="/terms" className="text-accent underline hover:text-accent/80">
              Read full Terms & Pledge Policy →
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs mono">
            When a goal is reached → Email sent → You confirm or decline → Payment collected only if confirmed → Rewards delivered
          </p>
        </div>
        <p className="text-xs">ProjectMiracles.org © 2025 — Bringing horror to life through community support</p>
      </div>
    </div>
  );
}
