"use client";

import { useState } from "react";

interface PledgeFormProps {
  onSubmit: (name: string, email: string, amount: number) => void;
}

export default function PledgeForm({ onSubmit }: PledgeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const rewardTiers = [
    {
      amount: 25,
      title: "Supporter",
      rewards: [
        "Access to behind-the-scenes content",
        "Monthly production updates via email",
        "Credit in the project website",
      ],
    },
    {
      amount: 100,
      title: "Contributor",
      rewards: [
        "All Supporter benefits +",
        "Exclusive digital artwork pack",
        "Name in end credits (if production continues)",
        "Early access to production announcements",
      ],
    },
    {
      amount: 250,
      title: "Producer",
      rewards: [
        "All Contributor benefits +",
        "Exclusive merch (t-shirt + poster)",
        "Personal thank you video from creator",
        "Quarterly private production updates",
      ],
    },
    {
      amount: 500,
      title: "Executive Producer",
      rewards: [
        "All Producer benefits +",
        "Executive Producer credit in show",
        "Private Discord access to production team",
        "First look at pilot footage (when available)",
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !amount) {
      alert("All fields required");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    onSubmit(name, email, numAmount);
    setName("");
    setEmail("");
    setAmount("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <p className="mono text-accent text-xs tracking-widest uppercase mb-1">{"// BACK THIS PROJECT"}</p>
        <h2 className="text-2xl font-bold text-text">Pledge Your Support</h2>
        <p className="text-muted text-sm mt-1">No charge until a funding goal is reached — you confirm before anything is collected.</p>
      </div>

      {submitted ? (
        <div className="bg-accent/10 border border-accent/30 rounded-md p-6">
          <p className="text-accent font-semibold text-lg mb-1">✓ Pledge received</p>
          <p className="text-muted text-sm">You'll get an email when each funding goal is reached. At that point you can confirm or cancel — no pressure.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quick-pick tiers */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Select a pledge level</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {rewardTiers.map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => setAmount(String(tier.amount))}
                  className={`p-3 rounded-md border text-left transition-all ${
                    amount === String(tier.amount)
                      ? "border-accent bg-accent/10 text-text"
                      : "border-border bg-surface text-muted hover:border-accent/40"
                  }`}
                >
                  <p className="font-bold text-text">${tier.amount}</p>
                  <p className="text-xs mt-0.5 text-muted">{tier.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Custom amount <span className="text-muted font-normal">(or type your own)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="25"
                min="1"
                className="w-full pl-7"
              />
            </div>
          </div>

          {/* Rewards for selected tier */}
          {amount && rewardTiers.find((t) => t.amount <= parseFloat(amount)) && (() => {
            const tier = [...rewardTiers].reverse().find((t) => t.amount <= parseFloat(amount));
            if (!tier) return null;
            return (
              <div className="bg-surface border border-border rounded-md p-4 text-sm">
                <p className="font-semibold text-text mb-2">Your rewards at <span className="text-accent">${tier.amount}+ — {tier.title}</span></p>
                <ul className="space-y-1 text-muted">
                  {tier.rewards.map((r, i) => <li key={i}>· {r}</li>)}
                </ul>
                <p className="text-xs text-muted/60 mt-3">Rewards contingent on successful funding and production.</p>
              </div>
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Name <span className="text-muted font-normal">(for credits)</span></label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email <span className="text-muted font-normal">(for notifications)</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full" />
            </div>
          </div>

          {/* Terms toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="text-sm text-accent underline bg-transparent border-none p-0"
            >
              {showTerms ? "Hide" : "Read"} pledge terms & conditions
            </button>
            {showTerms && (
              <div className="mt-3 bg-surface border border-border rounded-md p-4 text-xs text-muted space-y-2 leading-relaxed">
                <p><span className="text-text font-semibold">No immediate charge.</span> This is not a purchase. No funds are collected now.</p>
                <p><span className="text-text font-semibold">Conditional.</span> Payment only if a funding goal is reached AND you confirm via email.</p>
                <p><span className="text-text font-semibold">Your choice.</span> When a goal is reached you'll get an email — confirm or cancel, no pressure.</p>
                <p><span className="text-text font-semibold">Data use.</span> Your name and email are used only for goal milestone notifications.</p>
                <a href="/terms" className="text-accent underline block mt-1">Full Terms & Pledge Policy →</a>
              </div>
            )}
          </div>

          <div className="bg-surface border border-border rounded-md p-4 text-sm text-muted">
            <span className="text-text font-medium">Reminder:</span> No money is charged today. You'll receive an email at each funding milestone and can confirm or cancel before any payment is made.
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-cta hover:bg-cta-hover text-white font-semibold text-base shadow-lg shadow-red-900/20 transition-colors"
          >
            Submit Pledge — No charge today
          </button>
        </form>
      )}
    </div>
  );
}
