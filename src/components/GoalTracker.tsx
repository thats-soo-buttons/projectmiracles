"use client";

import { Goal } from "./Dashboard";

interface GoalTrackerProps {
  goals: Goal[];
  totalPledged: number;
}

export default function GoalTracker({ goals, totalPledged }: GoalTrackerProps) {
  const getProgressPercentage = (pledgedForStage: number, target: number) => {
    return Math.min((pledgedForStage / target) * 100, 100);
  };

  const goalOneTarget = goals[0]?.target ?? 0;
  const goalTwoCumulative = goals.slice(0, 2).reduce((sum, goal) => sum + goal.target, 0);
  const allGoalsCumulative = goals.reduce((sum, goal) => sum + goal.target, 0);

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
            {totalPledged >= allGoalsCumulative
              ? "🎉 All goals reached! Production begins."
              : totalPledged >= goalTwoCumulative
                ? "Goals 1 & 2 achieved — working toward distribution."
                : totalPledged >= goalOneTarget
                  ? "Goal 1 reached — writers and musicians secured."
                  : "Help us reach the first milestone."}
          </p>
        </div>
      </div>

      {/* Goal cards */}
      {goals.map((goal, index) => {
        const priorTargetTotal = goals
          .slice(0, index)
          .reduce((sum, item) => sum + item.target, 0);
        const targetTotalToThisGoal = priorTargetTotal + goal.target;

        const isUnlocked = index === 0 || totalPledged >= priorTargetTotal;
        const isMet = totalPledged >= targetTotalToThisGoal;

        const pledgedForStage = Math.max(
          0,
          Math.min(goal.target, totalPledged - priorTargetTotal)
        );
        const percentage = getProgressPercentage(pledgedForStage, goal.target);

        const statusLabel = isMet
          ? "✓ Reached"
          : !isUnlocked
            ? "Locked"
            : "Current Goal";

        return (
          <div key={goal.id} className="bg-surface border border-border rounded-md p-6">
            <div className="flex items-start justify-between mb-1 gap-4">
              <div>
                <span className="mono text-accent text-xs tracking-widest">GOAL {goal.id}</span>
                <h3 className="text-lg font-semibold text-text mt-0.5">{goal.name}</h3>
              </div>
              <span
                className={`shrink-0 text-xs font-medium border rounded-full px-3 py-1 ${
                  isMet
                    ? "bg-accent/20 text-accent border-accent/30"
                    : isUnlocked
                      ? "bg-surface-2 text-muted border-border"
                      : "bg-surface-2 text-muted/80 border-border"
                }`}
              >
                {statusLabel}
              </span>
            </div>

            <p className="text-muted text-sm mb-4">{goal.description}</p>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isUnlocked ? "bg-accent" : "bg-border"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-xs text-muted mono">
              <span>${pledgedForStage.toLocaleString()} pledged</span>
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
