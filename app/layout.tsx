import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nehil Bhakta — Frontend & Full-Stack Developer",
  description:
    "Portfolio of Nehil Bhakta, full-stack developer (React, Next.js, TypeScript, Python) with 2+ years of production experience and applied ML projects. MS IT, Arizona State University, Dec 2026.",
  openGraph: {
    title: "Nehil Bhakta — Frontend & Full-Stack Developer",
    description:
      "Portfolio of Nehil Bhakta, full-stack developer (React, Next.js, TypeScript, Python) with 2+ years of production experience and applied ML projects. MS IT, Arizona State University, Dec 2026.",
    url: "https://nehilbhakta-portfolio.vercel.app",
    images: [
      {
        url: "https://nehilbhakta-portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nehil Bhakta — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nehil Bhakta — Frontend & Full-Stack Developer",
    description:
      "Portfolio of Nehil Bhakta, full-stack developer (React, Next.js, TypeScript, Python) with 2+ years of production experience and applied ML projects. MS IT, Arizona State University, Dec 2026.",
    images: ["https://nehilbhakta-portfolio.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
