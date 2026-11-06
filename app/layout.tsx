import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nehil Bhakta — Frontend & Full-Stack Developer",
  description:
    "Portfolio of Nehil Bhakta, Frontend & Full-Stack Developer (React, Next.js, TypeScript) and MS IT student at Arizona State University.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
