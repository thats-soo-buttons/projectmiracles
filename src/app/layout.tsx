import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Miracles — Horror TV Crowdfunding",
  description: "Back a horror TV series built by the community. Conditional pledges — no charge until funding goals are reached.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text font-sans">{children}</body>
    </html>
  );
}
