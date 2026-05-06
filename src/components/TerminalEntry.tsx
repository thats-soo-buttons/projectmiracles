"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalEntryProps {
  onEnter: () => void;
}

export default function TerminalEntry({ onEnter }: TerminalEntryProps) {
  const [input, setInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.toUpperCase() === "ENTER") {
      onEnter();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-2xl">
        <div className="mb-12 text-xl md:text-2xl leading-relaxed">
          <p className="mb-4 terminal-text">{`> PROJECT MIRACLES`}</p>
          <p className="mb-2 text-sm md:text-base text-terminal-green">{`OFFICIAL WEBSITE: PROJECTMIRACLES.ORG`}</p>
          <p className="mb-8 text-terminal-dark-green">{`>>> ACCESSING SYSTEM <<<`}</p>
          <p className="mb-12 text-sm md:text-base">
            {`[NETWORK CONNECTED] [DATABASE INITIALIZED] [READY FOR INPUT]`}
          </p>
        </div>

        <div className="mb-8 border border-terminal-dark-green p-4 text-xs text-terminal-dark-green bg-terminal-dark-green bg-opacity-5">
          <p className="mb-2 font-bold text-terminal-green">{`⚠ IMPORTANT: CONDITIONAL PLEDGE NOTICE`}</p>
          <p className="mb-2">
            {`This is a PLEDGE system. No money will be charged immediately. Once a funding goal is reached, you will receive an email where you can confirm or cancel before any payment is made.`}
          </p>
          <p className="text-xs">
            {`Your name and email are used ONLY for goal milestone notifications. See pledge form for full terms.`}
          </p>
        </div>

        <div className="mb-8 text-terminal-dark-green text-lg">
          {`TYPE "ENTER" TO PROCEED:`}
        </div>

        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="w-full md:w-96 px-4 py-2 text-center uppercase"
          />
        </div>

        <div className="h-6 text-xl">
          {showCursor && (
            <span className="cursor text-terminal-green animate-pulse">█</span>
          )}
        </div>

        {input && input.toUpperCase() !== "ENTER" && (
          <p className="mt-6 text-terminal-dark-green text-sm">
            {`[INPUT INVALID] TRY AGAIN`}
          </p>
        )}
      </div>
    </div>
  );
}
