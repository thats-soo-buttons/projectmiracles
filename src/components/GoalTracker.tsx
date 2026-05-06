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
    <div className="space-y-8">
      <div className="border border-terminal-green p-6">
        <h2 className="text-2xl mb-4 terminal-text">{`FUNDING PROGRESS`}</h2>
        <p className="text-terminal-dark-green mb-6">
          {`Total Pledged: $${totalPledged.toLocaleString()}`}
        </p>

        {goals.map((goal) => {
          const percentage = getProgressPercentage(goal);
          const isMet = totalPledged >= goal.target;

          return (
            <div key={goal.id} className="mb-8 pb-8 border-b border-terminal-dark-green last:border-0">
              <h3 className="text-xl mb-2">
                {`[GOAL ${goal.id}] ${goal.name}`}
                {isMet && (
                  <span className="ml-4 text-terminal-green animate-pulse">
                    ✓ REACHED
                  </span>
                )}
              </h3>
              <p className="text-terminal-dark-green mb-4">{goal.description}</p>

              <div className="mb-2 flex justify-between text-sm">
                <span>{`$${goal.current.toLocaleString()} / $${goal.target.toLocaleString()}`}</span>
                <span>{`${Math.round(percentage)}%`}</span>
              </div>

              <div className="w-full h-6 bg-terminal border border-terminal-green relative overflow-hidden">
                <div
                  className="h-full bg-terminal-green transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-terminal text-xs font-bold opacity-50">
                  {Math.round(percentage) > 10 && `${Math.round(percentage)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border border-terminal-dark-green p-4 text-sm space-y-2">
        <p>{`>>> MILESTONE STATUS <<<`}</p>
        <p className="mt-2">
          {totalPledged >= 165000
            ? "ALL GOALS REACHED! Production begins immediately."
            : totalPledged >= 100000
              ? "Goal 1 & 2 achieved! Working toward distribution."
              : totalPledged >= 15000
                ? "Goal 1 reached! Writers and musicians secured."
                : "Keep pledging to reach first milestone!"}
        </p>
        
        <div className="mt-4 pt-4 border-t border-terminal-dark-green text-xs text-terminal-dark-green">
          <p className="font-bold text-terminal-green mb-2">{`[WHEN GOALS ARE REACHED]`}</p>
          <ul className="space-y-1">
            <li>{`1. All pledgers receive confirmation email`}</li>
            <li>{`2. Email includes project status & reward details`}</li>
            <li>{`3. You have the option to CONFIRM or CANCEL`}</li>
            <li>{`4. Payment only collected from confirmed pledges`}</li>
            <li>{`5. Rewards sent according to pledge level`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
