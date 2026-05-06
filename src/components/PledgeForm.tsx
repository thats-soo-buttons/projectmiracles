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
  const [showRewards, setShowRewards] = useState(false);
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
    <div className="border border-terminal-green p-8 max-w-4xl">
      <h2 className="text-2xl mb-6 terminal-text">{`PLEDGE YOUR SUPPORT`}</h2>

      {submitted ? (
        <div className="border border-terminal-green p-4 bg-terminal">
          <p className="text-terminal-green">{`✓ PLEDGE RECEIVED`}</p>
          <p className="text-terminal-dark-green mt-2">
            {`You will receive email confirmations when each funding goal is reached.`}
          </p>
          <p className="text-terminal-dark-green mt-2 text-sm">
            {`At that time, you can review the details and decide whether to proceed.`}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-terminal-dark-green mb-2">
              {`> NAME (for credits):`}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-terminal-dark-green mb-2">
              {`> EMAIL (for notifications):`}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-terminal-dark-green mb-2">
              {`> PLEDGE AMOUNT ($):`}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="25"
              min="1"
              className="w-full"
            />
            <p className="text-terminal-dark-green text-xs mt-2">
              {`Suggested: $25, $100, $250, or $500 - or enter custom amount`}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowRewards(!showRewards)}
              className="flex-1 py-2 text-sm border border-terminal-dark-green bg-terminal hover:bg-terminal-dark-green hover:text-terminal"
            >
              {`VIEW PLEDGE LEVELS & REWARDS`}
            </button>
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="flex-1 py-2 text-sm border border-terminal-dark-green bg-terminal hover:bg-terminal-dark-green hover:text-terminal"
            >
              {`LEGAL TERMS`}
            </button>
          </div>

          <div className="text-xs text-terminal-dark-green">
            <p>
              Read full policy before submitting: {" "}
              <a href="/terms" className="text-terminal-green underline hover:text-terminal-dark-green">
                Terms & Pledge Policy
              </a>
            </p>
          </div>

          {showRewards && (
            <div className="border border-terminal-dark-green p-4 bg-terminal-dark-green bg-opacity-5">
              <h3 className="text-terminal-green mb-4">{`PLEDGE LEVEL REWARDS`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewardTiers.map((tier) => (
                  <div key={tier.amount} className="border border-terminal-dark-green p-3 text-sm">
                    <p className="font-bold text-terminal-green">{`$${tier.amount}+ - ${tier.title}`}</p>
                    <ul className="mt-2 space-y-1 text-terminal-dark-green">
                      {tier.rewards.map((reward, idx) => (
                        <li key={idx}>{`• ${reward}`}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-terminal-dark-green mt-4">
                {`Note: All rewards are contingent on successful project funding and production completion.`}
              </p>
            </div>
          )}

          {showTerms && (
            <div className="border border-terminal-green p-4 bg-terminal text-xs space-y-3">
              <h3 className="text-terminal-green font-bold">{`IMPORTANT: PLEDGE AGREEMENT`}</h3>
              
              <div>
                <p className="text-terminal-green font-bold mb-1">{`1. NO IMMEDIATE CHARGE`}</p>
                <p className="text-terminal-dark-green">
                  {`Your pledge is NOT a purchase. NO MONEY will be collected at this time. This is a conditional pledge of support.`}
                </p>
              </div>

              <div>
                <p className="text-terminal-green font-bold mb-1">{`2. CONDITIONAL FUNDING`}</p>
                <p className="text-terminal-dark-green">
                  {`Payment is only processed IF AND WHEN the stated funding goal is reached. If Goal 1 ($15k) is never reached, you will NOT be charged.`}
                </p>
              </div>

              <div>
                <p className="text-terminal-green font-bold mb-1">{`3. EMAIL NOTIFICATION`}</p>
                <p className="text-terminal-dark-green">
                  {`When a funding goal is reached, you will receive an email to ${email || "[your email]"} with full details about the project status and next steps.`}
                </p>
              </div>

              <div>
                <p className="text-terminal-green font-bold mb-1">{`4. YOUR DECISION`}</p>
                <p className="text-terminal-dark-green">
                  {`After receiving the email, you will have the option to CONFIRM or CANCEL your pledge before any charge is made. Only pledges that are confirmed will result in a payment.`}
                </p>
              </div>

              <div>
                <p className="text-terminal-green font-bold mb-1">{`5. REWARD DETAILS`}</p>
                <p className="text-terminal-dark-green">
                  {`Your email notification will include a detailed breakdown of rewards for your pledge level and timeline for delivery.`}
                </p>
              </div>

              <div>
                <p className="text-terminal-green font-bold mb-1">{`6. REFUND POLICY`}</p>
                <p className="text-terminal-dark-green">
                  {`If funded and you confirm your pledge, refunds are subject to our refund policy (details in confirmation email).`}
                </p>
              </div>

              <p className="text-terminal-dark-green border-t border-terminal-dark-green pt-3 mt-3">
                {`By submitting this pledge, you agree to these terms and authorize the collection of your email address for project notifications only.`}
              </p>
            </div>
          )}

          <div className="bg-terminal-dark-green bg-opacity-10 border border-terminal-dark-green p-4 text-sm">
            <p className="text-terminal-green font-bold mb-2">{`⚠ PLEDGE DISCLAIMER`}</p>
            <p>{`This is a CONDITIONAL PLEDGE. Your information will only be used to notify you of goal milestones. NO charge will occur unless you confirm after receiving a goal milestone email. Review our Legal Terms above before pledging.`}</p>
          </div>

          <button type="submit" className="w-full py-3 text-lg font-bold">
            {`I UNDERSTAND - SUBMIT PLEDGE`}
          </button>
        </form>
      )}
    </div>
  );
}
