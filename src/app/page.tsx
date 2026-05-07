"use client";

import { useState } from "react";
import TerminalEntry from "@/components/TerminalEntry";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="min-h-screen bg-bg text-text">
      {!hasEntered ? (
        <TerminalEntry onEnter={() => setHasEntered(true)} />
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
