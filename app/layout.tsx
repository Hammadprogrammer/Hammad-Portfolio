import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Scene3DClient from "./components/Scene3DClient";
import ScrollProgress from "./components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const SITE_URL = "https://muhammad-hammad.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Hammad — Full Stack Developer",
    template: "%s — Muhammad Hammad",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and scalable APIs. Building fast, modern, and immersive web applications.",
  keywords: [
    "Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js",
    "Web Developer", "Frontend", "Backend", "Portfolio",
  ],
  authors: [{ name: "Muhammad Hammad" }],
  creator: "Muhammad Hammad",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Muhammad Hammad — Full Stack Developer",
    description:
      "Full Stack Developer building fast, scalable web applications with React, Next.js, and Node.js.",
    siteName: "Muhammad Hammad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hammad — Full Stack Developer",
    description: "Full Stack Developer building modern, scalable web applications.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-screen bg-void text-bone overflow-x-hidden">
        {/* Global scroll-reactive Three.js theme — sits behind all content */}
        <Scene3DClient />
        <ScrollProgress />
        <Cursor />
        <Nav />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
