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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-terminal-green pb-4">
        <h1 className="text-3xl md:text-4xl mb-2 terminal-text">{`PROJECT MIRACLES`}</h1>
        <p className="text-terminal-green text-sm">{`OFFICIAL WEBSITE: PROJECTMIRACLES.ORG`}</p>
        <p className="text-terminal-dark-green">{`>>> CROWDFUNDING INITIATIVE <<<`}</p>
      </div>

      {/* Notification */}
      {notificationMessage && (
        <div className="mb-6 p-4 border border-terminal-green bg-terminal text-terminal-green terminal-text">
          <p>{notificationMessage}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setActiveTab("tracker")}
          className={`px-6 py-2 ${
            activeTab === "tracker"
              ? "bg-terminal-dark-green text-terminal"
              : "bg-terminal border border-terminal-green"
          }`}
        >
          TRACKER
        </button>
        <button
          onClick={() => setActiveTab("pledge")}
          className={`px-6 py-2 ${
            activeTab === "pledge"
              ? "bg-terminal-dark-green text-terminal"
              : "bg-terminal border border-terminal-green"
          }`}
        >
          PLEDGE
        </button>
        <button
          onClick={() => setActiveTab("collab")}
          className={`px-6 py-2 ${
            activeTab === "collab"
              ? "bg-terminal-dark-green text-terminal"
              : "bg-terminal border border-terminal-green"
          }`}
        >
          COLLABORATE
        </button>
      </div>

      {/* Official verification */}
      <div className="mb-8 border border-terminal-green p-4 bg-terminal-dark-green bg-opacity-10 text-sm space-y-2">
        <p className="text-terminal-green font-bold">{`OFFICIAL VERIFICATION`}</p>
        <p className="text-terminal-dark-green">{`ProjectMiracles.org is the official campaign website for Project Miracles.`}</p>
        <p className="text-terminal-dark-green">{`DevillierMedia.com is the official production company website.`}</p>
        <p className="text-terminal-dark-green">{`We are currently collecting conditional pledges only. No payment is taken at pledge submission.`}</p>
        <p className="text-terminal-dark-green">{`If you see payment requests outside these official domains, treat them as unauthorized and report them.`}</p>
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
      <div className="mt-12 pt-8 border-t border-terminal-green text-terminal-dark-green text-sm space-y-4">
        <div>
          <p className="font-bold text-terminal-green">{`[SYSTEM STATUS]`}</p>
          <p>{`Total Pledged: $${totalPledged.toLocaleString()} | Pledgers: ${pledges.length}`}</p>
        </div>

        <div>
          <p className="font-bold text-terminal-green">{`[LEGAL DISCLAIMER]`}</p>
          <p className="text-xs">
            {`CONDITIONAL PLEDGES: This is NOT a transaction. No funds are collected at this time. Pledges are conditional on funding goal achievement. Once a goal is reached, pledgers will receive an email notification and can CONFIRM or DECLINE participation before any charge is made. Data is used only for goal milestone notifications. By pledging, you agree to these terms.`}
          </p>
          <p className="text-xs mt-2">
            <a href="/terms" className="text-terminal-green underline hover:text-terminal-dark-green">
              Read full Terms & Pledge Policy
            </a>
          </p>
        </div>

        <div>
          <p className="font-bold text-terminal-green">{`[PROCESS EXPLANATION]`}</p>
          <p className="text-xs">
            {`When a goal is reached → Email sent → You confirm or decline → If confirmed, payment collected → Rewards delivered per pledge level. See pledge form for full terms & conditions.`}
          </p>
        </div>

        <p>{`ProjectMiracles.org is the official website for this campaign.`}</p>
        <p>{`ProjectMiracles.org © 2024 | Bringing horror to life through community support`}</p>
      </div>
    </div>
  );
}
