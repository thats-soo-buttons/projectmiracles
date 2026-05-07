"use client";

import { Goal } from "./Dashboard";

interface GoalTrackerProps {
  goals: Goal[];
  totalPledged: number;
}

export default function GoalTracker({ goals, totalPledged }: GoalTrackerProps) {
  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="bg-surface border border-border rounded-md p-5 flex flex-wrap gap-6 items-center">
        <div>
          <p className="text-2xl font-bold text-text">${totalPledged.toLocaleString()}</p>
          <p className="text-muted text-sm">total pledged</p>
        </div>
        <div className="h-10 w-px bg-border hidden md:block" />
        <div>
          <p className="text-sm font-medium text-text">
            {totalPledged >= 165000
              ? "🎉 All goals reached! Production begins."
              : totalPledged >= 115000
                ? "Goals 1 & 2 achieved — working toward distribution."
                : totalPledged >= 15000
                  ? "Goal 1 reached — writers and musicians secured."
                  : "Help us reach the first milestone."}
          </p>
        </div>
      </div>

      {/* Goal cards */}
      {goals.map((goal) => {
        const percentage = getProgressPercentage(goal);
        const isMet = totalPledged >= goal.target;

        return (
          <div key={goal.id} className="bg-surface border border-border rounded-md p-6">
            <div className="flex items-start justify-between mb-1 gap-4">
              <div>
                <span className="mono text-accent text-xs tracking-widest">GOAL {goal.id}</span>
                <h3 className="text-lg font-semibold text-text mt-0.5">{goal.name}</h3>
              </div>
              {isMet ? (
                <span className="shrink-0 text-xs font-medium bg-accent/20 text-accent border border-accent/30 rounded-full px-3 py-1">
                  ✓ Reached
                </span>
              ) : (
                <span className="shrink-0 text-xs font-medium bg-surface-2 text-muted border border-border rounded-full px-3 py-1">
                  In Progress
                </span>
              )}
            </div>

            <p className="text-muted text-sm mb-4">{goal.description}</p>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-xs text-muted mono">
              <span>${goal.current.toLocaleString()} pledged</span>
              <span>{Math.round(percentage)}% of ${goal.target.toLocaleString()}</span>
            </div>
          </div>
        );
      })}

      {/* How it works */}
      <div className="bg-surface border border-border rounded-md p-5 text-sm">
        <p className="font-semibold text-text mb-3">How it works</p>
        <ol className="space-y-1 text-muted list-decimal list-inside text-sm">
          <li>A funding goal is reached by combined pledges</li>
          <li>All pledgers receive a confirmation email</li>
          <li>You choose to confirm or cancel — no pressure</li>
          <li>Payment is only collected from confirmed pledges</li>
          <li>Rewards delivered according to your pledge level</li>
        </ol>
      </div>
    </div>
  );
}
