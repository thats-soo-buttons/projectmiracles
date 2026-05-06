import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Miracles",
  description: "Crowdfunding for a horror TV show and interactive website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-terminal text-terminal-green font-mono">{children}</body>
    </html>
  );
}
