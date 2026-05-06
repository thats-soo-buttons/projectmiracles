"use client";

import { useState } from "react";
import TerminalEntry from "@/components/TerminalEntry";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="min-h-screen bg-terminal text-terminal-green p-4 md:p-8">
      {!hasEntered ? (
        <TerminalEntry onEnter={() => setHasEntered(true)} />
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
